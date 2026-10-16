import { useCallback, useMemo, useState } from "react";

const HISTORY_LIMIT = 100;

// A draft with undo/redo, compared against the last saved copy.
//
// update(next, mergeKey): `next` is a value or an updater function. Consecutive updates with the same
//   mergeKey (e.g. typing in one field) collapse into a single undo step.
// discard(): goes back to the saved copy — itself undoable, in case it was clicked by mistake.
// markSaved(value): call after a successful save; the draft becomes the new baseline.
export function useEditHistory(initial) {
    const [state, setState] = useState({ past: [], present: initial, future: [], saved: initial, lastKey: null });

    const update = useCallback((next, mergeKey = null) => setState(s => {
        const value = typeof next === "function" ? next(s.present) : next;
        if (value === s.present) return s;
        const merge = mergeKey !== null && mergeKey === s.lastKey;
        return {
            ...s,
            past: merge ? s.past : [...s.past, s.present].slice(-HISTORY_LIMIT),
            present: value,
            future: [],
            lastKey: mergeKey,
        };
    }), []);

    const undo = useCallback(() => setState(s => s.past.length === 0 ? s : {
        ...s,
        past: s.past.slice(0, -1),
        present: s.past[s.past.length - 1],
        future: [s.present, ...s.future],
        lastKey: null,
    }), []);

    const redo = useCallback(() => setState(s => s.future.length === 0 ? s : {
        ...s,
        past: [...s.past, s.present],
        present: s.future[0],
        future: s.future.slice(1),
        lastKey: null,
    }), []);

    const discard = useCallback(() => setState(s => s.present === s.saved ? s : {
        ...s,
        past: [...s.past, s.present].slice(-HISTORY_LIMIT),
        present: s.saved,
        future: [],
        lastKey: null,
    }), []);

    const markSaved = useCallback((value) => setState(s => ({ ...s, saved: value, lastKey: null })), []);

    const savedJson = useMemo(() => JSON.stringify(state.saved), [state.saved]);
    const presentJson = useMemo(() => JSON.stringify(state.present), [state.present]);

    return {
        draft: state.present,
        saved: state.saved,
        dirty: savedJson !== presentJson,
        canUndo: state.past.length > 0,
        canRedo: state.future.length > 0,
        update, undo, redo, discard, markSaved,
    };
}
