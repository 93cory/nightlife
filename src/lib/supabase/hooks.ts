"use client";

import { useEffect, useState } from "react";
import { supabase } from "./client";

/**
 * Check if Supabase is properly configured and reachable
 */
export function useSupabaseReady() {
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function check() {
      try {
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
        if (!url || url.includes("your_")) {
          setReady(false);
          setLoading(false);
          return;
        }
        // Quick ping
        const { error } = await supabase.from("establishments").select("id").limit(1);
        setReady(!error);
      } catch {
        setReady(false);
      } finally {
        setLoading(false);
      }
    }
    check();
  }, []);

  return { ready, loading };
}

/**
 * Subscribe to realtime changes on a table
 */
export function useRealtimeTable<T>(
  tableName: string,
  callback: (payload: { new: T; old: T; eventType: string }) => void
) {
  useEffect(() => {
    const channel = supabase
      .channel(`realtime-${tableName}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: tableName },
        (payload) => {
          callback({
            new: payload.new as T,
            old: payload.old as T,
            eventType: payload.eventType,
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [tableName, callback]);
}

/**
 * Auth helper — sign in with OTP (phone)
 */
export async function signInWithPhone(phone: string) {
  const { data, error } = await supabase.auth.signInWithOtp({
    phone,
  });
  return { data, error };
}

/**
 * Auth helper — verify OTP
 */
export async function verifyOTP(phone: string, token: string) {
  const { data, error } = await supabase.auth.verifyOtp({
    phone,
    token,
    type: "sms",
  });
  return { data, error };
}

/**
 * Auth helper — sign out
 */
export async function signOutSupabase() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

/**
 * Auth helper — get current session
 */
export async function getSession() {
  const { data: { session }, error } = await supabase.auth.getSession();
  return { session, error };
}
