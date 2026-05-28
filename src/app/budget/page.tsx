"use client";

import { useState } from "react";
import {
  Pencil,
  Trash2,
  Wallet,
} from "lucide-react";

type BudgetItem = {
  id: number;
  category: string;
  limit: number;
  used: number;
};

export default function BudgetPage() {
  const [budgets, setBudgets] =
    useState<BudgetItem[]>([
      {
        id: 1,
        category: "🍔 อาหาร",
        limit: 5000,
        used: 3200,
      },
      {
        id: 2,
        category: "⛽ น้ำมัน",
        limit: 3000,
        used: 2700,
      },
      {
        id: 3,
        category: "🛍️ ช้อปปิ้ง",
        limit: 4000,
        used: 4500,
      },
    ]);

    const [showPopup, setShowPopup] =
    useState(false);

    const [category, setCategory] =
    useState("");

    const [limit, setLimit] =
    useState("");

    const [used, setUsed] =
    useState("");

    const [editId, setEditId] =
    useState<number | null>(null);

  const getPercent = (
    used: number,
    limit: number
  ) => {
    return Math.min(
      (used / limit) * 100,
      100
    );
  };

  const getBarColor = (
    percent: number
  ) => {
    if (percent >= 100)
      return "bg-red-500";

    if (percent >= 80)
      return "bg-yellow-400";

    return "bg-green-500";
  };

  // =========================
// Add Budget
// =========================
const addBudget = () => {

  if (
    !category ||
    !limit ||
    !used
  )
    return;

  // Edit Mode
  if (editId) {

    const updated =
      budgets.map((item) => {

        if (item.id === editId) {

          return {
            ...item,
            category,
            limit: Number(limit),
            used: Number(used),
          };
        }

        return item;
      });

    setBudgets(updated);

    setEditId(null);

  } else {

    // Add Mode
    const newData = [
      ...budgets,
      {
        id: Date.now(),
        category,
        limit: Number(limit),
        used: Number(used),
      },
    ];

    setBudgets(newData);
  }

  setCategory("");
  setLimit("");
  setUsed("");

  setShowPopup(false);
};

// =========================
// Delete Budget
// =========================
const deleteBudget = (
  id: number
) => {

  const filtered =
    budgets.filter(
      (item) => item.id !== id
    );

  setBudgets(filtered);
};

// =========================
// Edit Budget
// =========================
const editBudget = (
  item: BudgetItem
) => {

  setEditId(item.id);

  setCategory(item.category);

  setLimit(
    item.limit.toString()
  );

  setUsed(
    item.used.toString()
  );

  setShowPopup(true);
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-cyan-100 p-6 text-black">
      {/* Header */}
      <div className="mb-10">
      <h1 className="text-4xl md:text-5xl font-black text-gray-800 mb-3 whitespace-nowrap">
          💰 Budget Planner
        </h1>

        <p className="text-gray-500 text-lg">
          วางแผนงบประมาณ
          และควบคุมรายจ่ายของคุณ
        </p>
      </div>

      {/* Budget Table */}
      <div className="bg-white rounded-[32px] shadow-2xl p-6">
        {/* Top */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-black whitespace-nowrap">
              📊 งบประมาณทั้งหมด
            </h2>

            <p className="text-gray-500 mt-2">
              จัดการ Budget แต่ละหมวด
            </p>
          </div>

          <button
          onClick={() => {
            setEditId(null);
        
            setCategory("");
            setLimit("");
            setUsed("");
        
            setShowPopup(true);
          }}
            className="
              bg-cyan-600
              hover:bg-cyan-700
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

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-gray-500 text-sm">
                <th className="text-left py-3">
                  หมวด
                </th>

                <th className="text-left py-3">
                  Budget
                </th>

                <th className="text-left py-3">
                  ใช้ไป
                </th>

                <th className="text-right py-3">
                  จัดการ
                </th>
              </tr>
            </thead>

            <tbody>
              {budgets.map((item) => (
                <tr
                  key={item.id}
                  className="
                    border-b
                    last:border-0
                  "
                >
                  <td className="py-4 font-semibold">
                    {item.category}
                  </td>

                  <td className="py-4">
                    {item.limit.toLocaleString()} ฿
                  </td>

                  <td className="py-4">
                    {item.used.toLocaleString()} ฿
                  </td>

                  <td className="py-4">
                    <div className="flex justify-end gap-3">
                    <button
                      onClick={() =>
                      editBudget(item)
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
                        deleteBudget(item.id)
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

        {/* Total */}
        <div className="mt-6 flex justify-end">
          <div className="bg-cyan-50 px-6 py-4 rounded-3xl">
            <p className="text-sm text-gray-500">
              Budget รวมทั้งหมด
            </p>

            <h3 className="text-3xl font-black text-cyan-700">
              {budgets
                .reduce(
                  (
                    sum,
                    item
                  ) =>
                    sum +
                    item.limit,
                  0
                )
                .toLocaleString()}{" "}
              ฿
            </h3>
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <div className="mt-8 bg-white rounded-[32px] shadow-2xl p-6">
        <div className="mb-6">
          <h2 className="text-3xl font-black">
            📈 การใช้งบประมาณ
          </h2>

          <p className="text-gray-500 mt-2">
            ติดตามการใช้ Budget
            ของแต่ละหมวด
          </p>
        </div>

        <div className="space-y-6">
          {budgets.map((item) => {
            const percent =
              getPercent(
                item.used,
                item.limit
              );

            const remain =
              item.limit -
              item.used;

            return (
              <div
                key={item.id}
                className="
                  bg-slate-50
                  rounded-3xl
                  p-5
                  border
                "
              >
                {/* Top */}
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-black">
                      {item.category}
                    </h3>

                    <p className="text-gray-500">
                      Budget{" "}
                      {item.limit.toLocaleString()}{" "}
                      ฿
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-lg">
                      {percent.toFixed(0)}%
                    </p>

                    <p className="text-sm text-gray-500">
                      ใช้ไป{" "}
                      {item.used.toLocaleString()}{" "}
                      ฿
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-5 overflow-hidden">
                  <div
                    className={`
                      h-5
                      rounded-full
                      transition-all
                      duration-500
                      ${getBarColor(
                        percent
                      )}
                    `}
                    style={{
                      width: `${percent}%`,
                    }}
                  />
                </div>

                {/* Remaining */}
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Wallet size={18} />

                    <span>
                      คงเหลือ
                    </span>
                  </div>

                  <p
                    className={`
                      font-black
                      text-lg
                      ${
                        remain < 0
                          ? "text-red-500"
                          : "text-green-600"
                      }
                    `}
                  >
                    {remain.toLocaleString()} ฿
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Popup */}
{showPopup && (

<div className="
  fixed inset-0
  bg-black/40
  flex
  items-center
  justify-center
  z-50
">

  <div className="
    bg-white
    rounded-[32px]
    p-8
    w-full
    max-w-md
  ">

    <h2 className="
      text-3xl
      font-black
      mb-6
    ">
      {editId
        ? "แก้ไข Budget"
        : "เพิ่ม Budget"}
    </h2>

    <div className="space-y-4">

      <input
        type="text"
        placeholder="หมวด"
        value={category}
        onChange={(e) =>
          setCategory(
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
        placeholder="Budget"
        value={limit}
        onChange={(e) =>
          setLimit(
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
        placeholder="ใช้ไป"
        value={used}
        onChange={(e) =>
          setUsed(
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

    <div className="
      flex gap-3 mt-6
    ">

      <button
        onClick={addBudget}
        className="
          flex-1
          bg-cyan-600
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
          setShowPopup(false)
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