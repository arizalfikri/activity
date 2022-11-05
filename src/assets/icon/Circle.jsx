export default function Circle({ priority }) {
  return (
    <svg
      width="9"
      height="9"
      viewBox="0 0 9 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="4.5"
        cy="4.5"
        r="4.5"
        fill={
          priority === "very-high"
            ? "#ED4C5C"
            : priority === "high"
            ? "#F8A541"
            : priority === "normal"
            ? "#00A790"
            : priority === "low"
            ? "#428BC1"
            : "#8942C1"
        }
      />
    </svg>
  );
}
