"use client";
import { useState, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";

interface ColorPickerProps {
  initialColor: string;
  onColorChange: (color: string) => void;
}

export function ColorPicker({ initialColor, onColorChange }: ColorPickerProps) {
  const [color, setColor] = useState(initialColor);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setColor(newColor);
    onColorChange(newColor);
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        type="color"
        value={color}
        onChange={handleColorChange}
        className="w-10 h-10 rounded-md border border-gray-200"
      />
      <Input
        id="colorInput"
        type="text"
        value={color} // Display the color with "#"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const input = e.target.value.replace(/[^0-9A-Fa-f]/g, "").slice(0, 6);
          const newColor = `#${input}`;
          setColor(newColor);
          onColorChange(newColor);
        }}
        className="border w-[400px] rounded"
        maxLength={7} // Adjusted to include "#"
      />
    </div>
  );
}
// this is use to change the color of the cover with save button
// "use client";
// import { useState, ChangeEvent } from "react";
// import { Input } from "@/components/ui/input";

// interface ColorPickerProps {
//   initialColor: string;
//   onColorChange: (color: string) => void;
// }

// export function ColorPicker({ initialColor, onColorChange }: ColorPickerProps) {
//   const [color, setColor] = useState(initialColor);

//   const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setColor(e.target.value);
//   };

//   const handleSave = () => {
//     onColorChange(color);
//   };

//   return (
//     <div className="flex items-center space-x-2">
//       <input
//         type="color"
//         value={color}
//         onChange={handleColorChange}
//         className="w-10 h-10 rounded-md border border-gray-200"
//       />
//       <Input
//         id="colorInput"
//         type="text"
//         value={color} // Display the color with "#"
//         onChange={(e: ChangeEvent<HTMLInputElement>) => {
//           const input = e.target.value.replace(/[^0-9A-Fa-f]/g, "").slice(0, 6);
//           setColor(`#${input}`);
//         }}
//         className="border w-[400px] rounded"
//         maxLength={7} // Adjusted to include "#"
//       />
//       <button
//         onClick={handleSave}
//         className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition-colors"
//       >
//         Save
//       </button>
//     </div>
//   );
// }
