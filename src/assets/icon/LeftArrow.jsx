import { useNavigate } from "react-router-dom";

export default function LeftArrow() {
  const navigate = useNavigate();
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={() => navigate("/")}
      style={{ cursor: "pointer", width: "100%", height: "100%" }}
    >
      <path
        d="M6.66675 16L14.6667 24"
        stroke="#111111"
        strokeWidth="5"
        strokeLinecap="square"
      />
      <path
        d="M6.66675 16L14.6667 8"
        stroke="#111111"
        strokeWidth="5"
        strokeLinecap="square"
      />
    </svg>
  );
}
