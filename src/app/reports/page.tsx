"use client";

import { useEffect, useMemo, useState } from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";

export default function ReportsPage() {

  const [transactions, setTransactions] = useState<any[]>([]);

  const [filterType, setFilterType] = useState("all");

  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );

  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  );

  const [search, setSearch] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const COLORS = [
    "#22c55e",
    "#ef4444",
    "#3b82f6",
    "#f59e0b",
    "#8b5cf6",
    "#ec4899",
  ];

  // โหลด localStorage
  useEffect(() => {

    const savedTransactions =
      localStorage.getItem("transactions");

    if (savedTransactions) {

      setTransactions(
        JSON.parse(savedTransactions)
      );
    }

  }, []);

  // Filter Data
const filteredTransactions = useMemo(() => {

    return transactions.filter((item) => {
  
      const itemDate = new Date(item.date);
  
      // Search
      const matchSearch =
        item.category
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      item.note
        ?.toLowerCase()
        .includes(search.toLowerCase());
  
      if (!matchSearch) return false;
  
      // Daily Range
      if (filterType === "daily") {

        if (startDate && !endDate) {
          return item.date === startDate;
        }
      
        if (!startDate || !endDate) {
          return true;
        }
      
        const start = new Date(startDate);
        const end = new Date(endDate);
      
        return (
          itemDate >= start &&
          itemDate <= end
        );
      }
  
      // Monthly
      if (filterType === "monthly") {
  
        const itemMonth =
          item.date.slice(0, 7);
  
        return itemMonth === selectedMonth;
      }
  
      // Yearly
      if (filterType === "yearly") {
  
        const itemYear =
          item.date.slice(0, 4);
  
        return itemYear === selectedYear;
      }
  
      return true;
  
    });
  
  }, [
    transactions,
    filterType,
    startDate,
    endDate,
    selectedMonth,
    selectedYear,
    search,
  ]);

  // Summary
  const totalIncome = filteredTransactions
    .filter((item) => item.type === "income")
    .reduce((sum, item) => sum + item.amount, 0);

  const totalExpense = filteredTransactions
    .filter((item) => item.type === "expense")
    .reduce((sum, item) => sum + item.amount, 0);

  // Pie Chart
  const pieData = [
    {
      name: "รายรับ",
      value: totalIncome,
    },
    {
      name: "รายจ่าย",
      value: totalExpense,
    },
  ];

  // Bar Chart
  const barData = [
    {
      name: "รายรับ",
      amount: totalIncome,
      fill: "#22c55e",
    },
    {
      name: "รายจ่าย",
      amount: totalExpense,
      fill: "#ef4444",
    },
  ];

  // Line Chart
  const groupedLineData: any = {};

  filteredTransactions.forEach((item) => {

    if (!groupedLineData[item.date]) {

      groupedLineData[item.date] = {
        date: item.date,
        income: 0,
        expense: 0,
      };
    }

    if (item.type === "income") {

      groupedLineData[item.date].income += item.amount;

    } else {

      groupedLineData[item.date].expense += item.amount;
    }

  });

  const lineData = Object.values(groupedLineData).sort(
    (a: any, b: any) =>
      new Date(a.date).getTime() -
      new Date(b.date).getTime()
  );

  // Export CSV
  const exportCSV = () => {

    const headers =
      ["วันที่", "ประเภท", "หมวดหมู่", "จำนวน"];

    const rows = filteredTransactions.map((item) => [
      item.date,
      item.type === "income"
        ? "รายรับ"
        : "รายจ่าย",
      item.category,
      item.amount,
    ]);

    const csvContent = [
      headers,
      ...rows,
    ]
      .map((e) => e.join(","))
      .join("\n");

    const blob = new Blob(
      [csvContent],
      { type: "text/csv;charset=utf-8;" }
    );

    const link =
      document.createElement("a");

    link.href =
      URL.createObjectURL(blob);

    link.download =
      "finance-report.csv";

    link.click();
  };

  // Export PDF
  const exportPDF = () => {

    window.print();
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-100 p-6 text-black">

      {/* Header */}
      <div className="mb-8">

        <h1 className="text-3xl md:text-4xl font-black text-gray-800 mb-2 whitespace-nowrap overflow-hidden text-ellipsis">
          📊 รายงานทางบัญชีคุณ
        </h1>

        <p className="text-gray-500 text-base md:text-lg">
          วิเคราะห์ข้อมูลรายรับ รายจ่าย ของคุณ
        </p>

      </div>

      {/* Filters */}
      <div className="bg-white/80 backdrop-blur-xl border border-white/40 rounded-[32px] shadow-2xl p-6 mb-8">

        <div className="flex flex-col xl:flex-row gap-4">

          {/* Filter Type */}
          <select
            value={filterType}
            onChange={(e) =>
              setFilterType(e.target.value)
            }
            className="
              p-4
              rounded-2xl
              border
              border-gray-300
              bg-white
              font-semibold
            "
          >
            <option value="all">
              ทั้งหมด
            </option>

            <option value="daily">
              รายวัน
            </option>

            <option value="monthly">
              รายเดือน
            </option>

            <option value="yearly">
              รายปี
            </option>

          </select>

          {/* Daily Range */}
{filterType === "daily" && (

<div className="flex flex-col md:flex-row gap-3">

  {/* Start */}
  <input
    type="date"
    value={startDate}
    onChange={(e) =>
      setStartDate(e.target.value)
    }
    className="
      border
      border-gray-300
      rounded-2xl
      px-4
      py-3
      bg-white
    "
  />

  {/* End */}
  <input
    type="date"
    value={endDate}
    onChange={(e) =>
      setEndDate(e.target.value)
    }
    className="
      border
      border-gray-300
      rounded-2xl
      px-4
      py-3
      bg-white
    "
  />

</div>

)}

          {/* Month */}
          {filterType === "monthly" && (

            <input
              type="month"
              value={selectedMonth}
              onChange={(e) =>
                setSelectedMonth(e.target.value)
              }
              className="
                p-4
                rounded-2xl
                border
                border-gray-300
                bg-white
              "
            />

          )}

          {/* Year */}
          {filterType === "yearly" && (

            <input
              type="number"
              value={selectedYear}
              onChange={(e) =>
                setSelectedYear(e.target.value)
              }
              placeholder="2026"
              className="
                p-4
                rounded-2xl
                border
                border-gray-300
                bg-white
              "
            />

          )}

          {/* Search */}
          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="ค้นหาหมวดหมู่..."
            className="
              flex-1
              p-4
              rounded-2xl
              border
              border-gray-300
              bg-white
            "
          />

        </div>

      </div>

      {/* Summary */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">

        {/* Income */}
        <div className="bg-white rounded-[32px] p-6 shadow-2xl">

          <p className="text-gray-500 text-lg">
            รายรับ
          </p>

          <h2 className="text-4xl font-black text-green-600 mt-2">
            {totalIncome.toLocaleString()} ฿
          </h2>

        </div>

        {/* Expense */}
        <div className="bg-white rounded-[32px] p-6 shadow-2xl">

          <p className="text-gray-500 text-lg">
            รายจ่าย
          </p>

          <h2 className="text-4xl font-black text-red-600 mt-2">
            {totalExpense.toLocaleString()} ฿
          </h2>

        </div>

        {/* Balance */}
        <div className="bg-white rounded-[32px] p-6 shadow-2xl">

          <p className="text-gray-500 text-lg">
            คงเหลือ
          </p>

          <h2 className="text-4xl font-black text-blue-600 mt-2">
            {(totalIncome - totalExpense).toLocaleString()} ฿
          </h2>

        </div>

      </div>

      {/* Table */}
      <div className="bg-white rounded-[32px] shadow-2xl overflow-hidden mb-8">

        <div className="p-6 border-b">

          <h2 className="text-3xl font-black text-gray-800">
            📋 รายการทั้งหมด
          </h2>

        </div>

        <div className="overflow-x-auto">

        <table className="w-full min-w-[700px]">

            <thead className="bg-gray-100">

              <tr>

                <th className="text-left p-4">
                  วันที่
                </th>

                <th className="text-left p-4">
                  ประเภท
                </th>

                <th className="text-left p-4">
                  หมวดหมู่
                </th>

                <th className="text-left p-4">
                  จำนวน
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredTransactions.length === 0 ? (

                <tr>

                  <td
                    colSpan={4}
                    className="
                      text-center
                      p-10
                      text-gray-500
                    "
                  >
                    ไม่มีข้อมูล
                  </td>

                </tr>

              ) : (

                filteredTransactions.map((item, index) => (

                  <tr
                    key={index}
                    className="
                      border-b
                      hover:bg-gray-50
                      transition
                    "
                  >

                    <td className="p-4">
                      {item.date}
                    </td>

                    <td className="p-4">

                      <span
                        className={`
                          px-3
                          py-1
                          rounded-full
                          text-sm
                          font-bold
                          ${
                            item.type === "income"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }
                        `}
                      >
                        {item.type === "income"
                          ? "รายรับ"
                          : "รายจ่าย"}
                      </span>

                    </td>

                    <td className="p-4">

                      <div className="flex items-center gap-2 whitespace-nowrap">

                        <span className="font-semibold">
                          {item.category}
                        </span>

                      </div>

                        {item.note && (
                          <p className="text-sm text-gray-400 mt-1">
                            {item.note}
                          </p>
                        )}

                    </td>

                    <td
                      className={`
                        p-4
                        font-black
                        ${
                          item.type === "income"
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      `}
                    >
                      {item.type === "income"
                        ? "+"
                        : "-"}

                      {item.amount.toLocaleString()} ฿
                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* Charts */}
      <div className="grid xl:grid-cols-3 gap-6 mb-10">

        {/* Pie Chart */}
        <div className="bg-white rounded-[32px] p-6 shadow-2xl">

          <h2 className="text-2xl font-black mb-4">
            📌 สัดส่วนรายรับ / รายจ่าย
          </h2>

          <div className="h-[320px]">

            <ResponsiveContainer>

              <PieChart>

                <Pie
                  data={pieData}
                  dataKey="value"
                  outerRadius={100}
                  label={({ percent }: any) =>
                    `${(percent * 100).toFixed(0)}%`
                  }
                >

                  {pieData.map((_, index) => (

                    <Cell
                      key={index}
                      fill={
                        COLORS[index % COLORS.length]
                      }
                    />

                  ))}

                </Pie>

                <Tooltip />
                <Legend />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* Bar Chart */}
        <div className="bg-white rounded-[32px] p-6 shadow-2xl">

        <h2 className="text-xl font-black mb-4 whitespace-nowrap overflow-hidden text-ellipsis">
  📊       เปรียบเทียบรายรับ/รายจ่าย
        </h2>

          <div className="h-[320px]">

            <ResponsiveContainer>

              <BarChart data={barData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="amount"
                >
                  {barData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={entry.fill}
                    />
                  ))}
                </Bar>

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* Line Chart */}
        <div className="bg-white rounded-[32px] p-6 shadow-2xl">

          <h2 className="text-2xl font-black mb-4">
            📈 เส้นทางการเงิน
          </h2>

          <div className="h-[320px]">

            <ResponsiveContainer>

              <LineChart data={lineData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="date" />

                <YAxis />

                <Tooltip />

                <Legend />

                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="#22c55e"
                  strokeWidth={4}
                />

                <Line
                  type="monotone"
                  dataKey="expense"
                  stroke="#ef4444"
                  strokeWidth={4}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

      {/* Export Buttons */}
      <div className="flex flex-col md:flex-row gap-4 justify-end">

        {/* Export CSV */}
        <button
          onClick={exportCSV}
          className="
            px-8
            py-4
            rounded-2xl
            bg-green-600
            hover:bg-green-700
            text-white
            font-bold
            shadow-xl
            transition
            active:scale-95
          "
        >
          ดาวน์โหลด CSV
        </button>

        {/* Export PDF */}
        <button
          onClick={exportPDF}
          className="
            px-8
            py-4
            rounded-2xl
            bg-red-600
            hover:bg-red-700
            text-white
            font-bold
            shadow-xl
            transition
            active:scale-95
          "
        >
          ดาวน์โหลด PDF
        </button>

      </div>

    </div>
  );
}