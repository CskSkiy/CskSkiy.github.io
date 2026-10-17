export default function CustomNode({ data }) {
  const statusMap = {
    todo: "⬜",
    doing: "🟡",
    done: "✅",
    bug: "🐞",
    blocked: "🚫",
  };

  return (
    <div
      style={{
        width: 240,
        minHeight: 120,
        padding: 10,
        border: "2px solid #333",
        background: data.showColor
          ? data.color
          : "#fff",
        borderRadius: 8,
      }}
    >
      <div
        style={{
          fontSize: 12,
          color: "#666",
        }}
      >
        {data.id}
      </div>

      {data.showTag && (
        <div>
          {data.tags.join(" ")}
        </div>
      )}

      <h4>{data.label}</h4>

      {data.showStatus && (
        <div>
          {statusMap[data.status]}
        </div>
      )}
    </div>
  );
}
