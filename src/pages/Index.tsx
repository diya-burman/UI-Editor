import { UIConfigProvider } from "@/contexts/UIConfigContext";
import UIEditor from "@/components/UIEditor";
import FurnitureCustomizer from "@/components/FurnitureCustomizer";

const Index = () => {
  return (
    <UIConfigProvider>
      <div className="flex flex-col md:flex-row h-screen overflow-hidden">
        {/* Mobile: Editor as overlay, Desktop: Fixed sidebar */}
        <div className="md:block hidden">
          <UIEditor />
        </div>

        <div className="flex-1 overflow-y-auto">
          <FurnitureCustomizer />
        </div>

        {/* Mobile floating editor button */}
        <MobileEditorButton />
      </div>
    </UIConfigProvider>
  );
};
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const MobileEditorButton = () => {
  return (
    <div className="md:hidden fixed bottom-4 right-4 z-50">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" className="h-14 w-14 rounded-full shadow-lg">
            <Settings className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[80vh]">
          <div className="overflow-y-auto h-full">
            <UIEditor />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Index;
