const GRADIENTS = [
  "linear-gradient(135deg, #1f5e8c 0%, #14171a 70%)",
  "linear-gradient(135deg, #cf6f1b 0%, #14171a 70%)",
  "linear-gradient(135deg, #1f6e4a 0%, #14171a 70%)",
];

export default function PlaceholderImage({
  label,
  seed = 0,
  style,
}: {
  label: string;
  seed?: number;
  style?: React.CSSProperties;
}) {
  const gradient = GRADIENTS[seed % GRADIENTS.length];
  return (
    <div
      style={{
        background: gradient,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 12,
        textAlign: "center",
        ...style,
      }}
    >
      <span
        className="mono"
        style={{
          fontSize: 11,
          letterSpacing: ".04em",
          color: "rgba(255,255,255,.55)",
        }}
      >
        {label}
        <br />
        (画像準備中)
      </span>
    </div>
  );
}
