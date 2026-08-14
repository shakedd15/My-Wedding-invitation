import assert from "node:assert/strict";
import test from "node:test";
import { computeGuestStats } from "./guestStats.js";

test("aggregates guest dashboard metrics from invitation rows", () => {
  const stats = computeGuestStats([
    { guests_max_amount: 4, guests_amount_arriving: 3, sms_count: 1 },
    { guests_max_amount: 2, guests_amount_arriving: -1, sms_count: 2 },
    { guests_max_amount: 3, guests_amount_arriving: 0, sms_count: 0 },
    { guests_max_amount: 5, guests_amount_arriving: 5, sms_count: 1 },
  ]);

  assert.equal(stats.invited, 14);
  assert.equal(stats.arriving, 8);
  assert.equal(stats.notAttending, 2);
  assert.equal(stats.undecided, 3);
  assert.equal(stats.invalid, 3);
  assert.equal(stats.progressPercent, 71);
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
