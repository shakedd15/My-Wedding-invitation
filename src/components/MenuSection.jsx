const MENU = [
  {
    course: "מנות ראשונות",
    items: ["סלט ירקות עונתי", "ברוסקטה עם עגבניות שרי", "מרק עגבניות קרמי"],
  },
  {
    course: "מנות עיקריות",
    items: ["פילה בקר ברוטב יין אדום", "חזה עוף צלוי עם עשבי תיבול", "פסטה פטריות (טבעוני)"],
  },
  {
    course: "קינוחים",
    items: ["עוגת שוקולד פונדנט", "פנה קוטה וניל", "פירות עונה טריים"],
  },
];

export default function MenuSection() {
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
      <h1 style={{ marginBottom: "2rem", fontSize: "1.75rem" }}>תפריט החתונה</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          width: "100%",
          maxWidth: "480px",
        }}
      >
        {MENU.map(({ course, items }) => (
          <div key={course}>
            <h2 style={{ fontSize: "1.2rem", marginBottom: "0.75rem", borderBottom: "1px solid #ddd", paddingBottom: "0.25rem" }}>
              {course}
            </h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              {items.map((item) => (
                <li key={item} style={{ fontSize: "1rem", color: "#444" }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
