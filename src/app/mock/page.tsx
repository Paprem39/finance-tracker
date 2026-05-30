"use client";

export default function MockDataPage() {

  const generateMockData = () => {

    const expenseCategories = [
      {
        category: "🍜 ค่าอาหาร",
        notes: [
          "ข้าวมันไก่",
          "ก๋วยเตี๋ยว",
          "ชานม",
          "กาแฟ",
        ],
      },
  
      {
        category: "🛍️ ค่าช็อปปิ้ง",
        notes: [
          "ซื้อเสื้อ",
          "รองเท้า",
          "กระเป๋า",
        ],
      },
  
      {
        category: "⛽ ค่าน้ำมัน",
        notes: [
          "เติมน้ำมัน",
          "แก๊ส",
        ],
      },
  
      {
        category: "🚌 ค่าเดินทาง",
        notes: [
          "ค่ารถตู้",
          "BTS",
          "Grab",
        ],
      },
  
      {
        category: "🧴 ค่าของใช้",
        notes: [
          "แชมพู",
          "สบู่",
          "ทิชชู่",
        ],
      },
    ];
  
    const incomeCategories = [
      {
        category: "💰 เงินเดือน",
        notes: [
          "เงินเดือนประจำ",
        ],
      },
  
      {
        category: "🎁 รายได้พิเศษ",
        notes: [
          "ฟรีแลนซ์",
          "ขายของ",
          "โบนัส",
        ],
      },
    ];
  
    const mockTransactions = [];
  
    for (let i = 0; i < 200; i++) {
  
      const randomType =
        Math.random() > 0.7
          ? "income"
          : "expense";
  
      const source =
        randomType === "income"
          ? incomeCategories
          : expenseCategories;
  
      const randomCategory =
        source[
          Math.floor(
            Math.random() * source.length
          )
        ];
  
      const randomNote =
        randomCategory.notes[
          Math.floor(
            Math.random() *
            randomCategory.notes.length
          )
        ];
  
      const randomAmount =
        Math.floor(Math.random() * 5000) + 100;
  
      // สุ่มย้อนหลัง 1 ปี
      const randomDate = new Date();
  
      randomDate.setDate(
        randomDate.getDate() -
        Math.floor(Math.random() * 365)
      );
  
      mockTransactions.push({
        type: randomType,
        amount: randomAmount,
        category: randomCategory.category,
        note: randomNote,
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
};