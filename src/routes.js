function isExactPath(pathname, path) {
  return pathname.replace(/\/$/, "").toLowerCase() === path;
}

export function isManagePath(pathname) {
  return isExactPath(pathname, "/manage");
}

export function isMenuPath(pathname) {
  return isExactPath(pathname, "/menu");
}

export function isRsvpShortcut(search = "") {
  const query = String(search).replace(/^\?/, "");
  return new URLSearchParams(query).get("rsvp") === "1";
}
