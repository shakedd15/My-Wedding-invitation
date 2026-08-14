import assert from "node:assert/strict";
import test from "node:test";
import { isManagePath } from "./routes.js";

test("identifies the empty manage page path", () => {
  assert.equal(isManagePath("/manage"), true);
  assert.equal(isManagePath("/manage/"), true);
  assert.equal(isManagePath("/"), false);
});
