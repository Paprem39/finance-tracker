"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gray-100 text-black">
      {/* Navbar */}
      <nav className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">
            Finance Tracker
          </h1>

          <div className="space-x-4">
            <button className="px-4 py-2 rounded-xl border">
              Login
            </button>

            <button className="px-4 py-2 rounded-xl bg-blue-600 text-white">
              Register
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h2 className="text-5xl font-bold mb-6">
          จัดการรายรับรายจ่าย
          <br />
          ได้ง่ายในที่เดียว 💰
        </h2>

        <p className="text-gray-600 text-xl mb-8">
          บันทึกค่าใช้จ่าย ดูสรุปการเงิน
          และติดตามรายรับของคุณแบบง่าย ๆ
        </p>

        <button 
          onClick={() => router.push("/dashboard")}
          className="bg-blue-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold"
          >
          เริ่มใช้งานฟรี
        </button>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-2xl font-bold mb-3">
              บันทึกรายรับรายจ่าย
            </h3>

            <p className="text-gray-600">
              เพิ่มรายการรายรับและรายจ่ายได้ง่าย
              พร้อมหมวดหมู่ครบถ้วน
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-2xl font-bold mb-3">
              สรุปการเงิน
            </h3>

            <p className="text-gray-600">
              ดูยอดคงเหลือ รายรับ รายจ่าย
              แบบเข้าใจง่าย
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-2xl font-bold mb-3">
              ใช้งานได้ทุกที่
            </h3>

            <p className="text-gray-600">
              รองรับมือถือ แท็บเล็ต และคอมพิวเตอร์
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}