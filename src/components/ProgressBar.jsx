export default function ProgressBar({ percent }) {
  return (
    <div style={{ background: "var(--line)", borderRadius: "4px", height: "10px", marginTop: "10px", overflow: "hidden" }}>
      <div style={{ width: `${percent}%`, background: "var(--ok)", height: "100%", transition: "width 0.3s" }}></div>
    </div>
  );
}