/**
 * Centralized localization dictionary (Strict Constants Pattern).
 *
 * RULES:
 *  - No Hebrew (or any UI) strings should be hardcoded inside components.
 *  - Components read every label through `getCopy(lang)` so adding a new
 *    language later is a data-only change (no layout/JSX edits).
 *  - The structure is split by "view" (envelope / card) so the future
 *    invitation card can be filled in without touching the envelope.
 */

export const DEFAULT_LANGUAGE = "he";

export const TRANSLATIONS = {
  he: {
    meta: {
      dir: "rtl",
      htmlLang: "he",
    },

    // ---- View 1: the sealed envelope (landing) ----
    envelope: {
      title: "הזמנה לחתונה",
      instruction: "לחצו לפתיחה",
      // Accessible labels (read by screen readers, never shown visually).
      ariaSeal: "פתיחת ההזמנה",
      ariaTitle: "הזמנה לחתונה",
    },

    // ---- View 2: the invitation card (revealed after opening) ----
    // Filled with placeholders so you can drop real details in later.
    card: {
      kicker: "", // e.g. "בשמחה רבה"
      groomName: "", // e.g. "דניאל"
      brideName: "", // e.g. "נועה"
      coupleSeparator: "&", // visual separator between names
      subtitle: "מתחתנים!", // shown under the names (like "are getting married!")
      inviteLine: "", // e.g. "מתכבדים להזמינכם לחתונתם"

      date: {
        label: "", // e.g. "התאריך"
        day: "", // e.g. "יום חמישי"
        gregorian: "", // e.g. "12.08.2026"
        hebrew: "", // e.g. "כ״ח באב תשפ״ו"
        time: "", // e.g. "קבלת פנים 19:00"
      },

      location: {
        label: "", // e.g. "המקום"
        venue: "", // e.g. "אחוזת השמש"
        address: "", // e.g. "רחוב הזית 10, הרצליה"
        mapUrl: "", // e.g. "https://maps.google.com/..."
        mapButton: "", // e.g. "פתחו ניווט"
      },

      rsvp: {
        label: "", // e.g. "אישור הגעה"
        prompt: "", // e.g. "נשמח לדעת אם תגיעו"
        attendingButton: "", // e.g. "מגיעים"
        notAttendingButton: "", // e.g. "לא נוכל להגיע"
        guestsQuestion: "", // e.g. "כמה אורחים?"
        submitButton: "", // e.g. "שליחה"
        successMessage: "", // e.g. "תודה! נתראה בשמחה"
      },

      footer: "", // e.g. "מחכים לראותכם"
    },

    // ---- Shared controls (music toggle etc.) ----
    audio: {
      play: "הפעלת מוזיקה",
      pause: "השתקת מוזיקה",
    },

    // ---- Section 2: The Date ----
    dateSection: {
      greeting: "משפחה וחברים יקרים,",
      greetingSubtitle: "אנחנו נרגשים להזמינכם לחתונתנו",
      title: "מועד החתונה",
      decorLine: "SAVE THE DATE",
      units: [
        { value: "03", label: "יום" },
        { value: "11", label: "חודש" },
        { value: "2026", label: "שנה" },
      ],
      dayName: "יום שלישי",
    },

    // ---- Section 3: The Letter ----
    letterSection: {
      title: "מכתב ההזמנה",
      placeholder: "בקרוב יופיע כאן נוסח ההזמנה הרשמי…",
    },
  },

  // Placeholder for a future language. Mirror the `he` structure.
  en: {
    meta: { dir: "ltr", htmlLang: "en" },
    envelope: {
      title: "Wedding Invitation",
      instruction: "Tap to open",
      ariaSeal: "Open the invitation",
      ariaTitle: "Wedding Invitation",
    },
    card: {
      kicker: "",
      groomName: "",
      brideName: "",
      coupleSeparator: "&",
      subtitle: "are getting married!",
      inviteLine: "",
      date: { label: "", day: "", gregorian: "", hebrew: "", time: "" },
      location: { label: "", venue: "", address: "", mapUrl: "", mapButton: "" },
      rsvp: {
        label: "",
        prompt: "",
        attendingButton: "",
        notAttendingButton: "",
        guestsQuestion: "",
        submitButton: "",
        successMessage: "",
      },
      footer: "",
    },
    audio: { play: "Play music", pause: "Mute music" },
    dateSection: {
      greeting: "Dear family and friends,",
      greetingSubtitle: "We are honored and excited to invite you to celebrate with us",
      title: "Wedding Date",
      decorLine: "SAVE THE DATE",
      units: [
        { value: "03", label: "Day" },
        { value: "11", label: "Month" },
        { value: "2026", label: "Year" },
      ],
      dayName: "Tuesday",
    },
    letterSection: {
      title: "The Invitation",
      placeholder: "The formal invitation wording will appear here soon…",
    },
  },
};

/**
 * Returns the full copy dictionary for a language,
 * falling back to the default language when missing.
 * @param {string} lang
 */
export function getCopy(lang = DEFAULT_LANGUAGE) {
  return TRANSLATIONS[lang] ?? TRANSLATIONS[DEFAULT_LANGUAGE];
}
