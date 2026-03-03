interface PixelInputProps {
  value: number | '';
  onChange: (value: number | '') => void;
  min?: number;
  max?: number;
  step?: number;
}

export const PixelInput = ({ value, onChange, min = 0, max = 9999, step = 1 }: PixelInputProps) => {
  const numeric = value === '' ? min : (value as number);

  const decrement = () => onChange(Math.max(min, numeric - step));
  const increment = () => onChange(Math.min(max, numeric + step));

  return (
    <div className="flex items-center border border-gray-300 rounded overflow-hidden text-sm">
      <button
        type="button"
        onClick={decrement}
        className="px-3 py-2 bg-gray-50 hover:bg-gray-100 text-gray-600 font-medium border-r border-gray-300 select-none"
      >
        −
      </button>
      <input
        type="number"
        min={min}
        max={max}
        className="w-full text-center py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        value={value}
        onChange={(e) => {
          const v = e.target.value.trim();
          onChange(v === '' ? '' : Number(v));
        }}
      />
      <span className="px-1 text-gray-400 text-xs select-none">px</span>
      <button
        type="button"
        onClick={increment}
        className="px-3 py-2 bg-gray-50 hover:bg-gray-100 text-gray-600 font-medium border-l border-gray-300 select-none"
      >
        +
      </button>
    </div>
  );
};
