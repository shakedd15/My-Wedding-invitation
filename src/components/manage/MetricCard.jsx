export default function MetricCard({
  iconSrc,
  iconAlt = "",
  value,
  label,
  loading = false,
}) {
  return (
    <article className="manage-card">
      <div className="manage-card-copy">
        {loading ? (
          <>
            <div className="manage-skeleton manage-skeleton-value" />
            <div className="manage-skeleton manage-skeleton-label" />
          </>
        ) : (
          <>
            <p className="manage-card-value">{value}</p>
            <h2 className="manage-card-label">{label}</h2>
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
    </article>
  );
}
