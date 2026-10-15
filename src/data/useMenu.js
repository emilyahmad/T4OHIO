import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase.js";

// Loads every category with its items, in display order.
// Returns { menu, loading, error }; menu is [{ id, name, items: [...] }].
export function useMenu() {
    const [state, setState] = useState({ menu: [], loading: true, error: null });

    useEffect(() => {
        let cancelled = false;
        supabase
            .from("categories")
            .select("id, name, items:menu_items(*)")
            .order("sort_order")
            .order("sort_order", { referencedTable: "menu_items" })
            .then(({ data, error }) => {
                if (cancelled) return;
                if (error) {
                    console.error("Failed to load menu", error);
                    setState({ menu: [], loading: false, error });
                } else {
                    // numeric columns can arrive as strings; the UI does math on price
                    const menu = data.map(category => ({
                        ...category,
                        items: category.items.map(item => ({ ...item, price: Number(item.price) })),
                    }));
                    setState({ menu, loading: false, error: null });
                }
            });
        return () => { cancelled = true; };
    }, []);

    return state;
}
