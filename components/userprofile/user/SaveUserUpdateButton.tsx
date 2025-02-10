"use client";

import { UserRoundPen } from "lucide-react";

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
          className="bg-primary dark:bg-secondary xs:px-1 xs:py-1 lg:px-4 lg:py-2 rounded-sm"
        >
          <div className="w-full flex items-center text-gray-100 justify-center gap-2">
            <p className="">កែប្រែ</p>
            {/* <FontAwesomeIcon icon={faPenToSquare} /> */}
            <UserRoundPen className="w-5 h-5" />
          </div>
        </button>
      )}
    </div>
  );
}
