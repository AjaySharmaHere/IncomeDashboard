import { IncomeEntry } from "./types";
import { Timestamp } from "firebase/firestore";

export const getEntryDateMs = (entry: IncomeEntry): number => {
  if (entry.date) {
    const ms = Date.parse(entry.date);
    if (!isNaN(ms)) return ms;
  }
  if ((entry.createdAt as any)?.toDate) {
    return (entry.createdAt as Timestamp).toDate().getTime();
  }
  return 0;
};

export const formatDate = (entry: IncomeEntry) => {
  const ms = getEntryDateMs(entry);
  if (!ms) return "-";
  return new Date(ms).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const safeNumber = (v: any) => {
  const n = Number(v);
  return isNaN(n) ? 0 : n;
};

export const currency = (n: number) =>
  n.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });

export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
