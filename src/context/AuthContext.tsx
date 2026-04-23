import { createContext, useContext, useEffect, useState } from 'react';
import type { User, Session } from '@supabase/supabase-js';

import { supabase, isSupabaseConfigured } from '../lib/supabase';

export type AdminRole = 'superadmin' | 'editor' | null;

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  /** Any admin-level role (superadmin or editor). */
  isAdmin: boolean;
  /** True only for superadmin (can delete products). */
  isSuperadmin: boolean;
  role: AdminRole;
  signOut: () => Promise<void>;
  refreshRole: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  isAdmin: false,
  isSuperadmin: false,
  role: null,
  signOut: async () => { },
  refreshRole: async () => { },
});

function normalizeRole(raw: string | null | undefined): AdminRole {
  if (raw === 'superadmin' || raw === 'admin') return 'superadmin';
  if (raw === 'editor') return 'editor';
  return null;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<AdminRole>(null);

  const resolveAdminRole = async (userId: string | null) => {
    if (!userId || !isSupabaseConfigured()) {
      setRole(null);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .maybeSingle();

      if (error) {
        setRole(null);
        return;
      }

      setRole(normalizeRole(data?.role));
    } catch (error) {
      console.error('Role resolution error:', error);
      setRole(null);
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      await resolveAdminRole(session?.user?.id ?? null);
      setLoading(false);
    }).catch((error) => {
      console.error("Auth initialization error:", error);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      await resolveAdminRole(session?.user?.id ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setRole(null);
  };

  const refreshRole = async () => {
    await resolveAdminRole(user?.id ?? null);
  };

  const isAdmin = role === 'superadmin' || role === 'editor';
  const isSuperadmin = role === 'superadmin';

  return (
    <AuthContext.Provider value={{ user, session, loading, isAdmin, isSuperadmin, role, signOut, refreshRole }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
