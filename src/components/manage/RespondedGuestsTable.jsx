export default function RespondedGuestsTable({ guests = [], loading = false }) {
  return (
    <section className="manage-table-card" aria-labelledby="responded-guests-heading">
      <header className="manage-table-header">
        <div>
          <h2 id="responded-guests-heading" className="manage-table-title">
            תשובות שהתקבלו
          </h2>
          <p className="manage-table-note">מי שטרם השיב לא מופיע כאן</p>
        </div>
        {loading ? (
          <div className="manage-skeleton manage-table-count-skeleton" />
        ) : (
          <span className="manage-table-count">{guests.length}</span>
        )}
      </header>

      {loading ? (
        <div className="manage-table-skeleton" aria-hidden="true">
          <div className="manage-skeleton manage-table-skeleton-row" />
          <div className="manage-skeleton manage-table-skeleton-row" />
          <div className="manage-skeleton manage-table-skeleton-row" />
        </div>
      ) : guests.length === 0 ? (
        <p className="manage-table-empty">עדיין אין תשובות.</p>
      ) : (
        <div className="manage-table-scroll">
          <table className="manage-table">
            <thead>
              <tr>
                <th scope="col">שם מלא</th>
                <th scope="col">תיאור</th>
                <th scope="col">הוזמנו</th>
                <th scope="col" aria-sort="descending">אישרו הגעה</th>
              </tr>
            </thead>
            <tbody>
              {guests.map((guest, index) => (
                <tr key={guest.id ?? `${guest.fullName}-${index}`}>
                  <td className="manage-table-name">{guest.fullName || "—"}</td>
                  <td className="manage-table-description">{guest.description || "—"}</td>
                  <td className="manage-table-num" dir="ltr">{guest.maxAmount}</td>
                  <td
                    dir="ltr"
                    className={
                      guest.arriving > 0
                        ? "manage-table-num manage-table-arriving manage-table-arriving--yes"
                        : "manage-table-num manage-table-arriving manage-table-arriving--no"
                    }
                  >
                    {guest.arriving}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
