import { Alignment, Component } from '@/types/components';
import { FormField, INPUT_CLASS } from '@/components/sidebar/editors/inputs/FormField';
import { AlignmentSelect } from '@/components/sidebar/editors/inputs/AlignmentSelect';
import { PixelInput } from '@/components/sidebar/editors/inputs/PixelInput';

interface TextEditorProps {
  component: Component;
  onUpdate: (component: Component) => void;
}

export const TextEditor = ({ component, onUpdate }: TextEditorProps) => {
  if (component.type !== 'text') return null;

  const handleTextChange = (value: string) => {
    onUpdate({ ...component, props: { ...component.props, text: value } });
  };

  const handleAlignmentChange = (alignment: Alignment) => {
    onUpdate({ ...component, container: { ...component.container, alignment } });
  };

  const handleFontSizeChange = (value: number | '') => {
    const formatted = value === '' ? undefined : `${value}px`;
    onUpdate({
      ...component,
      props: { ...component.props, styling: { ...component.props.styling, fontSize: formatted } },
    });
  };

  const currentFontSize =
    typeof component.props.styling?.fontSize === 'string'
      ? parseInt(component.props.styling.fontSize, 10) || ''
      : '';

  return (
    <div className="space-y-4">
      <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
        <FormField label="Text content">
          <textarea
            className={INPUT_CLASS}
            rows={4}
            value={component.props.text}
            onChange={(e) => handleTextChange(e.target.value)}
          />
        </FormField>

        <FormField label="Alignment">
          <AlignmentSelect
            value={component.container.alignment}
            onChange={handleAlignmentChange}
          />
        </FormField>

        <FormField label="Font size">
          <PixelInput
            value={currentFontSize}
            onChange={handleFontSizeChange}
            min={8}
            max={72}
          />
        </FormField>
      </div>
    </div>
  );
};
