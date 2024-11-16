// components/Button.js
function Button({ onClick, icon, text, colorClass }) {
  return (
    <button
      onClick={onClick}
      className={`btn ${colorClass} flex items-center gap-2`}
    >
      <span className={`material-symbols-outlined ${colorClass ? "" : "gray"}`}>
        {icon}
      </span>
      {text && (
        <div
          className={`text-icon-white text-sm ${
            colorClass ? "" : "text-subheader font-semibold"
          }`}
        >
          {text}
        </div>
      )}
    </button>
  );
}

export default Button;
