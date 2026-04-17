import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Activity, ShieldCheck, Database, Search } from 'lucide-react';
import useChatStore from '../../store/useChatStore.js';
import { useChat } from '../../hooks/useChat.js';
import { EXAMPLE_QUERIES } from '../../utils/constants.js';

export default function HomeHero() {
  const navigate = useNavigate();
  const { setPatientContext } = useChatStore();
  const { sendMessage } = useChat();

  const runExample = (ex) => {
    setPatientContext({ disease: ex.disease, location: '' });
    navigate('/chat');
    setTimeout(async () => {
      await sendMessage({ query: ex.query, disease: ex.disease, patientName: '', location: '' });
    }, 100);
  };

  return (
    <section className="w-full px-5 sm:px-8 py-16 lg:py-24 flex items-center justify-center min-h-[85vh] bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
        
        {/* Left: Content */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 mb-6">
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
            <span className="text-xs font-bold text-teal-700 uppercase tracking-wide">Live Clinical Intelligence</span>
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-black mb-6 leading-tight text-gray-900 tracking-tight">
            Evidence-Based <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-500">
              Medical Research
            </span>
          </h1>
          
          <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-xl font-medium">
            CuraLink connects clinical professionals with millions of medical papers, clinical trials, and research databases instantly. Ask complex medical questions and receive fully cited, structured insights powered by advanced AI.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => navigate('/chat')}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-white font-bold transition-all hover:-translate-y-1 hover:shadow-xl"
              style={{
                background: 'linear-gradient(135deg, #0d9488 0%, #0284c7 100%)',
                boxShadow: '0 10px 25px -5px rgba(13, 148, 136, 0.4)'
              }}
            >
              Start Clinical Query <ArrowRight size={18} />
            </button>
            <button 
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-teal-700 font-bold bg-teal-50 hover:bg-teal-100 transition-colors"
            >
              Explore Features
            </button>
          </div>
        </motion.div>

        {/* Right: Visual / Action Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative lg:ml-auto w-full max-w-md"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-teal-100 to-cyan-50 rounded-[2rem] transform rotate-3 scale-105 -z-10"></div>
          <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-xl relative overflow-hidden">
            
            <div className="mb-6 pb-6 border-b border-gray-100">
              <h3 className="font-black text-gray-900 text-lg mb-2">Fast-Track Examples</h3>
              <p className="text-sm text-gray-500">Click a case below to instantly launch the research pipeline.</p>
            </div>

            <div className="space-y-3">
              {EXAMPLE_QUERIES.slice(0, 3).map((ex, i) => (
                <button
                  key={i}
                  onClick={() => runExample(ex)}
                  className="w-full text-left group flex items-start gap-3 p-4 rounded-xl transition-all hover:bg-teal-50 hover:border-teal-100 border border-transparent bg-gray-50"
                >
                  <div className="mt-0.5 bg-white p-1.5 rounded-lg shadow-sm text-teal-600 group-hover:scale-110 transition-transform">
                    <Search size={14} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-[13px] mb-0.5">{ex.disease}</h4>
                    <p className="text-xs text-gray-500 line-clamp-1">{ex.query}</p>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-600">
                <ShieldCheck size={16} /> Anti-Hallucination
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-blue-600">
                <Database size={16} /> Live Fetching
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
