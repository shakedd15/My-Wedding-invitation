function isExactPath(pathname, path) {
  return pathname.replace(/\/$/, "").toLowerCase() === path;
}

export function isManagePath(pathname) {
  return isExactPath(pathname, "/manage");
}

export function isMenuPath(pathname) {
  return isExactPath(pathname, "/menu");
}
