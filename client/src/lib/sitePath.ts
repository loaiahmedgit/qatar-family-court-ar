const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

export function sitePath(path: string) {
  if (!path.startsWith("/")) return path;
  return `${basePath}${path}` || "/";
}
