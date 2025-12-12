import { useEffect, useMemo, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  DocumentData,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../../../firebase/firebase";
import { IncomeEntry } from "./types";
import { getEntryDateMs, safeNumber } from "./helpers";

export const EXPENDITURE_STATUSES = [
  "expense",
  "expenditure",
  "failed",
  "refunded",
];

export function useProductEntries(
  selectedYear: number,
  selectedMonth: number | null
) {
  const [entries, setEntries] = useState<IncomeEntry[]>([]);
  const [loading, setLoading] = useState(true);

  /* ---------- Firestore ---------- */
  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setEntries([]);
        setLoading(false);
        return;
      }

      const q = query(
        collection(db, "users", user.uid, "income_entries"),
        orderBy("createdAt", "desc")
      );

      const unsub = onSnapshot(q, (snap) => {
        const docs: IncomeEntry[] = [];
        snap.forEach((d) => {
          const x = d.data() as DocumentData;
          docs.push({
            productName: x.productName ?? "—",
            price: String(x.price ?? "0"),
            date: x.date ?? "",
            paymentMode: x.paymentMode ?? "",
            status: x.status ?? "",
            createdAt: x.createdAt,
            agency: Array.isArray(x.agency) ? x.agency : [],
            productType: Array.isArray(x.productType) ? x.productType : [],
          });
        });
        setEntries(docs);
        setLoading(false);
      });

      return () => unsub();
    });

    return () => unsubAuth();
  }, []);

  /* ---------- Years ---------- */
  const years = useMemo(() => {
    const s = new Set<number>();
    entries.forEach((e) => {
      const ms = getEntryDateMs(e);
      if (ms) s.add(new Date(ms).getFullYear());
    });
    s.add(new Date().getFullYear());
    return Array.from(s).sort((a, b) => b - a);
  }, [entries]);

  /* ---------- Month SUCCESS totals (for boxes) ---------- */
  const monthTotals = useMemo(() => {
    const arr = Array(12).fill(0);
    entries.forEach((e) => {
      if (e.status?.toLowerCase() !== "success") return;
      const ms = getEntryDateMs(e);
      if (!ms) return;
      const d = new Date(ms);
      if (d.getFullYear() !== selectedYear) return;
      arr[d.getMonth()] += safeNumber(e.price);
    });
    return arr;
  }, [entries, selectedYear]);

  /* ---------- Stats Helper ---------- */
  const calcStats = (list: IncomeEntry[]) => {
    const income = list
      .filter((e) => e.status.toLowerCase() === "success")
      .reduce((s, e) => s + safeNumber(e.price), 0);

    const pending = list
      .filter(
        (e) =>
          e.status.toLowerCase() !== "success" &&
          !EXPENDITURE_STATUSES.includes(e.status.toLowerCase())
      )
      .reduce((s, e) => s + safeNumber(e.price), 0);

    const expenditure = list
      .filter((e) => EXPENDITURE_STATUSES.includes(e.status.toLowerCase()))
      .reduce((s, e) => s + safeNumber(e.price), 0);

    return { income, pending, expenditure };
  };

  const yearStats = useMemo(() => {
    return calcStats(
      entries.filter((e) => {
        const ms = getEntryDateMs(e);
        return ms && new Date(ms).getFullYear() === selectedYear;
      })
    );
  }, [entries, selectedYear]);

  const monthStats = useMemo(() => {
    if (selectedMonth === null) return null;
    return calcStats(
      entries.filter((e) => {
        const ms = getEntryDateMs(e);
        if (!ms) return false;
        const d = new Date(ms);
        return (
          d.getFullYear() === selectedYear && d.getMonth() === selectedMonth
        );
      })
    );
  }, [entries, selectedYear, selectedMonth]);

  return {
    entries,
    loading,
    years,
    monthTotals,
    yearStats,
    monthStats,
  };
}
