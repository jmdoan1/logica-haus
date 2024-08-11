import "./progress-wheel.css";

export default function ProgressWheel() {
  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 50 50"
      className="circular-progress"
    >
      <circle className="bg"></circle>
      <circle className="fg"></circle>
      <text
        x="50%"
        y="50%"
        dominant-baseline="middle"
        text-anchor="middle"
        className="progress-text"
      />
    </svg>
  );
}
