import { useEffect, useState, useMemo } from "react";
import Layout from "../components/Layout";
import Logo from "../components/Logo"; 
import { getHistory } from "../services/historyService";

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

  // Filter data berdasarkan Periode Aktif
  const filteredJournals = useMemo(() => {
    return journals.filter((journal) => {
      const journalDate = new Date(journal.createdAt);
      return journalDate >= start && journalDate < end;
    });
  }, [journals, start, end]);

  // Hitung Statistik Mood
  const stats = useMemo(() => {
    return filteredJournals.reduce(
      (acc, journal) => {
        const mood = (journal.mood || "").toLowerCase();
        if (mood === "bahagia" || mood === "happy") acc.bahagia++;
        else if (mood === "sedih" || mood === "sad") acc.sedih++;
        else if (mood === "marah" || mood === "angry") acc.marah++;
        else if (mood === "cemas" || mood === "anxious") acc.cemas++;
        else if (mood === "tenang" || mood === "calm") acc.tenang++;
        else acc.netral++;
        return acc;
      },
      { bahagia: 0, sedih: 0, marah: 0, cemas: 0, tenang: 0, netral: 0 }
    );
  }, [filteredJournals]);

  return (
    <Layout>
      <div className="p-4 sm:p-6 text-white max-w-md sm:max-w-2xl mx-auto min-h-screen">
        
        {/* Header */}
        <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <Logo size={36} className="sm:w-[42px]" />
          <div>
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              History Komunitas
            </h1>
            <p className="text-gray-400 text-xs sm:text-sm">
              Curhatan anonim pengguna SecretBox
            </p>
          </div>
        </div>

        {/* Informasi Periode Aktif */}
        <div className="bg-purple-500/10 backdrop-blur-md border border-purple-500/20 rounded-xl sm:rounded-2xl p-3.5 sm:p-4 mb-5 sm:mb-6 flex flex-row justify-between items-center text-xs sm:text-sm shadow-lg shadow-purple-500/5">
          <span className="text-purple-200 flex items-center gap-2">⏰ Periode Aktif:</span>
          <strong className="text-purple-300 bg-purple-500/20 px-2.5 py-1 rounded-full border border-purple-500/30 font-semibold tracking-wide">
            {String(start.getHours()).padStart(2, "0")}:00 -{" "}
            {String(end.getHours()).padStart(2, "0")}:00
          </strong>
        </div>

        {/* Dashboard Statistik Realtime - Pola Susunan 1-3-3 */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/60 rounded-2xl sm:rounded-3xl p-4 shadow-xl mb-6 sm:mb-8 flex flex-col gap-3">
          
          {/* BARIS 1: Card Total (Melebar Penuh) */}
          <div className="w-full bg-gradient-to-r from-purple-950/40 to-slate-800/40 p-4 rounded-xl border border-purple-500/20 text-center shadow-inner">
            <p className="text-xs sm:text-sm text-purple-300 font-medium mb-0.5 tracking-wider">📖 TOTAL RESPON AKTIF</p>
            <p className="text-2xl sm:text-3xl font-black text-purple-400 tracking-tight">{filteredJournals.length}</p>
          </div>

          {/* BARIS 2: 3 Card Mood Pertama (Bahagia, Sedih, Marah) */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-slate-800/40 p-2 sm:p-3 rounded-xl border border-slate-700/40 flex flex-col justify-center">
              <p className="text-[10px] sm:text-xs text-gray-400 mb-0.5">😊 Bahagia</p>
              <p className="text-base sm:text-lg font-bold text-green-400">{stats.bahagia}</p>
            </div>
            <div className="bg-slate-800/40 p-2 sm:p-3 rounded-xl border border-slate-700/40 flex flex-col justify-center">
              <p className="text-[10px] sm:text-xs text-gray-400 mb-0.5">😭 Sedih</p>
              <p className="text-base sm:text-lg font-bold text-blue-400">{stats.sedih}</p>
            </div>
            <div className="bg-slate-800/40 p-2 sm:p-3 rounded-xl border border-slate-700/40 flex flex-col justify-center">
              <p className="text-[10px] sm:text-xs text-gray-400 mb-0.5">😡 Marah</p>
              <p className="text-base sm:text-lg font-bold text-red-400">{stats.marah}</p>
            </div>
          </div>

          {/* BARIS 3: 3 Card Mood Kedua (Cemas, Tenang, Netral) */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-slate-800/40 p-2 sm:p-3 rounded-xl border border-slate-700/40 flex flex-col justify-center">
              <p className="text-[10px] sm:text-xs text-gray-400 mb-0.5">😰 Cemas</p>
              <p className="text-base sm:text-lg font-bold text-amber-400">{stats.cemas}</p>
            </div>
            <div className="bg-slate-800/40 p-2 sm:p-3 rounded-xl border border-slate-700/40 flex flex-col justify-center">
              <p className="text-[10px] sm:text-xs text-gray-400 mb-0.5">😌 Tenang</p>
              <p className="text-base sm:text-lg font-bold text-teal-400">{stats.tenang}</p>
            </div>
            <div className="bg-slate-800/40 p-2 sm:p-3 rounded-xl border border-slate-700/40 flex flex-col justify-center">
              <p className="text-[10px] sm:text-xs text-gray-400 mb-0.5">😐 Netral</p>
              <p className="text-base sm:text-lg font-bold text-gray-400">{stats.netral}</p>
            </div>
          </div>

        </div>

        {/* Logika Tampilan Data */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-9 h-9 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredJournals.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-12 bg-slate-900/40 border border-slate-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 backdrop-blur-sm">
            <Logo size={48} className="sm:w-[60px]" />
            <h2 className="mt-4 text-lg font-semibold text-gray-200">
              Belum ada cerita
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm mt-1 max-w-xs px-4">
              Belum ada curhatan pada periode ini. Jadilah yang pertama bercerita!
            </p>
          </div>
        ) : (
          /* List Card Cerita */
          <div className="space-y-3 sm:space-y-4">
            {filteredJournals.map((journal, index) => {
              const currentMood = (journal.mood || "netral").toLowerCase();
              let badgeColor = "bg-gray-500/10 border-gray-500/20 text-gray-400";
              
              if (currentMood === "bahagia" || currentMood === "happy") badgeColor = "bg-green-500/10 border-green-500/20 text-green-400";
              else if (currentMood === "sedih" || currentMood === "sad") badgeColor = "bg-blue-500/10 border-blue-500/20 text-blue-400";
              else if (currentMood === "marah" || currentMood === "angry") badgeColor = "bg-red-500/10 border-red-500/20 text-red-400";
              else if (currentMood === "cemas" || currentMood === "anxious") badgeColor = "bg-amber-500/10 border-amber-500/20 text-amber-400";
              else if (currentMood === "tenang" || currentMood === "calm") badgeColor = "bg-teal-500/10 border-teal-500/20 text-teal-400";

              return (
                <div
                  key={journal.id || index}
                  className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/60 rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-xl hover:border-purple-500/40 transition-all duration-300 animate-fade-in"
                >
                  <p className="mb-3 sm:mb-4 text-gray-200 leading-relaxed text-sm sm:text-[15px]">
                    {journal.content}
                  </p>

                  <div className="flex justify-between items-center pt-2 border-t border-slate-800/60 gap-2">
                    <span className={`px-2.5 py-0.5 sm:py-1 rounded-full border text-[11px] sm:text-xs font-medium capitalize flex-shrink-0 ${badgeColor}`}>
                      {journal.mood || "Netral"}
                    </span>
                    
                    <span className="text-[10px] sm:text-xs text-gray-400 text-right whitespace-pre-line leading-tight">
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
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
}