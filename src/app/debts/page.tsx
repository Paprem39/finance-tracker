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

  const [billAmount, setBillAmount] =
    useState("");

  // =========================
  // Load LocalStorage
  // =========================
  useEffect(() => {
    const savedCreditors =
      localStorage.getItem("creditors");

    const savedDebtors =
      localStorage.getItem("debtors");

    const savedBills =
      localStorage.getItem("monthlyBills");

    if (savedCreditors) {
      setCreditors(JSON.parse(savedCreditors));
    }

    if (savedDebtors) {
      setDebtors(JSON.parse(savedDebtors));
    }

    if (savedBills) {
      setBills(JSON.parse(savedBills));
    }
  }, []);

  // =========================
  // Save Functions
  // =========================
  const saveCreditors = (
    data: DebtItem[]
  ) => {
    setCreditors(data);

    localStorage.setItem(
      "creditors",
      JSON.stringify(data)
    );
  };

  const saveDebtors = (
    data: DebtItem[]
  ) => {
    setDebtors(data);

    localStorage.setItem(
      "debtors",
      JSON.stringify(data)
    );
  };

  const saveBills = (
    data: BillItem[]
  ) => {
    setBills(data);

    localStorage.setItem(
      "monthlyBills",
      JSON.stringify(data)
    );
  };

  // =========================
  // Add Creditor
  // =========================
  const addCreditor = () => {
    if (!creditorName || !creditorAmount)
      return;

    const newData = [
      ...creditors,
      {
        id: Date.now(),
        name: creditorName,
        amount: Number(creditorAmount),
      },
    ];

    saveCreditors(newData);

    setCreditorName("");
    setCreditorAmount("");

    setShowCreditorPopup(false);
  };

  // =========================
  // Add Debtor
  // =========================
  const addDebtor = () => {
    if (!debtorName || !debtorAmount)
      return;

    const newData = [
      ...debtors,
      {
        id: Date.now(),
        name: debtorName,
        amount: Number(debtorAmount),
      },
    ];

    saveDebtors(newData);

    setDebtorName("");
    setDebtorAmount("");

    setShowDebtorPopup(false);
  };

  // =========================
  // Add Bill
  // =========================
  const addBill = () => {
    if (!billName || !billAmount)
      return;

    const newData = [
      ...bills,
      {
        id: Date.now(),
        name: billName,
        amount: Number(billAmount),
        paid: false,
      },
    ];

    saveBills(newData);

    setBillName("");
    setBillAmount("");

    setShowBillPopup(false);
  };

  // =========================
// Toggle Bill Paid
// =========================
const toggleBillPaid = (id: number) => {

    const updated = bills.map((item) => {
  
      if (item.id === id) {
  
        return {
          ...item,
          paid: !item.paid,
        };
      }
  
      return item;
    });
  
    saveBills(updated);
  };
  
  // =========================
  // Delete
  // =========================
  const deleteCreditor = (id: number) => {
    const filtered =
      creditors.filter(
        (item) => item.id !== id
      );

    saveCreditors(filtered);
  };

  const deleteDebtor = (id: number) => {
    const filtered =
      debtors.filter(
        (item) => item.id !== id
      );

    saveDebtors(filtered);
  };

  const deleteBill = (id: number) => {
    const filtered =
      bills.filter(
        (item) => item.id !== id
      );

    saveBills(filtered);
  };

  // =========================
  // Edit
  // =========================
  const editCreditor = (
    id: number
  ) => {
    const amount =
      prompt("แก้ไขยอดใหม่ ?");

    if (!amount) return;

    const updated = creditors.map(
      (item) => {
        if (item.id === id) {
          return {
            ...item,
            amount: Number(amount),
          };
        }

        return item;
      }
    );

    saveCreditors(updated);
  };

  const editDebtor = (
    id: number
  ) => {
    const amount =
      prompt("แก้ไขยอดใหม่ ?");

    if (!amount) return;

    const updated = debtors.map(
      (item) => {
        if (item.id === id) {
          return {
            ...item,
            amount: Number(amount),
          };
        }

        return item;
      }
    );

    saveDebtors(updated);
  };

  const editBill = (
    id: number
  ) => {
    const amount =
      prompt("แก้ไขยอดใหม่ ?");

    if (!amount) return;

    const updated = bills.map(
      (item) => {
        if (item.id === id) {
          return {
            ...item,
            amount: Number(amount),
          };
        }

        return item;
      }
    );

    saveBills(updated);
  };

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
                            editCreditor(item.id)
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
                            editDebtor(item.id)
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
                  editBill(item.id)
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
    </div>
  );
}