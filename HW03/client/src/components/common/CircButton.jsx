// import React, { useState } from "react";
import "../../stylesheets/components/common/CircButton.css";

export default function CircButton({
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
          height: size / 3 + "em",
          borderRadius: size / 6 + "em",
        }
      : {};
  return (
    <button
      className={"buttons circ " + className}
      onClick={onClick}
      style={{
        marginRight: "0.25em",
        marginLeft: "0.25em",
        ...style,
        ...custom,
      }}
    >
      {text}
    </button>
  );
}
