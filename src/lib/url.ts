/** Prefix a root-relative path with the deploy base (e.g. /villagechurch on a GitHub preview). */
export const u = (path: string) => import.meta.env.BASE_URL.replace(/\/$/, '') + path;
