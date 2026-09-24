import { useEffect, useId, useRef, useState } from "react";
import { guestInviteLink } from "../../utils/guestStats.js";

const EDIT_ICON = "/images/manage/edit.png";

function parseInteger(value) {
  if (String(value).trim() === "") return null;
  const count = Number(value);
  return Number.isInteger(count) ? count : null;
}

export default function AllGuestsDialog({ guests = [], onSave, onClose }) {
  const dialogRef = useRef(null);
  const onCloseRef = useRef(onClose);
  const titleId = useId();
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState(null);
  const [saving, setSaving] = useState(false);
  const [rowError, setRowError] = useState(null);

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

  useEffect(() => {
    if (!editingId) return;
    dialogRef.current
      ?.querySelector(".manage-table-editor-cell")
      ?.scrollIntoView({ inline: "nearest", block: "nearest" });
  }, [editingId]);

  const startEdit = (guest) => {
    setEditingId(guest.id);
    setRowError(null);
    setDraft({
      fullName: guest.fullName,
      description: guest.description,
      maxAmount: String(guest.maxAmount),
      arriving: String(guest.arriving),
      giftAmount: String(guest.giftAmount),
      smsCount: String(guest.smsCount),
    });
  };

  const setField = (field, value) => {
    setDraft((current) => ({ ...current, [field]: value }));
    setRowError(null);
  };

  const save = async (guest) => {
    const fullName = draft.fullName.trim();
    const maxAmount = parseInteger(draft.maxAmount);
    const arriving = parseInteger(draft.arriving);
    const giftAmount = parseInteger(draft.giftAmount);
    const smsCount = parseInteger(draft.smsCount);

    if (!fullName) {
      setRowError("צריך שם מלא.");
      return;
    }
    if (maxAmount === null || maxAmount < 0 || giftAmount === null || giftAmount < 0 || smsCount === null || smsCount < 0) {
      setRowError("הוזמנו, סכום מתנה והודעות אסמס צריכים להיות מספר שלם מ־0 ומעלה.");
      return;
    }
    if (arriving === null) {
      setRowError("אישרו הגעה צריך להיות מספר שלם.");
      return;
    }

    setSaving(true);
    setRowError(null);
    try {
      await onSave?.(guest.id, {
        full_name: fullName,
        description: draft.description.trim(),
        guests_max_amount: maxAmount,
        guests_amount_arriving: arriving,
        guest_gift_amount: giftAmount,
        sms_count: smsCount,
      });
      setEditingId(null);
      setDraft(null);
    } catch {
      setRowError("לא הצלחנו לשמור. נסו שוב.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="manage-dialog manage-dialog--guests"
      aria-labelledby={titleId}
      onClick={(event) => {
        if (event.target === dialogRef.current) onCloseRef.current();
      }}
    >
      <div className="manage-dialog-panel">
        <header className="manage-table-header">
          <div>
            <h2 id={titleId} className="manage-table-title">ניהול מוזמנים</h2>
          </div>
          <div className="manage-dialog-actions">
            <span className="manage-table-count">{guests.length}</span>
            <button type="button" className="manage-dialog-close" onClick={onClose} aria-label="סגירה">
              ×
            </button>
          </div>
        </header>

        {guests.length === 0 ? (
          <p className="manage-table-empty">אין מוזמנים.</p>
        ) : (
          <div className="manage-table-scroll manage-dialog-body">
            <table className="manage-table manage-table--editor manage-table--all">
              <thead>
                <tr>
                  <th scope="col">שם מלא</th>
                  <th scope="col">תיאור</th>
                  <th scope="col">הוזמנו</th>
                  <th scope="col">אישרו הגעה</th>
                  <th scope="col">טלפון</th>
                  <th scope="col">סכום מתנה</th>
                  <th scope="col">הודעות אסמס</th>
                  <th scope="col">לינק</th>
                  <th scope="col" className="manage-table-action"><span className="manage-sr">עריכה</span></th>
                </tr>
              </thead>
              <tbody>
                {guests.map((guest) => {
                  const isEditing = editingId === guest.id && draft;
                  const link = guestInviteLink(guest.id);
                  return (
                    <tr key={guest.id}>
                      <td className={isEditing ? "manage-table-editor-cell" : "manage-table-name"}>
                        {isEditing ? (
                          <input
                            className="manage-text-input"
                            type="text"
                            value={draft.fullName}
                            aria-label={`שם מלא עבור ${guest.fullName || "אורח"}`}
                            onChange={(event) => setField("fullName", event.target.value)}
                          />
                        ) : (
                          guest.fullName || "—"
                        )}
                      </td>
                      <td>
                        {isEditing ? (
                          <input
                            className="manage-text-input"
                            type="text"
                            value={draft.description}
                            aria-label="תיאור"
                            onChange={(event) => setField("description", event.target.value)}
                          />
                        ) : (
                          guest.description || "—"
                        )}
                      </td>
                      <td className="manage-table-num" dir="ltr">
                        {isEditing ? (
                          <input
                            className="manage-arriving-input"
                            type="number"
                            inputMode="numeric"
                            step="1"
                            min="0"
                            value={draft.maxAmount}
                            aria-label="הוזמנו"
                            onChange={(event) => setField("maxAmount", event.target.value)}
                          />
                        ) : (
                          guest.maxAmount
                        )}
                      </td>
                      <td className="manage-table-num" dir="ltr">
                        {isEditing ? (
                          <input
                            className="manage-arriving-input"
                            type="number"
                            inputMode="numeric"
                            step="1"
                            value={draft.arriving}
                            aria-label="אישרו הגעה"
                            onChange={(event) => setField("arriving", event.target.value)}
                          />
                        ) : (
                          guest.arriving
                        )}
                      </td>
                      <td className="manage-table-phone" dir="ltr">{guest.phone || "—"}</td>
                      <td className="manage-table-num" dir="ltr">
                        {isEditing ? (
                          <input
                            className="manage-arriving-input"
                            type="number"
                            inputMode="numeric"
                            step="1"
                            min="0"
                            value={draft.giftAmount}
                            aria-label="סכום מתנה"
                            onChange={(event) => setField("giftAmount", event.target.value)}
                          />
                        ) : (
                          guest.giftAmount
                        )}
                      </td>
                      <td className="manage-table-num" dir="ltr">
                        {isEditing ? (
                          <input
                            className="manage-arriving-input"
                            type="number"
                            inputMode="numeric"
                            step="1"
                            min="0"
                            value={draft.smsCount}
                            aria-label="הודעות אסמס"
                            onChange={(event) => setField("smsCount", event.target.value)}
                          />
                        ) : (
                          guest.smsCount
                        )}
                      </td>
                      <td>
                        {link ? (
                          <a className="manage-guest-link" href={link} target="_blank" rel="noreferrer">
                            {link}
                          </a>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="manage-table-action">
                        {isEditing ? (
                          <div className="manage-arriving-editor">
                            <button
                              type="button"
                              className="manage-save-btn"
                              disabled={saving}
                              onClick={() => save(guest)}
                            >
                              Save
                            </button>
                            {rowError ? <p className="manage-row-error">{rowError}</p> : null}
                          </div>
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
