import { Alignment } from '@/types/components';
import { INPUT_CLASS } from '@/components/sidebar/editors/inputs/FormField';

interface AlignmentSelectProps {
  value: Alignment;
  onChange: (value: Alignment) => void;
}

export const AlignmentSelect = ({ value, onChange }: AlignmentSelectProps) => (
  <select
    className={INPUT_CLASS}
    value={value}
    onChange={(e) => onChange(e.target.value as Alignment)}
  >
    <option value="left">Left</option>
    <option value="center">Center</option>
    <option value="right">Right</option>
  </select>
);
