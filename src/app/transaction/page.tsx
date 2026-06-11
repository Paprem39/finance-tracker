"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

type TransactionType = "income" | "expense";

type Transaction = {
  id?: string;

  type: TransactionType;

  amount: number;

  category: string;

  note: string;

  date: string;
};

export default function Dashboard() {

  const [popupOpen, setPopupOpen] =
  useState(false);

  const [popupTitle, setPopupTitle] =
  useState("");

  const [popupMessage, setPopupMessage] =
  useState("");

  const [popupType, setPopupType] =
  useState<"success" | "error">(
    "success"
  );
  const [isPosting, setIsPosting] =
  useState(false);
  const [nickname, setNickname] = useState("");
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  const [amount, setAmount] = useState("");
  const [type, setType] = useState<TransactionType>("expense");

  const [category, setCategory] = useState("ค่าอาหาร");
  const [note, setNote] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toLocaleDateString("en-CA")
  );

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editAmount, setEditAmount] = useState("");
  const [editType, setEditType] = useState<TransactionType>("expense");
  const [editCategory, setEditCategory] = useState<string>("");
  const [editNote, setEditNote] = useState("");
  const [editDate, setEditDate] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  
  const COLORS = ["#22c55e","#3b82f6","#f59e0b","#ef4444","#8b5cf6",];

  const incomeTransactions = transactions.filter(
    (item) => item.type === "income"
  );
  
  const expenseTransactions = transactions.filter(
    (item) => item.type === "expense"
  );
  
  // รวมหมวดหมู่
  const summarizeData = (data: Transaction[]) => {
    const summary: Record<string, number> = {};
  
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

useEffect(() => {

  const fetchProfile = async () => {

    try {

      const response =
        await fetch("/api/profile");

      const result =
        await response.json();

      setNickname(
        result.nickname || ""
      );

    } catch (error) {

      console.log(error);

    }
  };

  fetchProfile();

}, []);


useEffect(() => {
  if (type === "income") {
    setCategory("เงินเดือน");
  } else {
    setCategory("ค่าอาหาร");
  }
}, [type]);

const openEditModal = (
  item: Transaction,
  index: number
) => {

  setEditIndex(index);

  setEditAmount(item.amount.toString());

  setEditType(item.type);

  setEditCategory(item.category);

  setEditNote(item.note);

  setEditDate(item.date);

  setIsEditOpen(true);
};

  const addTransaction = () => {
    const value = Number(amount);

if (value <= 0) {
  alert("จำนวนเงินต้องมากกว่า 0");
  return;
}
    if (category === "อื่นๆ" && !note.trim()) {
      alert("กรุณาระบุรายละเอียด");
      return;
    }

    const finalCategory = category;

    const newTransaction = {
      type,
      amount: value,
      category: finalCategory,
      note,
      date: selectedDate,
    };

    setTransactions((prev) => [
      newTransaction,
      ...prev,
    ]);

    if (type === "income") {
      setIncome((prev) => prev + value);
    } else {
      setExpense((prev) => prev + value);
    }

    setAmount("");
    setNote("");
  };

  const saveEditTransaction = async () => {

    if (!editAmount) {
      alert("กรุณากรอกจำนวนเงิน");
      return;
    }
  
    setIsSaving(true);
    if (editCategory === "อื่นๆ" && !editNote.trim()) {
      alert("กรุณาระบุรายละเอียด");
      setIsSaving(false);
      return;
    }
  
    await new Promise((resolve) =>
      setTimeout(resolve, 1200)
    );
  
    const value = Number(editAmount);

    if (value <= 0) {
      alert("จำนวนเงินต้องมากกว่า 0");
      setIsSaving(false);
      return;
    }
  
    if (editIndex === null) {
      setIsSaving(false);
      return;
    }
  
    const oldTransaction =
      transactions[editIndex];
  
    // คืนค่าของเก่า
    if (oldTransaction.type === "income") {
  
      setIncome((prev) =>
        prev - oldTransaction.amount
      );
  
    } else {
  
      setExpense((prev) =>
        prev - oldTransaction.amount
      );
    }
  
    // เพิ่มค่าใหม่
    if (editType === "income") {
  
      setIncome((prev) =>
        prev + value
      );
  
    } else {
  
      setExpense((prev) =>
        prev + value
      );
    }
  
    const updatedTransactions = [
      ...transactions,
    ];
  
    const finalCategory = editCategory;

    updatedTransactions[editIndex] = {
      type: editType,
      amount: value,
      category: finalCategory,
      note: editNote,
      date: editDate,
    };
  
    setTransactions(updatedTransactions);
  
    setIsSaving(false);
  
    setIsEditOpen(false);
  
    setEditIndex(null);
  };

  const deleteTransaction = (indexToDelete: number) => {

    const confirmDelete = window.confirm(
      "คุณต้องการลบรายการนี้ใช่ไหม?"
    );
  
    if (!confirmDelete) {
      return;
    }
  
    const transaction = transactions[indexToDelete];
  
    // คืนค่าเงินกลับ
    if (transaction.type === "income") {
      setIncome((prev) =>
        prev - transaction.amount
      );
    } else {
      setExpense((prev) =>
        prev - transaction.amount
      );
    }
  
    // ลบรายการ
    setTransactions(
      transactions.filter(
        (_, index) => index !== indexToDelete
      )
    );
  };

  const saveToDatabase = async () => {

    if (transactions.length === 0) {

      setPopupType("error");
    
      setPopupTitle(
        "ไม่พบรายการ"
      );
    
      setPopupMessage(
        "กรุณาเพิ่มรายการก่อนบันทึก"
      );
    
      setPopupOpen(true);
      setTimeout(() => {
        setPopupOpen(false);
      }, 2000);
    
      return;
    }
  
    try {
  
      setIsPosting(true);
  
      const response = await fetch("/api/transactions",
        {
          method: "POST",
  
          headers: {
            "Content-Type":
              "application/json",
          },
  
          body: JSON.stringify({
            transactions,
          }),
        }
      );
  
      if (!response.ok) {
        throw new Error(
          "บันทึกไม่สำเร็จ"
        );
      }
  
      setPopupType("success");

      setPopupTitle(
        "บันทึกรายการสำเร็จ 🎉"
      );

      setPopupMessage(
        "ระบบได้บันทึกรายการของคุณเรียบร้อยแล้ว"
      );

      setPopupOpen(true);

      setTimeout(() => {
      setPopupOpen(false);
      }, 2000);
  
      // reset
      setTransactions([]);
  
      setIncome(0);
  
      setExpense(0);
  
    } catch (error) {
  
      setPopupType("error");

      setPopupTitle(
        "บันทึกไม่สำเร็จ"
      );

      setPopupMessage(
        "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง"
      );

      setPopupOpen(true);
  
    } finally {
  
      setIsPosting(false);
  
    }
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
            ยินดีต้อนรับคุณ : {nickname}
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

          {/* Type */}
          <select
            value={type}
            onChange={(e) =>
              setType(e.target.value as TransactionType)
            }
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
  {type === "income" ? (
    <>
      <option value="เงินเดือน">
        💰 เงินเดือน
      </option>

      <option value="รายได้พิเศษ">
        🎁 รายได้พิเศษ
      </option>
    </>
  ) : (
    <>
      <option value="ค่าอาหาร">
        🍜 ค่าอาหาร
      </option>

      <option value="ค่าช็อปปิ้ง">
        🛍️ ค่าช็อปปิ้ง
      </option>

      <option value="ค่าน้ำมัน">
        ⛽ ค่าน้ำมัน
      </option>

      <option value="ค่าเดินทาง">
        🚌 ค่าเดินทาง
      </option>

      <option value="ค่าของใช้">
        🧴 ค่าของใช้
      </option>
    </>
  )}

  <option value="อื่นๆ">
    📦 อื่นๆ
  </option>
</select>

        {/* Note */}
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="รายละเอียดเพิ่มเติม..."
          className="border border-gray-300 p-4 rounded-2xl w-full"
        />

        {/* Amount */}
        <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="จำนวนเงิน"
            className="border p-3 rounded-xl"
          />

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

                  {item.note &&
                      item.note !== item.category && (
                      <p className="text-sm text-gray-500">
                        {item.note}
                      </p>
                  )}

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

              {/* Edit Button */}
                <button
                onClick={() => openEditModal(item, index)}
                className="
                bg-yellow-100
                hover:bg-yellow-200
                text-yellow-700
                px-3 py-1
                rounded-xl
                transition
                active:scale-95
                "
                >
                    ✏️
                </button>

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
                          label={({ percent }: { percent?: number }) =>
                            `${((percent ?? 0) * 100).toFixed(0)}%`
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
                label={({ percent }: { percent?: number }) =>
                  `${((percent ?? 0) * 100).toFixed(0)}%`
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

    {/* Edit Modal */}
{isEditOpen && (

<div
  onClick={() => setIsEditOpen(false)}
  className="
    fixed
    inset-0
    bg-black/50
    backdrop-blur-sm
    flex
    items-center
    justify-center
    z-50
    p-4
    animate-fadeIn
  "
>

  {/* Modal */}
  <div
    onClick={(e) => e.stopPropagation()}
    className="
      bg-white
      w-full
      max-w-md
      rounded-[32px]
      shadow-2xl
      p-6
      animate-scaleIn
    "
  >

    {/* Header */}
    <div className="mb-6">

      <h2 className="text-3xl font-black text-gray-800">
        แก้ไขรายการ
      </h2>

      <p className="text-gray-500 mt-2">
        แก้ไขข้อมูลรายการของคุณ
      </p>

    </div>

    {/* Amount */}
    <div className="mb-4">

      <label className="font-semibold text-gray-700 block mb-2">
        จำนวนเงิน
      </label>

      <input
        type="number"
        value={editAmount}
        onChange={(e) =>
          setEditAmount(e.target.value)
        }
        className="
          w-full
          border
          border-gray-300
          p-4
          rounded-2xl
          focus:outline-none
          focus:ring-2
          focus:ring-blue-400
        "
      />

    </div>

    {/* Type */}
    <div className="mb-4">

      <label className="font-semibold text-gray-700 block mb-2">
        ประเภท
      </label>

      <select
        value={editType}
        onChange={(e) => {
          const newType =
            e.target.value as TransactionType;
        
          setEditType(newType);
        
          if (newType === "income") {
            setEditCategory("เงินเดือน");
          } else {
            setEditCategory("ค่าอาหาร");
          }
        }}
        className="
          w-full
          border
          border-gray-300
          p-4
          rounded-2xl
        "
      >
        <option value="income">
          รายรับ
        </option>

        <option value="expense">
          รายจ่าย
        </option>

      </select>

    </div>

    {/* Category */}
    <div className="mb-4">

      <label className="font-semibold text-gray-700 block mb-2">
        หมวดหมู่
      </label>

      <select
  value={editCategory}
  onChange={(e) =>
    setEditCategory(e.target.value)
  }
  className="
    w-full
    border
    border-gray-300
    p-4
    rounded-2xl
  "
>
  {editType === "income" ? (
    <>
      <option value="เงินเดือน">
        💰 เงินเดือน
      </option>

      <option value="รายได้พิเศษ">
        🎁 รายได้พิเศษ
      </option>
    </>
  ) : (
    <>
      <option value="ค่าอาหาร">
        🍜 ค่าอาหาร
      </option>

      <option value="ค่าช็อปปิ้ง">
        🛍️ ค่าช็อปปิ้ง
      </option>

      <option value="ค่าน้ำมัน">
        ⛽ ค่าน้ำมัน
      </option>

      <option value="ค่าเดินทาง">
        🚌 ค่าเดินทาง
      </option>

      <option value="ค่าของใช้">
        🧴 ค่าของใช้
      </option>
    </>
  )}

  <option value="อื่นๆ">
    📦 อื่นๆ
  </option>
</select>

    </div>

    {/* Other Note */}
      <div className="mb-4">

      <label className="font-semibold text-gray-700 block mb-2">
        รายละเอียดเพิ่มเติม
      </label>

        <input
          type="text"
          value={editNote}
          onChange={(e) =>
            setEditNote(e.target.value)
          }
          placeholder="ระบุรายการ..."
          className="
            w-full
            border
            border-gray-300
            p-4
            rounded-2xl
          "
        />

      </div>


    {/* Date */}
    <div className="mb-6">

      <label className="font-semibold text-gray-700 block mb-2">
        วันที่
      </label>

      <input
        type="date"
        value={editDate}
        onChange={(e) =>
          setEditDate(e.target.value)
        }
        className="
          w-full
          border
          border-gray-300
          p-4
          rounded-2xl
        "
      />

    </div>

    {/* Buttons */}
    <div className="flex gap-3">

      {/* Cancel */}
      <button
        onClick={() => setIsEditOpen(false)}
        className="
          flex-1
          py-4
          rounded-2xl
          bg-gray-200
          hover:bg-gray-300
          font-bold
          transition
        "
      >
        ยกเลิก
      </button>

      {/* Save */}
      <button
        onClick={saveEditTransaction}
        disabled={isSaving}
        className="
          flex-1
          py-4
          rounded-2xl
          bg-blue-600
          hover:bg-blue-700
          text-white
          font-bold
          transition
          active:scale-95
          disabled:opacity-50
        "
      >

        {isSaving
          ? "กำลังบันทึก..."
          : "บันทึก 💾"}

      </button>

    </div>

  </div>

</div>

)}

{/* Save All */}
<div className="mt-8">

  <button
    onClick={saveToDatabase}
    disabled={isPosting}
    className="
      w-full
      bg-green-600
      hover:bg-green-700
      text-white
      py-5
      rounded-2xl
      text-xl
      font-black
      shadow-xl
      transition
      active:scale-95
      disabled:opacity-50
    "
  >

    {isPosting
      ? "กำลังบันทึก..."
      : "บันทึกทั้งหมด 💾"}

  </button>

</div>

{popupOpen && (

<div
  className="
    fixed inset-0
    bg-black/50
    flex items-center justify-center
    z-50
  "
>

  <div
    className="
      bg-white
      rounded-[32px]
      p-8
      w-[90%]
      max-w-md
      text-center
      shadow-2xl
    "
  >

    <div className="text-6xl mb-4">

      {popupType === "success"
        ? "✅"
        : "⚠️"}

    </div>

    <h2 className="text-2xl font-black text-gray-800 mb-2">
      {popupTitle}
    </h2>

    <p className="text-gray-500 mb-6">
      {popupMessage}
    </p>

    {popupType === "error" && (

<button
  onClick={() =>
    setPopupOpen(false)
  }
  className="
    w-full
    py-3
    rounded-2xl
    text-white
    font-bold
    bg-red-600
    hover:bg-red-700
  "
>
  ตกลง
</button>

)}

  </div>

</div>

)}

    </div>
  );
}