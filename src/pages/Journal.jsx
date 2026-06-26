import { useState, useEffect, useRef } from "react";
import Layout from "../components/Layout";
import Logo from "../components/Logo";
import { FiSend, FiAlertTriangle } from "react-icons/fi";
import { saveJournal } from "../utils/storage";
import { sendJournal } from "../services/journalService";
import { MOODS } from "../constants/moods";

const DEFAULT_MSGS = [{ sender: "bot", text: "Hai 👋 Ceritakan apa yang ingin kamu simpan hari ini." }];

export default function Journal() {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("secretbox_chat");
    return saved ? JSON.parse(saved) : DEFAULT_MSGS;
  });
  const [input, setInput] = useState("");
  const [mood, setMood] = useState("😐 Netral");
  const [isOpenReset, setIsOpenReset] = useState(false);
  const [isOpenMood, setIsOpenMood] = useState(false); 
  
  const chatEndRef = useRef(null);
  const isFirstRender = useRef(true);
  const moodRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (moodRef.current && !moodRef.current.contains(event.target)) {
        setIsOpenMood(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    localStorage.setItem("secretbox_chat", JSON.stringify(messages));
    if (isFirstRender.current) return void (isFirstRender.current = false);

    const timer = setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    return () => clearTimeout(timer);
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { sender: "user", text: input };
    const botMsg = { sender: "bot", text: "Terima kasih sudah mempercayakan ceritamu padaku 💜" };
    
    // VALIDASI: Memastikan jika user memilih Sedih, data yang dikirim menggunakan emoji 😭
    let finalMood = mood;
    if (mood.toLowerCase().includes("sedih") || mood.toLowerCase().includes("sad")) {
      finalMood = "😭 Sedih";
    }

    const journal = { 
      id: Date.now(), 
      content: input, 
      mood: finalMood, 
      createdAt: new Date().toISOString(), 
      source: "web" 
    };

    try {
      saveJournal(journal);
      await sendJournal(journal);
      setMessages((p) => [...p, userMsg, botMsg]);
      setInput("");
      setMood("😐 Netral");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex flex-col text-white relative">
        {/* Header */}
        <div className="p-5 flex justify-between items-center border-b border-purple-500/10 bg-slate-900/70 backdrop-blur-xl sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <Logo size={32} />
            <div>
              <h1 className="font-bold text-lg">SecretBox</h1>
              <p className="text-xs text-purple-300">Ruang aman untuk menulis</p>
            </div>
          </div>
          <button onClick={() => setIsOpenReset(true)} className="text-xs text-red-400 bg-red-500/10 px-3 py-1.5 rounded-xl border border-red-500/10 hover:border-red-500/30 font-medium transition-colors">
            Hapus
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 pb-40 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] px-4 py-3 rounded-3xl shadow-lg text-sm ${msg.sender === "user" ? "bg-gradient-to-r from-purple-600 to-purple-500 rounded-br-md" : "bg-slate-800 rounded-bl-md border border-slate-700 text-gray-200"}`}>
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Input Bar */}
        <div className="fixed bottom-22 left-1/2 -translate-x-1/2 w-[92%] max-w-md z-40 flex gap-2 items-end">
          <textarea 
            rows={1} 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())} 
            placeholder="Tulis rahasiamu..." 
            className="flex-1 bg-slate-900 rounded-2xl pt-[15px] pb-[11px] px-4 resize-none outline-none border border-purple-500/10 focus:border-purple-500 text-sm min-h-[52px] max-h-28 shadow-xl transition-colors" 
          />          
          
          {/* Custom Mood Picker (Kiri) */}
          <div className="relative shrink-0" ref={moodRef}>
            
            {/* BACKDROP REDUP */}
            {isOpenMood && (
              <div 
                className="fixed inset-0 bg-black/40 z-40 animate-in fade-in duration-200"
                onClick={() => setIsOpenMood(false)}
              />
            )}

            {/* POPUP MENU */}
            {isOpenMood && (
              <div className="absolute bottom-[64px] right-0 w-64 bg-slate-950 border border-purple-500/10 rounded-3xl p-3 shadow-[0_10px_30px_rgba(168,85,247,0.12)] z-50 flex flex-col gap-1.5 animate-in fade-in slide-in-from-bottom-3 duration-200">
                <p className="text-[11px] font-semibold tracking-wider text-purple-400/80 uppercase px-2 pb-1 border-b border-slate-900">
                  Bagaimana perasaanmu?
                </p>
                <div className="grid grid-cols-2 gap-1.5 max-h-52 overflow-y-auto pt-1.5 pr-0.5 custom-scrollbar">
                  {MOODS.map((m) => {
                    const isSedih = m.toLowerCase().includes("sedih") || m.toLowerCase().includes("sad");
                    // Mengubah tampilan emoji khusus baris Sedih di dalam list dropdown
                    const displayEmoji = isSedih ? "😭" : m.split(" ")[0];
                    const displayText = m.split(" ").slice(1).join(" ");

                    return (
                      <button
                        key={m}
                        onClick={() => {
                          setMood(m);
                          setIsOpenMood(false);
                        }}
                        className={`flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs font-medium text-left transition-all ${
                          mood === m
                            ? "bg-purple-600/15 border border-purple-500/40 text-purple-200"
                            : "bg-slate-900/50 hover:bg-slate-800/80 border border-transparent text-gray-300"
                        }`}
                      >
                        <span className="text-base leading-none">{displayEmoji}</span>
                        <span className="truncate">{displayText}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Trigger Button: Menggunakan 😭 jika mood aktif mengandung kata sedih/sad */}
            <button 
              onClick={() => setIsOpenMood(!isOpenMood)}
              className={`h-[52px] w-[52px] bg-slate-900 rounded-2xl border flex items-center justify-center text-xl shadow-xl transition-all active:scale-95 relative z-50 ${
                isOpenMood ? "border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.15)]" : "border-purple-500/10 hover:border-purple-500/40"
              }`}
            >
              {mood.toLowerCase().includes("sedih") || mood.toLowerCase().includes("sad") 
                ? "😭" 
                : mood.split(" ")[0]
              }
            </button>
          </div>

          {/* Send Button */}
          <button onClick={handleSend} className="bg-gradient-to-r from-purple-600 to-purple-500 hover:scale-105 shadow-[0_0_20px_rgba(168,85,247,0.4)] p-4 rounded-2xl flex items-center justify-center h-[52px] w-[52px] shrink-0 transition-all active:scale-95">
            <FiSend size={18} />
          </button>
        </div>

        <ResetModal 
          isOpen={isOpenReset} 
          onClose={() => setIsOpenReset(false)} 
          onConfirm={() => {
            localStorage.removeItem("secretbox_chat");
            isFirstRender.current = true;
            setMessages(DEFAULT_MSGS);
            setIsOpenReset(false);
          }} 
        />
      </div>
    </Layout>
  );
}

function ResetModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="bg-slate-900 border border-red-500/20 w-full max-w-sm rounded-3xl p-6 shadow-2xl relative z-10 animate-in fade-in zoom-in-95 duration-200 flex flex-col items-center text-center">
        <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 mb-4">
          <FiAlertTriangle size={24} />
        </div>
        <h3 className="text-lg font-bold mb-1">Hapus Semua Pesan?</h3>
        <p className="text-sm text-gray-400 mb-6 leading-relaxed">Tindakan ini akan menghapus riwayat obrolan secara permanen dan tidak bisa dibatalkan.</p>
        <div className="flex gap-3 w-full">
          <button onClick={onClose} className="flex-1 bg-slate-800 hover:bg-slate-700 text-gray-300 text-sm font-medium py-3 rounded-xl border border-slate-700 transition-colors">Batal</button>
          <button onClick={onConfirm} className="flex-1 bg-gradient-to-r from-red-600 to-red-500 text-white text-sm font-medium py-3 rounded-xl shadow-[0_4px_15px_rgba(239,68,68,0.3)] transition-transform active:scale-95">Ya, Hapus</button>
        </div>
      </div>
    </div>
  );
}