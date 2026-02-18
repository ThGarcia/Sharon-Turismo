import { useState } from "react";
import "./Input.css";

function Input({
  label,
  value,
  onChange,
  onBlur,
  validator,
  errorMessage = "Valor inválido",
  required = false,
  placeholder = "",
  type = "text",
  transformDisplay,
}) {
  const [touched, setTouched] = useState(false);

  const isEmpty = !value || value.trim() === "";
  const isValid = validator ? validator(value) : true;

  let status = "default";

  if (touched) {
    if (required && isEmpty) status = "invalid";
    else if (!required && isEmpty) status = "warning";
    else if (!isValid) status = "invalid";
    else status = "valid";
  }

    const displayValue = transformDisplay ? transformDisplay(value) : value;

  return (
    <div>
      {label && <label className="form-label">{label}</label>}

      <input
        type={type}
        value={displayValue}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onBlur={(e) => {
          setTouched(true);
          onBlur && onBlur(e);
        }}
        className={`input input-${status}`}
      />

      {touched && status === "invalid" && (
        <p className="input-message message-error">* {errorMessage}</p>
      )}

      {touched && status === "warning" && (
        <p className="input-message message-warning">
          * Campo opcional em branco
        </p>
      )}
    </div>
  );
}

export default Input;
