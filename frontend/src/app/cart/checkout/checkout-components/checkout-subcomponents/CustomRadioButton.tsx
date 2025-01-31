"use client";

interface CustomRadioButtonProps {
  selected: boolean;
  onChange: () => void;
}

export default function CustomRadioButton({ selected, onChange }: CustomRadioButtonProps) {
  return (
    <div
      onClick={onChange} // Trigger the parent handler on click
      className={`relative w-5 h-5 p-1 mt-[.3rem] rounded-full cursor-pointer border-2 ${
        selected ? "border-orange-orange500" : "border-gray-thin"
      } flex items-center justify-center`}
    >
      {/* Inner Circle */}
      {selected && (
        <div className="w-2 h-2 bg-orange-orange500 rounded-full transition-transform scale-100"></div>
      )}
    </div>
  );
}
