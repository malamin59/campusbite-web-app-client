// Button.jsx
const Button = ({ type = "button", onClick, children, className = "" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn btn-info w-full ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
