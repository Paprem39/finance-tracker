"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();

  const [nickname, setNickname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    setNickname(localStorage.getItem("nickname") || "");
    setFirstname(localStorage.getItem("firstname") || "");
    setLastname(localStorage.getItem("lastname") || "");
    setEmail(localStorage.getItem("email") || "");
    setUsername(localStorage.getItem("username") || "");
  }, []);

  return (
    <div className="min-h-screen overflow-hidden relative bg-gradient-to-br from-indigo-200 via-blue-100 to-cyan-100 p-6">

      {/* Glow Background */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-400/30 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-300/30 blur-3xl rounded-full"></div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-10">

        <div>
          <h1 className="text-5xl font-black text-gray-800 drop-shadow-sm">
            ข้อมูลส่วนตัว
          </h1>

          <p className="text-gray-600 mt-3 text-lg">
            โปรไฟล์ และข้อมูลบัญชีของคุณ
          </p>
        </div>

        {/* Back */}
        <button
          onClick={() => router.push("/menu")}
          className="
            bg-white/70
            backdrop-blur-xl
            border border-white/40
            px-6 py-3
            rounded-2xl
            shadow-lg
            hover:scale-105
            transition
            text-gray-700
            font-bold
          "
        >
          ← กลับเมนู
        </button>

      </div>

      {/* Main Card */}
      <div className="
        relative z-10
        max-w-5xl
        mx-auto
        bg-white/70
        backdrop-blur-2xl
        border border-white/40
        rounded-[40px]
        shadow-2xl
        overflow-hidden
      ">

        {/* Top Banner */}
        <div className="
          h-52
          bg-gradient-to-r
          from-blue-600
          via-indigo-600
          to-cyan-500
          relative
        ">

          {/* Glow */}
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>

        </div>

        {/* Profile Section */}
        <div className="relative px-8 pb-10">

          {/* Profile Circle */}
          <div className="
            -mt-20
            w-40 h-40
            rounded-full
            bg-gradient-to-br from-white to-blue-100
            border-[6px] border-white
            shadow-2xl
            flex items-center justify-center
            text-6xl font-black text-blue-700
          ">
            U
          </div>

          {/* Name */}
          <div className="mt-6">

            <h2 className="text-4xl font-black text-gray-800">
              {nickname || "User"}
            </h2>

            <p className="text-gray-500 text-lg mt-2">
              ผู้ใช้งานทั่วไป
            </p>

            {/* Online */}
            <div className="flex items-center gap-3 mt-4">

              <div className="
                w-4 h-4
                rounded-full
                bg-green-500
                animate-pulse
                shadow-lg shadow-green-400
              "></div>

              <p className="text-green-600 font-bold text-lg">
                Online
              </p>

            </div>

          </div>

          {/* Info Grid */}
          <div className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-6
            mt-12
          ">

            {/* Card */}
            <div className="
              bg-white/70
              backdrop-blur-xl
              rounded-3xl
              p-6
              shadow-lg
              border border-white/40
              hover:scale-[1.02]
              transition
            ">
              <p className="text-gray-500 mb-3">
                ชื่อจริง
              </p>

              <h3 className="text-2xl font-black text-gray-800">
                {firstname || "-"}
              </h3>
            </div>

            {/* Card */}
            <div className="
              bg-white/70
              backdrop-blur-xl
              rounded-3xl
              p-6
              shadow-lg
              border border-white/40
              hover:scale-[1.02]
              transition
            ">
              <p className="text-gray-500 mb-3">
                นามสกุล
              </p>

              <h3 className="text-2xl font-black text-gray-800">
                {lastname || "-"}
              </h3>
            </div>

            {/* Card */}
            <div className="
              bg-white/70
              backdrop-blur-xl
              rounded-3xl
              p-6
              shadow-lg
              border border-white/40
              hover:scale-[1.02]
              transition
            ">
              <p className="text-gray-500 mb-3">
                Email
              </p>

              <h3 className="text-xl font-black text-gray-800 break-all">
                {email || "-"}
              </h3>
            </div>

            {/* Card */}
            <div className="
              bg-white/70
              backdrop-blur-xl
              rounded-3xl
              p-6
              shadow-lg
              border border-white/40
              hover:scale-[1.02]
              transition
            ">
              <p className="text-gray-500 mb-3">
                Username
              </p>

              <h3 className="text-2xl font-black text-gray-800">
                {username || "-"}
              </h3>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}