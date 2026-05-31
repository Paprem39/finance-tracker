"use client";

import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [data, setData] = useState<any>(null);

  const [editField, setEditField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const [registerDate, setRegisterDate] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch("/api/profile");
      const result = await res.json();

      setData(result);

      setRegisterDate(
        new Date(result.createdAt).toLocaleDateString("th-TH", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      );
    };

    fetchProfile();
  }, []);

  // เปิด popup
  const startEdit = (field: string) => {
    setEditField(field);
    setEditValue(String(data?.[field] ?? ""));
  };

  // ปิด popup
  const closeEdit = () => {
    setEditField(null);
    setEditValue("");
  };

  // save
  const saveEdit = async () => {
    if (!editField) return;

    await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        field: editField,
        value: editValue,
      }),
    });

    const res = await fetch("/api/profile");
    const updated = await res.json();

    setData(updated);
    closeEdit();
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-indigo-200 via-blue-100 to-cyan-100 p-6 overflow-hidden">

      {/* background glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-400/30 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-300/30 blur-3xl rounded-full" />

      {/* header */}
      <div className="relative z-10 mb-10">
        <h1 className="text-4xl font-black text-gray-800">ข้อมูลส่วนตัว</h1>
        <p className="text-gray-600 mt-2">โปรไฟล์ของคุณ</p>
      </div>

      {/* card */}
      <div className="relative z-10 max-w-5xl mx-auto bg-white/70 backdrop-blur-2xl border border-white/40 rounded-[40px] shadow-2xl overflow-hidden">

        <div className="h-52 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500" />

        <div className="px-8 pb-10">

          {/* profile */}
          <div className="-mt-20 w-40 h-40 mx-auto relative">
            <div className="w-40 h-40 rounded-full bg-white border-[6px] border-white shadow-2xl flex items-center justify-center text-6xl font-black text-blue-700">
              U
            </div>

            <button className="absolute bottom-2 right-2 w-11 h-11 rounded-full bg-blue-600 text-white">
              📷
            </button>
          </div>

          {/* name */}
          <div className="mt-6 text-center">
            <h2 className="text-4xl font-black">
              คุณ : {data?.nickname || "-"}
            </h2>

            <p className="text-gray-500 mt-2">
              สถานะ : ผู้ใช้งานทั่วไป
            </p>

            <div className="flex justify-center items-center gap-3 mt-4">
              <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse" />
              <p className="text-green-600 font-bold">ออนไลน์</p>
            </div>
          </div>

          {/* fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">

            {["firstname", "lastname", "nickname", "email"].map((field) => (
              <div
                key={field}
                className="relative p-6 rounded-3xl bg-white/70 border border-white/40 hover:scale-[1.02] transition cursor-pointer"
              >
                <p className="text-gray-500 mb-3">{field}</p>

                <h3 className="text-xl font-black text-gray-900 break-all">
                  {data?.[field] || "-"}
                </h3>

                <button
                  onClick={() => startEdit(field)}
                  className="absolute top-4 right-4 text-blue-600 hover:scale-110 transition"
                >
                  ✏️
                </button>
              </div>
            ))}

            {/* date */}
            <div className="md:col-span-2 p-6 rounded-3xl bg-white/70 border border-white/40">
              <p className="text-gray-600 mb-3">วันที่สมัครใช้งาน</p>
              <h3 className="text-xl font-black">
                {registerDate || "-"}
              </h3>
            </div>
          </div>

        </div>
      </div>

      {/* ================= MODAL (Facebook style) ================= */}
      {editField && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={closeEdit}
        >
          <div
            className="bg-white w-full max-w-md p-8 rounded-3xl shadow-2xl
            transform transition-all duration-300 scale-100 animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-black mb-4">
              แก้ไข {editField}
            </h2>

            <input
              autoFocus
              className="w-full border-b-2 border-blue-500 text-xl font-bold outline-none py-2"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
            />

            <div className="flex gap-3 mt-6">
              <button
                onClick={closeEdit}
                className="w-full py-3 rounded-xl bg-gray-200 hover:bg-gray-300"
              >
                ยกเลิก
              </button>

              <button
                onClick={saveEdit}
                className="w-full py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
              >
                บันทึก
              </button>
            </div>
          </div>
        </div>
      )}

      {/* simple animation */}
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>

    </div>
  );
}