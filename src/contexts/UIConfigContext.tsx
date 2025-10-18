import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UIConfig, defaultUIConfig } from '@/types/uiConfig';

interface UIConfigContextType {
  config: UIConfig;
  updateConfig: (updates: Partial<UIConfig>) => void;
  resetConfig: () => void;
  exportConfig: () => string;
  importConfig: (jsonString: string) => void;
}

const UIConfigContext = createContext<UIConfigContextType | undefined>(undefined);

export const UIConfigProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<UIConfig>(defaultUIConfig);

  const updateConfig = (updates: Partial<UIConfig>) => {
    setConfig((prev) => ({
      ...prev,
      ...updates,
      typography: { ...prev.typography, ...(updates.typography || {}) },
      button: { ...prev.button, ...(updates.button || {}) },
      gallery: { ...prev.gallery, ...(updates.gallery || {}) },
      layout: { ...prev.layout, ...(updates.layout || {}) },
      stroke: { ...prev.stroke, ...(updates.stroke || {}) },
    }));
  };

  const resetConfig = () => {
    setConfig(defaultUIConfig);
  };

  const exportConfig = () => {
    return JSON.stringify(config, null, 2);
  };

  const importConfig = (jsonString: string) => {
    try {
      const importedConfig = JSON.parse(jsonString);
      setConfig(importedConfig);
    } catch (error) {
      console.error('Failed to import config:', error);
    }
  };

  return (
    <UIConfigContext.Provider value={{ config, updateConfig, resetConfig, exportConfig, importConfig }}>
      {children}
    </UIConfigContext.Provider>
  );
};

export const useUIConfig = () => {
  const context = useContext(UIConfigContext);
  if (context === undefined) {
    throw new Error('useUIConfig must be used within a UIConfigProvider');
  }
  return context;
};
