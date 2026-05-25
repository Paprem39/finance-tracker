"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [loginInput, setLoginInput] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // ไว้เชื่อม database ทีหลัง
    router.push("/menu");
  };

  const handleSignup = () => {
    router.push("/register");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 flex items-center justify-center p-6">

      {/* Card */}
      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl rounded-[32px] p-8">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-4xl shadow-xl">
            🔐
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-black text-center text-gray-800">
          เข้าสู่ระบบ
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          ยินดีต้อนรับกลับ 👋
        </p>

        {/* Username */}
        <div className="mb-4">
          <label className="text-sm font-semibold text-gray-700 block mb-2">
            Username หรือ Email
          </label>

          <input
            type="text"
            value={loginInput}
            onChange={(e) => setLoginInput(e.target.value)}
            placeholder="กรอก Username หรือ Email"
            className="
              w-full
              p-4
              rounded-2xl
              border
              border-gray-300
              bg-white
              text-black
              outline-none
              focus:ring-2
              focus:ring-blue-400
              transition
            "
          />
        </div>

        {/* Password */}
        <div className="mb-8">
          <label className="text-sm font-semibold text-gray-700 block mb-2">
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="กรอก Password"
            className="
              w-full
              p-4
              rounded-2xl
              border
              border-gray-300
              bg-white
              text-black
              outline-none
              focus:ring-2
              focus:ring-blue-400
              transition
            "
          />
        </div>

        {/* Buttons */}
        <div className="space-y-4">

          {/* Login */}
          <button
            onClick={handleLogin}
            className="
              w-full
              py-4
              rounded-2xl
              bg-blue-600
              hover:bg-blue-700
              active:scale-95
              transition
              text-white
              font-bold
              text-lg
              shadow-lg
            "
          >
            Login
          </button>

          {/* Signup */}
          <button
            onClick={handleSignup}
            className="
              w-full
              py-4
              rounded-2xl
              border-2
              border-blue-600
              text-blue-600
              hover:bg-blue-50
              active:scale-95
              transition
              font-bold
              text-lg
            "
          >
            Sign Up
          </button>

        </div>

      </div>
    </div>
  );
}