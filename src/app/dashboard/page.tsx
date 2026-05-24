"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function Dashboard() {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");

  const [category, setCategory] = useState("ค่าข้าว");
  const [note, setNote] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toLocaleDateString("en-CA")
  );

  const [transactions, setTransactions] = useState<any[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const chartData = [
    {
      name: "รายรับ",
      value: income,
    },
    {
      name: "รายจ่าย",
      value: expense,
    },
  ];
  
  const COLORS = ["#22c55e","#3b82f6","#f59e0b","#ef4444","#8b5cf6",];

  const incomeTransactions = transactions.filter(
    (item) => item.type === "income"
  );
  
  const expenseTransactions = transactions.filter(
    (item) => item.type === "expense"
  );
  
  // รวมหมวดหมู่
  const summarizeData = (data: any[]) => {
    const summary: any = {};
  
    data.forEach((item) => {
      if (summary[item.category]) {
        summary[item.category] += item.amount;
      } else {
        summary[item.category] = item.amount;
      }
    });
  
    return Object.keys(summary).map((key) => ({
      name: key,
      value: summary[key],
    }));
  };
  
  const incomeChartData = summarizeData(incomeTransactions);
  const expenseChartData = summarizeData(expenseTransactions);

    useEffect(() => {
        const timer = setInterval(() => {
        setCurrentDate(new Date());
    }, 1000);

  return () => clearInterval(timer);
}, []);

  const addTransaction = () => {
    const value = Number(amount);

    if (!value) return;

    const finalCategory =
      category === "อื่นๆ" ? note : category;

    const newTransaction = {
      type,
      amount: value,
      category: finalCategory,
      date: selectedDate,
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

  const deleteTransaction = (indexToDelete: number) => {
    const transaction = transactions[indexToDelete];
  
    // คืนค่าเงินกลับ
    if (transaction.type === "income") {
      setIncome(income - transaction.amount);
    } else {
      setExpense(expense - transaction.amount);
    }
  
    // ลบรายการ
    setTransactions(
      transactions.filter((_, index) => index !== indexToDelete)
    );
  };
  
  return (
    <div className="min-h-screen bg-gray-100 p-6 text-black">

      <div className="flex justify-between items-center mb-4">

</div>

        {/* Top-Header */}
    <div className="mb-8">


    
        {/* Date + Time */}
        <div className="flex justify-between items-end mb-6">

            {/* Date */}
            <div>
            <p className="text-gray-500 text-sm">
              วันนี้
            </p>

            <p className="font-bold text-xl">
            {currentDate.toLocaleDateString("th-TH", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
            </p>
          </div>

            {/* Time */}
            <div className="bg-white/80 backdrop-blur px-4 py-3 rounded-2xl shadow-lg border border-gray-200 text-center min-w-[100px]">

            <p className="text-xs text-gray-500">
              🕒 เวลา
            </p>

            <p className="text-lg font-bold text-blue-600">
              {currentDate.toLocaleTimeString("th-TH", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>

        </div>

        {/* User */}
        <div className="flex items-center gap-3">
  
        {/* Profile */}
        <div className="w-14 h-14 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold text-2xl">
          U
        </div>

        {/* User Info */}
        <div>
          <p className="font-bold text-lg">
            ยินดีต้อนรับ : คุณ ทดลองใช้งาน
          </p>

          <p className="text-sm text-gray-500">
            สถานะ : ผู้ใช้งานทั่วไป
          </p>
        </div>
      </div>
    </div>
      
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
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
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

          {/* Date */}
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border border-gray-300 p-4 rounded-2xl text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"/>

          {/* Add Button */}
          <button
            onClick={addTransaction}
            className="bg-blue-600 hover:bg-blue-700 active:scale-95 transition duration-200 text-white font-bold text-lg py-4 px-6 rounded-2xl shadow-lg md:w-auto w-full"
          >
            เพิ่มรายการ ➕
          </button>
        </div>

        {/* Note */}
        {category === "อื่นๆ" && (
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="ระบุรายการ..."
            className="border border-gray-300 p-4 rounded-2xl w-full mt-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                      : "รายจ่าย"} • {item.date}
                  </p>
                </div>

                <div className="flex items-center gap-3">

                  <p
                    className={`font-bold ${
                    item.type === "income"
                    ? "text-green-600"
                    : "text-red-600"
                    }`}
                  >
                  {item.type === "income" ? "+" : "-"}
                  {item.amount.toLocaleString()} บาท
                  </p>

              {/* Delete Button */}
                <button
                onClick={() => deleteTransaction(index)}
                className="bg-red-100 hover:bg-red-200 text-red-600 px-3 py-1 rounded-xl transition">
                  🗑
                </button>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
              {/* Charts */}
              <div className="grid md:grid-cols-2 gap-6 mt-6">

              {/* Income Chart */}
              <div className="bg-white p-5 rounded-2xl shadow">

                <h2 className="text-2xl font-bold mb-4 text-center">
                  แผนภูมิรายรับ
                </h2>

                  {incomeChartData.length === 0 ? (
                    <p className="text-center text-gray-500">
                      ยังไม่มีข้อมูลรายรับ
                    </p>
                  ) : (
                    <div className="flex justify-center">

                      <PieChart width={320} height={320}>
                        <Pie
                          data={incomeChartData}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          dataKey="value"
                          label={({ percent }: any) =>
                            `${(percent * 100).toFixed(0)}%`
                          }
                      >
                        {incomeChartData.map((_, index) => (
                          <Cell
                          key={index}
                          fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                </Pie>

                <Tooltip />
                <Legend />
                </PieChart>

                    </div>
                  )}

              </div>

            {/* Expense Chart */}
              <div className="bg-white p-5 rounded-2xl shadow">

                <h2 className="text-2xl font-bold mb-4 text-center">
                  แผนภูมิรายจ่าย
                </h2>

              {expenseChartData.length === 0 ? (
                <p className="text-center text-gray-500">
                  ยังไม่มีข้อมูลรายจ่าย
                </p>
              ) : (
              <div className="flex justify-center">

                <PieChart width={320} height={320}>
                <Pie
                data={expenseChartData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ percent }: any) =>
                `${(percent * 100).toFixed(0)}%`
                }
              >
                {expenseChartData.map((_, index) => (
                  <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
              />
          ))}
        </Pie>

        <Tooltip />
        <Legend />
      </PieChart>

    </div>
  )}

</div>

</div>
    </div>
  );
}