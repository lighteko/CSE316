import React, { useState, useEffect, useRef } from "react";
import "../../stylesheets/components/common/Dropdown.css";
import Input from "./Input";
import { InputType } from "../../modules/types";

export default function Dropdown({
  title,
  options,
  value,
  onSelect,
  addNew = false,
  style,
  maxLength,
  required = false,
  requiredContent,
}) {
  const [viewOptions, setViewOptions] = useState("none");
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setViewOptions("none");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  let requiredStyle = {
    ...style,
    border: "1px solid #b10707",
  };

  return (
    <section id="dropdown-component" ref={dropdownRef} style={style}>
      {addNew && viewOptions === "flex" ? (
        <Input
          maxLength={maxLength}
          type={InputType.INPUT}
          placeholder="Add a new one"
          style={{ width: "17em" }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              const value = event.target.value;
              onSelect({ optionContent: value, optionValue: value });
              setViewOptions("none");
            }
          }}
        />
      ) : (
        <>
          <button
            className="dropdown"
            onClick={() => {
              setViewOptions("flex");
            }}
            style={required && value.optionValue === null ? requiredStyle : {}}
          >
            {value.optionContent}
            <svg
              fill="currentColor"
              height="20"
              viewBox="0 0 20 20"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 13.125a.624.624 0 0 1-.442-.183l-5-5 .884-.884L10 11.616l4.558-4.558.884.884-5 5a.624.624 0 0 1-.442.183Z"></path>
            </svg>
          </button>
          {required && value.optionValue === null ? (
            <span id="required" style={{color: "#b10707"}}>{requiredContent}</span>
          ) : null}
        </>
      )}
      <section className="dropdown-options" style={{ display: viewOptions }}>
        <span id="title">{title}</span>
        {options.map((option) => {
          const { optionID, optionValue, optionContent } = option;
          return (
            <button
              key={optionID}
              onClick={() => {
                onSelect(option);
                setViewOptions("none");
              }}
              className="option"
              style={
                value === optionValue ? { backgroundColor: "#d9d9d9" } : {}
              }
            >
              {optionContent}
            </button>
          );
        })}
      </section>
    </section>
  );
}
