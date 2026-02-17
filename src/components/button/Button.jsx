import "./Button.css";

function Button({ text, onClick, variant = "primary", type = "button", disabled = false }) {
  const baseClass = "button";

  const variants = {
    primary: "button-primary",
    alert: "button-alert",
  };

  const className = `${baseClass} ${variants[variant] || variants.primary}`;

  return (
    <button className={className} type={type} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
}

export default Button;
