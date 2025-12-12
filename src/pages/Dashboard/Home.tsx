import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "../../firebase/firebase";

import IncomeTable from "./IncomeTable/IncomeTable";
import { IncomeEntry } from "./IncomeTable/types";

export default function Home() {
  const [entries, setEntries] = useState<IncomeEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setEntries([]);
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const snapshot = await getDocs(
          collection(db, "users", user.uid, "income_entries")
        );

        const data: IncomeEntry[] = snapshot.docs.map((doc) => {
          const d = doc.data() as any;

          return {
            productName: d.productName ?? "",
            price: String(d.price ?? "0"),
            date: d.date ?? "",
            paymentMode: d.paymentMode ?? "",
            status: d.status ?? "",
            createdAt: d.createdAt,
            agency: d.agency ?? [],
            resourceLink: d.resourceLink ?? "",
          };
        });

        setEntries(data);
      } catch (error) {
        console.error("Error fetching income entries:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  return (
    <div className="min-h-screen px-5 dark:bg-gray-900">
      <IncomeTable entries={entries} />
    </div>
  );
}