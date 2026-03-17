"use client";

import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./config";
import type { StaffRole } from "@/lib/types";

// ===== CLIENT AUTH (Phone) =====
let confirmationResult: ConfirmationResult | null = null;

export async function sendPhoneOTP(phoneNumber: string, recaptchaContainer: HTMLElement) {
  const recaptchaVerifier = new RecaptchaVerifier(auth, recaptchaContainer, {
    size: "invisible",
  });
  const formattedPhone = phoneNumber.startsWith("+") ? phoneNumber : `+241${phoneNumber}`;
  confirmationResult = await signInWithPhoneNumber(auth, formattedPhone, recaptchaVerifier);
  return confirmationResult;
}

export async function verifyOTP(code: string) {
  if (!confirmationResult) throw new Error("Aucune vérification en cours");
  const result = await confirmationResult.confirm(code);
  const user = result.user;

  // Create user doc if first login
  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) {
    await setDoc(userRef, {
      phone: user.phoneNumber,
      displayName: "",
      role: "client",
      createdAt: serverTimestamp(),
      loyaltyPoints: 0,
      loyaltyTier: "bronze",
      totalSpent: 0,
    });
  }

  return user;
}

// ===== STAFF AUTH (Email/Password) =====
export async function signInStaff(username: string, password: string) {
  const email = username.includes("@") ? username : `${username}@nightlife.ga`;
  const result = await signInWithEmailAndPassword(auth, email, password);

  // Verify staff doc exists
  const staffRef = doc(db, "staff", result.user.uid);
  const staffSnap = await getDoc(staffRef);
  if (!staffSnap.exists()) {
    throw new Error("Compte staff non trouvé");
  }

  return { user: result.user, staffData: staffSnap.data() as { role: StaffRole; displayName: string } };
}

// ===== SIGN OUT =====
export async function signOut() {
  await firebaseSignOut(auth);
}
