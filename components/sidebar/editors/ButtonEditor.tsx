import { Alignment, Component } from '@/types/components';
import { FormField, INPUT_CLASS } from '@/components/sidebar/editors/inputs/FormField';
import { AlignmentSelect } from '@/components/sidebar/editors/inputs/AlignmentSelect';
import { ColorPickerInput } from '@/components/sidebar/editors/inputs/ColorPickerInput';

interface ButtonEditorProps {
  component: Component;
  onUpdate: (component: Component) => void;
}

export const ButtonEditor = ({ component, onUpdate }: ButtonEditorProps) => {
  if (component.type !== 'button') return null;

  const handleLabelChange = (value: string) => {
    onUpdate({ ...component, props: { ...component.props, text: value } });
  };

  const handleAlignmentChange = (alignment: Alignment) => {
    onUpdate({ ...component, container: { ...component.container, alignment } });
  };

  const handleBackgroundColorChange = (value: string) => {
    onUpdate({
      ...component,
      props: {
        ...component.props,
        styling: { ...component.props.styling, backgroundColor: value || undefined },
      },
    });
  };

  return (
    <div className="space-y-4">
      <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
        <FormField label="Button label">
          <input
            type="text"
            className={INPUT_CLASS}
            value={component.props.text}
            onChange={(e) => handleLabelChange(e.target.value)}
          />
        </FormField>

        <FormField label="Alignment">
          <AlignmentSelect
            value={component.container.alignment}
            onChange={handleAlignmentChange}
          />
        </FormField>

        <FormField label="Background color">
          <ColorPickerInput
            value={component.props.styling?.backgroundColor || ''}
            onChange={handleBackgroundColorChange}
          />
        </FormField>
      </div>
    </div>
  );
};
