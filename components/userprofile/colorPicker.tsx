"use client"
import { useState } from "react";

interface ColorPickerProps {
  initialColor: string;
  onColorChange: (color: string) => void;
}

export function ColorPicker({ initialColor, onColorChange }: ColorPickerProps) {
  const [color, setColor] = useState(initialColor);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };

  const handleSave = () => {
    onColorChange(color);
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        type="color"
        value={color}
        onChange={handleColorChange}
        className="w-10 h-10 rounded-md border border-gray-300"
      />
      <input
        type="text"
        value={color}
        onChange={handleColorChange}
        className="border p-2 rounded"
        placeholder="#64748b"
      />
      <button
        onClick={handleSave}
        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition-colors"
      >
        Save
      </button>
    </div>
  );
}

