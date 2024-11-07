import React from "react";
import { InputType } from "../../modules/types";
import "../../stylesheets/components/common/Input.css";

export default function Input({
  type,
  placeholder,
  onChange,
  onKeyDown,
  value,
  name,
  style,
  className = "",
  maxLength,
  required = false,
  requiredContent,
}) {
  const requiredStyle = {
    ...style,
    border: "1px solid #b10707",
  };

  switch (type) {
    case InputType.TEXTAREA:
      return (
        <>
          <textarea
            className={"form input " + className}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            name={name}
            style={required && value === "" ? requiredStyle : style}
            onKeyDown={onKeyDown}
            maxLength={maxLength}
          />
          {required && value === "" && (
            <span id="required" style={{ color: "#b10707" }}>
              {requiredContent}
            </span>
          )}
        </>
      );
    case InputType.INPUT:
      return (
        <>
          <input
            className={"form input " + className}
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            name={name}
            style={required && value === "" ? requiredStyle : style}
            maxLength={maxLength}
          />
          {required && value === "" && (
            <span id="required" style={{ color: "#b10707" }}>
              {requiredContent}
            </span>
          )}
        </>
      );
    default:
      return <></>;
  }
}
