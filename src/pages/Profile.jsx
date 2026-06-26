import Layout from "../components/Layout";
import Logo from "../components/Logo"; 
import {
  FiInfo,
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
      {/* max-w-md dan mx-auto memastikan layout tetap rapi setingkat aplikasi mobile */}
      <div className="min-h-screen bg-[#050816] text-white pb-24 max-w-md mx-auto">

        {/* Header */}
        <div className="text-center py-8 sm:py-10 flex flex-col items-center justify-center">
          
          {/* Logo dibuat sedikit fleksibel dengan utility class */}
          <div className="mb-3 sm:mb-4">
            <Logo size={58} className="sm:w-[65px]" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            SecretBox
          </h1>

          <p className="text-gray-400 mt-1.5 text-xs sm:text-sm px-4">
            Tempat Aman Untuk Bercerita
          </p>

          {/* Versi diperbarui menjadi 1.0.7 */}
          <span className="inline-block mt-3 px-3 py-0.5 sm:py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[11px] sm:text-xs font-medium tracking-wide">
            Version 1.0.7
          </span>

        </div>

        {/* Tentang */}
        <div className="mx-4 sm:mx-5 bg-slate-900/60 rounded-2xl sm:rounded-3xl border border-slate-700/50 p-5 sm:p-6 mb-4 sm:mb-5 backdrop-blur-xl">
          <div className="flex items-center gap-3 mb-3">
            <FiInfo className="text-purple-400 w-5 h-5 flex-shrink-0"/>
            <h2 className="font-semibold text-sm sm:text-base text-slate-200">Tentang</h2>
          </div>
          {/* Teks dirapikan ukuran font-nya agar pas dibaca di resolusi layar hp */}
          <p className="text-xs sm:text-sm text-gray-300 leading-6 sm:leading-7 text-justify sm:text-left">
            SecretBox adalah aplikasi jurnal pribadi yang dirancang oleh Prof. Dr. Evin Ryan Rey Perangin agin Hutagalung Simarpaung Simbolon Siregar Sibiru Biru Sibayak S.Kom. untuk membantu pengguna menyimpan cerita, perasaan, dan emosi dengan aman tanpa perlu khawatir kehilangan privasi.
          </p>
        </div>

        {/* Statistik / Ringkasan */}
        <div className="mx-4 sm:mx-5 bg-slate-900/60 rounded-2xl sm:rounded-3xl border border-slate-700/50 p-5 sm:p-6 mb-4 sm:mb-5 backdrop-blur-xl">
          <div className="flex items-center gap-3 mb-3">
            <FiBookOpen className="text-purple-400 w-5 h-5 flex-shrink-0"/>
            <h2 className="font-semibold text-sm sm:text-base text-slate-200">Ringkasan</h2>
          </div>
          <div className="flex justify-between items-center text-xs sm:text-sm">
            <span className="text-gray-300">Total Curhatan</span>
            <strong className="text-sm sm:text-base bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-black">
              {total}
            </strong>
          </div>
        </div>

        {/* Hubungi Developer */}
        <div className="mx-4 sm:mx-5 bg-slate-900/60 rounded-2xl sm:rounded-3xl border border-slate-700/50 overflow-hidden backdrop-blur-xl">
          <div className="p-4 sm:p-5 border-b border-slate-800 text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Hubungi Pengembang
          </div>

          {/* Tombol Instagram */}
          <a 
            href="https://instagram.com/evinngapake_k" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full flex justify-between items-center p-4 sm:p-5 border-b border-slate-800 hover:bg-slate-800/40 transition active:bg-slate-800/60 gap-2"
          >
            <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-200">
              <FiInstagram className="text-pink-400 w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span>Instagram</span>
            </div>
            <span className="text-[11px] sm:text-xs text-gray-400 truncate max-w-[150px]">@evinngapake_k</span>
          </a>

          {/* Tombol WhatsApp */}
          <a 
            href="https://wa.me/62895383074984" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full flex justify-between items-center p-4 sm:p-5 hover:bg-slate-800/40 transition active:bg-slate-800/60 gap-2"
          >
            <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-200">
              <FiMessageCircle className="text-emerald-400 w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span>WhatsApp</span>
            </div>
            <span className="text-[11px] sm:text-xs text-gray-400 flex-shrink-0">0895-3830-74984</span>
          </a>
        </div>

      </div>
    </Layout>
  );
}