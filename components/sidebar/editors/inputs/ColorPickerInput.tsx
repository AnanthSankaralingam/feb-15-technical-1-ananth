import { useRef } from 'react';

interface ColorPickerInputProps {
  value: string;
  onChange: (value: string) => void;
}

const isValidHex = (v: string) => /^#[0-9a-fA-F]{6}$/.test(v);

export const ColorPickerInput = ({ value, onChange }: ColorPickerInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const displayValue = value || '#000000';

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        className="w-8 h-8 rounded border border-gray-300 flex-shrink-0 cursor-pointer"
        style={{ backgroundColor: isValidHex(displayValue) ? displayValue : '#000000' }}
        onClick={() => inputRef.current?.click()}
        title="Pick color"
      />
      <input
        ref={inputRef}
        type="color"
        className="sr-only"
        value={isValidHex(displayValue) ? displayValue : '#000000'}
        onChange={(e) => onChange(e.target.value)}
      />
      <input
        type="text"
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={value}
        placeholder="#ff0000"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
