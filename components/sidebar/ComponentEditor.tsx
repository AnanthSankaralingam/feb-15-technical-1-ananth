import { useSiteBuilder } from '@/contexts/SiteBuilderContext';
import { TextEditor } from '@/components/sidebar/editors/TextEditor';
import { ButtonEditor } from '@/components/sidebar/editors/ButtonEditor';
import { ImageEditor } from '@/components/sidebar/editors/ImageEditor';

const TYPE_NAMES: Record<string, string> = {
  text: 'Text',
  button: 'Button',
  image: 'Image',
};

export const ComponentEditor = () => {
  const { components, selectedComponentId, updateComponent, deselectComponent } = useSiteBuilder();
  const component = components.find((c) => c.id === selectedComponentId);

  if (!component) return null;

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <button
          onClick={deselectComponent}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-3"
        >
          <span>←</span>
          <span>Back to List</span>
        </button>
        <h2 className="text-xl font-bold text-gray-800">
          Edit {TYPE_NAMES[component.type] ?? component.type} Component
        </h2>
      </div>

      <div className="flex-1 overflow-auto p-4">
        {component.type === 'text' && (
          <TextEditor component={component} onUpdate={updateComponent} />
        )}
        {component.type === 'button' && (
          <ButtonEditor component={component} onUpdate={updateComponent} />
        )}
        {component.type === 'image' && (
          <ImageEditor component={component} onUpdate={updateComponent} />
        )}
      </div>
    </div>
  );
};
