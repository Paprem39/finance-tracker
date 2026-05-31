"use client";

import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [data, setData] = useState<any>(null);
  const [editField, setEditField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [registerDate, setRegisterDate] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/profile");
        const result = await response.json();

        setData(result);
        setEmailValue(result.email || "");

        setRegisterDate(
          new Date(result.createdAt).toLocaleDateString("th-TH", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })
        );
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
  }, []);

  const startEdit = (field: string) => {
    setEditField(field);
    setEditValue(String(data?.[field] ?? ""));
  };

  const cancelEdit = () => {
    setEditField(null);
    setEditValue("");
  };

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
    setEditField(null);
    setEditValue("");
  };

  const Field = ({
    label,
    field,
  }: {
    label: string;
    field: string;
  }) => {
    const isEditing = editField === field;

    return (
      <div
        className={`relative p-6 rounded-3xl border transition-all duration-300
        ${
          isEditing
            ? "bg-blue-50 border-blue-400 shadow-lg scale-[1.02]"
            : "bg-white/70 border-white/40 hover:scale-[1.02]"
        }`}
      >
        <p className="text-gray-500 mb-3">{label}</p>

        <div className="relative min-h-[40px]">

          {/* VIEW MODE */}
          <div
            className={`transition-all duration-300 ${
              isEditing
                ? "opacity-0 absolute"
                : "opacity-100"
            }`}
          >
            {/* 🔥 FIX 2: ไม่ให้ตอน edit แล้ว text กลายเป็นจาง */}
            <h3 className="text-2xl font-black text-gray-900 break-all">
              {data?.[field] || "-"}
            </h3>
          </div>

          {/* EDIT MODE */}
          <div
            className={`transition-all duration-300 ${
              isEditing
                ? "opacity-100"
                : "opacity-0 absolute"
            }`}
          >
            <input
              autoFocus
              className="w-full text-2xl font-black text-gray-900 border-b-2 border-blue-500 outline-none bg-transparent"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
            />
          </div>
        </div>

        {/* ✏️ BUTTON (ไม่หายแล้ว) */}
        {!isEditing && (
          <button
            onClick={() => startEdit(field)}
            className="absolute top-4 right-4 text-blue-600 hover:scale-110 transition"
          >
            ✏️
          </button>
        )}

        {/* ✖ cancel */}
        {isEditing && (
          <button
            onClick={cancelEdit}
            className="absolute top-4 right-4 text-red-500 hover:scale-110 transition"
          >
            ✖
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-indigo-200 via-blue-100 to-cyan-100 p-6 overflow-hidden">

      {/* glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-400/30 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-300/30 blur-3xl rounded-full" />

      {/* header */}
      <div className="relative z-10 mb-10">
        <h1 className="text-4xl font-black text-gray-800">
          ข้อมูลส่วนตัว
        </h1>
        <p className="text-gray-600 mt-2">
          โปรไฟล์ของคุณ
        </p>
      </div>

      {/* card */}
      <div className="relative z-10 max-w-5xl mx-auto bg-white/70 backdrop-blur-2xl border border-white/40 rounded-[40px] shadow-2xl overflow-hidden">

        <div className="h-52 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500" />

        <div className="px-8 pb-10">

          {/* PROFILE + CAMERA (FIX 3) */}
          <div className="relative -mt-20 w-40 h-40 mx-auto">
            <div className="w-40 h-40 rounded-full bg-gradient-to-br from-white to-blue-100 border-[6px] border-white shadow-2xl flex items-center justify-center text-6xl font-black text-blue-700">
              U
            </div>

            {/* 🔥 CAMERA BUTTON กลับมาแล้ว */}
            <button className="absolute bottom-2 right-2 w-11 h-11 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-lg border-2 border-white">
              📷
            </button>
          </div>

          {/* name */}
          <div className="mt-6 text-center">

  {/* คุณ + ชื่อเล่น */}
  <h2 className="text-4xl font-black text-gray-900">
    คุณ : {data?.nickname || "-"}
  </h2>

  {/* สถานะ */}
  <p className="text-gray-500 mt-2">
    สถานะ : ผู้ใช้งานทั่วไป
  </p>

  {/* ONLINE STATUS */}
  <div className="flex items-center justify-center gap-3 mt-4">

    {/* green dot */}
    <div className="w-4 h-4 rounded-full bg-green-500 animate-pulse shadow-lg shadow-green-400" />

    <p className="text-green-600 font-bold text-lg">
      ออนไลน์
    </p>

  </div>

</div>

          {/* grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">

            <Field label="ชื่อจริง" field="firstname" />
            <Field label="นามสกุล" field="lastname" />
            <Field label="ชื่อเล่น" field="nickname" />
            <div className="relative p-6 rounded-3xl bg-white/70 border border-white/40 transition">

  <p className="text-gray-500 mb-3">อีเมลล์</p>

  {/* ✏️ ปุ่มปากกา */}
  {!isEditingEmail && (
    <button
      onClick={() => setIsEditingEmail(true)}
      className="absolute top-4 right-4 text-blue-600 hover:scale-110 transition"
    >
      ✏️
    </button>
  )}

  {/* VIEW MODE */}
  {!isEditingEmail && (
    <h3 className="text-xl font-black text-gray-900 break-all">
      {data?.email || "-"}
    </h3>
  )}

  {/* EDIT MODE */}
  {isEditingEmail && (
    <div className="flex flex-col gap-3">
      <input
        autoFocus
        value={emailValue}
        onChange={(e) => setEmailValue(e.target.value)}
        className="w-full text-xl font-black border-b-2 border-blue-500 outline-none bg-transparent"
      />

      <div className="flex gap-3 mt-2">
        <button
          onClick={async () => {
            await fetch("/api/profile", {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                field: "email",
                value: emailValue,
              }),
            });

            const res = await fetch("/api/profile");
            const updated = await res.json();

            setData(updated);
            setIsEditingEmail(false);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl"
        >
          บันทึก
        </button>

        <button
          onClick={() => {
            setIsEditingEmail(false);
            setEmailValue(data?.email || "");
          }}
          className="bg-gray-300 px-4 py-2 rounded-xl"
        >
          ยกเลิก
        </button>
      </div>
    </div>
  )}

</div>

            {/* 🔥 FIX 1: วันที่สมัครไม่จางแล้ว */}
            <div className="md:col-span-2 p-6 rounded-3xl bg-white/70 border border-white/40">
              <p className="text-gray-600 mb-3 font-medium">
                วันที่สมัครใช้งาน
              </p>
              <h3 className="text-xl font-black text-gray-900">
                {registerDate || "-"}
              </h3>
            </div>

          </div>

          {/* SAVE */}
          {editField && (
            <button
              onClick={saveEdit}
              className="mt-10 w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold transition"
            >
              💾 บันทึกข้อมูล
            </button>
          )}

        </div>
      </div>
      {showEmailModal && (
  <div
    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    onClick={() => setShowEmailModal(false)}
  >
    <div
      className="bg-white p-8 rounded-3xl shadow-2xl max-w-md w-full text-center relative"
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className="text-2xl font-black text-gray-800 mb-4">
        อีเมลล์ของคุณ
      </h2>

      <p className="text-lg text-gray-700 break-all">
        {data?.email}
      </p>

      <button
        onClick={() => setShowEmailModal(false)}
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl"
      >
        ปิด
      </button>
    </div>
  </div>
)}
    </div>
  );
}