"use client";

import { useState } from "react";

export default function Dashboard() {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");

  const addTransaction = () => {
    const value = Number(amount);

    if (type === "income") {
      setIncome(income + value);
    } else {
      setExpense(expense + value);
    }

    setAmount("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-black">
      <h1 className="text-3xl font-bold mb-6">Dashboard 💰</h1>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <p>รายรับ</p>
          <h2 className="text-green-600 text-2xl font-bold">{income}</h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p>รายจ่าย</p>
          <h2 className="text-red-600 text-2xl font-bold">{expense}</h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p>คงเหลือ</p>
          <h2 className="text-blue-600 text-2xl font-bold">
            {income - expense}
          </h2>
        </div>
      </div>

      {/* Input */}
      <div className="bg-white p-4 rounded-xl shadow flex gap-2">
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="จำนวนเงิน"
          className="border p-2 rounded w-full"
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="income">รายรับ</option>
          <option value="expense">รายจ่าย</option>
        </select>

        <button
          onClick={addTransaction}
          className="bg-blue-600 text-white px-4 rounded"
        >
          เพิ่ม
        </button>
      </div>
    </div>
  );
}