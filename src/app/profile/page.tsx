"use client";

import {useEffect,useState,ChangeEvent,} from "react";
import { Pencil } from "lucide-react";

export default function ProfilePage() {
  const [editOpen, setEditOpen] = useState(false);
  const [editField, setEditField] = useState<string | null>(null);
  const [editLabel, setEditLabel] = useState("");
  const [editValue, setEditValue] = useState("");
  const [data, setData] = useState<any>(null);
  const [registerDate, setRegisterDate] = useState("");
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/profile");
        const result = await response.json();

        setData(result);

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

    const savedImage = localStorage.getItem("profileImage");

    if (savedImage) {
    setProfileImage(savedImage);
  }
  }, []);

  const startEdit = (
    field: string,
    label: string
  ) => {
  
    setEditField(field);
  
    setEditLabel(label);
  
    setEditValue(
      String(data?.[field] ?? "")
    );
  
    setEditOpen(true);
  };

  const cancelEdit = () => {
    setEditOpen(false);
    setEditField(null);
    setEditLabel("");
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
    cancelEdit();
  };

  const handleImageUpload = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
  
    const file =
      e.target.files?.[0];
  
    if (!file) return;
  
    const reader =
      new FileReader();
  
    reader.onloadend = () => {
  
      const image =
        reader.result as string;
  
      setProfileImage(image);
  
      localStorage.setItem(
        "profileImage",
        image
      );
    };
  
    reader.readAsDataURL(file);
  };

  const Field = ({
    label,
    field,
  }: {
    label: string;
    field: string;
  }) => {
  
    return (
      <div
        className="
          relative
          p-6
          min-h-[130px]
          rounded-3xl
          bg-white/70
          border
          border-white/40
        "
      >
  
        <p className="text-gray-500 mb-3">
          {label}
        </p>
  
        <h3
          className={`
            font-black
            text-gray-900
            break-all
          ${
            field === "email"
            ? "text-lg"
            : "text-2xl"
          }
        `}
      >
  {data?.[field] || "-"}
</h3>
  
        <button
          onClick={() =>
          startEdit(field, label)
          }
            className="
              absolute
              top-4
              right-4
              p-2
              rounded-lg
              hover:bg-blue-100
              transition
            "
            >
            <Pencil
              size={18}
              className="text-blue-600"
            />
        </button>
  
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
          <div
  className="
    w-40 h-40
    rounded-full
    bg-gradient-to-br
    from-white
    to-blue-100
    border-[6px]
    border-white
    shadow-2xl
    overflow-hidden
    flex
    items-center
    justify-center
  "
>

  {profileImage ? (

    <img
      src={profileImage}
      alt="profile"
      className="
        w-full
        h-full
        object-cover
      "
    />

  ) : (

    <span className="text-6xl font-black text-blue-700">
      U
    </span>

  )}

</div>

            {/* 🔥 CAMERA BUTTON กลับมาแล้ว */}
            <label
  className="
    absolute
    bottom-2
    right-2
    w-11
    h-11
    rounded-full
    bg-blue-600
    hover:bg-blue-700
    text-white
    flex
    items-center
    justify-center
    shadow-lg
    border-2
    border-white
    cursor-pointer
  "
>

  📷

  <input
    type="file"
    accept="image/*"
    className="hidden"
    onChange={handleImageUpload}
  />

</label>
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
            <Field label="อีเมลล์" field="email"/>

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
        </div>
      </div>

      {editOpen && (

<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

  <div className="bg-white rounded-[32px] p-8 w-full max-w-md">

  <h2
  className="
    text-3xl
    font-black
    text-gray-900
    mb-6
  "
>
  <span className="mr-2">✏️</span>
    แก้ไข {editLabel}
  </h2>

<input
  autoFocus
  value={editValue}
  onChange={(e) =>
    setEditValue(e.target.value)
  }
  style={{
    color: "#111827"
  }}
  className="
    w-full
    border
    border-gray-300
    rounded-2xl
    p-4
    text-gray-900
    text-xl
    font-semibold
    bg-white
    outline-none
    focus:ring-2
    focus:ring-blue-500
  "
/>

    <div className="flex gap-3 mt-6">

      <button
        onClick={saveEdit}
        className="
          flex-1
          bg-blue-600
          text-white
          font-bold
          py-3
          rounded-2xl
        "
      >
        บันทึก
      </button>

      <button
        onClick={cancelEdit}
        className="
          flex-1
          bg-gray-300
          text-gray-800
          font-bold
          py-3
          rounded-2xl
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