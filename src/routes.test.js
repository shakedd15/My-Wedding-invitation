import assert from "node:assert/strict";
import test from "node:test";
import { isManagePath, isMenuPath } from "./routes.js";

test("identifies the empty manage page path", () => {
  assert.equal(isManagePath("/manage"), true);
  assert.equal(isManagePath("/manage/"), true);
  assert.equal(isManagePath("/"), false);
});

test("identifies the menu page path", () => {
  assert.equal(isMenuPath("/menu"), true);
  assert.equal(isMenuPath("/menu/"), true);
  assert.equal(isMenuPath("/menue"), false);
  assert.equal(isMenuPath("/details"), false);
  assert.equal(isMenuPath("/"), false);
});
