import { guestInviteLink, paymentMethodLabel } from "./guestStats.js";

// Same columns, in the same order, as the "ניהול מוזמנים" table on the manage page.
const COLUMNS = [
  { header: "שם מלא", width: 24, key: "fullName" },
  { header: "תיאור", width: 22, key: "description" },
  { header: "הוזמנו", width: 9, key: "maxAmount" },
  { header: "אישרו הגעה", width: 12, key: "arriving" },
  { header: "טלפון", width: 15, key: "phone" },
  { header: "סכום מתנה", width: 12, key: "giftAmount" },
  { header: "אמצעי תשלום", width: 13, key: "paymentMethod" },
  { header: "הודעות אסמס", width: 13, key: "smsCount" },
  { header: "לינק", width: 62, key: "link" },
];

const NAVY = "FF333399";
const WHITE = "FFFFFFFF";
const BLACK = "FF000000";
const GRID = "FFAAAAAA";

function blank(value) {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function amount(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

export function selectArrivingGuests(guests = []) {
  return guests.filter((guest) => {
    const arriving = Number(guest?.arriving);
    return Number.isFinite(arriving) && arriving > 0;
  });
}

export function invitationCells(guest) {
  return [
    blank(guest?.fullName),
    blank(guest?.description),
    amount(guest?.maxAmount),
    amount(guest?.arriving),
    blank(guest?.phone),
    amount(guest?.giftAmount),
    blank(paymentMethodLabel(guest?.paymentMethod)),
    amount(guest?.smsCount),
    blank(guestInviteLink(guest?.id)),
  ];
}

function headerStyle(ExcelJS) {
  const line = { style: "thin", color: { argb: GRID } };
  return {
    font: { name: "Arial", size: 12, bold: true, color: { argb: WHITE } },
    fill: { type: "pattern", pattern: "solid", fgColor: { argb: NAVY } },
    alignment: {
      horizontal: "center",
      vertical: "middle",
      readingOrder: ExcelJS.ReadingOrder.RightToLeft,
    },
    border: { top: line, left: line, bottom: line, right: line },
  };
}

function dataStyle(ExcelJS) {
  const line = { style: "thin", color: { argb: GRID } };
  return {
    font: { name: "Arial", size: 10, color: { argb: BLACK } },
    alignment: {
      horizontal: "right",
      vertical: "middle",
      readingOrder: ExcelJS.ReadingOrder.RightToLeft,
    },
    border: { top: line, left: line, bottom: line, right: line },
  };
}

export async function buildInvitationsWorkbook(guests = []) {
  const { default: ExcelJS } = await import("exceljs");
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("הזמנות", {
    views: [{ rightToLeft: true, state: "frozen", ySplit: 1 }],
  });
  const header = headerStyle(ExcelJS);
  const data = dataStyle(ExcelJS);

  COLUMNS.forEach((column, index) => {
    sheet.getColumn(index + 1).width = column.width;
    const titleCell = sheet.getCell(1, index + 1);
    titleCell.style = header;
    titleCell.value = column.header;
  });
  sheet.getRow(1).height = 18;

  selectArrivingGuests(guests).forEach((guest, index) => {
    const rowNumber = index + 2;
    invitationCells(guest).forEach((value, columnIndex) => {
      const cell = sheet.getCell(rowNumber, columnIndex + 1);
      const key = COLUMNS[columnIndex].key;
      cell.style = data;
      if (value === null) return;
      if (key === "phone") cell.numFmt = "@";
      cell.value = key === "link" ? { text: value, hyperlink: value } : value;
    });
  });

  return workbook;
}

export async function downloadInvitationsWorkbook(guests = []) {
  const workbook = await buildInvitationsWorkbook(guests);
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "הזמנות.xlsx";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
