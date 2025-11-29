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
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const [isSaving, setIsSaving] = useState(false);

  const formToastId = "productFormToast";

  // ✅ Load income options
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
        
      }
    }

    loadIncomeOptions();
  }, []);

  // ✅ Submit Handler
  const handleFormSubmit = async () => {
    if (isSaving) return;

    const formData = {
      productType: selectedProductType,
      agency: selectedAgency,
      productName,
      paymentMode: selectedPaymentMode,
      price,
      status: selectedStatus,
      date: selectedDate,
    };

    // ✅ Validation
    const hasEmpty = Object.values(formData).some(
      (val) => val === "" || (Array.isArray(val) && val.length === 0)
    );

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


      // ✅ Reset Form
      setSelectedProductType([]);
      setSelectedAgency([]);
      setProductName("");
      setSelectedPaymentMode("");
      setPrice("");
      setSelectedStatus("");
      setSelectedDate("");

      // ✅ Redirect after short delay
      setTimeout(() => {
        navigate("/home");
      }, 800);
    } catch (error) {
      
    } finally {
      setIsSaving(false);
    }
  };

  // ✅ Dropdown mapping
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
            <Label>Product name</Label>
            <Input
              type="text"
              value={productName}
              placeholder="Enter Product Name"
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div>
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
          className={`flex w-full items-center justify-center rounded-lg px-4 py-3 text-sm font-medium text-white ${
            isSaving
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-brand-500 hover:bg-brand-600"
          }`}
        >
          {isSaving ? "Saving..." : "Submit"}
        </button>

      </div>
    </ComponentCard>
  );
}
