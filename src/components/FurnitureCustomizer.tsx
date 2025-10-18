import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Maximize2,
  ZoomIn,
  ZoomOut,
  Copy,
} from "lucide-react";
import { useUIConfig } from "@/contexts/UIConfigContext";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import furnitureMain from "@/assets/furniture-main.png";
import furnitureThumb1 from "@/assets/furniture-thumb-1.png";
import furnitureThumb2 from "@/assets/furniture-thumb-2.png";

interface CustomizationOption {
  id: string;
  name: string;
  value: string;
  colors?: { name: string; value: string; category: string }[];
}

const colorSwatches = [
  { name: "Leather Brown", value: "#6B5744", category: "LEATHER" },
  { name: "Leather Olive", value: "#5A6B5A", category: "LEATHER" },
  { name: "Leather Teal", value: "#4A7C7C", category: "LEATHER" },
  { name: "Leather Forest", value: "#4A5E4A", category: "LEATHER" },
  { name: "Leather Emerald", value: "#2D7D6D", category: "LEATHER" },
  { name: "Leather Burgundy", value: "#6B3A3A", category: "LEATHER" },
  { name: "Leather Purple", value: "#6B4A6B", category: "LEATHER" },
  { name: "Leather Navy", value: "#3A5A7C", category: "LEATHER" },
  { name: "Leather Rust", value: "#8B4A4A", category: "LEATHER" },
  { name: "Silicon Gray", value: "#5A5A5A", category: "SILICON" },
  { name: "Silicon Olive", value: "#6B7A5A", category: "SILICON" },
  { name: "Silicon Teal", value: "#4A7A7A", category: "SILICON" },
  { name: "Silicon Forest", value: "#4A6B4A", category: "SILICON" },
  { name: "Silicon Slate", value: "#5A5A6B", category: "SILICON" },
  { name: "Aluminium Steel", value: "#A8A8A8", category: "ALUMINIUM" },
  { name: "Aluminium Bronze", value: "#8B7355", category: "ALUMINIUM" },
  { name: "Aluminium Slate", value: "#6B7A8B", category: "ALUMINIUM" },
  { name: "Aluminium Gunmetal", value: "#4A4A5A", category: "ALUMINIUM" },
  { name: "Aluminium Pewter", value: "#7A7A8B", category: "ALUMINIUM" },
];

const FurnitureCustomizer = () => {
  const { config } = useUIConfig();
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState(0);
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    arms: false,
    armsFinish: true,
    legsFinish: false,
  });
  // Product data for each image
  const productData = [
    {
      name: "Buffet",
      price: 15000,
      oldPrice: 25000,
      description: "Premium wooden buffet with storage",
    },
    {
      name: "Storage Cabinet",
      price: 18000,
      oldPrice: 28000,
      description: "Modern storage cabinet with drawers",
    },
    {
      name: "Sideboard",
      price: 20000,
      oldPrice: 30000,
      description: "Classic sideboard with compartments",
    },
  ];

  const currentProduct = productData[selectedImage] || productData[0];
  const [selectedOptions, setSelectedOptions] = useState({
    arms: "Fixed Arms",
    armsFinish: "Leather Brown",
    legsFinish: "Steel",
  });
  const [selectedColor, setSelectedColor] = useState("#6B5744");
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [rotation, setRotation] = useState(0);

  const images = [furnitureMain, furnitureThumb1, furnitureThumb2];

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.25, 0.5));
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleResetView = () => {
    setZoomLevel(1);
    setRotation(0);
  };

  const handleAddToCart = () => {
  const product = productData[selectedImage]; // get the currently clicked product

  toast({
    title: "Added to cart! 🛒",
    description: (
      <div className="mt-2 space-y-1">
        <p className="font-semibold">
          {product.name} - ₹{product.price.toLocaleString("en-IN")}
        </p>
        <p className="text-sm">Arms: {selectedOptions.arms}</p>
        <p className="text-sm">Arms Finish: {selectedOptions.armsFinish}</p>
        <p className="text-sm">Legs Finish: {selectedOptions.legsFinish}</p>
      </div>
    ),
  });
};

  const customizationSections: CustomizationOption[] = [
    {
      id: "arms",
      name: "Arms",
      value: selectedOptions.arms,
      colors: colorSwatches,
    },
    {
      id: "armsFinish",
      name: "Arms Finish",
      value: selectedOptions.armsFinish,
      colors: colorSwatches,
    },
    {
      id: "legsFinish",
      name: "Legs Finish",
      value: selectedOptions.legsFinish,
      colors: colorSwatches,
    },
  ];

  const toggleSection = (id: string) => {
    setExpandedSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const shadowClasses = {
    none: "shadow-none",
    small: "shadow-sm",
    medium: "shadow-md",
    large: "shadow-lg",
  };

  const alignmentClasses = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  };

  const galleryAlignmentClasses = {
    "grid-left": "justify-start",
    "grid-center": "justify-center",
    "grid-right": "justify-end",
  };

  const layoutClass =
    config.layoutType === "desktop"
      ? "lg:grid-cols-[1fr_400px]"
      : "grid-cols-1";

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{
        backgroundColor: config.layout.sectionBackgroundColor,
        fontFamily: config.typography.fontFamily,
        fontSize: `${config.typography.fontSize}px`,
        fontWeight: config.typography.fontWeight,
        padding: `${config.layout.containerPadding}px`,
      }}
    >
      <div className={`grid gap-6 mx-auto max-w-7xl ${layoutClass}`}>
        {/* Main Image Section */}
        <div className="flex flex-col gap-4">
          {config.layoutType === "desktop" && (
            <div
              className={`flex gap-${Math.round(config.gallery.spacing / 4)} ${
                galleryAlignmentClasses[config.gallery.alignment]
              }`}
            >
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`transition-all duration-200 ${
                    selectedImage === idx
                      ? "ring-2 ring-primary"
                      : "opacity-60 hover:opacity-100"
                  }`}
                  style={{
                    borderRadius: `${config.gallery.imageBorderRadius}px`,
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={img}
                    alt={`View ${idx + 1}`}
                    className="w-20 h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          <div
            className={`bg-secondary/30 relative group overflow-hidden ${
              isFullscreen ? "fixed inset-0 z-50 rounded-none" : ""
            }`}
            style={{
              borderRadius: isFullscreen
                ? "0"
                : `${config.layout.cardCornerRadius}px`,
              border: `${config.stroke.strokeWeight}px solid ${config.stroke.strokeColor}`,
            }}
          >
            <div
              className="relative overflow-hidden h-full flex items-center justify-center"
              style={{
                padding: isFullscreen ? "2rem" : "0",
                minHeight: isFullscreen ? "100vh" : "auto",
              }}
            >
              <div
                className="transition-transform duration-300 ease-out relative"
                style={{
                  transform: `scale(${zoomLevel}) rotate(${rotation}deg)`,
                }}
              >
                <img
                  src={images[selectedImage]}
                  alt="Buffet"
                  className="w-full h-auto object-contain"
                />
                <div
                  className="absolute inset-0 mix-blend-color opacity-60 pointer-events-none transition-colors duration-500"
                  style={{ backgroundColor: selectedColor }}
                />
              </div>
            </div>
            <div className="absolute top-2 right-2 md:top-4 md:right-4 flex flex-col gap-1 md:gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity z-10">
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full shadow-lg h-8 w-8 md:h-10 md:w-10"
                onClick={handleRotate}
                title="Rotate"
              >
                <RotateCcw className="h-3 w-3 md:h-4 md:w-4" />
              </Button>
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full shadow-lg"
                onClick={handleFullscreen}
                title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              >
                <Maximize2 className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full shadow-lg"
                onClick={handleZoomIn}
                disabled={zoomLevel >= 3}
                title="Zoom In"
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full shadow-lg"
                onClick={handleZoomOut}
                disabled={zoomLevel <= 0.5}
                title="Zoom Out"
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
            </div>
            {(zoomLevel !== 1 || rotation !== 0) && (
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <Button
                  size="sm"
                  variant="secondary"
                  className="shadow-lg"
                  onClick={handleResetView}
                >
                  Reset View
                </Button>
              </div>
            )}
            {isFullscreen && (
              <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <Button
                  size="sm"
                  variant="secondary"
                  className="shadow-lg"
                  onClick={handleFullscreen}
                >
                  Exit Fullscreen
                </Button>
              </div>
            )}
            {zoomLevel !== 1 && (
              <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <div className="bg-secondary/90 backdrop-blur-sm px-3 py-2 rounded-full text-sm font-medium shadow-lg">
                  {Math.round(zoomLevel * 100)}%
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Customization Panel */}
        <div
          className="bg-card overflow-hidden flex flex-col"
          style={{
            borderRadius: `${config.layout.cardCornerRadius}px`,
            border: `${config.stroke.strokeWeight}px solid ${config.stroke.strokeColor}`,
          }}
        >
          <div className="p-6 space-y-4 flex-1">
            <div className="flex items-start justify-between">
              <h1
                className="font-semibold"
                style={{
                  fontSize: `${config.typography.fontSize * 1.5}px`,
                  fontWeight: config.typography.fontWeight + 200,
                }}
              >
                {currentProduct.name}
              </h1>
              <Button size="icon" variant="ghost">
                <Copy className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Customize your Chair
              </span>
              <Button size="icon" variant="ghost">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </Button>
            </div>

            <div className="space-y-2">
              {customizationSections.map((section) => (
                <div
                  key={section.id}
                  className="border rounded-lg overflow-hidden transition-all"
                  style={{
                    borderColor: config.stroke.strokeColor,
                    borderWidth: `${config.stroke.strokeWeight}px`,
                  }}
                >
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full p-4 flex items-center justify-between hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-secondary rounded-md flex items-center justify-center">
                        <span className="text-xs font-medium">
                          {section.id === "arms"
                            ? "1"
                            : section.id === "armsFinish"
                            ? "2"
                            : "3"}
                        </span>
                      </div>
                      <div className="text-left">
                        <div className="font-medium">{section.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {section.value}
                        </div>
                      </div>
                    </div>
                    {expandedSections[section.id] ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>

                  {expandedSections[section.id] && section.colors && (
                    <div className="p-4 pt-0 space-y-4 animate-accordion-down">
                      {["LEATHER", "SILICON", "ALUMINIUM"].map((category) => {
                        const categoryColors = section.colors!.filter(
                          (c) => c.category === category
                        );
                        if (categoryColors.length === 0) return null;

                        return (
                          <div key={category}>
                            <div className="text-xs font-medium text-muted-foreground mb-2">
                              {category}
                            </div>
                            <div className="grid grid-cols-5 gap-2">
                              {categoryColors.map((color) => (
                                <button
                                  key={color.name}
                                  onClick={() => {
                                    setSelectedOptions((prev) => ({
                                      ...prev,
                                      [section.id]: color.name,
                                    }));
                                    setSelectedColor(color.value);
                                  }}
                                  className={`w-10 h-10 rounded-full transition-all ${
                                    selectedOptions[section.id] === color.name
                                      ? "ring-2 ring-primary ring-offset-2"
                                      : "hover:scale-110"
                                  }`}
                                  style={{ backgroundColor: color.value }}
                                  title={color.name}
                                />
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div
            className="p-6 border-t mt-auto"
            style={{
              borderColor: config.stroke.strokeColor,
              borderWidth: `${config.stroke.strokeWeight}px 0 0 0`,
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-sm text-muted-foreground">
                  Product Price
                </div>
                <div className="text-2xl font-bold">
                  ₹{currentProduct.price.toLocaleString("en-IN")}
                  <span className="text-lg text-muted-foreground line-through">
                    ₹{currentProduct.oldPrice.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </div>
            <div
              className={`flex ${alignmentClasses[config.button.alignment]}`}
            >
              <Button
                onClick={handleAddToCart}
                className={`transition-all ${
                  shadowClasses[config.button.shadow]
                }`}
                style={{
                  borderRadius: `${config.button.borderRadius}px`,
                  backgroundColor: config.button.backgroundColor,
                  color: config.button.textColor,
                }}
              >
                Add to cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FurnitureCustomizer;
