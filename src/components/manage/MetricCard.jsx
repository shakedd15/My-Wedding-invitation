export default function MetricCard({
  iconSrc,
  iconAlt = "",
  value,
  label,
  loading = false,
  onClick,
}) {
  const clickable = typeof onClick === "function" && !loading;
  const Tag = clickable ? "button" : "article";
  const LabelTag = clickable ? "span" : "h2";

  return (
    <Tag
      className={clickable ? "manage-card manage-card-button" : "manage-card"}
      {...(clickable ? { type: "button", onClick } : {})}
    >
      <div className="manage-card-copy">
        {loading ? (
          <>
            <div className="manage-skeleton manage-skeleton-value" />
            <div className="manage-skeleton manage-skeleton-label" />
          </>
        ) : (
          <>
            <p className="manage-card-value">{value}</p>
            <LabelTag className="manage-card-label">{label}</LabelTag>
          </>
        )}
      </div>
      {iconSrc ? (
        <img
          className="manage-card-icon"
          src={iconSrc}
          alt={iconAlt}
          draggable="false"
        />
      ) : null}
    </Tag>
  );
}
