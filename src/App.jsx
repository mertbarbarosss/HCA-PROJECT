import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- HAREKETLİ GÜVEN SKORU GRAFİĞİ ---
const TrustChart = () => (
  <svg className="w-20 h-8 ml-4" viewBox="0 0 100 30">
    <motion.path
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      d="M0,25 C20,20 40,30 60,15 C80,0 100,10 100,5"
      fill="transparent"
      stroke="#3b82f6"
      strokeWidth="3"
    />
    <motion.path
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.8 }}
      d="M0,25 C20,20 40,30 60,15 C80,0 100,10 100,5 L100,30 L0,30 Z"
      fill="url(#gradient)"
    />
    <defs>
      <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

// --- 1. PÜRÜZSÜZ GİRİŞ EKRANI ---
const Onboarding = ({ onLogin }) => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-[#0B1120] text-white p-6">
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center max-w-md w-full"
    >
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 mb-2">
        HCA Protocol
      </h1>
      <p className="text-slate-400 mb-8 font-light tracking-wide">Tokenize Your Social Capital</p>
      
      <div className="bg-[#111827] p-8 rounded-3xl shadow-2xl border border-slate-800">
        <input 
          type="email" 
          placeholder="E-posta adresiniz" 
          className="w-full bg-[#1F2937] border border-slate-700 rounded-xl p-4 text-white mb-6 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
        />
        <button 
          onClick={onLogin}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-4 rounded-xl transition-all shadow-lg shadow-blue-500/25"
        >
          Devam Et
        </button>
      </div>
    </motion.div>
  </div>
);

// --- 2. ARENA / KEŞİF AKIŞI ---
const Discovery = ({ onSelectFigure }) => {
  const mockFigures = [
    { id: 1, name: "Ozy", role: "Strategic Partner", trustScore: 98, tvl: "$45.2K", apy: "%12.4" },
    { id: 2, name: "Ahmad Alwan", role: "Venture Capitalist", trustScore: 95, tvl: "$120.5K", apy: "%8.2" }
  ];

  return (
    <div className="min-h-screen bg-[#0B1120] text-white p-6 md:p-12 pb-24">
      <header className="flex justify-between items-center mb-10 max-w-3xl mx-auto">
        <div>
          <h2 className="text-3xl font-extrabold text-white">Arena</h2>
          <p className="text-sm text-slate-400 mt-1">Reputation Markets</p>
        </div>
        <div className="flex items-center gap-2 bg-[#111827] px-4 py-2 rounded-full border border-slate-800">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-slate-300">Bağlandı</span>
        </div>
      </header>
      
      <div className="max-w-3xl mx-auto space-y-4">
        {mockFigures.map((fig, index) => (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            key={fig.id} 
            className="bg-[#111827] p-6 rounded-2xl border border-slate-800 hover:border-blue-500/50 transition-all cursor-pointer flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-lg"
          >
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white">{fig.name}</h3>
              <p className="text-sm text-blue-400 font-medium">{fig.role}</p>
            </div>
            
            <div className="flex items-center bg-[#0B1120] rounded-xl p-3 border border-slate-800">
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Trust Trend</p>
                <p className="font-bold text-white text-lg">{fig.trustScore}</p>
              </div>
              <TrustChart />
            </div>

            <button 
              onClick={() => onSelectFigure(fig)}
              className="w-full md:w-auto bg-blue-600/10 text-blue-400 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-xl font-semibold transition-all border border-blue-600/20"
            >
              Trade
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// --- 3. EMANET REZERV MODALI ---
const EscrowModal = ({ figure, onClose }) => {
  return (
    <div className="fixed inset-0 bg-[#0B1120]/80 backdrop-blur-md flex justify-center items-end sm:items-center z-50 p-4 sm:p-0">
      <motion.div 
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="bg-[#111827] w-full max-w-md rounded-t-[2rem] sm:rounded-3xl p-8 border border-slate-700 shadow-2xl"
      >
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-2xl font-bold text-white">Rezerv Kilitle</h3>
            <p className="text-sm text-blue-400 mt-1">{figure.name}</p>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white text-3xl bg-[#1F2937] w-10 h-10 rounded-full flex items-center justify-center">&times;</button>
        </div>
        <div className="space-y-6">
          <div className="bg-[#0B1120] p-5 rounded-2xl border border-slate-800">
            <label className="text-xs text-slate-400 block mb-2 font-medium">ÖDENECEK VARLIK</label>
            <div className="flex justify-between items-center">
              <input type="number" placeholder="0.00" className="bg-transparent text-3xl font-light text-white outline-none w-1/2" />
              <select className="bg-[#1F2937] text-white border border-slate-700 rounded-xl p-3 font-semibold outline-none cursor-pointer">
                <option>USDC</option>
                <option>SOL</option>
                <option>ETH</option>
              </select>
            </div>
          </div>
          <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-4 rounded-xl shadow-lg mt-2">
            Otonom Rezervi Kilitle (Lock)
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// --- ANA YÖNETİCİ VE FOMO MOTORU ---
export default function App() {
  const [stage, setStage] = useState('onboarding'); 
  const [selectedFigure, setSelectedFigure] = useState(null);
  const [liveFeed, setLiveFeed] = useState([]);

  // FOMO Bildirim Motoru (Sadece Arena'da çalışır)
  useEffect(() => {
    if (stage !== 'discovery') return;

    const mockEvents = [
      "⚡ Anonim bir cüzdan Ozy havuzuna 150 SOL kilitledi.",
      "🚀 Ahmad Alwan Trust Score +1.2 artış gösterdi.",
      "💎 Yeni bir balina HCA ağına katıldı.",
      "🔒 10,000 USDC otonom rezerve aktarıldı."
    ];

    const interval = setInterval(() => {
      const randomEvent = mockEvents[Math.floor(Math.random() * mockEvents.length)];
      const newEvent = { id: Date.now(), text: randomEvent };
      
      setLiveFeed(prev => [newEvent, ...prev].slice(0, 2)); // Ekranda en fazla 2 bildirim tut
    }, 3500); // Her 3.5 saniyede bir yeni bildirim at

    return () => clearInterval(interval);
  }, [stage]);

  return (
    <div className="font-sans antialiased overflow-hidden min-h-screen bg-[#0B1120] selection:bg-blue-500/30 relative">
      <AnimatePresence mode="wait">
        {stage === 'onboarding' && (
          <motion.div key="onboarding" exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }}>
            <Onboarding onLogin={() => setStage('discovery')} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {stage === 'discovery' && (
          <motion.div key="discovery" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Discovery onSelectFigure={(fig) => setSelectedFigure(fig)} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedFigure && (
          <EscrowModal figure={selectedFigure} onClose={() => setSelectedFigure(null)} />
        )}
      </AnimatePresence>

      {/* CANLI FOMO BİLDİRİMLERİ (Sağ Alt Köşe) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 pointer-events-none">
        <AnimatePresence>
          {liveFeed.map((feed) => (
            <motion.div
              key={feed.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className="bg-[#111827]/90 backdrop-blur-sm border border-blue-500/30 text-white text-xs font-medium px-4 py-3 rounded-lg shadow-2xl shadow-blue-500/10 max-w-xs"
            >
              {feed.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}