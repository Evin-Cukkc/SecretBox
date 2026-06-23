import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion"; 
import Logo from "./Logo";
import {
  AiOutlineHome,
  AiOutlineBarChart,
  AiOutlineUser,
} from "react-icons/ai";
import { BsBook } from "react-icons/bs";

export default function BottomNav() {
  const location = useLocation();
  const isJournalActive = location.pathname === "/journal";

  const menus = [
    { path: "/", label: "Beranda", icon: <AiOutlineHome size={22} /> },
    { path: "/history", label: "Riwayat", icon: <BsBook size={20} /> },
    { path: "/journal", label: "Journal", isSpecial: true }, 
    { path: "/stats", label: "Statistik", icon: <AiOutlineBarChart size={22} /> },
    { path: "/profile", label: "Profil", icon: <AiOutlineUser size={22} /> },
  ];

  return (
    <div
      className="
      fixed bottom-4 left-1/2 -translate-x-1/2
      w-[92%] max-w-md h-16
      bg-slate-900/90 backdrop-blur-xl
      border border-purple-500/10 rounded-3xl
      flex justify-around items-center
      shadow-[0_0_30px_rgba(168,85,247,0.15)]
      z-50 px-2
      "
    >
      {menus.map((menu) => {
        const isActive = location.pathname === menu.path;

        // Render khusus untuk tombol Jurnal Tengah
        if (menu.isSpecial) {
          return (
            <div key={menu.path} className="relative w-14 h-full flex items-center justify-center">
              {/* Di sini h-full dan flex items-center memastikan posisi dasarnya sejajar lurus dengan menu lain */}
              <Link to={menu.path} className="relative z-10 w-full h-full flex items-center justify-center">
                <motion.div
                  className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center border border-purple-400 rounded-xl"
                  
                  initial={false}
                  
                  // Animasi murni mengontrol scale dan posisi vertikal relatif terhadap titik tengah navbar
                  animate={
                    isJournalActive
                      ? {
                          scale: 0.83, // Mengecil jadi sekitar 40px
                          y: 0,        // Kembali ke posisi awal (sejajar sempurna di tengah)
                          boxShadow: "0px 0px 0px rgba(168,85,247,0)",
                        }
                      : {
                          scale: 1,    // Ukuran penuh (48px)
                          y: -18,      // Melayang ke atas secara perlahan saat menu lain aktif
                          boxShadow: "0px 10px 20px rgba(168,85,247,0.4)",
                        }
                  }
                  
                  // Menggunakan easing sirkular (circOut) agar transisi melambat di akhir dengan sangat presisi dan anggun
                  transition={{
                    type: "tween",
                    ease: "circOut", 
                    duration: 0.5, // Waktu setengah detik, pas untuk menangkap pergerakan meluncur turun
                  }}
                  whileTap={{ scale: 0.75 }}
                >
                  <Logo
                    size={24} // Ukuran konstan, biarkan scale di atas yang mengecilkannya secara visual
                    className="drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                  />
                </motion.div>

                {/* Efek Sliding Pill Latar Belakang */}
                {isJournalActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute inset-0 bg-purple-500/10 rounded-2xl -z-10 m-1"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            </div>
          );
        }

        // Render untuk menu biasa
        return (
          <Link
            key={menu.path}
            to={menu.path}
            className={`
              relative flex flex-col items-center justify-center h-full px-3 z-10
              transition-colors duration-300
              ${isActive ? "text-purple-400" : "text-gray-500 hover:text-gray-300"}
            `}
          >
            <motion.div
              animate={isActive ? { scale: 1.1, y: -2 } : { scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {menu.icon}
            </motion.div>

            <span className="text-[10px] mt-1 font-medium">{menu.label}</span>

            {isActive && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute inset-0 bg-purple-500/10 rounded-2xl -z-10 m-1"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </Link>
        );
      })}
    </div>
  );
}