"use client";

import { useEffect, useState } from "react";
import { useFirebaseReady } from "./useFirebaseReady";
import { subscribeToCaisse, subscribeToTransactions } from "@/lib/firebase/firestore";
import type { CaisseSession, Transaction } from "@/lib/types";

const VENUE_ID = "venue_001";

export function useCaisse() {
  const firebaseReady = useFirebaseReady();
  const [session, setSession] = useState<CaisseSession | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!firebaseReady) {
      setLoading(false);
      return;
    }

    const unsubCaisse = subscribeToCaisse(VENUE_ID, (s) => {
      setSession(s);
      setLoading(false);
    });

    return () => unsubCaisse();
  }, [firebaseReady]);

  useEffect(() => {
    if (!session?.id || !firebaseReady) return;

    const unsubTxn = subscribeToTransactions(session.id, (txns) => {
      setTransactions(txns);
    });

    return () => unsubTxn();
  }, [session?.id, firebaseReady]);

  return { session, transactions, loading };
}
