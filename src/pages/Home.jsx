import Layout from "../components/Layout";
import Logo from "../components/Logo"; // Import eksternal baru
import { BsPencilSquare } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { FiLock, FiBookOpen, FiBarChart2 } from "react-icons/fi";

export default function Home() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="min-h-screen px-6 text-white relative overflow-hidden">
        
        {/* Efek Ambient Glow Latar Belakang */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="pt-12 pb-12 relative z-10">

          {/* Header Tema Vault Premium */}
<div className="flex justify-between items-center mb-8">
  <div className="flex items-center gap-3">
    <div className="h-8 w-[2px] bg-gradient-to-b from-purple-500 to-transparent rounded-full" />
    <div>
      <h2 className="font-black tracking-tight text-lg text-white">SECRET<span className="text-purple-500">BOX</span></h2>
      <p className="text-[10px] text-gray-500 tracking-widest uppercase -mt-1">Brankas Pikiran Pribadi</p>
    </div>
  </div>

  <div className="w-10 h-10 rounded-xl bg-white/[0.02] flex items-center justify-center border border-white/10">
    <Logo size={22} />
  </div>
</div>

          {/* Wadah Logo Utama Tengah */}
          <div className="flex justify-center mb-8">
            <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-purple-950/40 to-purple-900/20 flex items-center justify-center border border-purple-500/20 shadow-xl shadow-purple-500/5 group">
              {/* Logo Premium Peningkatan dari Liska */}
              <Logo
                size={90}
                className="
                animate-pulse
                drop-shadow-[0_0_30px_rgba(168,85,247,0.8)]
                transition-transform
                duration-300
                group-hover:scale-105
                "
              />
            </div>
          </div>

          {/* Teks Sambutan */}
          <div className="text-center mb-10">
            <p className="text-purple-400 text-sm mb-2">Selamat Datang di SecretBox</p>
            <h1 className="text-4xl font-bold leading-tight mb-4">
              Simpan Ceritamu<br />Dengan Aman
            </h1>
            <p className="text-gray-400 max-w-sm mx-auto">
              Tempat anonim untuk menuangkan pikiran, perasaan, dan rahasia tanpa takut dihakimi.
            </p>
          </div>

          {/* Tombol Aksi */}
          <button
            onClick={() => navigate("/journal")}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-500 py-4 rounded-2xl text-lg font-semibold flex justify-center items-center gap-2 shadow-lg shadow-purple-500/20 hover:scale-[1.02] transition-all"
          >
            <BsPencilSquare />
            Mulai Menulis
          </button>

          {/* Statistik Mini */}
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="glass-card hover:scale-[1.02] transition-all p-4 text-center">
              <p className="text-2xl font-bold text-purple-400">24 Jam</p>
              <p className="text-gray-400 text-sm">Periode Aktif</p>
            </div>

            <div className="glass-card hover:scale-[1.02] transition-all p-4 text-center">
              <p className="text-2xl font-bold text-green-400">Anonim</p>
              <p className="text-gray-400 text-sm">100% Aman</p>
            </div>
          </div>

          {/* Daftar Fitur Utama */}
          <div className="space-y-4 mt-8">
            <div className="glass-card hover:scale-[1.02] transition-all p-5 flex items-center gap-4">
              <div className="text-purple-400 text-2xl"><FiLock /></div>
              <div>
                <h3 className="font-semibold">Rahasiamu Aman</h3>
                <p className="text-sm text-gray-400">Tidak ada nama pengguna yang ditampilkan.</p>
              </div>
            </div>

            <div className="glass-card hover:scale-[1.02] transition-all p-5 flex items-center gap-4">
              <div className="text-blue-400 text-2xl"><FiBookOpen /></div>
              <div>
                <h3 className="font-semibold">History Komunitas</h3>
                <p className="text-sm text-gray-400">Lihat curhatan anonim dari pengguna lain.</p>
              </div>
            </div>

            <div className="glass-card hover:scale-[1.02] transition-all p-5 flex items-center gap-4">
              <div className="text-green-400 text-2xl"><FiBarChart2 /></div>
              <div>
                <h3 className="font-semibold">Statistik Mood</h3>
                <p className="text-sm text-gray-400">Pantau suasana hati komunitas secara realtime.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}