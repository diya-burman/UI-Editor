import { UIConfigProvider } from '@/contexts/UIConfigContext';
import UIEditor from '@/components/UIEditor';
import FurnitureCustomizer from '@/components/FurnitureCustomizer';

const Index = () => {
  return (
    <UIConfigProvider>
      <div className="flex h-screen overflow-hidden">
        <UIEditor />
        <div className="flex-1 overflow-y-auto">
          <FurnitureCustomizer />
        </div>
      </div>
    </UIConfigProvider>
  );
};

export default Index;
