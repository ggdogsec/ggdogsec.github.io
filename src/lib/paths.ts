/** Prefix an internal path with Astro's configured base. Always trailing-slash. */
export function sitePath(path = ''): string {
  const base = import.meta.env.BASE_URL;
  const prefix = base.endsWith('/') ? base : `${base}/`;
  if (!path || path === '/') return prefix;
  const clean = path.replace(/^\/+|\/+$/g, '');
  return `${prefix}${clean}/`;
}

export function categoryPath(id: string): string {
  return sitePath(`heji/${id}`);
}

export function postPath(id: string): string {
  return sitePath(`posts/${id}`);
}
