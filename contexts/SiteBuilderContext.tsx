'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Component } from '@/types/components';

const createDefaultComponent = (type: string, id: string): Component => {
  const baseContainer = { alignment: 'center' as const };
  switch (type) {
    case 'text':
      return { id, type: 'text', container: baseContainer, props: { text: 'New text component', styling: {} } };
    case 'button':
      return { id, type: 'button', container: baseContainer, props: { text: 'Click me', styling: {} } };
    case 'image':
      return { id, type: 'image', container: baseContainer, props: { src: 'https://placehold.co/400x300', alt: 'Placeholder image', styling: { width: '400px' } } };
    default:
      throw new Error(`Unknown component type: ${type}`);
  }
};

const DEFAULT_COMPONENTS: Component[] = [
  createDefaultComponent('text', 'text-1'),
  createDefaultComponent('button', 'button-1'),
  createDefaultComponent('image', 'image-1'),
];

interface SiteBuilderContextValue {
  components: Component[];
  selectedComponentId: string | null;
  previewId: string | null;
  addComponent: (type: 'text' | 'button' | 'image') => void;
  updateComponent: (component: Component) => void;
  deleteComponent: (id: string) => void;
  selectComponent: (id: string) => void;
  deselectComponent: () => void;
}

const SiteBuilderContext = createContext<SiteBuilderContextValue | null>(null);

export const useSiteBuilder = () => {
  const ctx = useContext(SiteBuilderContext);
  if (!ctx) throw new Error('useSiteBuilder must be used within SiteBuilderProvider');
  return ctx;
};

interface SiteBuilderProviderProps {
  children: ReactNode;
  initialComponents?: Component[];
  previewId?: string;
}

export const SiteBuilderProvider = ({
  children,
  initialComponents,
  previewId = null,
}: SiteBuilderProviderProps) => {
  const [components, setComponents] = useState<Component[]>(initialComponents ?? DEFAULT_COMPONENTS);
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);

  const addComponent = (type: 'text' | 'button' | 'image') => {
    setComponents((prev) => [...prev, createDefaultComponent(type, `${type}-${Date.now()}`)]);
  };

  const updateComponent = (updated: Component) => {
    setComponents((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
  };

  const deleteComponent = (id: string) => {
    setComponents((prev) => prev.filter((c) => c.id !== id));
    setSelectedComponentId((prev) => (prev === id ? null : prev));
  };

  const selectComponent = (id: string) => setSelectedComponentId(id);
  const deselectComponent = () => setSelectedComponentId(null);

  return (
    <SiteBuilderContext.Provider
      value={{ components, selectedComponentId, previewId, addComponent, updateComponent, deleteComponent, selectComponent, deselectComponent }}
    >
      {children}
    </SiteBuilderContext.Provider>
  );
};
