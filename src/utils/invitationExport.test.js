import assert from "node:assert/strict";
import test from "node:test";
import { buildInvitationsWorkbook, invitationCells } from "./invitationExport.js";

test("maps guest fields onto the invitation columns", () => {
  assert.deepEqual(
    invitationCells({
      fullName: "אבי כהן",
      arriving: 2,
      description: "חברים",
      phone: "050-1234567",
      giftAmount: 1000,
    }),
    ["אבי כהן", 2, null, "חברים", "050-1234567", null, null, null, null, null, null, 1000],
  );
});

test("keeps unmapped columns empty and preserves a declined count", () => {
  assert.deepEqual(
    invitationCells({
      fullName: "  דנה  ",
      arriving: -1,
      description: "   ",
      phone: "",
      giftAmount: 0,
    }),
    ["דנה", -1, null, null, null, null, null, null, null, null, null, 0],
  );
});

test("builds a right-to-left invitations sheet like the template", async () => {
  const workbook = await buildInvitationsWorkbook([
    {
      fullName: "אבי כהן",
      arriving: 2,
      description: "חברים",
      phone: "050-1234567",
      giftAmount: 1000,
    },
  ]);
  const sheet = workbook.getWorksheet("הזמנות");

  assert.equal(sheet.views[0].rightToLeft, true);
  assert.equal(sheet.getCell("C1").value, "שיוך");
  assert.equal(sheet.getCell("E1").value, "פרטי התקשרות");
  assert.equal(sheet.getCell("H1").value, "כתובת");
  assert.equal(sheet.getCell("A2").value, "הזמנה לכבוד");
  assert.equal(sheet.getCell("B2").value, "מס' אורחים שהוזמנו");
  assert.equal(sheet.getCell("L2").value, "צ'ק צפוי");
  assert.equal(sheet.getCell("A3").value, "אבי כהן");
  assert.equal(sheet.getCell("B3").value, 2);
  assert.equal(sheet.getCell("C3").value, null);
  assert.equal(sheet.getCell("D3").value, "חברים");
  assert.equal(sheet.getCell("E3").value, "050-1234567");
  assert.equal(sheet.getCell("F3").value, null);
  assert.equal(sheet.getCell("L3").value, 1000);
  assert.equal(sheet.getCell("A2").fill.fgColor.argb, "FF333399");
  assert.ok(sheet.getCell("C1").isMerged);
});
