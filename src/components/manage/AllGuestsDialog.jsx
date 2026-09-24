import { useEffect, useId, useRef, useState } from "react";
import { guestInviteLink } from "../../utils/guestStats.js";

const EDIT_ICON = "/images/manage/edit.png";
const DELETE_ICON = "/images/manage/delete.svg";
const ADD_ICON = "/images/manage/add.png";

const EMPTY_CREATE = {
  fullName: "",
  description: "",
  phone: "",
  maxAmount: "",
  arriving: "0",
  giftAmount: "0",
  smsCount: "0",
};

function parseInteger(value) {
  if (String(value).trim() === "") return null;
  const count = Number(value);
  return Number.isInteger(count) ? count : null;
}

function readDraft(draft) {
  return {
    fullName: draft.fullName.trim(),
    description: draft.description.trim(),
    maxAmount: parseInteger(draft.maxAmount),
    arriving: parseInteger(draft.arriving),
    giftAmount: parseInteger(draft.giftAmount),
    smsCount: parseInteger(draft.smsCount),
  };
}

function draftError(values) {
  if (!values.fullName) return "צריך שם מלא.";
  if (
    values.maxAmount === null || values.maxAmount < 0
    || values.giftAmount === null || values.giftAmount < 0
    || values.smsCount === null || values.smsCount < 0
  ) {
    return "הוזמנו, סכום מתנה והודעות אסמס צריכים להיות מספר שלם מ־0 ומעלה.";
  }
  if (values.arriving === null) return "אישרו הגעה צריך להיות מספר שלם.";
  return null;
}

function toFields(values) {
  return {
    full_name: values.fullName,
    description: values.description,
    guests_max_amount: values.maxAmount,
    guests_amount_arriving: values.arriving,
    guest_gift_amount: values.giftAmount,
    sms_count: values.smsCount,
  };
}

export default function AllGuestsDialog({ guests = [], onSave, onCreate, onDelete, onClose }) {
  const dialogRef = useRef(null);
  const confirmRef = useRef(null);
  const onCloseRef = useRef(onClose);
  const titleId = useId();
  const confirmTitleId = useId();
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState(null);
  const [createDraft, setCreateDraft] = useState(EMPTY_CREATE);
  const [creatingOpen, setCreatingOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [creating, setCreating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [rowError, setRowError] = useState(null);
  const [createError, setCreateError] = useState(null);
  const [deleteError, setDeleteError] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);
  const deletingRef = useRef(false);

  onCloseRef.current = onClose;
  deletingRef.current = deleting;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    dialog.showModal();
    const onCancel = (event) => {
      event.preventDefault();
      if (confirmRef.current?.open) return;
      onCloseRef.current();
    };
    dialog.addEventListener("cancel", onCancel);
    return () => {
      dialog.removeEventListener("cancel", onCancel);
      if (dialog.open) dialog.close();
    };
  }, []);

  useEffect(() => {
    const dialog = confirmRef.current;
    if (!pendingDelete || !dialog) return;
    dialog.showModal();
    const onCancel = (event) => {
      event.preventDefault();
      if (!deletingRef.current) setPendingDelete(null);
    };
    dialog.addEventListener("cancel", onCancel);
    return () => {
      dialog.removeEventListener("cancel", onCancel);
      if (dialog.open) dialog.close();
    };
  }, [pendingDelete]);

  useEffect(() => {
    if (!editingId) return;
    const scroller = dialogRef.current?.querySelector(".manage-dialog-body");
    const row = scroller?.querySelector(`[data-guest-id="${CSS.escape(editingId)}"]`);
    if (!scroller || !row) return;
    const rowRect = row.getBoundingClientRect();
    const scrollerRect = scroller.getBoundingClientRect();
    if (rowRect.bottom > scrollerRect.bottom) {
      scroller.scrollTop += rowRect.bottom - scrollerRect.bottom;
    } else if (rowRect.top < scrollerRect.top) {
      scroller.scrollTop -= scrollerRect.top - rowRect.top;
    }
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

  const setCreateField = (field, value) => {
    setCreateDraft((current) => ({ ...current, [field]: value }));
    setCreateError(null);
  };

  const save = async (guest) => {
    const values = readDraft(draft);
    const error = draftError(values);
    if (error) {
      setRowError(error);
      return;
    }

    setSaving(true);
    setRowError(null);
    try {
      await onSave?.(guest.id, toFields(values));
      setEditingId(null);
      setDraft(null);
    } catch {
      setRowError("לא הצלחנו לשמור. נסו שוב.");
    } finally {
      setSaving(false);
    }
  };

  const createGuest = async () => {
    const values = readDraft(createDraft);
    const error = draftError(values);
    const phone = createDraft.phone.trim();
    if (error) {
      setCreateError(error);
      return;
    }
    if (!phone) {
      setCreateError("צריך מספר טלפון. אי אפשר לשנות אותו אחר כך.");
      return;
    }

    setCreating(true);
    setCreateError(null);
    try {
      await onCreate?.({
        ...toFields(values),
        phone_number: phone,
        gender: "X",
        guests_amount_we_expect: values.maxAmount,
      });
      setCreateDraft(EMPTY_CREATE);
      setCreatingOpen(false);
    } catch (err) {
      const blocked = String(err?.code || err?.message || "").includes("42501")
        || String(err?.message || "").includes("row-level security");
      setCreateError(blocked
        ? "השרת חסם את ההוספה. צריך לאפשר הוספת מוזמנים במסד."
        : "לא הצלחנו להוסיף. נסו שוב.");
    } finally {
      setCreating(false);
    }
  };

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    setDeleting(true);
    setDeleteError(null);
    try {
      await onDelete?.(pendingDelete.id);
      if (editingId === pendingDelete.id) {
        setEditingId(null);
        setDraft(null);
      }
      setPendingDelete(null);
    } catch (err) {
      const blocked = String(err?.message || "").includes("delete blocked")
        || String(err?.code || err?.message || "").includes("42501")
        || String(err?.message || "").includes("row-level security");
      setDeleteError(blocked
        ? "השרת חסם את המחיקה. צריך לאפשר מחיקת מוזמנים במסד."
        : "לא הצלחנו למחוק. נסו שוב.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="manage-dialog manage-dialog--guests"
      aria-labelledby={titleId}
      onClick={(event) => {
        if (event.target === dialogRef.current && !confirmRef.current?.open) onCloseRef.current();
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
                <th scope="col" className="manage-table-delete"><span className="manage-sr">מחיקה</span></th>
              </tr>
            </thead>
            <tbody>
              <tr className="manage-table-create">
                {creatingOpen ? (
                  <>
                <td>
                  <input
                    className="manage-text-input"
                    type="text"
                    value={createDraft.fullName}
                    aria-label="שם מלא למוזמן חדש"
                    placeholder="שם מלא"
                    onChange={(event) => setCreateField("fullName", event.target.value)}
                  />
                </td>
                <td>
                  <input
                    className="manage-text-input"
                    type="text"
                    value={createDraft.description}
                    aria-label="תיאור למוזמן חדש"
                    placeholder="תיאור"
                    onChange={(event) => setCreateField("description", event.target.value)}
                  />
                </td>
                <td className="manage-table-num" dir="ltr">
                  <input
                    className="manage-arriving-input"
                    type="number"
                    inputMode="numeric"
                    step="1"
                    min="0"
                    value={createDraft.maxAmount}
                    aria-label="הוזמנו למוזמן חדש"
                    onChange={(event) => setCreateField("maxAmount", event.target.value)}
                  />
                </td>
                <td className="manage-table-num" dir="ltr">
                  <input
                    className="manage-arriving-input"
                    type="number"
                    inputMode="numeric"
                    step="1"
                    value={createDraft.arriving}
                    aria-label="אישרו הגעה למוזמן חדש"
                    onChange={(event) => setCreateField("arriving", event.target.value)}
                  />
                </td>
                <td className="manage-table-phone" dir="ltr">
                  <input
                    className="manage-text-input"
                    type="tel"
                    value={createDraft.phone}
                    aria-label="טלפון למוזמן חדש"
                    placeholder="טלפון"
                    onChange={(event) => setCreateField("phone", event.target.value)}
                  />
                </td>
                <td className="manage-table-num" dir="ltr">
                  <input
                    className="manage-arriving-input"
                    type="number"
                    inputMode="numeric"
                    step="1"
                    min="0"
                    value={createDraft.giftAmount}
                    aria-label="סכום מתנה למוזמן חדש"
                    onChange={(event) => setCreateField("giftAmount", event.target.value)}
                  />
                </td>
                <td className="manage-table-num" dir="ltr">
                  <input
                    className="manage-arriving-input"
                    type="number"
                    inputMode="numeric"
                    step="1"
                    min="0"
                    value={createDraft.smsCount}
                    aria-label="הודעות אסמס למוזמן חדש"
                    onChange={(event) => setCreateField("smsCount", event.target.value)}
                  />
                </td>
                <td className="manage-create-hint">יופיע אחרי השמירה</td>
                <td className="manage-table-action">
                  <div className="manage-arriving-editor">
                    <button
                      type="button"
                      className="manage-save-btn"
                      disabled={creating}
                      onClick={createGuest}
                    >
                      Save
                    </button>
                    {createError ? <p className="manage-row-error">{createError}</p> : null}
                  </div>
                </td>
                <td className="manage-table-delete" />
                  </>
                ) : (
                  <td className="manage-table-add-cell" colSpan={10}>
                    <button
                      type="button"
                      className="manage-add-btn"
                      aria-label="הוספת מוזמן"
                      onClick={() => {
                        setCreateError(null);
                        setCreatingOpen(true);
                      }}
                    >
                      <img src={ADD_ICON} alt="" />
                    </button>
                  </td>
                )}
              </tr>
              {guests.map((guest) => {
                const isEditing = editingId === guest.id && draft;
                const link = guestInviteLink(guest.id);
                return (
                  <tr key={guest.id} data-guest-id={guest.id}>
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
                    <td className="manage-table-delete">
                      <button
                        type="button"
                        className="manage-delete-btn"
                        aria-label={`מחיקה עבור ${guest.fullName || "אורח"}`}
                        onClick={() => {
                          setDeleteError(null);
                          setPendingDelete(guest);
                        }}
                      >
                        <img src={DELETE_ICON} alt="" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {pendingDelete ? (
        <dialog
          ref={confirmRef}
          className="manage-dialog manage-confirm-dialog"
          aria-labelledby={confirmTitleId}
          onClick={(event) => {
            if (event.target === confirmRef.current && !deleting) setPendingDelete(null);
          }}
        >
          <h2 id={confirmTitleId} className="manage-confirm-title">למחוק את {pendingDelete.fullName || "המוזמן"}?</h2>
          <p className="manage-confirm-text">המחיקה תסיר את הרשומה ואת הלינק האישי.</p>
          {deleteError ? <p className="manage-row-error">{deleteError}</p> : null}
          <div className="manage-confirm-actions">
            <button type="button" className="manage-decline-btn" disabled={deleting} onClick={() => setPendingDelete(null)}>
              ביטול
            </button>
            <button type="button" className="manage-save-btn" disabled={deleting} onClick={confirmDelete}>
              מחיקה
            </button>
          </div>
        </dialog>
      ) : null}
    </dialog>
  );
}
