"use client";

/**
 * Returns true if Firebase is properly configured (not placeholder values).
 * When false, the app uses built-in demo data.
 */
export function useFirebaseReady(): boolean {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  return !!apiKey && apiKey !== "your_api_key_here" && apiKey.length > 10;
}
