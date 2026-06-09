"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const [popupOpen, setPopupOpen] =
  useState(false);

  const [popupTitle, setPopupTitle] =
  useState("");

  const [popupMessage, setPopupMessage] =
  useState("");

  const [popupType, setPopupType] =
  useState<"success" | "error">("success");

  const router = useRouter();
  const [nickname, setNickname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const [email, setEmail] = useState("");

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

    const handleRegister = async () => {
        try {
          const response = await fetch("/api/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              nickname,
              firstname,
              lastname,
              email,
              username,
              password,
            }),
          });
      
          const data = await response.json();
      
          if (!response.ok) {

            setPopupType("error");

            setPopupTitle("สมัครสมาชิกไม่สำเร็จ");

            setPopupMessage(
            data.error || "เกิดข้อผิดพลาด"
          );

            setPopupOpen(true);

          return;
        }
      
        setPopupType("success");

        setPopupTitle("สมัครสมาชิกสำเร็จ 🎉");
        
        setPopupMessage(
          "ระบบได้สร้างบัญชีของคุณเรียบร้อยแล้ว"
        );
        
        setPopupOpen(true);
        
        setNickname("");
        setFirstname("");
        setLastname("");
        setEmail("");
        setUsername("");
        setPassword("");
        setConfirmPassword("");

          console.log(data);
      
        } catch (error) {

          console.log(error);
        
          setPopupType("error");
        
          setPopupTitle("เกิดข้อผิดพลาด");
        
          setPopupMessage(
            "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้"
          );
        
          setPopupOpen(true);
        
        }
      };

  const isPasswordMatch =
  password === confirmPassword;

    const isFormValid =
  nickname &&
  firstname &&
  lastname &&
  email &&
  username &&
  password &&
  confirmPassword &&
  isPasswordMatch;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      <div className="bg-white w-full max-w-md p-8 rounded-3xl shadow-xl">

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-black">
            สมัครสมาชิก
          </h1>

          <p className="text-gray-500 mt-2">
            เริ่มต้นใช้งานระบบจัดการการเงิน
          </p>
        </div>

        {/* Nickname */}
        <div className="mb-4">
          <label className="block text-black font-medium mb-2">
            ชื่อเล่น
          </label>

          <input
            type="text"
            placeholder="กรอกชื่อเล่น"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="w-full border border-gray-300 p-4 rounded-2xl text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Firstname */}
        <div className="mb-4">
          <label className="block text-black font-medium mb-2">
            ชื่อจริง
          </label>

          <input
            type="text"
            placeholder="กรอกชื่อจริง"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            className="w-full border border-gray-300 p-4 rounded-2xl text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Lastname */}
        <div className="mb-4">
          <label className="block text-black font-medium mb-2">
            นามสกุล
          </label>

          <input
            type="text"
            placeholder="กรอกนามสกุล"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            className="w-full border border-gray-300 p-4 rounded-2xl text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-black font-medium mb-2">
            อีเมล
          </label>

          <input
            type="email"
            placeholder="กรอกอีเมล"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 p-4 rounded-2xl text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Username */}
        <div className="mb-4">
          <label className="block text-black font-medium mb-2">
            Username (ใช้สำหรับเข้าสู่ระบบ)
          </label>

          <input
            type="text"
            placeholder="กรอก Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 p-4 rounded-2xl text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-black font-medium mb-2">
            Password
          </label>

          <input
            type="password"
            placeholder="กรอก Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 p-4 rounded-2xl text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Confirm Password */}
            <div className="mb-6">
            <label className="block text-black font-medium mb-2">
                Confirm Password
            </label>

        <input
        type="password"
        placeholder="ยืนยัน Password"
        value={confirmPassword}
        onChange={(e) =>
            setConfirmPassword(e.target.value)
        }
        className={`w-full border p-4 rounded-2xl text-black focus:outline-none focus:ring-2
      ${
        confirmPassword && !isPasswordMatch
          ? "border-red-500 focus:ring-red-400"
          : "border-gray-300 focus:ring-blue-400"
      }
    `}
  />

        {/* Error Message */}
        {confirmPassword && !isPasswordMatch && (
        <p className="text-red-500 text-sm mt-2">
            รหัสผ่านไม่ตรงกัน
        </p>
  )}
</div>

        {/* Register Button */}
            <button
            onClick={handleRegister}
            disabled={!isFormValid}
            className={`w-full font-bold text-lg py-4 rounded-2xl shadow-lg transition
        ${
            isFormValid
            ? "bg-blue-600 hover:bg-blue-700 text-white"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }
            `}
        >
            สมัครสมาชิก
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
            router.push("/login");
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