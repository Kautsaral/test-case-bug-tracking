import { createContext, useContext, useEffect, useState } from "react";

import { supabase } from "../lib/supabase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileCheckedUserId, setProfileCheckedUserId] = useState(null);

  useEffect(() => {
    let mounted = true;

    const initializeSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (!mounted) return;

      if (error) {
        console.error("Failed to retrieve session:", error);
        setSession(null);
      } else {
        setSession(data.session);
      }

      setLoading(false);
    };

    initializeSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    let mounted = true;

    const fetchProfile = async () => {
      const userId = session?.user?.id;

      if (!userId) {
        setProfile(null);
        setProfileCheckedUserId(null);
        setProfileLoading(false);
        return;
      }

      setProfile(null);
      setProfileLoading(true);

      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("id, full_name, role")
          .eq("id", userId)
          .maybeSingle();

        if (!mounted) return;

        if (error) {
          console.error("Failed to retrieve profile:", error);
          setProfile(null);
        } else {
          setProfile(data);
        }
      } catch (error) {
        if (!mounted) return;

        console.error("Unexpected profile error:", error);
        setProfile(null);
      } finally {
        if (mounted) {
          setProfileCheckedUserId(userId);
          setProfileLoading(false);
        }
      }
    };

    fetchProfile();

    return () => {
      mounted = false;
    };
  }, [session?.user?.id]);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }
  };

  const value = {
    session,
    user: session?.user ?? null,
    profile,
    loading,
    profileLoading,
    profileCheckedUserId,
    isAdmin: profile?.role === "admin",
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }

  return context;
}
