import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Select from "../Select";
import MultiSelect from "../MultiSelect";
import Input from "../input/InputField";
import FlowbiteDatePicker from "../input/FlowbiteDatePicker";

import { doc, getDoc, collection, addDoc } from "firebase/firestore";
import { db, auth } from "../../../firebase/firebase";

import { toast } from "react-hot-toast";

export default function ProductDetails() {
  const navigate = useNavigate();

  const [incomeOptions, setIncomeOptions] = useState({
    product_types: [] as string[],
    agencies: [] as string[],
    payment_modes: [] as string[],
    payment_status: [] as string[],
  });

  const [selectedProductType, setSelectedProductType] = useState<string[]>([]);
  const [selectedAgency, setSelectedAgency] = useState<string[]>([]);
  const [productName, setProductName] = useState("");
  const [selectedPaymentMode, setSelectedPaymentMode] = useState("");
  const [price, setPrice] = useState("");
  const [resourceLink, setResourceLink] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const [isSaving, setIsSaving] = useState(false);

  const formToastId = "productFormToast";

  useEffect(() => {
    async function loadIncomeOptions() {
      try {
        const ref = doc(db, "income_options", "W6zS6OAqNYrc10bPTOSy");
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const data = snap.data();
          setIncomeOptions({
            product_types: data.product_types || [],
            agencies: data.agencies || [],
            payment_modes: data.payment_modes || [],
            payment_status: data.status || [],
          });
        }
      } catch (err) {
        console.error("Error loading options:", err);
      }
    }

    loadIncomeOptions();
  }, []);

  const handleFormSubmit = async () => {
    if (isSaving) return;

    const formData = {
      productType: selectedProductType,
      agency: selectedAgency,
      productName,
      paymentMode: selectedPaymentMode,
      price,
      resourceLink,
      status: selectedStatus,
      date: selectedDate,
    };

    const hasEmpty = [
      formData.productType,
      formData.productName,
      formData.paymentMode,
      formData.price,
      formData.status,
      formData.date,
    ].some((val) => val === "" || (Array.isArray(val) && val.length === 0));


    if (hasEmpty) {
      toast.error("⚠️ Please fill all fields before submitting.", {
        id: formToastId,
      });
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      toast.error("User not logged in", { id: formToastId });
      return;
    }

    const userIncomeRef = collection(db, "users", user.uid, "income_entries");

    try {
      setIsSaving(true);
      await toast.promise(
        addDoc(userIncomeRef, { ...formData, createdAt: new Date() }),
        {
          loading: "Saving income...",
          success: "Income saved successfully!",
          error: "Failed to save income.",
        }
      );

      // Reset form
      setSelectedProductType([]);
      setSelectedAgency([]);
      setProductName("");
      setSelectedPaymentMode("");
      setPrice("");
      setResourceLink("");
      setSelectedStatus("");
      setSelectedDate("");

      setTimeout(() => {
        navigate("/home");
      }, 800);
    } catch (error) {
      console.error("Error saving:", error);
      toast.error("Failed to save income.");
    } finally {
      setIsSaving(false);
    }
  };

  const productTypeOptions = incomeOptions.product_types.map((item) => ({
    value: item,
    text: item,
  }));

  const agencyOptions = incomeOptions.agencies.map((item) => ({
    value: item,
    text: item,
  }));

  const paymentModeOptions = incomeOptions.payment_modes.map((m) => ({
    value: m,
    label: m,
  }));

  const statusOptions = incomeOptions.payment_status.map((s) => ({
    value: s,
    label: s,
  }));

  return (
    <ComponentCard title="Income Dashboard">
      <div className="space-y-6">
        <MultiSelect
          label="Product Type"
          options={productTypeOptions}
          onChange={setSelectedProductType}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MultiSelect
            label="Agency"
            options={agencyOptions}
            onChange={setSelectedAgency}
          />

          <div>
            <Label>Product Name</Label>
            <Input
              type="text"
              value={productName}
              placeholder="Enter Product Name"
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="text-gray-800 dark:text-white">
            <Label>Payment Mode</Label>
            <Select
              options={paymentModeOptions}
              placeholder="Select Payment Mode"
              onChange={setSelectedPaymentMode}
            />
          </div>

          <div>
            <Label>Price</Label>
            <Input
              type="number"
              value={price}
              placeholder="Enter Price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>

        <div>
          <Label>Resources / Links</Label>
          <Input
            type="text"
            value={resourceLink}
            placeholder="Paste link here"
            onChange={(e) => setResourceLink(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="text-gray-800 dark:text-white">
            <Label>Status</Label>
            <Select
              options={statusOptions}
              placeholder="Select Status"
              onChange={setSelectedStatus}
            />
          </div>

          <div>
            <Label>Date</Label>
            <FlowbiteDatePicker
              value={selectedDate}
              onChange={(val: string | Date | null | undefined) => {
                if (!val) return;
                if (typeof val === "string") setSelectedDate(val);
                else setSelectedDate(val.toISOString().split("T")[0]);
              }}
            />
          </div>
        </div>

        <button
          type="button"
          disabled={isSaving}
          onClick={handleFormSubmit}
          className={`flex w-full items-center justify-center rounded-lg px-4 py-3 text-sm font-medium text-white ${isSaving ? "bg-gray-400 cursor-not-allowed" : "bg-brand-500 hover:bg-brand-600"
            }`}
        >
          {isSaving ? "Saving..." : "Submit"}
        </button>
      </div>
    </ComponentCard>
  );
}