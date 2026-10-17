// Pulls the 11-character video id out of a YouTube link (watch, youtu.be, embed, shorts) or a bare id.
// Returns null if it can't find one.
export function youtubeId(input) {
    if (!input) return null;
    const text = input.trim();
    if (/^[\w-]{11}$/.test(text)) return text;
    const match = text.match(/(?:youtu\.be\/|[?&]v=|\/embed\/|\/shorts\/|\/live\/)([\w-]{11})/);
    return match ? match[1] : null;
}

export const youtubeThumbnail = (id) => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
