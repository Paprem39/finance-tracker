"use client";

import { useEffect, useState } from "react";

type DebtItem = {
    id: number;
    name: string;
    amount: number;
    paid: number;
    history: {
      amount: number;
      date: string;
    }[];
  };
  
  type BillItem = {
    id: number;
    name: string;
    amount: number;
    paid: boolean;
  };
  
  type InstallmentItem = {
    id: number;
    name: string;
    total: number;
    paid: number;
    remain: number;
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
  // Installments
  // =========================
  const [installments, setInstallments] =
  useState<InstallmentItem[]>([]);

  const [showInstallPopup, setShowInstallPopup] =
    useState(false);

  const [installName, setInstallName] =
    useState("");

  const [installTotal, setInstallTotal] =
    useState("");

  const [installPaid, setInstallPaid] =
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

    const savedInstallments =
      localStorage.getItem("installments");

    if (savedCreditors) {
      setCreditors(JSON.parse(savedCreditors));
    }

    if (savedDebtors) {
      setDebtors(JSON.parse(savedDebtors));
    }

    if (savedBills) {
      setBills(JSON.parse(savedBills));
    }

    if (savedInstallments) {
      setInstallments(
        JSON.parse(savedInstallments)
      );
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

  const saveInstallments = (
    data: InstallmentItem[]
  ) => {

    setInstallments(data);

    localStorage.setItem(
      "installments",
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
        paid: 0,
        history: [],
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
        paid: 0,
        history: [],
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
  // Add Installment
  // =========================
  const addInstallment = () => {

    if (
      !installName ||
      !installTotal ||
      !installPaid
    )
      return;

    const total =
      Number(installTotal);

    const paid =
      Number(installPaid);

    const remain =
      total - paid;

    const newData = [
      ...installments,
      {
        id: Date.now(),
        name: installName,
        total,
        paid,
        remain,
      },
    ];

    saveInstallments(newData);

    setInstallName("");
    setInstallTotal("");
    setInstallPaid("");

    setShowInstallPopup(false);
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
  // Delete Bill
  // =========================
  const deleteBill = (id: number) => {

    const filtered =
      bills.filter(
        (item) => item.id !== id
      );

    saveBills(filtered);
  };

  // =========================
  // Pay Creditor
  // =========================
  const payCreditor = (id: number) => {

    const amount =
      prompt("จ่ายไปเท่าไหร่ ?");

    if (!amount) return;

    const updated = creditors.map((item) => {

      if (item.id === id) {

        const payAmount =
          Number(amount);

        return {
          ...item,
          paid:
            item.paid + payAmount,
          history: [
            ...item.history,
            {
              amount: payAmount,
              date:
                new Date().toLocaleString(),
            },
          ],
        };
      }

      return item;
    });

    saveCreditors(updated);
  };

  // =========================
  // Pay Debtor
  // =========================
  const payDebtor = (id: number) => {

    const amount =
      prompt("ได้รับเงินคืนเท่าไหร่ ?");

    if (!amount) return;

    const updated = debtors.map((item) => {

      if (item.id === id) {

        const payAmount =
          Number(amount);

        return {
          ...item,
          paid:
            item.paid + payAmount,
          history: [
            ...item.history,
            {
              amount: payAmount,
              date:
                new Date().toLocaleString(),
            },
          ],
        };
      }

      return item;
    });

    saveDebtors(updated);
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
                รายการที่คุณยืมเงินมา
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
              + Add
            </button>

          </div>

          <div className="space-y-4">

            {creditors.length === 0 && (
              <p className="text-gray-400">
                ยังไม่มีข้อมูล
              </p>
            )}

            {creditors.map((item) => {

              const remain =
                item.amount - item.paid;

              return (

                <div
                  key={item.id}
                  className="
                    border
                    border-gray-200
                    rounded-3xl
                    p-5
                    bg-gray-50
                  "
                >

                  <div className="flex justify-between items-center">

                    <div>

                      <h3 className="text-2xl font-black">
                        {item.name}
                      </h3>

                      <p className="text-gray-500 mt-1">
                        ยอดคงเหลือ :
                        {" "}
                        {remain.toLocaleString()}
                        {" "}฿
                      </p>

                    </div>

                    <button
                      onClick={() =>
                        payCreditor(item.id)
                      }
                      className="
                        bg-green-600
                        hover:bg-green-700
                        text-white
                        px-4 py-2
                        rounded-xl
                        font-bold
                      "
                    >
                      ชำระหนี้
                    </button>

                  </div>

                  {/* History */}
                  {item.history.length > 0 && (

                    <div className="mt-4 space-y-2">

                      {item.history.map(
                        (
                            h: {
                              amount: number;
                              date: string;
                            },
                            index: number
                          ) => (

                          <div
                            key={index}
                            className="
                              text-sm
                              bg-white
                              rounded-xl
                              p-3
                              border
                            "
                          >
                            ชำระ {h.amount} ฿
                            เมื่อ {h.date}
                          </div>

                        )
                      )}

                    </div>

                  )}

                </div>

              );
            })}

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
                รายการที่มีคนยืมเงินคุณ
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
              + Add
            </button>

          </div>

          <div className="space-y-4">

            {debtors.length === 0 && (
              <p className="text-gray-400">
                ยังไม่มีข้อมูล
              </p>
            )}

            {debtors.map((item) => {

              const remain =
                item.amount - item.paid;

              return (

                <div
                  key={item.id}
                  className="
                    border
                    border-gray-200
                    rounded-3xl
                    p-5
                    bg-gray-50
                  "
                >

                  <div className="flex justify-between items-center">

                    <div>

                      <h3 className="text-2xl font-black">
                        {item.name}
                      </h3>

                      <p className="text-gray-500 mt-1">
                        ยอดค้าง :
                        {" "}
                        {remain.toLocaleString()}
                        {" "}฿
                      </p>

                    </div>

                    <button
                      onClick={() =>
                        payDebtor(item.id)
                      }
                      className="
                        bg-green-600
                        hover:bg-green-700
                        text-white
                        px-4 py-2
                        rounded-xl
                        font-bold
                      "
                    >
                      ได้รับเงิน
                    </button>

                  </div>

                  {/* History */}
                  {item.history.length > 0 && (

                    <div className="mt-4 space-y-2">

                    {item.history.map(
                        (
                            h: {
                                amount: number;
                                date: string;
                            },
                                index: number
                            ) => (

                          <div
                            key={index}
                            className="
                              text-sm
                              bg-white
                              rounded-xl
                              p-3
                              border
                            "
                          >
                            ได้รับ {h.amount} ฿
                            เมื่อ {h.date}
                          </div>

                        )
                      )}

                    </div>

                  )}

                </div>

              );
            })}

          </div>

        </div>

      </div>

      {/* Bills */}
      <div className="bg-white rounded-[32px] shadow-2xl p-6 mt-8">

        <div className="flex items-center justify-between mb-6">

          <div>

            <h2 className="text-3xl font-black">
              🧾 ค่าใช้จ่ายรายเดือน
            </h2>

            <p className="text-gray-500 mt-2">
              ค่าห้อง ค่าน้ำ ค่าไฟ บัตรเครดิต ฯลฯ
            </p>

          </div>

          <button
            onClick={() =>
              setShowBillPopup(true)
            }
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
            + Add
          </button>

        </div>

        <div className="space-y-4">

          {bills.length === 0 && (
            <p className="text-gray-400">
              ยังไม่มีรายการ
            </p>
          )}

          {bills.map((item) => (

            <div
              key={item.id}
              className="
                flex
                flex-col
                md:flex-row
                md:items-center
                justify-between
                gap-4
                border
                border-gray-200
                rounded-3xl
                p-5
                bg-gray-50
              "
            >

              <div>

                <h3 className="text-2xl font-black">
                  {item.name}
                </h3>

                <p className="text-gray-500 mt-1">
                  {item.amount.toLocaleString()} ฿
                </p>

              </div>

              <div className="flex items-center gap-3">

                <button
                  onClick={() =>
                    toggleBillPaid(item.id)
                  }
                  className={`
                    px-5 py-2
                    rounded-xl
                    font-bold
                    text-white
                    ${
                      item.paid
                        ? "bg-green-600"
                        : "bg-gray-400"
                    }
                  `}
                >
                  {item.paid
                    ? "ชำระแล้ว"
                    : "ยังไม่ชำระ"}
                </button>

                <button
                  onClick={() =>
                    deleteBill(item.id)
                  }
                  className="
                    bg-red-500
                    hover:bg-red-600
                    text-white
                    px-4 py-2
                    rounded-xl
                    font-bold
                  "
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* Installments */}
      <div className="bg-white rounded-[32px] shadow-2xl p-6 mt-8">

        <div className="flex items-center justify-between mb-6">

          <div>

            <h2 className="text-3xl font-black">
              🚗 ค่างวด / ผ่อนชำระ
            </h2>

            <p className="text-gray-500 mt-2">
              ติดตามยอดที่จ่ายไปแล้ว และยอดคงเหลือ
            </p>

          </div>

          <button
            onClick={() =>
              setShowInstallPopup(true)
            }
            className="
              bg-purple-600
              hover:bg-purple-700
              text-white
              px-5 py-3
              rounded-2xl
              font-bold
              shadow-lg
            "
          >
            + Add
          </button>

        </div>

        <div className="space-y-5">

          {installments.length === 0 && (
            <p className="text-gray-400">
              ยังไม่มีข้อมูล
            </p>
          )}

          {installments.map((item) => {

            const percent =
              (item.paid / item.total) * 100;

            return (

              <div
                key={item.id}
                className="
                  border
                  border-gray-200
                  rounded-3xl
                  p-5
                  bg-gray-50
                "
              >

                <div className="flex justify-between mb-4">

                  <div>

                    <h3 className="text-2xl font-black">
                      {item.name}
                    </h3>

                    <p className="text-gray-500 mt-1">
                      เหลือ
                      {" "}
                      {item.remain.toLocaleString()}
                      {" "}฿
                    </p>

                  </div>

                  <div className="text-right">

                    <p className="text-green-600 font-black text-xl">
                      จ่ายแล้ว
                      {" "}
                      {item.paid.toLocaleString()}
                      {" "}฿
                    </p>

                  </div>

                </div>

                {/* Progress */}
                <div className="w-full h-5 bg-gray-300 rounded-full overflow-hidden">

                  <div
                    className="
                      h-full
                      bg-green-500
                      transition-all
                    "
                    style={{
                      width: `${percent}%`,
                    }}
                  ></div>

                </div>

              </div>

            );
          })}

        </div>

      </div>

      {/* =========================
          POPUPS
      ========================= */}

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

      {/* Install Popup */}
      {showInstallPopup && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white rounded-[32px] p-8 w-full max-w-md">

            <h2 className="text-3xl font-black mb-6">
              เพิ่มค่างวด
            </h2>

            <div className="space-y-4">

              <input
                type="text"
                placeholder="ชื่อรายการ"
                value={installName}
                onChange={(e) =>
                  setInstallName(
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
                placeholder="ยอดทั้งหมด"
                value={installTotal}
                onChange={(e) =>
                  setInstallTotal(
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
                placeholder="จ่ายไปแล้ว"
                value={installPaid}
                onChange={(e) =>
                  setInstallPaid(
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
                onClick={addInstallment}
                className="
                  flex-1
                  bg-purple-600
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
                  setShowInstallPopup(false)
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