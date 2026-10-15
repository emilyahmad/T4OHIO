import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase.js";
import { AuthContext } from "./AuthContext.js";

// Tracks who is signed in and whether they're an admin (a row in public.admins).
// This only decides what the UI shows; the database's row level security is what actually blocks non-admins.
function AuthProvider({ children }) {
    const [session, setSession] = useState(undefined); // undefined = not known yet
    const [adminCheck, setAdminCheck] = useState({ userId: null, isAdmin: false });

    useEffect(() => {
        // Fires right away with the saved session (INITIAL_SESSION), then on every sign-in/out
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
            setSession(newSession);
        });
        return () => subscription.unsubscribe();
    }, []);

    const userId = session?.user.id ?? null;

    useEffect(() => {
        if (!userId) return;
        let cancelled = false;
        supabase.rpc("is_admin").then(({ data, error }) => {
            if (!cancelled) setAdminCheck({ userId, isAdmin: !error && data === true });
        });
        return () => { cancelled = true; };
    }, [userId]);

    const value = {
        session,
        isAdmin: userId !== null && adminCheck.userId === userId && adminCheck.isAdmin,
        loading: session === undefined || (userId !== null && adminCheck.userId !== userId),
        signOut: () => supabase.auth.signOut(),
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
