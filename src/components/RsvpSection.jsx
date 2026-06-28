export default function RsvpSection({ guestId }) {
  function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const payload = Object.fromEntries(data.entries());
    console.log("RSVP form submitted:", payload);
  }

  return (
    <section
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1rem",
        fontFamily: "inherit",
        direction: "rtl",
      }}
    >
      <h1 style={{ marginBottom: "1.5rem", fontSize: "1.75rem" }}>אישור הגעה</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "100%",
          maxWidth: "360px",
        }}
      >
        {/* Hidden field — populated automatically from the URL ?id= param */}
        <input type="hidden" name="guest_id" value={guestId ?? ""} />

        <label style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
          <span>שם מלא</span>
          <input
            type="text"
            name="name"
            required
            placeholder="שם מלא"
            style={{ padding: "0.5rem 0.75rem", borderRadius: "6px", border: "1px solid #ccc", fontSize: "1rem" }}
          />
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
          <span>מספר מגיעים</span>
          <input
            type="number"
            name="attendees"
            min="0"
            defaultValue="1"
            required
            style={{ padding: "0.5rem 0.75rem", borderRadius: "6px", border: "1px solid #ccc", fontSize: "1rem" }}
          />
        </label>

        <fieldset style={{ border: "1px solid #ccc", borderRadius: "6px", padding: "0.75rem" }}>
          <legend>האם תגיעו?</legend>
          <label style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
            <input type="radio" name="attending" value="yes" defaultChecked /> כן, נגיע בשמחה!
          </label>
          <label style={{ display: "flex", gap: "0.5rem" }}>
            <input type="radio" name="attending" value="no" /> לצערנו לא נוכל
          </label>
        </fieldset>

        <button
          type="submit"
          style={{
            padding: "0.65rem 1.5rem",
            borderRadius: "6px",
            border: "none",
            background: "#1c1410",
            color: "#fff",
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
          שליחה
        </button>
      </form>
    </section>
  );
}
