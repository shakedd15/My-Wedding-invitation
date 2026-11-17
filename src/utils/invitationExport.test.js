import assert from "node:assert/strict";
import test from "node:test";
import { buildInvitationsWorkbook, invitationCells } from "./invitationExport.js";

test("maps guest fields onto the manage-table columns", () => {
  assert.deepEqual(
    invitationCells({
      id: "abc",
      fullName: "אבי כהן",
      description: "חברים",
      maxAmount: 3,
      arriving: 2,
      phone: "050-1234567",
      giftAmount: 1000,
      paymentMethod: "bit",
      smsCount: 4,
    }),
    ["אבי כהן", "חברים", 3, 2, "050-1234567", 1000, "ביט", 4, "https://eyal-shaked-wedding.com/?id=abc"],
  );
});

test("leaves missing text and unknown payment methods empty", () => {
  assert.deepEqual(
    invitationCells({
      fullName: "  דנה  ",
      description: "   ",
      maxAmount: 2,
      arriving: -1,
      phone: "",
      giftAmount: 0,
      paymentMethod: "",
      smsCount: 0,
    }),
    ["דנה", null, 2, -1, null, 0, null, 0, null],
  );
});

test("builds a right-to-left sheet whose headers match the manage table", async () => {
  const workbook = await buildInvitationsWorkbook([
    {
      id: "abc",
      fullName: "אבי כהן",
      description: "חברים",
      maxAmount: 3,
      arriving: 2,
      phone: "050-1234567",
      giftAmount: 1000,
      paymentMethod: "check",
      smsCount: 4,
    },
  ]);
  const sheet = workbook.getWorksheet("הזמנות");

  assert.equal(sheet.views[0].rightToLeft, true);
  assert.deepEqual(
    sheet.getRow(1).values.slice(1),
    ["שם מלא", "תיאור", "הוזמנו", "אישרו הגעה", "טלפון", "סכום מתנה", "אמצעי תשלום", "הודעות אסמס", "לינק"],
  );
  assert.equal(sheet.getCell("A2").value, "אבי כהן");
  assert.equal(sheet.getCell("B2").value, "חברים");
  assert.equal(sheet.getCell("C2").value, 3);
  assert.equal(sheet.getCell("D2").value, 2);
  assert.equal(sheet.getCell("E2").value, "050-1234567");
  assert.equal(sheet.getCell("F2").value, 1000);
  assert.equal(sheet.getCell("G2").value, "צ'ק");
  assert.equal(sheet.getCell("H2").value, 4);
  assert.equal(sheet.getCell("I2").value.hyperlink, "https://eyal-shaked-wedding.com/?id=abc");
  assert.equal(sheet.getCell("A1").fill.fgColor.argb, "FF333399");
});
