import { useEffect, useState, useMemo, useCallback } from "react";
import Layout from "../components/Layout";
import Logo from "../components/Logo"; 
import { getHistory } from "../services/historyService";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { TrendingUp, BarChart3, MessageSquare } from "lucide-react";

const MOOD_MAP = { 
  "Senang": "😊 Bahagia", 
  "Bahagia": "😊 Bahagia", 
  "Netral": "😐 Netral", 
  "Sedih": "😔 Sedih", 
  "Marah": "😡 Marah", 
  "Cemas": "😰 Cemas", 
  "Tenang": "😌 Tenang" 
};

const INITIAL_MOODS = { 
  "😊 Bahagia": 0, 
  "😔 Sedih": 0, 
  "😡 Marah": 0, 
  "😰 Cemas": 0, 
  "😌 Tenang": 0, 
  "😐 Netral": 0 
};

const MOOD_COLORS = { 
  "😊 Bahagia": "#22c55e", 
  "😔 Sedih": "#3b82f6", 
  "😡 Marah": "#ef4444", 
  "😰 Cemas": "#f59e0b", 
  "😌 Tenang": "#8b5cf6", 
  "😐 Netral": "#94a3b8" 
};

export default function Stats() {
  const [journals, setJournals] = useState([]);
  const [timeframe, setTimeframe] = useState("24h");

  const loadData = useCallback(() => {
    getHistory().then(d => Array.isArray(d) && setJournals(d));
  }, []);

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 60000);
    return () => clearInterval(interval);
  }, [loadData]);

  const stats = useMemo(() => {
    const now = Date.now();
    const MS_24H = 86400000;
    const MS_7D = 7 * MS_24H;

    const validJournals = journals.filter(j => (now - new Date(j.createdAt).getTime()) >= 0);
    const count24h = validJournals.filter(j => (now - new Date(j.createdAt).getTime()) <= MS_24H).length;
    const count7d = validJournals.filter(j => (now - new Date(j.createdAt).getTime()) <= MS_7D).length;

    const counts = { ...INITIAL_MOODS };
    const targetMs = timeframe === "24h" ? MS_24H : MS_7D;

    validJournals.forEach(j => {
      if ((now - new Date(j.createdAt).getTime()) <= targetMs) {
        const mood = MOOD_MAP[j.mood] || j.mood;
        if (counts[mood] !== undefined) counts[mood]++;
      }
    });

    const chartData = Object.entries(counts)
      .filter(([_, v]) => v > 0)
      .map(([name, value]) => ({ name, value }));
      
    const dominantData = chartData.length ? [...chartData].sort((a, b) => b.value - a.value)[0] : null;
    const activeTotal = timeframe === "24h" ? count24h : count7d;

    return {
      total24h: count24h, 
      total7d: count7d, 
      activeTotal, 
      moodCounts: counts, 
      chartData,
      dominantMood: dominantData ? dominantData.name : "-",
      dominantPercent: dominantData && activeTotal ? ((dominantData.value / activeTotal) * 100).toFixed(0) : "0"
    };
  }, [journals, timeframe]);

  const CARD_STYLE = "bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6";

  return (
    <Layout>
      <div className="p-6 text-white max-w-2xl mx-auto space-y-4">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <Logo size={45} />
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              Statistik Komunitas
            </h1>
            <p className="text-gray-400 text-sm">Ringkasan aktivitas pengguna SecretBox</p>
          </div>
        </div>
        
        {/* Total Curhatan */}
        <div className={`${CARD_STYLE} flex justify-between items-center relative overflow-hidden`}>
          <div>
            <h3 className="text-sm text-gray-400 font-medium tracking-wide">
              Total Curhatan ({timeframe === "24h" ? "24 Jam" : "7 Hari"})
            </h3>
            <p className="text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mt-1">
              {stats.activeTotal}
            </p>
          </div>
          <div className="p-3 bg-purple-500/10 rounded-2xl border border-purple-500/20 shadow-inner">
            <MessageSquare className="w-8 h-8 text-purple-400" />
          </div>
        </div>

        {/* Mood Dominan */}
        <div className={`${CARD_STYLE} flex justify-between items-center`}>
          <div className="flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-yellow-400 hidden sm:block" />
            <div>
              <h3 className="text-sm text-gray-400 font-medium">
                Mood Dominan ({timeframe === "24h" ? "Hari Ini" : "7 Hari Terakhir"})
              </h3>
              <p className="text-xl font-bold text-yellow-400 mt-1">{stats.dominantMood}</p>
            </div>
          </div>
          {stats.dominantMood !== "-" && (
            <div className="text-right">
              <p className="text-3xl font-black text-yellow-400">{stats.dominantPercent}%</p>
              <p className="text-xs text-gray-400">dari seluruh curhatan</p>
            </div>
          )}
        </div>

        {/* Grid Sesi */}
        <div className="grid grid-cols-2 gap-4">
          {[["Total Sesi 24 Jam", stats.total24h], ["Total Sesi 7 Hari", stats.total7d]].map(([title, val], idx) => (
            <div key={idx} className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-5">
              <h2 className="text-xs text-gray-400 font-medium">{title}</h2>
              <p className="text-2xl font-bold text-slate-300 mt-1">{val}</p>
            </div>
          ))}
        </div>

        {/* Grafik */}
        <div className={CARD_STYLE}>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-purple-400" />
              <h2 className="text-lg font-semibold text-slate-200">Distribusi Mood</h2>
            </div>
            <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
              {["24h", "7d"].map(t => (
                <button 
                  key={t} 
                  onClick={() => setTimeframe(t)} 
                  className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${timeframe === t ? "bg-purple-600 text-white shadow-lg" : "text-gray-400 hover:text-white"}`}
                >
                  {t === "24h" ? "24 Jam" : "7 Hari"}
                </button>
              ))}
            </div>
          </div>

          {/* Container dibuat flex center agar grafik statis duduk manis tepat di tengah */}
          <div className="w-full h-[260px] flex items-center justify-center relative">
            {stats.chartData.length === 0 ? (
              <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm">
                Tidak ada data mood pada periode ini.
              </div>
            ) : (
              /* SOLUSI TOTAL: Mengganti ResponsiveContainer dengan memberikan properti lebar dan tinggi statis */
              <PieChart width={320} height={260}>
                <Pie 
                  data={stats.chartData} 
                  dataKey="value" 
                  nameKey="name" 
                  innerRadius={55} 
                  outerRadius={90} 
                  cx="50%"
                  cy="50%"
                  isAnimationActive 
                  animationDuration={1200}
                >
                  {stats.chartData.map((entry, i) => (
                    <Cell key={i} fill={MOOD_COLORS[entry.name] || "#94a3b8"} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => [`${v} Curhatan`, "Jumlah"]} />
                <text x="50%" y="46%" textAnchor="middle" dominantBaseline="middle" className="fill-white font-black text-2xl">
                  {stats.activeTotal}
                </text>
                <text x="50%" y="56%" textAnchor="middle" dominantBaseline="middle" className="fill-gray-400 font-medium text-xs">
                  Curhatan
                </text>
              </PieChart>
            )}
          </div>
        </div>

        {/* List Detail Mood */}
        <div className="space-y-4">
          {Object.entries(stats.moodCounts).map(([mood, count]) => {
            const percentage = stats.activeTotal > 0 ? (count / stats.activeTotal) * 100 : 0;
            return (
              <div key={mood} className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-5 flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-slate-200">{mood}</span>
                  <span className="font-semibold bg-slate-800/80 border border-slate-700/40 px-3 py-1 rounded-xl text-xs text-purple-300">
                    {count}
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800/50">
                  <div 
                    style={{ width: `${percentage}%` }} 
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out" 
                  />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </Layout>
  );
}