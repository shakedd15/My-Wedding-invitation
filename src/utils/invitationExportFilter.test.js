import assert from "node:assert/strict";
import test from "node:test";
import { buildInvitationsWorkbook, selectArrivingGuests } from "./invitationExport.js";

test("keeps only guests with a positive arriving count", () => {
  assert.deepEqual(
    selectArrivingGuests([
      { fullName: "לא מגיעה", arriving: -1 },
      { fullName: "טרם השיבה", arriving: 0 },
      { fullName: "מגיע", arriving: 3 },
      { fullName: "בלי מספר", arriving: null },
    ]).map((guest) => guest.fullName),
    ["מגיע"],
  );
});

test("writes only arriving guests into the workbook", async () => {
  const workbook = await buildInvitationsWorkbook([
    { fullName: "לא מגיעה", arriving: -1, description: "משפחה", giftAmount: 100 },
    { fullName: "טרם השיבה", arriving: 0, description: "עבודה", giftAmount: 50 },
    { fullName: "מגיע", arriving: 3, description: "חברים", giftAmount: 200 },
  ]);
  const sheet = workbook.getWorksheet("הזמנות");

  assert.equal(sheet.getCell("A3").value, "מגיע");
  assert.equal(sheet.getCell("B3").value, 3);
  assert.equal(sheet.getCell("D3").value, "חברים");
  assert.equal(sheet.getCell("L3").value, 200);
  assert.equal(sheet.getCell("A4").value, null);
});
