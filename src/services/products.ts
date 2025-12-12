import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { Product } from "../pages/Dashboard/IncomeTable/types";

export const getAllProducts = async (): Promise<Product[]> => {
  const snap = await getDocs(collection(db, "products"));

  return snap.docs.map((doc) => {
    const d = doc.data() as any;

    return {
      id: doc.id,
      name: d.name ?? "",
      price: d.price ?? 0,
      description: d.description ?? "",
      createdAt: d.createdAt,
    };
  });
};
