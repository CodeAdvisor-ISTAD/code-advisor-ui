import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import ReactDOM from "react-dom";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  platform: string;
  contentId: string;
}

const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  platform,
  contentId,
}) => {
  const [linkCopied, setLinkCopied] = useState(false);

  // Generate the shareable link
  const shareableLink = typeof window !== "undefined"
  ? `${window.location.origin}/content/${contentId}`
  : "";

  // Copy link to clipboard
  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareableLink).then(() => {
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000); // Reset after 2 seconds
    });
  };

  // Redirect to the platform's sharing page
  const redirectToPlatform = () => {
    let url = "";
    switch (platform) {
      case "X":
        url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          shareableLink
        )}`;
        break;
      case "Facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          shareableLink
        )}`;
        break;
      case "LinkedIn":
        url = `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(
          shareableLink
        )}`;
        break;
      default:
        console.error("Unsupported platform");
        return;
    }
    window.open(url, "_blank");
  };

  if (!isOpen) return null;

  // Render the modal using a portal
  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      style={{ minHeight: "100vh" }} // Ensure full viewport height
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[400px] mx-auto"
        style={{
          maxWidth: window.innerWidth >= 640 ? "50%" : "90%", // Adjust width based on screen size
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <img
              src={`/logos/${platform.toLowerCase()}.png`} // Assuming logos are stored in /public/logos/
              alt={`${platform} Logo`}
              className="w-8 h-8 mr-2"
            />
            <h3 className="text-lg font-semibold">
              ចែករំលែកទៅកាន់​​ {platform}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            &times;
          </button>
        </div>

        {/* Shareable Link */}
        <p className="mb-4">ចែករំលែកលីងនៅទីនេះ​ :</p>
        <div className="flex items-center mb-4">
          <input
            type="text"
            value={shareableLink}
            readOnly
            className="flex-grow p-2 border rounded-l-md"
          />
          <button
            onClick={handleCopyLink}
            className="p-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
          >
            {linkCopied ? "Copied!" : "Copy Link"}
          </button>
        </div>

        {/* Redirect Button */}
        <Button
          onClick={redirectToPlatform}
          type="submit"
          className="w-full text-white"
        >
          ចូលទៅកាន់ {platform}
        </Button>
      </div>
    </div>,
    document.body // Render the modal inside the <body> tag
  );
};

export default ShareModal;
