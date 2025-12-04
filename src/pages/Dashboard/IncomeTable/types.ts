import { Timestamp } from "firebase/firestore"; // if using Firestore

export interface IncomeEntry {
  productName: string;
  price: string;
  date: string;
  paymentMode: string;
  status: string;
  createdAt: Timestamp;
  agency?: string[];
}
