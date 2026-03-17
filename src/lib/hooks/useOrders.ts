"use client";

import { useEffect, useState } from "react";
import { useFirebaseReady } from "./useFirebaseReady";
import { subscribeToActiveOrders } from "@/lib/firebase/firestore";
import type { Order } from "@/lib/types";

const VENUE_ID = "venue_001";

export function useActiveOrders() {
  const firebaseReady = useFirebaseReady();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!firebaseReady) {
      setLoading(false);
      return;
    }

    const unsubscribe = subscribeToActiveOrders(VENUE_ID, (data) => {
      setOrders(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [firebaseReady]);

  return { orders, loading };
}
