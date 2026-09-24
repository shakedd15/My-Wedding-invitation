import assert from "node:assert/strict";
import test from "node:test";
import { isManagePath, isMenuPath, isRsvpShortcut } from "./routes.js";

test("identifies the empty manage page path", () => {
  assert.equal(isManagePath("/manage"), true);
  assert.equal(isManagePath("/manage/"), true);
  assert.equal(isManagePath("/"), false);
});

test("turns on the RSVP-only view only for rsvp=1", () => {
  assert.equal(isRsvpShortcut("?id=guest-id&rsvp=1"), true);
  assert.equal(isRsvpShortcut("rsvp=1"), true);
  assert.equal(isRsvpShortcut("?id=guest-id"), false);
  assert.equal(isRsvpShortcut(""), false);
  assert.equal(isRsvpShortcut("?id=guest-id&utm=whatsapp"), false);
  assert.equal(isRsvpShortcut("?id=guest-id&rsvp=0"), false);
});

test("identifies the menu page path", () => {
  assert.equal(isMenuPath("/menu"), true);
  assert.equal(isMenuPath("/menu/"), true);
  assert.equal(isMenuPath("/menue"), false);
  assert.equal(isMenuPath("/details"), false);
  assert.equal(isMenuPath("/"), false);
});
