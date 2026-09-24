import { useEffect, useId, useRef } from "react";

export default function GuestListDialog({
  title,
  guests = [],
  showArriving = false,
  emptyText,
  onClose,
}) {
  const dialogRef = useRef(null);
  const onCloseRef = useRef(onClose);
  const titleId = useId();

  onCloseRef.current = onClose;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    dialog.showModal();

    const onCancel = (event) => {
      event.preventDefault();
      onCloseRef.current();
    };

    dialog.addEventListener("cancel", onCancel);
    return () => {
      dialog.removeEventListener("cancel", onCancel);
      if (dialog.open) dialog.close();
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className="manage-dialog"
      aria-labelledby={titleId}
      onClick={(event) => {
        if (event.target === dialogRef.current) onCloseRef.current();
      }}
    >
      <div className="manage-dialog-panel">
        <header className="manage-table-header">
          <div>
            <h2 id={titleId} className="manage-table-title">{title}</h2>
          </div>
          <div className="manage-dialog-actions">
            <span className="manage-table-count">{guests.length}</span>
            <button type="button" className="manage-dialog-close" onClick={onClose} aria-label="סגירה">
              ×
            </button>
          </div>
        </header>

        {guests.length === 0 ? (
          <p className="manage-table-empty">{emptyText}</p>
        ) : (
          <div className="manage-table-scroll manage-dialog-body">
            <table className={showArriving ? "manage-table" : "manage-table manage-table--details"}>
              <thead>
                <tr>
                  <th scope="col">שם מלא</th>
                  <th scope="col">תיאור</th>
                  <th scope="col">הוזמנו</th>
                  {showArriving ? (
                    <th scope="col" aria-sort="descending">אישרו הגעה</th>
                  ) : null}
                </tr>
              </thead>
              <tbody>
                {guests.map((guest, index) => (
                  <tr key={guest.id ?? `${guest.fullName}-${index}`}>
                    <td className="manage-table-name">{guest.fullName || "—"}</td>
                    <td className="manage-table-description">{guest.description || "—"}</td>
                    <td className="manage-table-num" dir="ltr">{guest.maxAmount}</td>
                    {showArriving ? (
                      <td className="manage-table-num manage-table-arriving manage-table-arriving--yes" dir="ltr">
                        {guest.arriving}
                      </td>
                    ) : null}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </dialog>
  );
}
