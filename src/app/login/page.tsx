"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";


export default function LoginPage() {
  
  const router = useRouter();

  const [loginInput, setLoginInput] = useState("");
  const [password, setPassword] = useState("");

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

  const handleLogin = async () => {

    const result = await signIn(
      "credentials",
      {
        loginInput,
        password,
        redirect: false,
      }
    );
  
    if (result?.error) {

      setPopupType("error");
    
      setPopupTitle("เข้าสู่ระบบไม่สำเร็จ");
    
      setPopupMessage(
        "Username หรือ Password ไม่ถูกต้อง"
      );
    
      setPopupOpen(true);
    
      return;
    }
    
    setPopupType("success");
    
    setPopupTitle("เข้าสู่ระบบสำเร็จ 🎉");
    
    setPopupMessage(
      "ยินดีต้อนรับเข้าสู่ระบบ"
    );
    
    setPopupOpen(true);
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

        

        {/* Username */}
        <div className="mb-4">
          <label className="text-sm font-semibold text-gray-700 block mb-2">
            Username 
          </label>

          <input
            type="text"
            value={loginInput}
            onChange={(e) => setLoginInput(e.target.value)}
            placeholder="กรอก Username"
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
            Sign up
          </button>

        </div>

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
        rounded-3xl
        p-8
        w-[90%]
        max-w-md
        text-center
        shadow-2xl
      "
    >

      <div className="text-6xl mb-4">
        {popupType === "success"
          ? "🎉"
          : "⚠️"}
      </div>

      <h2 className="text-2xl font-bold text-black mb-2">
        {popupTitle}
      </h2>

      <p className="text-gray-600 mb-6">
        {popupMessage}
      </p>

      <button
        onClick={() => {

          setPopupOpen(false);

          if (
            popupType === "success"
          ) {
            router.push("/menu");
          }

        }}
        className={`
          w-full
          py-3
          rounded-2xl
          font-bold
          text-white
          ${
            popupType === "success"
              ? "bg-green-600 hover:bg-green-700"
              : "bg-red-600 hover:bg-red-700"
          }
        `}
      >
        ตกลง
      </button>

    </div>
  </div>
)}
    </div>
  );
}