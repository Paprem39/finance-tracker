"use client";

import { useState } from "react";

export default function Dashboard() {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");

  const [category, setCategory] = useState("ค่าข้าว");
  const [note, setNote] = useState("");

  const [transactions, setTransactions] = useState<any[]>([]);

  const addTransaction = () => {
    const value = Number(amount);

    if (!value) return;

    const finalCategory =
      category === "อื่นๆ" ? note : category;

    const newTransaction = {
      type,
      amount: value,
      category: finalCategory,
    };

    setTransactions([newTransaction, ...transactions]);

    if (type === "income") {
      setIncome(income + value);
    } else {
      setExpense(expense + value);
    }

    setAmount("");
    setNote("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-black">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-6">
        ภาพรวมการเงิน 💰
      </h1>

      {/* Summary */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-5 rounded-2xl shadow">
          <p className="text-gray-500">รายรับ</p>

          <h2 className="text-3xl font-bold text-green-600">
            {income}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow">
          <p className="text-gray-500">รายจ่าย</p>

          <h2 className="text-3xl font-bold text-red-600">
            {expense}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow">
          <p className="text-gray-500">คงเหลือ</p>

          <h2 className="text-3xl font-bold text-blue-600">
            {income - expense}
          </h2>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white p-5 rounded-2xl shadow mb-6">
        <div className="grid md:grid-cols-4 gap-3">
          {/* Amount */}
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="จำนวนเงิน"
            className="border p-3 rounded-xl"
          />

          {/* Type */}
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border p-3 rounded-xl"
          >
            <option value="income">รายรับ</option>
            <option value="expense">รายจ่าย</option>
          </select>

          {/* Category */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-3 rounded-xl"
          >
            <option>ค่าข้าว</option>
            <option>ค่าขนม</option>
            <option>ค่าน้ำมัน</option>
            <option>ค่าเดินทาง</option>
            <option>อื่นๆ</option>
          </select>

          {/* Add Button */}
          <button
            onClick={addTransaction}
            className="bg-blue-600 text-white rounded-xl font-semibold"
          >
            เพิ่มรายการ
          </button>
        </div>

        {/* Note */}
        {category === "อื่นๆ" && (
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="ระบุรายการ..."
            className="border p-3 rounded-xl w-full mt-3"
          />
        )}
      </div>

      {/* Transaction List */}
      <div className="bg-white p-5 rounded-2xl shadow">
        <h2 className="text-2xl font-bold mb-4">
          รายการล่าสุด
        </h2>

        {transactions.length === 0 ? (
          <p className="text-gray-500">
            ยังไม่มีรายการ
          </p>
        ) : (
          <div className="space-y-3">
            {transactions.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="font-semibold">
                    {item.category}
                  </p>

                  <p className="text-sm text-gray-500">
                    {item.type === "income"
                      ? "รายรับ"
                      : "รายจ่าย"}
                  </p>
                </div>

                <p
                  className={`font-bold ${
                    item.type === "income"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {item.type === "income" ? "+" : "-"}
                  {item.amount} บาท
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}