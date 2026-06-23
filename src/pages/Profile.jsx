import Layout from "../components/Layout";
import Logo from "../components/Logo"; // <-- Tambahkan baris ini
import {
  FiInfo,
  FiHeart,
  FiBookOpen,
  FiInstagram,
  FiMessageCircle,
} from "react-icons/fi";

import { getJournals } from "../utils/storage";

export default function Profile() {
  const journals = getJournals();
  const total = journals.length;

  return (
    <Layout>
      <div className="min-h-screen bg-[#050816] text-white pb-24">

        {/* Header */}
        <div className="text-center py-10 flex flex-col items-center justify-center">
          
          {/* Menggunakan komponen Logo dengan ukuran 65px agar pas di tengah */}
          <div className="mb-4">
            <Logo size={65} />
          </div>

          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            SecretBox
          </h1>

          <p className="text-gray-400 mt-2 text-sm">
            Tempat Aman Untuk Bercerita
          </p>

          <span className="inline-block mt-4 px-4 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium">
            Version 1.0.0
          </span>

        </div>
        {/* Tentang */}
        <div className="mx-5 bg-slate-900/60 rounded-3xl border border-slate-700/50 p-6 mb-5 backdrop-blur-xl">
          <div className="flex items-center gap-3 mb-4">
            <FiInfo className="text-purple-400 w-5 h-5"/>
            <h2 className="font-semibold text-slate-200">Tentang</h2>
          </div>
          <p className="text-sm text-gray-300 leading-7">
            SecretBox adalah aplikasi jurnal pribadi yang di rancang Prof. Dr. Evin Ryan Rey Perangin agin Hutagalung Simarpaung Simbolon Siregar Sibiru Biru Sibayak Skom. untuk membantu pengguna menyimpan cerita,
            perasaan, dan emosi dengan aman tanpa perlu privasi.
          </p>
        </div>

        {/* Statistik / Ringkasan */}
        <div className="mx-5 bg-slate-900/60 rounded-3xl border border-slate-700/50 p-6 mb-5 backdrop-blur-xl">
          <div className="flex items-center gap-3 mb-4">
            <FiBookOpen className="text-purple-400 w-5 h-5"/>
            <h2 className="font-semibold text-slate-200">Ringkasan</h2>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-300">Total Curhatan</span>
            <strong className="text-base bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-black">
              {total}
            </strong>
          </div>
        </div>

        {/* Hubungi Developer (Menggantikan menu lama) */}
        <div className="mx-5 bg-slate-900/60 rounded-3xl border border-slate-700/50 overflow-hidden backdrop-blur-xl">
          <div className="p-5 border-b border-slate-800 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Hubungi Pengembang
          </div>

          {/* Tombol Instagram */}
          <a 
            href="https://instagram.com/evinngapake_k" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full flex justify-between items-center p-5 border-b border-slate-800 hover:bg-slate-800/40 transition"
          >
            <div className="flex items-center gap-3 text-sm text-slate-200">
              <FiInstagram className="text-pink-400 w-5 h-5" />
              <span>Instagram</span>
            </div>
            <span className="text-xs text-gray-400">@evinngapake_k</span>
          </a>

          {/* Tombol WhatsApp */}
          <a 
            href="https://wa.me/62895383074984" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full flex justify-between items-center p-5 hover:bg-slate-800/40 transition"
          >
            <div className="flex items-center gap-3 text-sm text-slate-200">
              <FiMessageCircle className="text-emerald-400 w-5 h-5" />
              <span>WhatsApp</span>
            </div>
            <span className="text-xs text-gray-400">0895-3830-74984</span>
          </a>
        </div>
      </div>
    </Layout>
  );
}