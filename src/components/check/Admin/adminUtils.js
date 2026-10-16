// Helpers shared by the admin editors.
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

// Tells the admin layout whether this page has unsaved changes (it warns before leaving).
export function useReportDirty(dirty) {
    const { setDirty } = useOutletContext();
    useEffect(() => { setDirty(dirty); }, [dirty, setDirty]);
    useEffect(() => () => setDirty(false), [setDirty]);
}

// Returns a copy of `list` with the element at `index` moved by `delta` places.
export function moveInList(list, index, delta) {
    const target = index + delta;
    if (target < 0 || target >= list.length) return list;
    const next = [...list];
    [next[index], next[target]] = [next[target], next[index]];
    return next;
}

export function shortId() {
    return crypto.randomUUID().slice(0, 8);
}
