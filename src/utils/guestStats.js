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
    maxAmount: toAmount(row?.guests_max_amount),
    arriving: Number.isFinite(arriving) ? arriving : 0,
    giftAmount: toAmount(row?.guest_gift_amount),
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

export function guestInviteLink(id) {
  return id ? `https://eyal-shaked-wedding.com/?id=${id}` : "";
}
