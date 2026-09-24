import assert from "node:assert/strict";
import test from "node:test";
import { computeGuestStats, selectRespondedGuests } from "./guestStats.js";

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
  ]);

  assert.deepEqual(guests, [
    { id: "a", fullName: "אבי", description: "משפחה", maxAmount: 4, arriving: 3 },
    { id: "f", fullName: "גלית", description: "משפחה", maxAmount: 2, arriving: 2 },
    { id: "e", fullName: "רות", description: "עבודה", maxAmount: 2, arriving: 2 },
    { id: "b", fullName: "דנה", description: "", maxAmount: 2, arriving: -1 },
  ]);
});
