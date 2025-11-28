import { useState, useEffect } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Select from "../Select";
import MultiSelect from "../MultiSelect";
import Input from "../input/InputField";
import FlowbiteDatePicker from "../input/FlowbiteDatePicker";

import { doc, getDoc } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "../../../firebase/firebase";

export default function ProductDetails() {
  const [incomeOptions, setIncomeOptions] = useState({
    product_types: [] as string[],
    agencies: [] as string[],
    payment_modes: [] as string[],
    payment_status: [] as string[],
  });

  const [selectedProductType, setSelectedProductType] = useState<string[]>([]);
  const [selectedAgency, setSelectedAgency] = useState<string[]>([]);
  const [selectedPaymentMode, setSelectedPaymentMode] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  const [selectedDate, setSelectedDate] = useState("");

  // const [formData, setFormData] = useState({
  //   productType: [] as string[],
  //   agency: [] as string[],
  //   paymentMode: "",
  //   price: "",
  //   status: "",
  // });

  // Load income options from Firebase
  useEffect(() => {
    async function loadIncomeOptions() {
      try {
        const user = auth.currentUser;
        console.log("Logged in user:", user?.email, user?.uid);

        const ref = doc(db, "income_options", "W6zS6OAqNYrc10bPTOSy");
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const data = snap.data();
          console.log("Income Options JSON:", JSON.stringify(data, null, 2));
          setIncomeOptions({
            product_types: data.product_types || [],
            agencies: data.agencies || [],
            payment_modes: data.payment_modes || [],
            payment_status: data.payment_status || [],
          });
        } else {
          console.log("No income_options document found");
        }
      } catch (err) {
        console.error("Error fetching income_options:", err);
      }
    }

    loadIncomeOptions();
  }, []);

  const handleFormSubmit = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const dataToSave = {
        productType: selectedProductType,
        agency: selectedAgency,
        paymentMode: selectedPaymentMode,
        price: price,
        status: selectedStatus,
        createdAt: new Date(),
      };

      console.log("Saving Income Data:", dataToSave);

      const userIncomeRef = collection(db, "users", user.uid, "income_entries");
      await addDoc(userIncomeRef, dataToSave);

      alert("Income saved successfully!");
    } catch (err) {
      console.error("Error saving income:", err);
    }
  };

  // Map Firebase arrays to MultiSelect/Select options
  const productTypeOptions = incomeOptions.product_types.map((item) => ({
    value: item,
    text: item,
  }));

  const agencyOptions = incomeOptions.agencies.map((item) => ({
    value: item,
    text: item,
  }));

  const paymentModeOptions = incomeOptions.payment_modes.map((m: string) => ({
    value: m,
    label: m,
  }));

  const statusOptions = incomeOptions.payment_status.map((s: string) => ({
    value: s,
    label: s,
  }));

  return (
    <ComponentCard title="Income Dashboard">
      <div className="space-y-6">
        <MultiSelect
          label="Product Type"
          options={productTypeOptions}
          defaultSelected={[]}
          onChange={setSelectedProductType}
        />

        {/* Field 2 - Agency */}
        <MultiSelect
          label="Field 2 - Agency"
          options={agencyOptions}
          defaultSelected={[]}
          onChange={setSelectedAgency}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Field 3 */}
          <div>
            <Label>Field 3 - Payment Mode</Label>
            <Select
              options={paymentModeOptions}
              placeholder="Select Payment Mode"
              onChange={setSelectedPaymentMode}
            />
          </div>

          {/* Field 4 */}
          <div>
            <Label>Field 4 - Price</Label>
            <Input
              type="number"
              value={price}
              placeholder="Enter Price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Field 3 */}
          <div>
            <Label>Field 5 - Status</Label>
            <Select
              options={statusOptions}
              placeholder="Select Status"
              onChange={setSelectedStatus}
            />
          </div>
          {/* Field 4 */}

          <div>
            <Label>Date</Label>
            <FlowbiteDatePicker
              value={selectedDate}
              onChange={setSelectedDate}
            />
          </div>
        </div>

        <button
          type="submit"
          onClick={handleFormSubmit}
          className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600"
          // onClick={() => {
          //   console.log({
          //     selectedProductType,
          //     selectedAgency,
          //     selectedPaymentMode,
          //     price,
          //     selectedStatus,
          //   });
          // }}
        >
          Submit
        </button>
      </div>
    </ComponentCard>
  );
}
