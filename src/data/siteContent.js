// Front page content the owner edits from the admin dashboard (stored in public.site_content).
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase.js";

// Shown if the database can't be reached. Matches what supabase/admin.sql seeds.
export const DEFAULT_CONTENT = {
    hero: {
        title: "T4 Ohio",
        subtitle1: "A cup of tea for you",
        subtitle2: "清茶达人",
        image: "img/hero-img.png",
        alt: "Two hands adjusting a set up of four tea cups on a wooden basket with a brown plant on the right side.",
    },
    seasonal: {
        title: "Seasonal Flavors",
        subtitle: "Stay up-to-date with new drinks, snacks, upcoming events and promotions",
        cards: [
            { id: "poster-1", image: "img/posters/poster1.png", alt: "A poster of a tiramisu frappe boba drink", description: "A rich and creamy milk tea layered with soft cake textures and chewy boba for a perfectly indulgent treat.", visible: true },
            { id: "poster-2", image: "img/posters/poster2.png", alt: "A poster of a boba cake milk tea drink", description: "A smooth iced coffee topped with a velvety sea salt cream foam that creates the perfect balance of sweet and savory.", visible: true },
            { id: "poster-3", image: "img/posters/poster3.png", alt: "A poster of a cream crown sea salt coffee boba tea drink", description: "A smooth iced coffee topped with a velvety sea salt cream foam that creates the perfect balance of sweet and savory.", visible: true },
        ],
    },
    // Real customer reviews the owner adds from the dashboard; starts empty
    reviews: {
        title: "Reviews",
        reviews: [],
    },
    // Up to 4 images; the layout on the home page depends on how many there are
    promotions: {
        title: "Promotions",
        images: [
            { id: "promo-1", image: "img/menu-video-img.png", alt: "Several T4 drinks with teal lids on a wooden tray" },
            { id: "promo-2", image: "img/video.png", alt: "Promotion placeholder" },
            { id: "promo-3", image: "img/tea-video-img.png", alt: "An aerial view of Taipei, Taiwan" },
        ],
    },
};

export const MAX_PROMOTION_IMAGES = 4;

// T4 Ohio's Google listing, opened on its reviews
export const GOOGLE_REVIEWS_URL = "https://www.google.com/maps/place/T4+(Tea+For+U)+Bubble+Tea+Cafe+SnackBar/@39.6114373,-84.1621521,17z/data=!4m8!3m7!1s0x88408f83aaac65af:0xa78426d198186c18!8m2!3d39.6114373!4d-84.1595772!9m1!1b1!16s%2Fg%2F11t639bf79";

// Loads every section. Returns { content, updatedAt, loading, error };
// content always has every section (falling back to the defaults), updatedAt is { [key]: Date }.
export function useSiteContent() {
    const [state, setState] = useState({ content: DEFAULT_CONTENT, updatedAt: {}, loading: true, error: null });

    useEffect(() => {
        let cancelled = false;
        supabase
            .from("site_content")
            .select("key, content, updated_at")
            .then(({ data, error }) => {
                if (cancelled) return;
                if (error) {
                    console.error("Failed to load site content", error);
                    setState({ content: DEFAULT_CONTENT, updatedAt: {}, loading: false, error });
                    return;
                }
                const content = { ...DEFAULT_CONTENT };
                const updatedAt = {};
                for (const row of data) {
                    content[row.key] = { ...DEFAULT_CONTENT[row.key], ...row.content };
                    updatedAt[row.key] = new Date(row.updated_at);
                }
                setState({ content, updatedAt, loading: false, error: null });
            });
        return () => { cancelled = true; };
    }, []);

    return state;
}

// Saves the given sections ({ hero: {...}, seasonal: {...}, promotions: {...}, reviews: {...} }). Resolves to an error or null.
export async function saveSiteContent(sections) {
    const rows = Object.entries(sections).map(([key, content]) => ({ key, content }));
    const { error } = await supabase.from("site_content").upsert(rows);
    return error;
}
