import { Check } from "lucide-react";
import { useStore } from "../context/StoreContext.jsx";

export default function Toast() {
  const { notice } = useStore();
  if (!notice) return null;
  return <div className="toast"><span className="toast-check"><Check size={14} /></span>{notice}</div>;
}
