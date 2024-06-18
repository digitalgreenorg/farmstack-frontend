import React, { useState } from "react";
import { FaCopy, FaCheck } from "react-icons/fa";
import { CSSTransition } from "react-transition-group";
import "./CopyButton.css"; // Make sure to create this CSS file

const CopyButton = ({ textToCopy }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset icon after 2 seconds
    });
  };

  return (
    <button onClick={handleCopy} className="copy-button">
      <CSSTransition in={copied} timeout={300} classNames="icon" unmountOnExit>
        <>
          {copied && (
            <FaCheck size={"12px"} color="#00a94f" className="icon-common" />
          )}
        </>
      </CSSTransition>
      {!copied && (
        <FaCopy size={"12px"} color="#00a94f" className="icon-common" />
      )}
    </button>
  );
};

export default CopyButton;
