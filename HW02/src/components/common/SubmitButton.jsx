import React from "react";
import "../../stylesheets/components/common/SubmitButton.css";

export default function SubmitButton({
  text,
  onClick,
  className,
  disabled = false,
  style,
}) {
  return (
    <button
      className={"buttons submit " + className}
      onClick={onClick}
      style={style}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
