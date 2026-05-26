"use client";

export default function MockDataPage() {

  const generateMockData = () => {

    const categories = [
      "ค่าข้าว",
      "ค่าขนม",
      "ค่าน้ำมัน",
      "ค่าเดินทาง",
      "ค่าห้อง",
      "ค่าไฟ",
      "ค่าของใช้",
      "เงินเดือน",
      "ฟรีแลนซ์",
      "โบนัส",
    ];

    const types = ["income", "expense"];

    const mockTransactions = [];

    for (let i = 0; i < 200; i++) {

      const randomType =
        types[Math.floor(Math.random() * types.length)];

      const randomCategory =
        categories[Math.floor(Math.random() * categories.length)];

      const randomAmount =
        Math.floor(Math.random() * 5000) + 100;

      // สุ่มวันที่ย้อนหลัง 1 ปี
      const randomDate = new Date();

      randomDate.setDate(
        randomDate.getDate() -
        Math.floor(Math.random() * 365)
      );

      mockTransactions.push({
        type: randomType,
        amount: randomAmount,
        category: randomCategory,
        date: randomDate
          .toLocaleDateString("en-CA"),
      });
    }

    localStorage.setItem(
      "transactions",
      JSON.stringify(mockTransactions)
    );

    alert("สร้าง Mock Data สำเร็จ 🚀");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <button
        onClick={generateMockData}
        className="
          px-8
          py-5
          bg-blue-600
          hover:bg-blue-700
          text-white
          rounded-3xl
          text-2xl
          font-bold
          shadow-2xl
          active:scale-95
          transition
        "
      >
        สร้าง Mock Transactions 🚀
      </button>

    </div>
  );
}