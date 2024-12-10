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
    <div>
      <button
        onClick={onCancel}
        className="bg-primary text-white px-4 py-2 rounded"
      >
        Cancel
      </button>
      <button
        onClick={onSave}
        className="bg-primary text-white px-4 py-2 rounded"
      >
        Save
      </button>
    </div>
  );
}
