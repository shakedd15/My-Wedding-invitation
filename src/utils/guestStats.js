function toAmount(value) {
  const amount = Number(value);
  return Number.isFinite(amount) ? amount : 0;
}

export function computeGuestStats(rows = []) {
  const stats = {
    invited: 0,
    arriving: 0,
    notAttending: 0,
    undecided: 0,
    invalid: 0,
    invalidContacts: 0,
    progressPercent: 0,
  };

  for (const row of rows) {
    const maxAmount = toAmount(row?.guests_max_amount);
    const arriving = toAmount(row?.guests_amount_arriving);
    const smsCount = toAmount(row?.sms_count);

    stats.invited += maxAmount;

    if (arriving > 0) {
      stats.arriving += arriving;
      stats.notAttending += Math.max(0, maxAmount - arriving);
    } else if (arriving === -1) {
      stats.notAttending += maxAmount;
    } else if (arriving === -2) {
      stats.invalidContacts += 1;
    } else {
      stats.undecided += maxAmount;
    }

    if (smsCount === 0) stats.invalid += maxAmount;
  }

  if (stats.invited > 0) {
    stats.progressPercent = Math.round(
      ((stats.arriving + stats.notAttending) * 100) / stats.invited,
    );
  }

  return stats;
}

export const PAYMENT_METHODS = [
  { value: "cash", label: "מזומן" },
  { value: "check", label: "צ'ק" },
  { value: "credit", label: "אשראי" },
  { value: "bit", label: "ביט" },
  { value: "paybox", label: "פייבוקס" },
];

export function toPaymentMethod(value) {
  const method = String(value || "").trim().toLowerCase();
  return PAYMENT_METHODS.some((item) => item.value === method) ? method : "";
}

export function paymentMethodLabel(value) {
  return PAYMENT_METHODS.find((item) => item.value === value)?.label || "";
}

function toGuestListItem(row) {
  const arriving = Number(row?.guests_amount_arriving);
  return {
    id: row?.id ?? null,
    fullName: typeof row?.full_name === "string" && row.full_name.trim()
      ? row.full_name.trim()
      : "",
    description: typeof row?.description === "string" && row.description.trim()
      ? row.description.trim()
      : "",
    phone: typeof row?.phone_number === "string" && row.phone_number.trim()
      ? row.phone_number.trim()
      : "",
    details: typeof row?.guest_details === "string" && row.guest_details.trim()
      ? row.guest_details.trim()
      : "",
    maxAmount: toAmount(row?.guests_max_amount),
    arriving: Number.isFinite(arriving) ? arriving : 0,
    giftAmount: toAmount(row?.guest_gift_amount),
    paymentMethod: toPaymentMethod(row?.payment_method),
    smsCount: toAmount(row?.sms_count),
  };
}

function byHebrewName(a, b) {
  return a.fullName.localeCompare(b.fullName, "he");
}

export function selectRespondedGuests(rows = []) {
  return rows
    .map(toGuestListItem)
    .filter((guest) => guest.arriving > 0 || guest.arriving === -1)
    .sort((a, b) => b.arriving - a.arriving || byHebrewName(a, b));
}

export function selectInvalidGuests(rows = []) {
  return rows
    .map(toGuestListItem)
    .filter((guest) => guest.arriving === -2)
    .sort(byHebrewName);
}

export function arrivingAfterGuestEdit(currentArriving, nextArriving) {
  if (currentArriving === -2) return 0;
  return nextArriving;
}

function digitsOnly(value) {
  return String(value || "").replace(/\D/g, "");
}

export function guestMatchesQuery(guest, query) {
  const term = String(query || "").trim().toLowerCase();
  if (!term) return true;

  const name = String(guest?.fullName || "").toLowerCase();
  if (name.includes(term)) return true;

  const description = String(guest?.description || "").toLowerCase();
  if (description.includes(term)) return true;

  const phone = String(guest?.phone || "").toLowerCase();
  if (phone.includes(term)) return true;

  const queryDigits = digitsOnly(term);
  return Boolean(queryDigits) && digitsOnly(phone).includes(queryDigits);
}

export function selectPendingGuests(rows = []) {
  return rows
    .map(toGuestListItem)
    .filter((guest) => guest.arriving === 0)
    .sort(byHebrewName);
}

export function selectAllGuests(rows = []) {
  return rows.map(toGuestListItem).sort(byHebrewName);
}

const NUMBER_SORT_KEYS = ["maxAmount", "arriving", "giftAmount", "smsCount"];
const TEXT_SORT_VALUES = {
  fullName: (guest) => guest.fullName,
  description: (guest) => guest.description,
  phone: (guest) => guest.phone,
  paymentMethod: (guest) => paymentMethodLabel(guest.paymentMethod),
};
const textCollator = new Intl.Collator("he", { numeric: true, sensitivity: "base" });

export function isSortableGuestColumn(key) {
  return NUMBER_SORT_KEYS.includes(key) || key in TEXT_SORT_VALUES;
}

// Numbers start largest first, text starts from א.
export function defaultSortDirection(key) {
  return NUMBER_SORT_KEYS.includes(key) ? "desc" : "asc";
}

// Sorts table rows by one column. Empty text always goes to the bottom,
// and ties fall back to the guest's name.
export function sortGuests(guests, sort) {
  if (!sort || !isSortableGuestColumn(sort.key)) return guests;
  const sign = sort.direction === "desc" ? -1 : 1;
  const isNumber = NUMBER_SORT_KEYS.includes(sort.key);
  const readText = TEXT_SORT_VALUES[sort.key];

  return [...guests].sort((a, b) => {
    let result;
    if (isNumber) {
      result = (Number(a[sort.key]) || 0) - (Number(b[sort.key]) || 0);
    } else {
      const left = String(readText(a) || "").trim();
      const right = String(readText(b) || "").trim();
      if (!left || !right) {
        if (left || right) return left ? -1 : 1;
        result = 0;
      } else {
        result = textCollator.compare(left, right);
      }
    }
    return sign * result || byHebrewName(a, b);
  });
}

export function guestInviteLink(id) {
  return id ? `https://eyal-shaked-wedding.com/?id=${id}` : "";
}
