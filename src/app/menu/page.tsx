"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";

export default function MenuPage() {

  const [profile, setProfile] = useState<any>(null);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await fetch("/api/profile");
        const data = await res.json();
  
        setProfile(data);
      } catch (err) {
        console.log(err);
      }
    };
  
    loadProfile();
  }, []);

  const handleLogout = async () => {

    await signOut({
      redirect: false,
    });
  
    router.push("/login");
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 p-6">

      {/* Header */}
<div className="flex justify-between items-start mb-10">



{/* Profile Card */}
<div
  className="
    bg-white/80
    backdrop-blur-xl
    border border-white/40
    shadow-2xl
    rounded-3xl
    p-5
    flex items-center gap-4
  "
>

  {/* Profile Circle */}
  <div
  className="
    w-16 h-16
    rounded-full
    overflow-hidden
    shadow-lg
    bg-gradient-to-br
    from-blue-500
    to-indigo-600
    flex
    items-center
    justify-center
  "
>
  {profile?.avatar ? (
    <img
      src={profile.avatar}
      alt="avatar"
      className="w-full h-full object-cover"
    />
  ) : (
    <span className="text-white text-2xl font-bold">
      U
    </span>
  )}
</div>

  {/* User Info */}
  <div>

    <h2 className="text-xl font-bold text-gray-800">
      ยินดีต้อนรับคุณ : {session?.user?.nickname}
    </h2>

    <p className="text-gray-500">
      สถานะ : ผู้ใช้งานทั่วไป
    </p>

    {/* Online */}
    <div className="flex items-center gap-2 mt-1">

      <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>

      <p className="text-green-600 font-semibold">
        Online
      </p>

    </div>

  </div>

</div>

</div>

      {/* Title */}
      <div className="text-center mb-12">

        <h1 className="text-5xl font-black text-gray-800 mb-3">
          เมนูหลัก
        </h1>

        <p className="text-gray-500 text-lg">
          เลือกเมนูที่คุณต้องการใช้งาน
        </p>

      </div>

      {/* Menu Grid */}
      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-2
        gap-6
        max-w-5xl
        mx-auto
      "
      >

        {/* Button Transaction */}
        <button
          onClick={() => router.push("/transaction")}
          className="
            group
            bg-white/80
            backdrop-blur-xl
            rounded-3xl
            shadow-2xl
            p-10
            hover:scale-105
            transition
            text-left
            border border-white/40
          "
        >

          <div className="text-6xl mb-5 group-hover:rotate-6 transition">
            💰
          </div>

          <h2 className="text-3xl font-black text-gray-800 mb-3">
            บันทึกรายการ
          </h2>

          <p className="text-gray-500 text-lg">
            เพิ่มรายรับ รายจ่าย และจัดการข้อมูลการเงิน
          </p>

        </button>

        {/* Button profile */}
        <button
          onClick={() => router.push("/profile")}
          className="
            group
            bg-white/80
            backdrop-blur-xl
            rounded-3xl
            shadow-2xl
            p-10
            hover:scale-105
            transition
            text-left
            border border-white/40
          "
        >

          <div className="text-6xl mb-5 group-hover:rotate-6 transition">
            👤
          </div>

          <h2 className="text-3xl font-black text-gray-800 mb-3">
            ข้อมูลส่วนตัว
          </h2>

          <p className="text-gray-500 text-lg">
            ดูและแก้ไขข้อมูลบัญชีของคุณ
          </p>

        </button>

        {/* Button reports */}
        <button
          onClick={() => router.push("/reports")}
          className="
            group
            bg-white/80
            backdrop-blur-xl
            rounded-3xl
            shadow-2xl
            p-10
            hover:scale-105
            transition
            text-left
            border border-white/40
          "
        >

          <div className="text-6xl mb-5 group-hover:rotate-6 transition">
            📊
          </div>

          <h2 className="text-3xl font-black text-gray-800 mb-3">
            รายงานทางบัญชีคุณ
          </h2>

          <p className="text-gray-500 text-lg">
            ดูสถิติ และประวัติการเงินย้อนหลัง
          </p>

        </button>

        {/* Button Budget */}
        <button
          onClick={() => router.push("/budget")}
          className="
            group
            bg-white/80
            backdrop-blur-xl
            rounded-3xl
            shadow-2xl
            p-10
            hover:scale-105
            transition
            text-left
            border border-white/40
          "
        >

          <div className="text-6xl mb-5 group-hover:rotate-6 transition">
            🎯
          </div>

          <h2 className="text-3xl font-black text-gray-800 mb-3">
            จัดการ Budget
          </h2>

          <p className="text-gray-500 text-lg">
            ตั้งงบประมาณ รายวัน รายเดือน และติดตามการใช้จ่าย
          </p>

        </button>

        {/* Button creditor debtor */}
        <button
          onClick={() => router.push("/debts")}
          className="
            group
            bg-white/80
            backdrop-blur-xl
            rounded-3xl
            shadow-2xl
            p-10
            hover:scale-105
            transition
            text-left
            border border-white/40
          "
        >

          <div className="text-6xl mb-5 group-hover:rotate-6 transition">
            🤝
          </div>

          <h2 className="text-3xl font-black text-gray-800 mb-3">
            รายการ เจ้าหนี้ ลูกหนี้
          </h2>

          <p className="text-gray-500 text-lg">
            จัดการข้อมูลเจ้าหนี้ และลูกหนี้ของคุณ
          </p>

        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="
          bg-white/70
          backdrop-blur-xl
          border border-white/40
          px-5 py-3
          rounded-2xl
          shadow-lg
          hover:bg-red-50
          hover:scale-105
          transition
          text-red-500
          font-bold
          text-sm
          active:scale-95
          "
          >
            ออกจากระบบ
        </button>

      </div>

    </div>
  );
}