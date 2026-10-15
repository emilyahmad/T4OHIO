// Turns a path inside /public into a URL that works under the site's base path
// (e.g. "/T4OHIO/img/logo.png" on GitHub Pages). Full URLs pass through unchanged.
export function asset(path) {
    if (!path || /^(https?:)?\/\//.test(path)) return path;
    const base = import.meta.env.BASE_URL.replace(/\/$/, "");
    return `${base}/${path.replace(/^\//, "")}`;
}
