import { useState } from "react";

export default function useDropdown(initialValue) {
  const [value, setValue] = useState(initialValue);

  const handleSelect = (value) => {
    setValue(value);
  };

  return [value, handleSelect];
}
