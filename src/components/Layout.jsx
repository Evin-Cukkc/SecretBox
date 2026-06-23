import { useLocation } from "react-router-dom";
import BottomNav from "./BottomNav";

export default function Layout({ children }) {
  const location = useLocation();
  
  // Jika sedang di halaman jurnal, kita bisa sesuaikan padding bawahnya jika diperlukan,
  // tetapi pb-24 (96px) sebenarnya sudah sangat aman untuk menampung BottomNav setinggi 16 (64px) + margin bottom 4 (16px).
  const isJournal = location.pathname === "/journal";

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      {/* 
        Menggunakan pb-24 memberikan jarak 96px dari bawah. 
        Ini memastikan konten scroll paling bawah tidak mentok ke BottomNav.
      */}
      <main className={`max-w-md mx-auto transition-all ${isJournal ? "pb-24" : "pb-28"}`}>
        {children}
      </main>

      <BottomNav />
    </div>
  );
}