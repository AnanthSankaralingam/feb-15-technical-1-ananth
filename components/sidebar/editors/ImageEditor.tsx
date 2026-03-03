import { Alignment, Component } from '@/types/components';
import { FormField, INPUT_CLASS } from '@/components/sidebar/editors/inputs/FormField';
import { AlignmentSelect } from '@/components/sidebar/editors/inputs/AlignmentSelect';
import { PixelInput } from '@/components/sidebar/editors/inputs/PixelInput';

interface ImageEditorProps {
  component: Component;
  onUpdate: (component: Component) => void;
}

export const ImageEditor = ({ component, onUpdate }: ImageEditorProps) => {
  if (component.type !== 'image') return null;

  const handleSrcChange = (value: string) => {
    onUpdate({ ...component, props: { ...component.props, src: value } });
  };

  const handleAltChange = (value: string) => {
    onUpdate({ ...component, props: { ...component.props, alt: value } });
  };

  const handleAlignmentChange = (alignment: Alignment) => {
    onUpdate({ ...component, container: { ...component.container, alignment } });
  };

  const handleWidthChange = (value: number | '') => {
    const formatted = value === '' ? undefined : `${value}px`;
    onUpdate({
      ...component,
      props: { ...component.props, styling: { ...component.props.styling, width: formatted } },
    });
  };

  const currentWidth =
    typeof component.props.styling?.width === 'string'
      ? parseInt(component.props.styling.width, 10) || ''
      : '';

  return (
    <div className="space-y-4">
      <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
        <FormField label="Image URL">
          <input
            type="text"
            className={INPUT_CLASS}
            value={component.props.src}
            onChange={(e) => handleSrcChange(e.target.value)}
          />
        </FormField>

        <FormField label="Alt text">
          <input
            type="text"
            className={INPUT_CLASS}
            value={component.props.alt}
            onChange={(e) => handleAltChange(e.target.value)}
          />
        </FormField>

        <FormField label="Alignment">
          <AlignmentSelect
            value={component.container.alignment}
            onChange={handleAlignmentChange}
          />
        </FormField>

        <FormField label="Width">
          <PixelInput
            value={currentWidth}
            onChange={handleWidthChange}
            min={50}
            max={1200}
          />
        </FormField>
      </div>
    </div>
  );
};
