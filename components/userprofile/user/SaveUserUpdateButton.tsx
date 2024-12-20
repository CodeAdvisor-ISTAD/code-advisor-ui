"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

interface SaveUserUpdateButtonProps {
  onSave?: () => void;
  onCancel?: () => void;
  onEdit?: () => void;
  disabled?: boolean;
  disabledEdit?: boolean;
  disabledCancel?: boolean;
  disabledSave?: boolean;
}

export default function SaveUserUpdateButton({
  onSave,
  onCancel,
  onEdit,
  disabledEdit = false,
  disabledCancel = false,
  disabledSave = false,
}: SaveUserUpdateButtonProps) {
  return (
    <div className="flex justify-end">
      {/* Edit */}
      {disabledEdit && ( // Conditionally render the Edit button
        <button
          onClick={onEdit}
          className="bg-primary text-white xs:px-1 xs:py-1 lg:px-4 lg:py-2 rounded-sm"
        >
          <div className="w-full flex items-center justify-center gap-2">
            <p className="">កែប្រែ</p>
            <FontAwesomeIcon icon={faPenToSquare} />
          </div>
        </button>
      )}
    </div>
  );
}
