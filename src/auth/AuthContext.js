import { createContext, useContext } from "react";

export const AuthContext = createContext(null);

// { session, isAdmin, loading, signOut } — see AuthProvider.jsx
export function useAuth() {
    return useContext(AuthContext);
}
