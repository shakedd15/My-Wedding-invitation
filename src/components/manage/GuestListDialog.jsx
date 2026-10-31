import { useEffect, useId, useRef, useState } from "react";
import { guestMatchesQuery } from "../../utils/guestStats.js";

const EDIT_ICON = "/images/manage/edit.png";

function arrivingClass(arriving) {
  if (arriving > 0) return "manage-table-num manage-table-arriving manage-table-arriving--yes";
  if (arriving < 0) return "manage-table-num manage-table-arriving manage-table-arriving--no";
  return "manage-table-num manage-table-arriving";
}

export default function GuestListDialog({
  title,
  note = "",
  guests = [],
  showArriving = false,
  showPhone = false,
  arrivingSorted = false,
  editable = false,
  showDetails = false,
  emptyText,
  onSaveArriving,
  onClose,
}) {
  const dialogRef = useRef(null);
  const onCloseRef = useRef(onClose);
  const titleId = useId();
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState("");
  const [detailsDraft, setDetailsDraft] = useState("");
  const [query, setQuery] = useState("");
  const [saving, setSaving] = useState(false);
  const [rowError, setRowError] = useState(null);

  onCloseRef.current = onClose;

  useEffect(() => {
    if (!editingId) return;
    const cell = dialogRef.current?.querySelector(".manage-table-editor-cell");
    cell?.scrollIntoView({ inline: "nearest", block: "nearest" });
  }, [editingId]);

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

  const visibleGuests = guests.filter((guest) => guestMatchesQuery(guest, query));
  const tableClass = [
    "manage-table",
    editable ? "manage-table--editor" : "",
    editable && showDetails ? "manage-table--notes" : "",
    !editable && showPhone && showArriving ? "manage-table--with-phone" : "",
    !editable && showPhone && !showArriving ? "manage-table--phone" : "",
    !editable && !showPhone && !showArriving ? "manage-table--details" : "",
  ].filter(Boolean).join(" ");

  const startEdit = (guest) => {
    setEditingId(guest.id);
    setDraft("");
    setDetailsDraft(guest.details || "");
    setRowError(null);
  };

  const saveCount = async (guest) => {
    const maxAmount = Math.max(guest.maxAmount, 0);
    if (draft.trim() === "") {
      await persist(guest, guest.arriving);
      return;
    }
    const count = Number(draft);
    if (!Number.isInteger(count) || count < 0 || count > maxAmount) {
      setRowError(`אפשר לרשום בין 0 ל-${maxAmount}.`);
      return;
    }
    await persist(guest, count);
  };

  const persist = async (guest, arriving) => {
    setSaving(true);
    setRowError(null);
    try {
      await onSaveArriving?.(guest, arriving, showDetails ? detailsDraft.trim() : undefined);
      setEditingId(null);
      setDraft("");
      setDetailsDraft("");
    } catch {
      setRowError("לא הצלחנו לשמור. נסו שוב.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className={editable ? "manage-dialog manage-dialog--wide" : "manage-dialog"}
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
            <span className="manage-table-count">{visibleGuests.length}</span>
            <button type="button" className="manage-dialog-close" onClick={onClose} aria-label="סגירה">
              ×
            </button>
          </div>
        </header>
        <label className="manage-search">
          <span className="manage-sr">חיפוש לפי שם או טלפון</span>
          <input
            className="manage-search-input"
            type="search"
            value={query}
            placeholder="חיפוש לפי שם או טלפון"
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        {note ? <p className="manage-table-note">{note}</p> : null}

        {visibleGuests.length === 0 ? (
          <p className="manage-table-empty">{query.trim() ? "לא נמצאו מוזמנים." : emptyText}</p>
        ) : (
          <div className="manage-table-scroll manage-dialog-body">
            <table className={tableClass}>
              <thead>
                <tr>
                  <th scope="col">שם מלא</th>
                  <th scope="col">תיאור</th>
                  {showPhone ? <th scope="col">טלפון</th> : null}
                  <th scope="col">הוזמנו</th>
                  {showDetails ? <th scope="col" className="manage-table-details">פירוט נוסף</th> : null}
                  {showArriving ? (
                    <th scope="col" {...(arrivingSorted ? { "aria-sort": "descending" } : {})}>
                      אישרו הגעה
                    </th>
                  ) : null}
                  {editable ? <th scope="col" className="manage-table-action"><span className="manage-sr">עריכה</span></th> : null}
                </tr>
              </thead>
              <tbody>
                {visibleGuests.map((guest, index) => {
                  const isEditing = editable && editingId === guest.id;
                  return (
                    <tr key={guest.id ?? `${guest.fullName}-${index}`}>
                      <td className="manage-table-name" data-label="שם מלא">{guest.fullName || "—"}</td>
                      <td className="manage-table-description" data-label="תיאור">{guest.description || "—"}</td>
                      {showPhone ? (
                        <td className="manage-table-phone" data-label="טלפון"><bdi dir="ltr">{guest.phone || "—"}</bdi></td>
                      ) : null}
                      <td className="manage-table-num" dir="ltr" data-label="הוזמנו">{guest.maxAmount}</td>
                      {showDetails ? (
                        <td className={isEditing ? "manage-table-editor-cell manage-table-details" : "manage-table-description manage-table-details"} data-label="פירוט נוסף">
                          {isEditing ? (
                            <input
                              className="manage-text-input manage-details-input"
                              type="text"
                              value={detailsDraft}
                              aria-label={`פירוט נוסף עבור ${guest.fullName || "אורח"}`}
                              placeholder="פירוט נוסף"
                              onChange={(event) => setDetailsDraft(event.target.value)}
                            />
                          ) : (
                            guest.details || "—"
                          )}
                        </td>
                      ) : null}
                      {showArriving ? (
                        <td className={isEditing ? "manage-table-editor-cell" : arrivingClass(guest.arriving)} dir="ltr" data-label="אישרו הגעה">
                          {isEditing ? (
                            <div className="manage-arriving-editor">
                              <input
                                className="manage-arriving-input"
                                type="number"
                                inputMode="numeric"
                                min="0"
                                max={guest.maxAmount || undefined}
                                value={draft}
                                aria-label={`אישרו הגעה עבור ${guest.fullName || "אורח"}`}
                                onChange={(event) => {
                                  setDraft(event.target.value);
                                  setRowError(null);
                                }}
                              />
                              <button
                                type="button"
                                className="manage-decline-btn"
                                disabled={saving}
                                onClick={() => persist(guest, -1)}
                              >
                                לא מגיעים
                              </button>
                              {rowError ? <p className="manage-row-error">{rowError}</p> : null}
                            </div>
                          ) : (
                            guest.arriving
                          )}
                        </td>
                      ) : null}
                      {editable ? (
                        <td className="manage-table-action" data-label="">
                          {isEditing ? (
                            <button
                              type="button"
                              className="manage-save-btn"
                              disabled={saving}
                              onClick={() => saveCount(guest)}
                            >
                              Save
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="manage-edit-btn"
                              aria-label={`עריכה עבור ${guest.fullName || "אורח"}`}
                              onClick={() => startEdit(guest)}
                            >
                              <img src={EDIT_ICON} alt="" />
                            </button>
                          )}
                        </td>
                      ) : null}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </dialog>
  );
}
