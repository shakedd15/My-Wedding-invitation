import { useEffect, useState } from "react";
import AllGuestsDialog from "../components/manage/AllGuestsDialog.jsx";
import GuestListDialog from "../components/manage/GuestListDialog.jsx";
import MetricCard from "../components/manage/MetricCard.jsx";
import ProgressCard from "../components/manage/ProgressCard.jsx";
import { useGuestStats } from "../hooks/useGuestStats.js";
import { downloadInvitationsWorkbook } from "../utils/invitationExport.js";
import "./ManagePage.css";

const ICONS = {
  invited: "/images/manage/invited.png",
  arriving: "/images/manage/arriving.png",
  notAttending: "/images/manage/not-attending.png",
  undecided: "/images/manage/undecided.png",
  invalid: "/images/manage/invalid.png",
  manage: "/images/manage/manage-guests.png",
};

export default function ManagePage() {
  const {
    stats,
    responded,
    pending,
    invalidGuests,
    guests,
    loading,
    error,
    retry,
    updateGuest,
    createGuest,
    deleteGuest,
  } = useGuestStats();
  const [list, setList] = useState(null);
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState(null);
  const arrivingGuests = responded.filter((guest) => guest.arriving > 0);
  const declinedGuests = responded.filter((guest) => guest.arriving === -1);

  useEffect(() => {
    document.title = "ניהול מוזמנים";
  }, []);

  async function handleExport() {
    setExporting(true);
    setExportError(null);
    try {
      await downloadInvitationsWorkbook(guests);
    } catch {
      setExportError("הייצוא לאקסל נכשל. נסי שוב.");
    } finally {
      setExporting(false);
    }
  }

  return (
    <main className="manage-page" dir="rtl">
      <div className="manage-page-glow" aria-hidden="true" />
      <div className="manage-page-inner">
        <div className="manage-export-row">
          <button
            type="button"
            className="manage-export"
            onClick={handleExport}
            disabled={loading || Boolean(error) || exporting}
            aria-label="ייצוא לאקסל"
            title="ייצוא לאקסל"
            aria-busy={exporting}
          >
            <img src="/images/manage/export-excel.png" alt="" draggable="false" />
          </button>
          {exportError ? <p className="manage-export-error">{exportError}</p> : null}
        </div>
        {error ? (
          <section className="manage-error" role="alert">
            <p>{error}</p>
            <button type="button" className="manage-retry" onClick={retry}>
              ניסיון חוזר
            </button>
          </section>
        ) : (
          <div className="manage-stack">
            <MetricCard
              iconSrc={ICONS.invited}
              label="מוזמנים"
              value={stats?.invited ?? 0}
              loading={loading}
              onClick={() => setList("invited")}
            />
            <MetricCard
              iconSrc={ICONS.arriving}
              label="מגיעים"
              value={stats?.arriving ?? 0}
              loading={loading}
              onClick={() => setList("arriving")}
            />
            <MetricCard
              iconSrc={ICONS.notAttending}
              label="לא מגיעים"
              value={stats?.notAttending ?? 0}
              loading={loading}
              onClick={() => setList("declined")}
            />
            <MetricCard
              iconSrc={ICONS.invalid}
              label="לא תקין"
              value={invalidGuests.length}
              loading={loading}
              onClick={() => setList("invalid")}
            />
            <MetricCard
              iconSrc={ICONS.undecided}
              label="טרם השיבו/מתלבטים"
              value={stats?.undecided ?? 0}
              loading={loading}
              onClick={() => setList("pending")}
            />
            <ProgressCard percent={stats?.progressPercent ?? 0} loading={loading} />
            <MetricCard
              iconSrc={ICONS.manage}
              label="ניהול מוזמנים"
              value={guests.length}
              loading={loading}
              onClick={() => setList("all")}
            />
          </div>
        )}
      </div>
      {list === "invited" ? (
        <GuestListDialog
          title="מוזמנים"
          note={`המספר בכרטיס (${stats?.invited ?? 0}) סופר אנשים. המספר כאן (${guests.length}) סופר רשומות, כי רשומה אחת יכולה לכלול כמה אנשים.`}
          guests={guests}
          showPhone
          emptyText="אין מוזמנים."
          onClose={() => setList(null)}
        />
      ) : null}
      {list === "arriving" ? (
        <GuestListDialog
          title="מגיעים"
          guests={arrivingGuests}
          showPhone
          showArriving
          arrivingSorted
          emptyText="אין אורחים שאישרו הגעה."
          onClose={() => setList(null)}
        />
      ) : null}
      {list === "declined" ? (
        <GuestListDialog
          title="לא מגיעים"
          note={`המספר בכרטיס (${stats?.notAttending ?? 0}) כולל גם אנשים מהזמנה שאישרה פחות ממה שהוזמנו. כאן (${declinedGuests.length} רשומות) מופיעות רק הזמנות שסומנו כולן כלא מגיעים. למשל, הוזמנו 4 ואישרו 2: שני הנעדרים נספרים בכרטיס, והרשומה לא מופיעה כאן.`}
          guests={declinedGuests}
          showPhone
          emptyText="אין אורחים שסירבו."
          onClose={() => setList(null)}
        />
      ) : null}
      {list === "invalid" ? (
        <GuestListDialog
          title="לא תקין"
          note="מוזמנים שהשליחה אליהם נכשלה. עריכה במסך ניהול מוזמנים מחזירה את אישרו הגעה ל־0."
          guests={invalidGuests}
          showPhone
          showArriving
          emptyText="אין מוזמנים עם מספר לא תקין."
          onClose={() => setList(null)}
        />
      ) : null}
      {list === "pending" ? (
        <GuestListDialog
          title="טרם השיבו/מתלבטים"
          note={`המספר בכרטיס (${stats?.undecided ?? 0}) סופר אנשים שטרם השיבו. המספר כאן (${pending.length}) סופר רשומות, כי רשומה אחת יכולה לכלול כמה אנשים.`}
          guests={pending}
          showPhone
          showArriving
          editable
          showDetails
          onSaveArriving={(guest, arriving, details) => updateGuest(guest.id, {
            guests_amount_arriving: arriving,
            guest_details: details,
          })}
          emptyText="אין אורחים שממתינים לתשובה."
          onClose={() => setList(null)}
        />
      ) : null}
      {list === "all" ? (
        <AllGuestsDialog
          guests={guests}
          onSave={updateGuest}
          onCreate={createGuest}
          onDelete={deleteGuest}
          onClose={() => setList(null)}
        />
      ) : null}
    </main>
  );
}
