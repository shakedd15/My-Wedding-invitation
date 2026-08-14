export function isManagePath(pathname) {
  return pathname.replace(/\/$/, "").toLowerCase() === "/manage";
}
