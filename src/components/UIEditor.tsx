import { useState } from 'react';
import { Download, Upload, RotateCcw, Monitor, Smartphone, Settings } from 'lucide-react';
import { useUIConfig } from '@/contexts/UIConfigContext';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const fontFamilies = ['Inter', 'Roboto', 'Poppins', 'Open Sans', 'Lato', 'Montserrat'];
const fontWeights = [300, 400, 500, 600, 700];
const shadowOptions = ['none', 'small', 'medium', 'large'];
const alignmentOptions = ['left', 'center', 'right'];
const galleryAlignmentOptions = ['grid-left', 'grid-center', 'grid-right'];

const UIEditor = () => {
  const { config, updateConfig, resetConfig, exportConfig, importConfig } = useUIConfig();
  const [isOpen, setIsOpen] = useState(true);

  const handleExport = () => {
    const json = exportConfig();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ui-config.json';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Configuration exported successfully!');
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        importConfig(content);
        toast.success('Configuration imported successfully!');
      };
      reader.readAsText(file);
    }
  };

  const handleReset = () => {
    resetConfig();
    toast.success('Configuration reset to defaults!');
  };

  return (
    <div className="bg-card border-r border-border h-screen overflow-y-auto w-80 flex flex-col">
      <div className="p-4 border-b border-border sticky top-0 bg-card z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            <h2 className="font-semibold text-lg">UI Editor</h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </Button>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleExport} className="flex-1">
            <Download className="h-3 w-3" />
            Export
          </Button>
          <Button variant="outline" size="sm" className="flex-1" onClick={() => document.getElementById('import-file')?.click()}>
            <Upload className="h-3 w-3" />
            Import
          </Button>
          <input
            id="import-file"
            type="file"
            accept=".json"
            className="hidden"
            onChange={handleImport}
          />
          <Button variant="outline" size="sm" onClick={handleReset}>
            <RotateCcw className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {isOpen && (
        <div className="p-4 space-y-6 flex-1">
          {/* Layout Type Switcher */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Layout Type</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={config.layoutType === 'desktop' ? 'default' : 'outline'}
                size="sm"
                onClick={() => updateConfig({ layoutType: 'desktop' })}
                className="w-full"
              >
                <Monitor className="h-4 w-4" />
                Desktop
              </Button>
              <Button
                variant={config.layoutType === 'mobile' ? 'default' : 'outline'}
                size="sm"
                onClick={() => updateConfig({ layoutType: 'mobile' })}
                className="w-full"
              >
                <Smartphone className="h-4 w-4" />
                Mobile
              </Button>
            </div>
          </div>

          <Tabs defaultValue="typography" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="typography" className="text-xs">Type</TabsTrigger>
              <TabsTrigger value="button" className="text-xs">Button</TabsTrigger>
              <TabsTrigger value="layout" className="text-xs">Layout</TabsTrigger>
            </TabsList>

            {/* Typography Tab */}
            <TabsContent value="typography" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="font-family">Font Family</Label>
                <Select
                  value={config.typography.fontFamily}
                  onValueChange={(value) => updateConfig({ typography: { ...config.typography, fontFamily: value } })}
                >
                  <SelectTrigger id="font-family">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {fontFamilies.map((font) => (
                      <SelectItem key={font} value={font}>
                        {font}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="font-weight">Font Weight</Label>
                <Select
                  value={config.typography.fontWeight.toString()}
                  onValueChange={(value) => updateConfig({ typography: { ...config.typography, fontWeight: parseInt(value) } })}
                >
                  <SelectTrigger id="font-weight">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {fontWeights.map((weight) => (
                      <SelectItem key={weight} value={weight.toString()}>
                        {weight}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="font-size">Font Size</Label>
                  <span className="text-xs text-muted-foreground">{config.typography.fontSize}px</span>
                </div>
                <Slider
                  id="font-size"
                  min={10}
                  max={60}
                  step={1}
                  value={[config.typography.fontSize]}
                  onValueChange={([value]) => updateConfig({ typography: { ...config.typography, fontSize: value } })}
                />
              </div>
            </TabsContent>

            {/* Button Tab */}
            <TabsContent value="button" className="space-y-4 mt-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="border-radius">Border Radius</Label>
                  <span className="text-xs text-muted-foreground">{config.button.borderRadius}px</span>
                </div>
                <Slider
                  id="border-radius"
                  min={0}
                  max={32}
                  step={1}
                  value={[config.button.borderRadius]}
                  onValueChange={([value]) => updateConfig({ button: { ...config.button, borderRadius: value } })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="shadow">Shadow</Label>
                <Select
                  value={config.button.shadow}
                  onValueChange={(value: any) => updateConfig({ button: { ...config.button, shadow: value } })}
                >
                  <SelectTrigger id="shadow">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {shadowOptions.map((shadow) => (
                      <SelectItem key={shadow} value={shadow}>
                        {shadow}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="alignment">Alignment</Label>
                <Select
                  value={config.button.alignment}
                  onValueChange={(value: any) => updateConfig({ button: { ...config.button, alignment: value } })}
                >
                  <SelectTrigger id="alignment">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {alignmentOptions.map((align) => (
                      <SelectItem key={align} value={align}>
                        {align}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bg-color">Background Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="bg-color"
                    type="color"
                    value={config.button.backgroundColor}
                    onChange={(e) => updateConfig({ button: { ...config.button, backgroundColor: e.target.value } })}
                    className="w-16 h-10 p-1"
                  />
                  <Input
                    type="text"
                    value={config.button.backgroundColor}
                    onChange={(e) => updateConfig({ button: { ...config.button, backgroundColor: e.target.value } })}
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="text-color">Text Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="text-color"
                    type="color"
                    value={config.button.textColor}
                    onChange={(e) => updateConfig({ button: { ...config.button, textColor: e.target.value } })}
                    className="w-16 h-10 p-1"
                  />
                  <Input
                    type="text"
                    value={config.button.textColor}
                    onChange={(e) => updateConfig({ button: { ...config.button, textColor: e.target.value } })}
                    className="flex-1"
                  />
                </div>
              </div>
            </TabsContent>

            {/* Layout Tab */}
            <TabsContent value="layout" className="space-y-4 mt-4">
              <Collapsible defaultOpen>
                <CollapsibleTrigger className="flex items-center justify-between w-full text-sm font-semibold mb-2">
                  General Layout
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="card-radius">Card Corner Radius</Label>
                      <span className="text-xs text-muted-foreground">{config.layout.cardCornerRadius}px</span>
                    </div>
                    <Slider
                      id="card-radius"
                      min={0}
                      max={32}
                      step={1}
                      value={[config.layout.cardCornerRadius]}
                      onValueChange={([value]) => updateConfig({ layout: { ...config.layout, cardCornerRadius: value } })}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="container-padding">Container Padding</Label>
                      <span className="text-xs text-muted-foreground">{config.layout.containerPadding}px</span>
                    </div>
                    <Slider
                      id="container-padding"
                      min={0}
                      max={64}
                      step={4}
                      value={[config.layout.containerPadding]}
                      onValueChange={([value]) => updateConfig({ layout: { ...config.layout, containerPadding: value } })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="section-bg">Section Background</Label>
                    <div className="flex gap-2">
                      <Input
                        id="section-bg"
                        type="color"
                        value={config.layout.sectionBackgroundColor}
                        onChange={(e) => updateConfig({ layout: { ...config.layout, sectionBackgroundColor: e.target.value } })}
                        className="w-16 h-10 p-1"
                      />
                      <Input
                        type="text"
                        value={config.layout.sectionBackgroundColor}
                        onChange={(e) => updateConfig({ layout: { ...config.layout, sectionBackgroundColor: e.target.value } })}
                        className="flex-1"
                      />
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              <Collapsible defaultOpen>
                <CollapsibleTrigger className="flex items-center justify-between w-full text-sm font-semibold mb-2">
                  Gallery/Images
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="gallery-align">Gallery Alignment</Label>
                    <Select
                      value={config.gallery.alignment}
                      onValueChange={(value: any) => updateConfig({ gallery: { ...config.gallery, alignment: value } })}
                    >
                      <SelectTrigger id="gallery-align">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {galleryAlignmentOptions.map((align) => (
                          <SelectItem key={align} value={align}>
                            {align}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="image-spacing">Image Spacing</Label>
                      <span className="text-xs text-muted-foreground">{config.gallery.spacing}px</span>
                    </div>
                    <Slider
                      id="image-spacing"
                      min={0}
                      max={32}
                      step={4}
                      value={[config.gallery.spacing]}
                      onValueChange={([value]) => updateConfig({ gallery: { ...config.gallery, spacing: value } })}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="image-radius">Image Border Radius</Label>
                      <span className="text-xs text-muted-foreground">{config.gallery.imageBorderRadius}px</span>
                    </div>
                    <Slider
                      id="image-radius"
                      min={0}
                      max={32}
                      step={1}
                      value={[config.gallery.imageBorderRadius]}
                      onValueChange={([value]) => updateConfig({ gallery: { ...config.gallery, imageBorderRadius: value } })}
                    />
                  </div>
                </CollapsibleContent>
              </Collapsible>

              <Collapsible defaultOpen>
                <CollapsibleTrigger className="flex items-center justify-between w-full text-sm font-semibold mb-2">
                  Stroke/Border
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="stroke-color">Stroke Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="stroke-color"
                        type="color"
                        value={config.stroke.strokeColor}
                        onChange={(e) => updateConfig({ stroke: { ...config.stroke, strokeColor: e.target.value } })}
                        className="w-16 h-10 p-1"
                      />
                      <Input
                        type="text"
                        value={config.stroke.strokeColor}
                        onChange={(e) => updateConfig({ stroke: { ...config.stroke, strokeColor: e.target.value } })}
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="stroke-weight">Stroke Weight</Label>
                      <span className="text-xs text-muted-foreground">{config.stroke.strokeWeight}px</span>
                    </div>
                    <Slider
                      id="stroke-weight"
                      min={0}
                      max={8}
                      step={1}
                      value={[config.stroke.strokeWeight]}
                      onValueChange={([value]) => updateConfig({ stroke: { ...config.stroke, strokeWeight: value } })}
                    />
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default UIEditor;
