"use client";

interface SaveUserUpdateButtonProps {
  onSave: () => void;
  onCancel: () => void;
}

export default function SaveUserUpdateButton({
  onSave,
  onCancel,
}: SaveUserUpdateButtonProps) {
  return (
    <div className="flex gap-2 justify-end">
      <button
        onClick={onCancel}
        className="bg-primary text-white px-4 py-2 rounded-sm"
      >
        ចាកចេញ
      </button>
      <button
        onClick={onSave}
        className="bg-primary text-white px-4 py-2  rounded-sm"
      >
        រក្សាទុក
      </button>
    </div>
  );
}
