const COLUMNS = [
  { header: "הזמנה לכבוד", width: 19.35, key: "fullName" },
  { header: "מס' אורחים שהוזמנו", width: 19, key: "arriving" },
  { header: "צד", width: 8.35, key: "side" },
  { header: "קבוצה", width: 15.35, key: "description" },
  { header: "סלולרי", width: 12.35, key: "phone" },
  { header: "טלפון רגיל", width: 12.35, key: "landline" },
  { header: "אימייל", width: 23.17, key: "email" },
  { header: "עיר", width: 8.67, key: "city" },
  { header: "רחוב", width: 15.17, key: "street" },
  { header: "מיקוד", width: 6.67, key: "zip" },
  { header: "תא דואר", width: 8.5, key: "poBox" },
  { header: "צ'ק צפוי", width: 8.85, key: "gift" },
];

const GROUP_HEADERS = [
  { from: 3, to: 4, label: "שיוך" },
  { from: 5, to: 7, label: "פרטי התקשרות" },
  { from: 8, to: 11, label: "כתובת" },
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

export function invitationCells(guest) {
  return [
    blank(guest?.fullName),
    amount(guest?.arriving),
    null,
    blank(guest?.description),
    blank(guest?.phone),
    null,
    null,
    null,
    null,
    null,
    null,
    amount(guest?.giftAmount),
  ];
}

function headerStyle(ExcelJS) {
  const line = { style: "thin", color: { argb: GRID } };
  return {
    font: { name: "Arial", size: 12, color: { argb: WHITE } },
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
    views: [{ rightToLeft: true }],
  });
  const header = headerStyle(ExcelJS);
  const data = dataStyle(ExcelJS);

  COLUMNS.forEach((column, index) => {
    sheet.getColumn(index + 1).width = column.width;
  });

  for (let column = 1; column <= COLUMNS.length; column += 1) {
    const groupCell = sheet.getCell(1, column);
    const titleCell = sheet.getCell(2, column);
    groupCell.style = header;
    titleCell.style = header;
    titleCell.value = COLUMNS[column - 1].header;
  }

  for (const group of GROUP_HEADERS) {
    sheet.mergeCells(1, group.from, 1, group.to);
    sheet.getCell(1, group.from).value = group.label;
  }

  sheet.getRow(1).height = 16.6;
  sheet.getRow(2).height = 16.6;

  guests.forEach((guest, index) => {
    const rowNumber = index + 3;
    const row = sheet.getRow(rowNumber);
    row.height = 14.6;
    invitationCells(guest).forEach((value, columnIndex) => {
      const cell = sheet.getCell(rowNumber, columnIndex + 1);
      cell.style = data;
      if (value !== null) cell.value = value;
      if (COLUMNS[columnIndex].key === "phone" && value) cell.numFmt = "@";
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
