import { Component } from '@/types/components';
import { ComponentWrapper } from '@/components/preview/ComponentWrapper';

interface PreviewPanelProps {
  components: Component[];
}

export const PreviewPanel = ({ components }: PreviewPanelProps) => {
  return (
    <div className="flex-1 bg-white p-8 overflow-auto">
      <div className="max-w-full mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Preview</h2>
        <div className="border-2 border-gray-200 rounded-lg p-6 min-h-[600px] bg-gray-50">
          {components.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-400">
              <p>No components yet. Add components from the sidebar to get started.</p>
            </div>
          ) : (
            components.map((component) => (
              <ComponentWrapper key={component.id} component={component} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};
