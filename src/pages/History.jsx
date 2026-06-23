import { useEffect, useState, useMemo } from "react";
import Layout from "../components/Layout";
import Logo from "../components/Logo"; // Memuat komponen Logo sesuai saran Liskaa
import { getHistory } from "../services/historyService";

// Fungsi untuk menentukan rentang waktu per 6 jam
const getPeriodRange = () => {
  const now = new Date();
  const start = new Date(now);
  const end = new Date(now);
  const hour = now.getHours();

  if (hour >= 3 && hour < 9) {
    start.setHours(3, 0, 0, 0);
    end.setHours(9, 0, 0, 0);
  } else if (hour >= 9 && hour < 15) {
    start.setHours(9, 0, 0, 0);
    end.setHours(15, 0, 0, 0);
  } else if (hour >= 15 && hour < 21) {
    start.setHours(15, 0, 0, 0);
    end.setHours(21, 0, 0, 0);
  } else {
    if (hour >= 21) {
      start.setHours(21, 0, 0, 0);
      end.setDate(end.getDate() + 1);
      end.setHours(3, 0, 0, 0);
    } else {
      start.setDate(start.getDate() - 1);
      start.setHours(21, 0, 0, 0);
      end.setHours(3, 0, 0, 0);
    }
  }

  return {
    start,
    end,
    id: `${start.getTime()}-${end.getTime()}`
  };
};

export default function History() {
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState(getPeriodRange());

  const { start, end } = period;

  // Fungsi fetch data
  const loadHistory = async () => {
    try {
      const data = await getHistory();
      if (Array.isArray(data)) {
        setJournals(data);
      }
    } catch (error) {
      console.error("Gagal mengambil data history:", error);
    } finally {
      setLoading(false);
    }
  };

  // Lifecycle sinkronisasi data & pergeseran shift periode
  useEffect(() => {
    loadHistory();

    const interval = setInterval(() => {
      loadHistory();
      
      const newPeriod = getPeriodRange();
      setPeriod((prevPeriod) => {
        if (prevPeriod.id !== newPeriod.id) {
          return newPeriod;
        }
        return prevPeriod;
      });
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // 1. Filter data berdasarkan Periode Aktif
  const filteredJournals = useMemo(() => {
    return journals.filter((journal) => {
      const journalDate = new Date(journal.createdAt);
      return journalDate >= start && journalDate < end;
    });
  }, [journals, start, end]);

  // 2. Hitung Statistik Mood Otomatis menggunakan reduce() sesuai saran Liskaa
  const stats = useMemo(() => {
    return filteredJournals.reduce(
      (acc, journal) => {
        const mood = (journal.mood || "").toLowerCase();
        if (mood === "bahagia" || mood === "happy") acc.bahagia++;
        else if (mood === "sedih" || mood === "sad") acc.sedih++;
        else if (mood === "marah" || mood === "angry") acc.marah++;
        else if (mood === "cemas" || mood === "anxious") acc.cemas++;
        return acc;
      },
      { bahagia: 0, sedih: 0, marah: 0, cemas: 0 }
    );
  }, [filteredJournals]);

  return (
    <Layout>
      <div className="p-6 text-white max-w-2xl mx-auto min-h-screen">
        
        {/* 1. Header Baru dengan Logo */}
        <div className="flex items-center gap-4 mb-8">
          <Logo size={42} />
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              History Komunitas
            </h1>
            <p className="text-gray-400 text-sm">
              Curhatan anonim pengguna SecretBox
            </p>
          </div>
        </div>

        {/* Informasi Periode Aktif */}
        <div className="bg-purple-500/10 backdrop-blur-md border border-purple-500/20 rounded-2xl p-4 mb-6 flex justify-between items-center text-sm shadow-lg shadow-purple-500/5">
          <span className="text-purple-200 flex items-center gap-2">⏰ Periode Aktif Saat Ini:</span>
          <strong className="text-purple-300 bg-purple-500/20 px-3 py-1 rounded-full border border-purple-500/30">
            {String(start.getHours()).padStart(2, "0")}:00 -{" "}
            {String(end.getHours()).padStart(2, "0")}:00
          </strong>
        </div>

        {/* Tambahan Liskaa: Dashboard Statistik Realtime */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/60 rounded-3xl p-5 shadow-xl mb-8 grid grid-cols-2 sm:grid-cols-5 gap-4 text-center">
          <div className="col-span-2 sm:col-span-1 bg-slate-800/40 p-3 rounded-2xl border border-slate-700/40">
            <p className="text-xs text-gray-400 mb-1">📖 Total</p>
            <p className="text-xl font-bold text-purple-400">{filteredJournals.length}</p>
          </div>
          <div className="bg-slate-800/40 p-3 rounded-2xl border border-slate-700/40">
            <p className="text-xs text-gray-400 mb-1">😊 Bahagia</p>
            <p className="text-xl font-bold text-green-400">{stats.bahagia}</p>
          </div>
          <div className="bg-slate-800/40 p-3 rounded-2xl border border-slate-700/40">
            <p className="text-xs text-gray-400 mb-1">😔 Sedih</p>
            <p className="text-xl font-bold text-blue-400">{stats.sedih}</p>
          </div>
          <div className="bg-slate-800/40 p-3 rounded-2xl border border-slate-700/40">
            <p className="text-xs text-gray-400 mb-1">😡 Marah</p>
            <p className="text-xl font-bold text-red-400">{stats.marah}</p>
          </div>
          <div className="bg-slate-800/40 p-3 rounded-2xl border border-slate-700/40">
            <p className="text-xs text-gray-400 mb-1">😰 Cemas</p>
            <p className="text-xl font-bold text-amber-400">{stats.cemas}</p>
          </div>
        </div>

        {/* Logika Alur Tampilan Data */}
        {loading ? (
          /* 5. Loading Modern dengan Spinner */
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredJournals.length === 0 ? (
          /* 6. Empty State Cantik dengan Logo */
          <div className="flex flex-col items-center justify-center text-center py-16 bg-slate-900/40 border border-slate-800 rounded-3xl p-8 backdrop-blur-sm">
            <Logo size={60} />
            <h2 className="mt-6 text-xl font-semibold text-gray-200">
              Belum ada cerita
            </h2>
            <p className="text-gray-400 text-sm mt-2 max-w-xs">
              Belum ada curhatan pada periode ini. Jadilah yang pertama bercerita!
            </p>
          </div>
        ) : (
          /* List Card Cerita */
          <div className="space-y-4">
            {filteredJournals.map((journal, index) => (
              /* 2 & 3. Premium Glassmorphic Card dengan Efek Hover & Animasi Masuk */
              <div
                key={journal.id || index}
                className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/60 rounded-3xl p-5 shadow-xl hover:border-purple-500/40 hover:-translate-y-1 hover:shadow-purple-500/10 transition-all duration-300 animate-fade-in"
              >
                <p className="mb-4 text-gray-200 leading-relaxed text-[15px]">
                  {journal.content}
                </p>

                <div className="flex justify-between items-center pt-2 border-t border-slate-800/60">
                  {/* 4. Mood Badge Elegan */}
                  <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium capitalize">
                    {journal.mood || "Neutral"}
                  </span>
                  
                  {/* 7. Format Tanggal Elegan */}
                  <span className="text-xs text-gray-400 text-right whitespace-pre-line leading-tight">
                    {new Date(journal.createdAt).toLocaleString("id-ID", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit"
                    }).replace(" pukul ", "\n")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}