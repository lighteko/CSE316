// import React, { useState } from "react";
import "../../stylesheets/components/common/RectButton.css";

export default function RectButton({
  text,
  onClick,
  className,
  style,
  size = null,
}) {
  const custom =
    size !== null
      ? {
          width: size + "em",
          height: size / 4 + "em",
          borderRadius: size / 16 + "em",
        }
      : {
          width: "80%",
          height: "40px",
          borderRadius: "10px",
        };
  return (
    <button
      className={"buttons rect " + className}
      onClick={onClick}
      style={{
        ...style,
        ...custom,
      }}
    >
      {text}
    </button>
  );
}
