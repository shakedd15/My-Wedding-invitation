import { useEffect, useState } from "react";
import AllGuestsDialog from "../components/manage/AllGuestsDialog.jsx";
import GuestListDialog from "../components/manage/GuestListDialog.jsx";
import MetricCard from "../components/manage/MetricCard.jsx";
import ProgressCard from "../components/manage/ProgressCard.jsx";
import { useGuestStats } from "../hooks/useGuestStats.js";
import "./ManagePage.css";

const ICONS = {
  invited: "/images/manage/invited.png",
  arriving: "/images/manage/arriving.png",
  notAttending: "/images/manage/not-attending.png",
  undecided: "/images/manage/undecided.png",
  manage: "/images/manage/manage-guests.png",
};

export default function ManagePage() {
  const {
    stats,
    responded,
    pending,
    guests,
    loading,
    error,
    retry,
    updateArriving,
    updateGuest,
    createGuest,
    deleteGuest,
  } = useGuestStats();
  const [list, setList] = useState(null);
  const arrivingGuests = responded.filter((guest) => guest.arriving > 0);
  const declinedGuests = responded.filter((guest) => guest.arriving < 0);

  useEffect(() => {
    document.title = "ניהול מוזמנים";
  }, []);

  return (
    <main className="manage-page" dir="rtl">
      <div className="manage-page-glow" aria-hidden="true" />
      <div className="manage-page-inner">
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
      {list === "arriving" ? (
        <GuestListDialog
          title="מגיעים"
          guests={arrivingGuests}
          showArriving
          arrivingSorted
          emptyText="אין אורחים שאישרו הגעה."
          onClose={() => setList(null)}
        />
      ) : null}
      {list === "declined" ? (
        <GuestListDialog
          title="לא מגיעים"
          guests={declinedGuests}
          emptyText="אין אורחים שסירבו."
          onClose={() => setList(null)}
        />
      ) : null}
      {list === "pending" ? (
        <GuestListDialog
          title="טרם השיבו/מתלבטים"
          guests={pending}
          showPhone
          showArriving
          editable
          onSaveArriving={(guest, arriving) => updateArriving(guest.id, arriving)}
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
