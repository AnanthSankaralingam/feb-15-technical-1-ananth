import { useSiteBuilder } from '@/contexts/SiteBuilderContext';
import { Toast, useToast } from '@/components/Toast';

const ADD_BUTTONS = [
  { type: 'text', icon: '📝', label: 'Text' },
  { type: 'button', icon: '🔘', label: 'Button' },
  { type: 'image', icon: '🖼️', label: 'Image' },
] as const;

const getComponentLabel = (type: string, props: any): string => {
  switch (type) {
    case 'text':
      return `Text: ${props.text.substring(0, 30)}${props.text.length > 30 ? '...' : ''}`;
    case 'button':
      return `Button: ${props.text}`;
    case 'image':
      return `Image: ${props.alt || 'No alt text'}`;
    default:
      return type;
  }
};

const getComponentIcon = (type: string): string => {
  switch (type) {
    case 'text': return '📝';
    case 'button': return '🔘';
    case 'image': return '🖼️';
    default: return '📦';
  }
};

export const ComponentList = () => {
  const { components, addComponent, selectComponent, deleteComponent } = useSiteBuilder();
  const { message, showToast } = useToast();

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Components</h2>
        <div className="grid grid-cols-3 gap-2">
          {ADD_BUTTONS.map(({ type, icon, label }) => (
            <button
              key={type}
              onClick={() => {
                addComponent(type);
                showToast(`Added ${label.toLowerCase()} component`);
              }}
              className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
            >
              {icon} {label}
            </button>
          ))}
        </div>
        <Toast message={message} />
      </div>

      <div className="flex-1 overflow-auto p-4">
        <div className="space-y-2">
          {components.map((component) => (
            <div
              key={component.id}
              className="border border-gray-200 rounded-lg p-3 hover:border-blue-500 hover:bg-blue-50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <button
                  onClick={() => selectComponent(component.id)}
                  className="flex-1 text-left"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getComponentIcon(component.type)}</span>
                    <span className="text-sm font-medium text-gray-700">
                      {getComponentLabel(component.type, component.props)}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1 ml-7">
                    Alignment: {component.container.alignment}
                  </div>
                </button>
                <button
                  onClick={() => deleteComponent(component.id)}
                  className="ml-2 px-2 py-1 text-red-600 hover:bg-red-50 rounded text-sm"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
