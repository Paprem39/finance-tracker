"use client";

import { useEffect, useState } from "react";
import {Pencil,Trash2,CheckCircle,} from "lucide-react";

type DebtItem = {
  id: number;
  name: string;
  amount: number;
};

type BillItem = {
  id: number;
  name: string;
  amount: number;
  paid: boolean;
};

export default function DebtPage() {

  const [editType, setEditType] =
  useState<
  "creditor" |
  "debtor" |
  "bill" |
  null
  >(null);

  const [editItemId, setEditItemId] =
  useState<number | null>(null);

  const [editName, setEditName] =
  useState("");

  const [editAmount, setEditAmount] =
  useState("");
  // =========================
  // Creditor
  // =========================
  const [creditors, setCreditors] =
    useState<DebtItem[]>([]);

  const [showCreditorPopup, setShowCreditorPopup] =
    useState(false);

  const [creditorName, setCreditorName] =
    useState("");

  const [creditorAmount, setCreditorAmount] =
    useState("");

  // =========================
  // Debtor
  // =========================
  const [debtors, setDebtors] =
    useState<DebtItem[]>([]);

  const [showDebtorPopup, setShowDebtorPopup] =
    useState(false);

  const [debtorName, setDebtorName] =
    useState("");

  const [debtorAmount, setDebtorAmount] =
    useState("");

  // =========================
  // Monthly Bills
  // =========================
  const [bills, setBills] =
    useState<BillItem[]>([]);

  const [showBillPopup, setShowBillPopup] =
    useState(false);

  const [billName, setBillName] =
    useState("");

  // =========================
  // Creditors
  // =========================
  const [billAmount, setBillAmount] =
    useState("");

    const fetchCreditors = async () => {
      try {
    
        const res =
          await fetch("/api/creditor");
    
        const data =
          await res.json();
    
        setCreditors(data);
    
      } catch (error) {
    
        console.error(error);
    
      }
    };

    const fetchDebtors = async () => {
      try {
        const res =
          await fetch("/api/debtors");
    
        const data =
          await res.json();
    
        setDebtors(data);
    
      } catch (error) {
        console.error(error);
      }
    };

    const fetchMonthlyBills = async () => {
      try {
        const res =
          await fetch("/api/monthlybill");
    
        const data =
          await res.json();
    
        setBills(data);
    
      } catch (error) {
        console.error(error);
      }
    };

  // =========================
  // Add Creditor
  // =========================
  const addCreditor = async () => {
    if (!creditorName || !creditorAmount)
      return;

    await fetch("/api/creditor", {
      method: "POST",
    
      headers: {
        "Content-Type":
          "application/json",
      },
    
      body: JSON.stringify({
        name: creditorName,
        amount:
          Number(creditorAmount),
      }),
    });
    
    await fetchCreditors();

    setCreditorName("");
    setCreditorAmount("");

    setShowCreditorPopup(false);
  };

  // =========================
  // Add Debtor
  // =========================
  const addDebtor = async () => {

    if (!debtorName || !debtorAmount)
      return;
  
    await fetch("/api/debtors", {
      method: "POST",
  
      headers: {
        "Content-Type":
          "application/json",
      },
  
      body: JSON.stringify({
        name: debtorName,
        amount:
          Number(debtorAmount),
      }),
    });
  
    await fetchDebtors();
  
    setDebtorName("");
    setDebtorAmount("");
  
    setShowDebtorPopup(false);
  };

  // =========================
  // Add Bill
  // =========================
  const addBill = async () => {

    if (!billName || !billAmount)
      return;
  
    await fetch("/api/monthlybill", {
      method: "POST",
  
      headers: {
        "Content-Type":
          "application/json",
      },
  
      body: JSON.stringify({
        name: billName,
        amount:
          Number(billAmount),
      }),
    });
  
    await fetchMonthlyBills();
  
    setBillName("");
    setBillAmount("");
  
    setShowBillPopup(false);
  };

  // =========================
// Toggle Bill Paid
// =========================
const toggleBillPaid = async (
  id: number
) => {

  const bill =
    bills.find(
      (item) => item.id === id
    );

  if (!bill) return;

  await fetch(
    `/api/monthlybill/${id}`,
    {
      method: "PUT",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        paid: !bill.paid,
      }),
    }
  );

  await fetchMonthlyBills();
};
  
  // =========================
  // Delete
  // =========================
  const deleteCreditor = async (
    id: number
  ) => {

    const confirmDelete = window.confirm(
      "คุณต้องการลบเจ้าหนี้รายการนี้ใช่ไหม ?"
    );
  
    if (!confirmDelete) return;

      await fetch(
        `/api/creditor/${id}`,
        {
          method: "DELETE",
        }
      );
      
      await fetchCreditors();
  };

  const deleteDebtor = async (
    id: number
  ) => {

    const confirmDelete = window.confirm(
      "คุณต้องการลบลูกหนี้รายการนี้ใช่ไหม ?"
    );

    if (!confirmDelete) return;

    await fetch(
      `/api/debtors/${id}`,
      {
        method: "DELETE",
      }
    );
    
    await fetchDebtors();
  };

  const deleteBill = async (
    id: number
  ) => {
  
    const confirmDelete =
      window.confirm(
        "คุณต้องการลบค่าใช้จ่ายรายการนี้ใช่ไหม ?"
      );
  
    if (!confirmDelete)
      return;
  
    await fetch(
      `/api/monthlybill/${id}`,
      {
        method: "DELETE",
      }
    );
  
    await fetchMonthlyBills();
  };

  // =========================
  // Edit
  // =========================
  const editCreditor = (
    item: DebtItem
  ) => {
  
    setEditType("creditor");
  
    setEditItemId(item.id);
  
    setEditName(item.name);
  
    setEditAmount(
      item.amount.toString()
    );
  };

  const editDebtor = (
    item: DebtItem
  ) => {
  
    setEditType("debtor");
  
    setEditItemId(item.id);
  
    setEditName(item.name);
  
    setEditAmount(
      item.amount.toString()
    );
  };

  const editBill = (
    item: BillItem
  ) => {
  
    setEditType("bill");
  
    setEditItemId(item.id);
  
    setEditName(item.name);
  
    setEditAmount(
      item.amount.toString()
    );
  };

  const saveEdit = async () => {

    if (
      !editItemId ||
      !editName ||
      !editAmount
    ) {
      return;
    }
  
    let endpoint = "";
  
    if (editType === "creditor") {
      endpoint =
        `/api/creditor/${editItemId}`;
    }
  
    if (editType === "debtor") {
      endpoint =
        `/api/debtors/${editItemId}`;
    }
  
    if (editType === "bill") {
      endpoint =
        `/api/monthlybill/${editItemId}`;
    }
  
    await fetch(endpoint, {
      method: "PUT",
  
      headers: {
        "Content-Type":
          "application/json",
      },
  
      body: JSON.stringify({
        name: editName,
        amount:
          Number(editAmount),
      }),
    });
  
    if (editType === "creditor") {
      await fetchCreditors();
    }
  
    if (editType === "debtor") {
      await fetchDebtors();
    }
  
    if (editType === "bill") {
      await fetchMonthlyBills();
    }
  
    setEditType(null);
  
    setEditItemId(null);
  
    setEditName("");
  
    setEditAmount("");
  };

  useEffect(() => {
    fetchCreditors();
    fetchDebtors();
    fetchMonthlyBills();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-100 p-6 text-black">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-black text-gray-800 mb-3">
          🤝 เจ้าหนี้ / ลูกหนี้
        </h1>

        <p className="text-gray-500 text-lg">
          จัดการหนี้สิน รายจ่ายประจำ และค่างวดของคุณ
        </p>
      </div>

      {/* Grid */}
      <div className="grid xl:grid-cols-2 gap-6">
        {/* Creditor */}
        <div className="bg-white rounded-[32px] shadow-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-black">
                📌 เจ้าหนี้
              </h2>
              <p className="text-gray-500 mt-2">
                รายการเจ้าหนี้ของคุณ
             </p>
            </div>

            <button
              onClick={() =>
                setShowCreditorPopup(true)
              }
              className="
                bg-blue-600
                hover:bg-blue-700
                text-white
                px-5 py-3
                rounded-2xl
                font-bold
                shadow-lg
              "
            >
              + เพิ่ม
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-gray-500 text-sm">
                  <th className="text-left py-3">
                    ชื่อ
                  </th>

                  <th className="text-left py-3">
                    ยอดทั้งหมด
                  </th>

                  <th className="text-right py-3">
                    จัดการ
                  </th>
                </tr>
              </thead>

              <tbody>
                {creditors.length === 0 && (
                  <tr>
                    <td
                      colSpan={3}
                      className="py-6 text-center text-gray-400"
                    >
                      ยังไม่มีข้อมูล
                    </td>
                  </tr>
                )}

                {creditors.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b last:border-0"
                  >
                    <td className="py-4 font-semibold">
                      {item.name}
                    </td>

                    <td className="py-4">
                      {item.amount.toLocaleString()} ฿
                    </td>

                    <td className="py-4">
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() =>
                            editCreditor(item)
                          }
                          className="
                            p-2
                            rounded-lg
                            hover:bg-yellow-100
                          "
                        >
                          <Pencil
                            size={18}
                            className="text-yellow-600"
                          />
                        </button>

                        <button
                          onClick={() =>
                            deleteCreditor(item.id)
                          }
                          className="
                            p-2
                            rounded-lg
                            hover:bg-red-100
                          "
                        >
                          <Trash2
                            size={18}
                            className="text-red-500"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <div className="bg-blue-50 px-5 py-3 rounded-2xl">
            <p className="text-sm text-gray-500">
              ยอดรวมทั้งหมด
            </p>

        <h3 className="text-2xl font-black text-blue-700">
          {creditors
          .reduce(
            (sum, item) => sum + item.amount,
          0
          )
            .toLocaleString()}{" "}
          ฿
        </h3>
          </div>
        </div>

        {/* Debtor */}
        <div className="bg-white rounded-[32px] shadow-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-black">
                💸 ลูกหนี้
              </h2>

              <p className="text-gray-500 mt-2">
                รายการลูกหนี้ติดค้าง
             </p>

            </div>

            <button
              onClick={() =>
                setShowDebtorPopup(true)
              }
              className="
                bg-indigo-600
                hover:bg-indigo-700
                text-white
                px-5 py-3
                rounded-2xl
                font-bold
                shadow-lg
              "
            >
              + เพิ่ม
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-gray-500 text-sm">
                  <th className="text-left py-3">
                    ชื่อ
                  </th>

                  <th className="text-left py-3">
                    ยอดทั้งหมด
                  </th>

                  <th className="text-right py-3">
                    จัดการ
                  </th>
                </tr>
              </thead>

              <tbody>
                {debtors.length === 0 && (
                  <tr>
                    <td
                      colSpan={3}
                      className="py-6 text-center text-gray-400"
                    >
                      ยังไม่มีข้อมูล
                    </td>
                  </tr>
                )}

                {debtors.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b last:border-0"
                  >
                    <td className="py-4 font-semibold">
                      {item.name}
                    </td>

                    <td className="py-4">
                      {item.amount.toLocaleString()} ฿
                    </td>

                    <td className="py-4">
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() =>
                            editDebtor(item)
                          }
                          className="
                            p-2
                            rounded-lg
                            hover:bg-yellow-100
                          "
                        >
                          <Pencil
                            size={18}
                            className="text-yellow-600"
                          />
                        </button>

                        <button
                          onClick={() =>
                            deleteDebtor(item.id)
                          }
                          className="
                            p-2
                            rounded-lg
                            hover:bg-red-100
                          "
                        >
                          <Trash2
                            size={18}
                            className="text-red-500"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <div className="bg-indigo-50 px-5 py-3 rounded-2xl">
          <p className="text-sm text-gray-500">
            ยอดรวมทั้งหมด
          </p>

      <h3 className="text-2xl font-black text-indigo-700">
      {debtors
        .reduce(
          (sum, item) => sum + item.amount,
          0
        )
        .toLocaleString()}{" "}
      ฿
      </h3>
    </div>
  </div>

      {/* Bills */}
<div className="bg-white rounded-[32px] shadow-2xl p-6 mt-8">

<div className="flex items-center justify-between mb-6">

  <div>

    <h2 className="text-2xl font-black whitespace-nowrap">
      🧾 ค่าใช้จ่ายรายเดือน
    </h2>

    <p className="text-gray-500 mt-2">
      ผ่อนรถ ห้องเช่า บัตรเครดิต ฯลฯ
    </p>

  </div>

  <button
    onClick={() => setShowBillPopup(true)}
    className="
      bg-orange-500
      hover:bg-orange-600
      text-white
      px-5 py-3
      rounded-2xl
      font-bold
      shadow-lg
    "
  >
    + เพิ่ม
  </button>

</div>

<div className="overflow-x-auto">

  <table className="w-full">

    <thead>

      <tr className="border-b text-gray-500 text-sm">

        <th className="text-left py-3">
          รายการ
        </th>

        <th className="text-left py-3">
          จำนวนเงิน
        </th>

        <th className="text-right py-3">
          จัดการ
        </th>

      </tr>

    </thead>

    <tbody>

      {bills.length === 0 && (

        <tr>

          <td
            colSpan={3}
            className="py-6 text-gray-400"
          >
            ยังไม่มีรายการ
          </td>

        </tr>

      )}

      {bills.map((item) => (

        <tr
          key={item.id}
          className="border-b last:border-0"
        >

          <td className="py-4 font-semibold">
            {item.name}
          </td>

          <td className="py-4">
            {item.amount.toLocaleString()} ฿
          </td>

          <td className="py-4">

            <div className="flex justify-end gap-3">

                <button
                    onClick={() =>
                    toggleBillPaid(item.id)
                    }
                    className={`
                        p-2
                        rounded-lg
                    ${
                    item.paid
                        ? "bg-green-100"
                        : "hover:bg-gray-200"
                    }
                    `}
                    >
                    <CheckCircle
                        size={18}
                        className={
                        item.paid
                        ? "text-green-600"
                        : "text-gray-400"
                    }
                />
        </button>

              <button
                onClick={() =>
                  editBill(item)
                }
                className="
                  p-2
                  rounded-lg
                  hover:bg-yellow-100
                "
              >
                <Pencil
                  size={18}
                  className="text-yellow-600"
                />
              </button>

              <button
                onClick={() =>
                  deleteBill(item.id)
                }
                className="
                  p-2
                  rounded-lg
                  hover:bg-red-100
                "
              >
                <Trash2
                  size={18}
                  className="text-red-500"
                />
              </button>

            </div>

          </td>

        </tr>

      ))}

    </tbody>

  </table>

</div>

</div>

          <div className="mt-4 flex justify-end">
            <div className="bg-orange-50 px-5 py-3 rounded-2xl">
              <p className="text-sm text-gray-500">
                ยอดรวมทั้งหมด
              </p>

          <h3 className="text-2xl font-black text-orange-600">
            {bills
              .reduce(
                (sum, item) =>
                  item.paid
                    ? sum
                    : sum + item.amount,
                0
              )
              .toLocaleString()}{" "}
                ฿
          </h3>
        </div>
      </div>


      {/* Creditor Popup */}
      {showCreditorPopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-[32px] p-8 w-full max-w-md">
            <h2 className="text-3xl font-black mb-6">
              เพิ่มเจ้าหนี้
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="ชื่อเจ้าหนี้"
                value={creditorName}
                onChange={(e) =>
                  setCreditorName(
                    e.target.value
                  )
                }
                className="
                  w-full
                  border
                  rounded-2xl
                  p-4
                "
              />

              <input
                type="number"
                placeholder="ยอดเงิน"
                value={creditorAmount}
                onChange={(e) =>
                  setCreditorAmount(
                    e.target.value
                  )
                }
                className="
                  w-full
                  border
                  rounded-2xl
                  p-4
                "
              />
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={addCreditor}
                className="
                  flex-1
                  bg-blue-600
                  text-white
                  py-3
                  rounded-2xl
                  font-bold
                "
              >
                บันทึก
              </button>

              <button
                onClick={() =>
                  setShowCreditorPopup(false)
                }
                className="
                  flex-1
                  bg-gray-300
                  py-3
                  rounded-2xl
                  font-bold
                "
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Debtor Popup */}
      {showDebtorPopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-[32px] p-8 w-full max-w-md">
            <h2 className="text-3xl font-black mb-6">
              เพิ่มลูกหนี้
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="ชื่อลูกหนี้"
                value={debtorName}
                onChange={(e) =>
                  setDebtorName(
                    e.target.value
                  )
                }
                className="
                  w-full
                  border
                  rounded-2xl
                  p-4
                "
              />

              <input
                type="number"
                placeholder="ยอดเงิน"
                value={debtorAmount}
                onChange={(e) =>
                  setDebtorAmount(
                    e.target.value
                  )
                }
                className="
                  w-full
                  border
                  rounded-2xl
                  p-4
                "
              />
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={addDebtor}
                className="
                  flex-1
                  bg-indigo-600
                  text-white
                  py-3
                  rounded-2xl
                  font-bold
                "
              >
                บันทึก
              </button>

              <button
                onClick={() =>
                  setShowDebtorPopup(false)
                }
                className="
                  flex-1
                  bg-gray-300
                  py-3
                  rounded-2xl
                  font-bold
                "
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bill Popup */}
      {showBillPopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-[32px] p-8 w-full max-w-md">
            <h2 className="text-3xl font-black mb-6">
              เพิ่มค่าใช้จ่าย
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="ชื่อรายการ"
                value={billName}
                onChange={(e) =>
                  setBillName(
                    e.target.value
                  )
                }
                className="
                  w-full
                  border
                  rounded-2xl
                  p-4
                "
              />

              <input
                type="number"
                placeholder="ยอดเงิน"
                value={billAmount}
                onChange={(e) =>
                  setBillAmount(
                    e.target.value
                  )
                }
                className="
                  w-full
                  border
                  rounded-2xl
                  p-4
                "
              />
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={addBill}
                className="
                  flex-1
                  bg-orange-500
                  text-white
                  py-3
                  rounded-2xl
                  font-bold
                "
              >
                บันทึก
              </button>

              <button
                onClick={() =>
                  setShowBillPopup(false)
                }
                className="
                  flex-1
                  bg-gray-300
                  py-3
                  rounded-2xl
                  font-bold
                "
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      )}

{editType && (

<div
  className="
    fixed inset-0
    bg-black/40
    flex items-center
    justify-center
    z-50
  "
>

  <div
    className="
      bg-white
      rounded-[32px]
      p-8
      w-full
      max-w-md
    "
  >

    <h2 className="text-3xl font-black mb-6">
      ✏️ แก้ไขข้อมูล
    </h2>

    <div className="space-y-4">

      <input
        type="text"
        value={editName}
        onChange={(e) =>
          setEditName(
            e.target.value
          )
        }
        placeholder="ชื่อ"
        className="
          w-full
          border
          rounded-2xl
          p-4
        "
      />

      <input
        type="number"
        value={editAmount}
        onChange={(e) =>
          setEditAmount(
            e.target.value
          )
        }
        placeholder="ยอดเงิน"
        className="
          w-full
          border
          rounded-2xl
          p-4
        "
      />

    </div>

    <div className="flex gap-3 mt-6">

      <button
        onClick={saveEdit}
        className="
          flex-1
          bg-blue-600
          text-white
          py-3
          rounded-2xl
          font-bold
        "
      >
        บันทึก
      </button>

      <button
        onClick={() =>
          setEditType(null)
        }
        className="
          flex-1
          bg-gray-300
          py-3
          rounded-2xl
          font-bold
        "
      >
        ยกเลิก
      </button>

    </div>

  </div>

</div>

)}

    </div>
  );
}