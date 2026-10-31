import assert from "node:assert/strict";
import test from "node:test";
import { arrivingAfterGuestEdit, computeGuestStats, guestInviteLink, guestMatchesQuery, selectAllGuests, selectInvalidGuests, selectPendingGuests, selectRespondedGuests } from "./guestStats.js";

test("aggregates guest dashboard metrics from invitation rows", () => {
  const stats = computeGuestStats([
    { guests_max_amount: 4, guests_amount_arriving: 3, sms_count: 1 },
    { guests_max_amount: 2, guests_amount_arriving: -1, sms_count: 2 },
    { guests_max_amount: 3, guests_amount_arriving: 0, sms_count: 0 },
    { guests_max_amount: 5, guests_amount_arriving: 5, sms_count: 1 },
  ]);

  assert.equal(stats.invited, 14);
  assert.equal(stats.arriving, 8);
  assert.equal(stats.notAttending, 3);
  assert.equal(stats.undecided, 3);
  assert.equal(stats.invalid, 3);
  assert.equal(stats.progressPercent, 79);
});

test("counts unused seats from partial RSVPs as not attending", () => {
  const stats = computeGuestStats([
    { guests_max_amount: 3, guests_amount_arriving: 2, sms_count: 1 },
  ]);

  assert.equal(stats.invited, 3);
  assert.equal(stats.arriving, 2);
  assert.equal(stats.notAttending, 1);
  assert.equal(stats.undecided, 0);
  assert.equal(stats.progressPercent, 100);
});

test("treats missing amounts as zero and empty tables as zeros", () => {
  assert.deepEqual(computeGuestStats([]), {
    invited: 0,
    arriving: 0,
    notAttending: 0,
    undecided: 0,
    invalid: 0,
    invalidContacts: 0,
    progressPercent: 0,
  });

  const stats = computeGuestStats([
    { guests_max_amount: null, guests_amount_arriving: null, sms_count: 0 },
    { guests_max_amount: 2, guests_amount_arriving: undefined, sms_count: 1 },
  ]);

  assert.equal(stats.invited, 2);
  assert.equal(stats.arriving, 0);
  assert.equal(stats.undecided, 2);
  assert.equal(stats.invalid, 0);
  assert.equal(stats.progressPercent, 0);
});

test("lists only guests who confirmed or declined, highest arrival count first", () => {
  const guests = selectRespondedGuests([
    { id: "c", full_name: "  גל  ", description: "חברים", guests_max_amount: 3, guests_amount_arriving: 0 },
    { id: "b", full_name: "דנה", description: "  ", guests_max_amount: 2, guests_amount_arriving: -1 },
    { id: "e", full_name: "רות", description: "עבודה", guests_max_amount: 2, guests_amount_arriving: 2 },
    { id: "a", full_name: "אבי", description: "משפחה", guests_max_amount: 4, guests_amount_arriving: "3" },
    { id: "f", full_name: "גלית", description: "משפחה", guests_max_amount: 2, guests_amount_arriving: 2 },
    { id: "d", full_name: "יוסי", description: null, guests_max_amount: 1, guests_amount_arriving: null },
    { id: "g", full_name: "גורג", description: "חברים", phone_number: "052-672-7862", guests_max_amount: 1, guests_amount_arriving: -2 },
  ]);

  assert.deepEqual(guests, [
    { id: "a", fullName: "אבי", description: "משפחה", phone: "", maxAmount: 4, arriving: 3, giftAmount: 0, smsCount: 0 },
    { id: "f", fullName: "גלית", description: "משפחה", phone: "", maxAmount: 2, arriving: 2, giftAmount: 0, smsCount: 0 },
    { id: "e", fullName: "רות", description: "עבודה", phone: "", maxAmount: 2, arriving: 2, giftAmount: 0, smsCount: 0 },
    { id: "b", fullName: "דנה", description: "", phone: "", maxAmount: 2, arriving: -1, giftAmount: 0, smsCount: 0 },
  ]);
});

test("lists guests who have not replied, sorted by name", () => {
  const guests = selectPendingGuests([
    { id: "c", full_name: "  גל  ", description: "חברים", phone_number: " 050-0000000 ", guests_max_amount: 3, guests_amount_arriving: 0 },
    { id: "b", full_name: "דנה", description: "משפחה", phone_number: "050-1111111", guests_max_amount: 2, guests_amount_arriving: -1 },
    { id: "a", full_name: "אבי", description: "משפחה", guests_max_amount: 4, guests_amount_arriving: 3 },
    { id: "d", full_name: "יוסי", description: null, phone_number: null, guests_max_amount: 1, guests_amount_arriving: null },
  ]);

  assert.deepEqual(guests, [
    { id: "c", fullName: "גל", description: "חברים", phone: "050-0000000", maxAmount: 3, arriving: 0, giftAmount: 0, smsCount: 0 },
    { id: "d", fullName: "יוסי", description: "", phone: "", maxAmount: 1, arriving: 0, giftAmount: 0, smsCount: 0 },
  ]);
});

test("lists every guest and builds the personal invitation link", () => {
  const guests = selectAllGuests([
    { id: "b", full_name: "דנה", description: "משפחה", phone_number: "050", guests_max_amount: 2, guests_amount_arriving: -1, guest_gift_amount: 100, sms_count: 2 },
    { id: "a", full_name: "אבי", description: "", guests_max_amount: 1, guests_amount_arriving: 0, guest_gift_amount: null, sms_count: 0 },
  ]);

  assert.equal(guests.map((guest) => guest.fullName).join(","), "אבי,דנה");
  assert.equal(guests[1].giftAmount, 100);
  assert.equal(guests[1].smsCount, 2);
  assert.equal(guestInviteLink("abc"), "https://eyal-shaked-wedding.com/?id=abc");
  assert.equal(guestInviteLink(""), "");
});

test("counts a failed send as an invalid contact and not as undecided", () => {
  const stats = computeGuestStats([
    { guests_max_amount: 2, guests_amount_arriving: -2, sms_count: 0 },
    { guests_max_amount: 1, guests_amount_arriving: 1, sms_count: 1 },
  ]);

  assert.equal(stats.invited, 3);
  assert.equal(stats.arriving, 1);
  assert.equal(stats.notAttending, 0);
  assert.equal(stats.undecided, 0);
  assert.equal(stats.invalidContacts, 1);
  assert.equal(stats.invalid, 2);
});

test("lists only guests whose send failed", () => {
  const guests = selectInvalidGuests([
    { id: "b", full_name: "דנה", guests_max_amount: 2, guests_amount_arriving: -1, phone_number: "050" },
    { id: "g", full_name: "גורג", guests_max_amount: 1, guests_amount_arriving: -2, phone_number: "052-672-7862" },
    { id: "a", full_name: "אבי", guests_max_amount: 1, guests_amount_arriving: 0 },
  ]);

  assert.deepEqual(guests.map((guest) => guest.fullName), ["גורג"]);
  assert.equal(guests[0].arriving, -2);
});

test("resets arriving to zero only for invalid contacts", () => {
  assert.equal(arrivingAfterGuestEdit(-2, -2), 0);
  assert.equal(arrivingAfterGuestEdit(-2, 4), 0);
  assert.equal(arrivingAfterGuestEdit(-1, -1), -1);
  assert.equal(arrivingAfterGuestEdit(3, 3), 3);
  assert.equal(arrivingAfterGuestEdit(0, 2), 2);
});

test("matches a guest by name or phone, ignoring separators", () => {
  const guest = { fullName: "גורג רמלה", phone: "052-672-7862" };

  assert.equal(guestMatchesQuery(guest, ""), true);
  assert.equal(guestMatchesQuery(guest, "רמלה"), true);
  assert.equal(guestMatchesQuery(guest, "0526727862"), true);
  assert.equal(guestMatchesQuery(guest, "672-7862"), true);
  assert.equal(guestMatchesQuery(guest, "דנה"), false);
});
