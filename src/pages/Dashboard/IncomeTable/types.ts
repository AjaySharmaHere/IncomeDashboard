import { Timestamp } from "firebase/firestore";

export interface IncomeEntry {
  productName: string;
  price: string;
  date: string;
  paymentMode: string;
  status: string;
  createdAt: Timestamp;
  agency?: string[];
  productType?: string[];
  resourceLink?: string;
}
export interface Product {
  id: string;
  name?: string;
  price?: number | string;
  createdAt?: any;
}
