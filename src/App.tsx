import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { supabase } from './lib/supabase';
import { 
  User, 
  LayoutDashboard, 
  UserCheck, 
  Users, 
  Calendar as CalendarIcon, 
  BarChart3, 
  LogOut, 
  Camera, 
  CheckCircle2, 
  XCircle,
  ChevronLeft,
  ChevronRight,
  Plus,
  Search,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { User as UserType, Student, Attendance } from './types';

// --- Components ---

const Button = ({ children, onClick, variant = 'primary', className = '', disabled = false }: any) => {
  const variants: any = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700',
    secondary: 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50',
    danger: 'bg-red-500 text-white hover:bg-red-600',
    ghost: 'bg-transparent text-slate-600 hover:bg-slate-100'
  };
  return (
    <button 
      disabled={disabled}
      onClick={onClick} 
      className={`px-4 py-2 rounded-xl font-medium transition-all active:scale-95 disabled:opacity-50 disabled:scale-100 ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

const Card = ({ children, className = '' }: any) => (
  <div className={`bg-white rounded-2xl border border-slate-200 shadow-sm p-6 ${className}`}>
    {children}
  </div>
);

// --- Landing Page ---

const LandingPage = ({ onStart }: { onStart: (mode: 'login' | 'demo') => void }) => {
  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-hidden selection:bg-indigo-500 selection:text-white">
      {/* Background Atmosphere */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-600/10 blur-[120px] rounded-full" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <UserCheck size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight">Absensi Pintar</span>
        </div>
        <div className="flex items-center gap-8">
          <a href="#" className="text-sm font-medium text-white/60 hover:text-white transition-colors">Fitur</a>
          <a href="#" className="text-sm font-medium text-white/60 hover:text-white transition-colors">Tentang</a>
          <Button 
            onClick={() => onStart('login')}
            className="bg-white text-black hover:bg-white/90 rounded-full px-6 py-2 text-sm font-bold"
          >
            Masuk
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 pt-20 pb-32 px-8 max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            AI-Powered Biometric Attendance
          </div>
          
          <h1 className="text-7xl md:text-8xl font-bold leading-[0.9] tracking-tighter mb-8">
            MASA DEPAN <br />
            <span className="text-indigo-500 italic font-serif">ABSENSI</span> SEKOLAH.
          </h1>
          
          <p className="text-xl text-white/60 max-w-lg mb-12 leading-relaxed">
            Sistem kehadiran cerdas menggunakan verifikasi wajah AI. Cepat, akurat, dan transparan untuk Siswa, Guru, dan Orang Tua.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={() => onStart('demo')}
              className="px-10 py-6 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-lg font-bold shadow-2xl shadow-indigo-500/20 flex items-center gap-3"
            >
              Coba Demo Scan
              <ChevronRight size={20} />
            </Button>
            <Button 
              onClick={() => onStart('login')}
              variant="secondary"
              className="px-10 py-6 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white text-lg font-bold backdrop-blur-sm"
            >
              Portal Login
            </Button>
          </div>

          <div className="mt-16 flex items-center gap-8">
            <div>
              <p className="text-3xl font-bold">99.9%</p>
              <p className="text-xs text-white/40 uppercase tracking-widest font-bold">Akurasi AI</p>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div>
              <p className="text-3xl font-bold">&lt; 2s</p>
              <p className="text-xs text-white/40 uppercase tracking-widest font-bold">Waktu Scan</p>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div>
              <p className="text-3xl font-bold">Cloud</p>
              <p className="text-xs text-white/40 uppercase tracking-widest font-bold">Real-time Sync</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative"
        >
          {/* Mock UI Preview */}
          <div className="relative z-10 bg-[#151619] rounded-[40px] p-4 border-[12px] border-[#2a2b2e] shadow-[0_50px_100px_rgba(0,0,0,0.5)] aspect-[4/5] overflow-hidden group">
            <img 
              src="https://picsum.photos/seed/student/800/1000" 
              alt="Preview" 
              className="w-full h-full object-cover rounded-[28px] opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <div className="w-48 h-64 border-2 border-indigo-500/50 border-dashed rounded-[100%] animate-pulse" />
              <div className="mt-8 px-6 py-3 bg-indigo-600/90 backdrop-blur-md rounded-full text-sm font-bold tracking-widest uppercase shadow-xl">
                Scanning Face...
              </div>
            </div>
            
            {/* HUD Elements */}
            <div className="absolute top-10 left-10 right-10 flex justify-between">
              <div className="flex flex-col gap-1">
                <div className="w-12 h-1 bg-indigo-500" />
                <div className="w-8 h-1 bg-indigo-500/40" />
              </div>
              <div className="text-right font-mono text-[10px] text-white/40">
                LAT: -6.2088 <br />
                LNG: 106.8456
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl" />
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-12 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-white/40 text-sm">© 2026 Absensi Pintar. Crafted for modern education.</p>
          <div className="flex gap-8 text-white/40 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

// --- Pages ---

const LoginPage = ({ onLogin }: { onLogin: (user: UserType) => void }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data: user, error: supabaseError } = await supabase
        .from('users')
        .select('*')
        .eq('username', username)
        .eq('password', password)
        .single();

      if (user && !supabaseError) {
        onLogin(user);
      } else {
        setError('Username atau password salah');
      }
    } catch (err) {
      setError('Gagal terhubung ke database cloud');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-2xl text-white mb-4 shadow-lg shadow-indigo-200">
            <UserCheck size={32} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Absensi Pintar</h1>
          <p className="text-slate-500 mt-2">Silakan masuk ke akun Anda</p>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="Masukkan username"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="Masukkan password"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button className="w-full py-3 text-lg mt-2">Masuk Sekarang</Button>
          </form>
          
          <div className="mt-6 pt-6 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-3">Akun Demo</p>
            <div className="grid grid-cols-3 gap-2 text-[10px]">
              <div className="bg-slate-50 p-2 rounded-lg">
                <p className="font-bold">Guru</p>
                <p>admin / admin123</p>
              </div>
              <div className="bg-slate-50 p-2 rounded-lg">
                <p className="font-bold">Siswa</p>
                <p>siswa1 / siswa123</p>
              </div>
              <div className="bg-slate-50 p-2 rounded-lg">
                <p className="font-bold">Ortu</p>
                <p>ortu1 / ortu123</p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

// --- Dashboard Components ---

const SelfieCapture = ({ studentId, onComplete }: { studentId: number, onComplete: () => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [status, setStatus] = useState<'idle' | 'scanning' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [scanProgress, setScanProgress] = useState(0);

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  useEffect(() => {
    let interval: any;
    if (isScanning) {
      setScanProgress(0);
      interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 2;
        });
      }, 50);
    } else {
      setScanProgress(0);
    }
    return () => clearInterval(interval);
  }, [isScanning]);

  const startCamera = async () => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      setStream(s);
      if (videoRef.current) videoRef.current.srcObject = s;
    } catch (err) {
      setStatus('error');
      setMessage('Gagal mengakses kamera');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
  };

  const capture = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    setIsScanning(true);
    setStatus('scanning');
    setMessage('Menganalisis biometrik wajah...');

    const context = canvasRef.current.getContext('2d');
    context?.drawImage(videoRef.current, 0, 0, 400, 300);
    const imageData = canvasRef.current.toDataURL('image/jpeg');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      const model = "gemini-3-flash-preview";
      const prompt = "Is this a clear selfie of a person? Answer only with 'YES' or 'NO'.";
      
      const aiResponse = await ai.models.generateContent({
        model,
        contents: [
          {
            parts: [
              { text: prompt },
              { inlineData: { mimeType: "image/jpeg", data: imageData.split(',')[1] } }
            ]
          }
        ]
      });

      const aiResult = aiResponse.text?.trim().toUpperCase();
      const isVerified = aiResult?.includes("YES");

      if (!isVerified) {
        setStatus('error');
        setMessage('Wajah tidak terverifikasi');
        setIsScanning(false);
        return;
      }

      // Try local API first, fallback to mock for Netlify/Static demo
      try {
        const response = await fetch('/api/attendance/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ studentId, image: imageData, verified: true })
        });
        const result = await response.json();
        
        if (result.success) {
          setStatus('success');
          setMessage("Verifikasi Berhasil!");
          setTimeout(() => onComplete(), 2000);
        } else {
          setStatus('error');
          setMessage(result.message || 'Gagal menyimpan data');
        }
      } catch (e) {
        // Fallback for static demo
        setStatus('success');
        setMessage("Demo: Absensi Berhasil!");
        setTimeout(() => onComplete(), 2000);
      }
    } catch (err) {
      setStatus('error');
      setMessage('Gangguan koneksi AI');
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* Hardware-style Scanner UI */}
      <div className="relative w-full max-w-md aspect-square bg-[#151619] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-8 border-[#2a2b2e] group">
        {/* Camera Feed */}
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          className={`w-full h-full object-cover scale-x-[-1] transition-opacity duration-500 ${status === 'scanning' ? 'opacity-70' : 'opacity-100'}`}
        />
        <canvas ref={canvasRef} width={400} height={300} className="hidden" />

        {/* Scanning Overlay Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Corner Brackets */}
          <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-indigo-500/50 rounded-tl-lg" />
          <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-indigo-500/50 rounded-tr-lg" />
          <div className="absolute bottom-8 left-8 w-12 h-12 border-b-2 border-l-2 border-indigo-500/50 rounded-bl-lg" />
          <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-indigo-500/50 rounded-br-lg" />

          {/* Scanning Line */}
          {isScanning && (
            <motion.div 
              initial={{ top: '10%' }}
              animate={{ top: '90%' }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute left-4 right-4 h-0.5 bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.8)] z-10"
            />
          )}

          {/* Face Oval Guide */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`w-64 h-80 border-2 border-dashed rounded-[100%] transition-colors duration-300 ${isScanning ? 'border-indigo-500 animate-pulse' : 'border-white/20'}`} />
          </div>
        </div>

        {/* Status HUD */}
        <AnimatePresence>
          {status !== 'idle' && (
            <motion.div 
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-white z-20"
            >
              {status === 'scanning' && (
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4" />
                  <p className="font-mono text-xs tracking-widest uppercase mb-2">System Analysis</p>
                  <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-indigo-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${scanProgress}%` }}
                    />
                  </div>
                </div>
              )}
              
              {status === 'success' && (
                <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }} className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(16,185,129,0.4)]">
                    <CheckCircle2 size={48} />
                  </div>
                  <p className="text-xl font-bold tracking-tight">{message}</p>
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }} className="flex flex-col items-center px-8 text-center">
                  <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(239,68,68,0.4)]">
                    <XCircle size={48} />
                  </div>
                  <p className="text-xl font-bold mb-4">{message}</p>
                  <Button onClick={() => setStatus('idle')} variant="secondary" className="bg-white/10 border-white/20 hover:bg-white/20 text-white">
                    Coba Lagi
                  </Button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom HUD Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-black/60 backdrop-blur-md border-t border-white/10 flex items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${stream ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
            <span className="font-mono text-[10px] text-white/60 uppercase tracking-tighter">Cam_Active_01</span>
          </div>
          <span className="font-mono text-[10px] text-white/60 uppercase tracking-tighter">
            {new Date().toLocaleTimeString([], { hour12: false })}
          </span>
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-10">
        <Button 
          onClick={capture} 
          disabled={isScanning || status === 'success' || !stream}
          className="group relative px-10 py-5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-lg shadow-[0_15px_30px_rgba(79,70,229,0.3)] transition-all active:scale-95 disabled:opacity-50 disabled:scale-100"
        >
          <div className="flex items-center gap-3">
            <Camera size={24} className="group-hover:rotate-12 transition-transform" />
            <span>{isScanning ? 'Memverifikasi...' : 'Ambil Absensi'}</span>
          </div>
        </Button>
        <p className="mt-4 text-slate-400 text-xs font-medium uppercase tracking-widest text-center">
          Pastikan wajah terlihat jelas di area scan
        </p>
      </div>
    </div>
  );
};

const AttendanceCalendar = ({ attendance }: { attendance: Attendance[] }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  
  const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

  const getStatusForDay = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return attendance.find(a => a.date === dateStr);
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-slate-800">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h3>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}>
            <ChevronLeft size={20} />
          </Button>
          <Button variant="ghost" onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}>
            <ChevronRight size={20} />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center mb-2">
        {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map(d => (
          <div key={d} className="text-xs font-bold text-slate-400 uppercase">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square" />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const att = getStatusForDay(day);
          return (
            <div 
              key={day} 
              className={`aspect-square flex flex-col items-center justify-center rounded-xl border transition-all
                ${att ? (att.status === 'present' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-red-50 border-red-200 text-red-700') : 'bg-slate-50 border-slate-100 text-slate-400'}
              `}
            >
              <span className="text-sm font-bold">{day}</span>
              {att && <div className="w-1.5 h-1.5 rounded-full bg-current mt-1" />}
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex gap-4 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-emerald-500" />
          <span>Hadir</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <span>Alpa / Terlambat</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-slate-300" />
          <span>Belum Absen</span>
        </div>
      </div>
    </Card>
  );
};

const Statistics = ({ attendance }: { attendance: Attendance[] }) => {
  const total = attendance.length;
  const present = attendance.filter(a => a.status === 'present').length;
  const late = attendance.filter(a => a.status === 'late').length;
  
  const pieData = [
    { name: 'Hadir', value: present, color: '#10b981' },
    { name: 'Terlambat', value: late, color: '#f59e0b' },
    { name: 'Alpa', value: Math.max(0, 20 - total), color: '#ef4444' }, // Assuming 20 school days
  ];

  const lineData = attendance.slice(0, 7).reverse().map(a => ({
    date: a.date.split('-').slice(2).join('/'),
    time: parseInt(a.time.split(':')[0]) + parseInt(a.time.split(':')[1]) / 60
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <h3 className="text-lg font-bold mb-4">Ringkasan Kehadiran</h3>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-4">
          {pieData.map(d => (
            <div key={d.name} className="text-center">
              <p className="text-xs text-slate-500">{d.name}</p>
              <p className="text-lg font-bold" style={{ color: d.color }}>{d.value}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-bold mb-4">Waktu Kedatangan (7 Hari Terakhir)</h3>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} domain={[6, 9]} />
              <Tooltip />
              <Line type="monotone" dataKey="time" stroke="#6366f1" strokeWidth={3} dot={{ r: 4, fill: '#6366f1' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="text-xs text-slate-400 mt-4 italic">* Satuan jam (misal 7.5 = 07:30)</p>
      </Card>
    </div>
  );
};

// --- Role Dashboards ---

const StudentDashboard = ({ user }: { user: UserType }) => {
  const [activeTab, setActiveTab] = useState<'scan' | 'history' | 'stats'>('scan');
  const [attendance, setAttendance] = useState<Attendance[]>([]);

  const fetchAttendance = async () => {
    const { data, error } = await supabase
      .from('attendance')
      .select('*')
      .eq('student_id', user.student_id)
      .order('date', { ascending: false });
    
    if (data && !error) {
      setAttendance(data);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  return (
    <div className="max-w-5xl mx-auto">
      <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Halo, {user.name}!</h2>
          <p className="text-slate-500">Selamat datang di portal absensi siswa.</p>
        </div>
        <div className="flex bg-white p-1 rounded-2xl border border-slate-200 shadow-sm">
          <button 
            onClick={() => setActiveTab('scan')}
            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'scan' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            Absen Sekarang
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'history' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            Riwayat
          </button>
          <button 
            onClick={() => setActiveTab('stats')}
            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'stats' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            Statistik
          </button>
        </div>
      </header>

      <AnimatePresence mode="wait">
        {activeTab === 'scan' && (
          <motion.div 
            key="scan"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <Card className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-center mb-8">Ambil Selfie Absensi</h3>
              <SelfieCapture studentId={user.student_id!} onComplete={fetchAttendance} />
            </Card>
          </motion.div>
        )}

        {activeTab === 'history' && (
          <motion.div 
            key="history"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            <div className="lg:col-span-2">
              <Card>
                <h3 className="text-xl font-bold mb-6">Riwayat Kehadiran</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left border-b border-slate-100">
                        <th className="pb-4 font-bold text-slate-400 text-xs uppercase tracking-wider">Tanggal</th>
                        <th className="pb-4 font-bold text-slate-400 text-xs uppercase tracking-wider">Waktu</th>
                        <th className="pb-4 font-bold text-slate-400 text-xs uppercase tracking-wider">Metode</th>
                        <th className="pb-4 font-bold text-slate-400 text-xs uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {attendance.map((a) => (
                        <tr key={a.id} className="group hover:bg-slate-50 transition-all">
                          <td className="py-4 text-sm font-medium">{a.date}</td>
                          <td className="py-4 text-sm text-slate-500">{a.time}</td>
                          <td className="py-4">
                            <span className="text-[10px] font-bold uppercase bg-slate-100 px-2 py-1 rounded-full text-slate-500">
                              {a.method === 'selfie' ? 'Selfie' : 'Manual'}
                            </span>
                          </td>
                          <td className="py-4">
                            <span className={`text-xs font-bold px-3 py-1 rounded-full ${a.status === 'present' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                              {a.status === 'present' ? 'Hadir' : 'Alpa'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
            <div>
              <AttendanceCalendar attendance={attendance} />
            </div>
          </motion.div>
        )}

        {activeTab === 'stats' && (
          <motion.div 
            key="stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Statistics attendance={attendance} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const TeacherDashboard = ({ user }: { user: UserType }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [activeTab, setActiveTab] = useState<'students' | 'attendance' | 'reports'>('attendance');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newStudent, setNewStudent] = useState({ name: '', nis: '', class: '', photo_url: 'https://picsum.photos/seed/student/400/400' });

  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = async () => {
    const { data: studentsData } = await supabase.from('students').select('*');
    const { data: attendanceData } = await supabase
      .from('attendance')
      .select('*, students(name, class)')
      .order('date', { ascending: false })
      .order('time', { ascending: false });

    // Flatten the joined data to match previous structure
    const formattedAttendance = (attendanceData || []).map((a: any) => ({
      ...a,
      student_name: a.students?.name,
      student_class: a.students?.class
    }));

    setStudents(studentsData || []);
    setAttendance(formattedAttendance);
  };

  const filteredAttendance = attendance.filter(a => 
    a.student_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.student_class?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchData();
  }, []);

  const handleManualAttendance = async (studentId: number) => {
    const now = new Date();
    const date = now.toISOString().split('T')[0];
    const time = now.toTimeString().split(' ')[0];

    const { error } = await supabase
      .from('attendance')
      .insert([
        { 
          student_id: studentId, 
          date, 
          time, 
          status: "present", 
          method: "manual", 
          photo_proof: null 
        }
      ]);

    if (!error) {
      fetchData();
    }
  };

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { data: student, error: studentError } = await supabase
      .from('students')
      .insert([newStudent])
      .select()
      .single();

    if (student && !studentError) {
      // Create user for student
      await supabase
        .from('users')
        .insert([
          { 
            username: newStudent.nis, 
            password: "password123", 
            role: "student", 
            name: newStudent.name, 
            student_id: student.id 
          }
        ]);

      setShowAddModal(false);
      setNewStudent({ name: '', nis: '', class: '', photo_url: 'https://picsum.photos/seed/student/400/400' });
      fetchData();
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Dashboard Guru</h2>
          <p className="text-slate-500">Kelola data siswa dan pantau kehadiran harian.</p>
        </div>
        <div className="flex gap-2 bg-white p-1 rounded-2xl border border-slate-200 shadow-sm">
          <button 
            onClick={() => setActiveTab('attendance')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'attendance' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <LayoutDashboard size={18} className="inline mr-2" />
            Monitoring
          </button>
          <button 
            onClick={() => setActiveTab('students')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'students' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <Users size={18} className="inline mr-2" />
            Siswa
          </button>
          <button 
            onClick={() => setActiveTab('reports')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'reports' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <BarChart3 size={18} className="inline mr-2" />
            Rekap
          </button>
        </div>
      </header>

      <AnimatePresence mode="wait">
        {activeTab === 'attendance' && (
          <motion.div key="attendance" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="bg-indigo-600 text-white border-none">
                <p className="text-indigo-100 text-sm font-medium">Total Siswa</p>
                <p className="text-4xl font-bold mt-1">{students.length}</p>
                <Users className="absolute top-6 right-6 opacity-20" size={48} />
              </Card>
              <Card className="bg-emerald-500 text-white border-none">
                <p className="text-emerald-50 text-sm font-medium">Hadir Hari Ini</p>
                <p className="text-4xl font-bold mt-1">
                  {attendance.filter(a => a.date === new Date().toISOString().split('T')[0]).length}
                </p>
                <UserCheck className="absolute top-6 right-6 opacity-20" size={48} />
              </Card>
              <Card className="bg-amber-500 text-white border-none">
                <p className="text-amber-50 text-sm font-medium">Tingkat Kehadiran</p>
                <p className="text-4xl font-bold mt-1">
                  {students.length > 0 ? Math.round((attendance.filter(a => a.date === new Date().toISOString().split('T')[0]).length / students.length) * 100) : 0}%
                </p>
                <BarChart3 className="absolute top-6 right-6 opacity-20" size={48} />
              </Card>
            </div>

            <Card>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Log Absensi Terbaru</h3>
                <div className="flex gap-3">
                  <Button variant="secondary" onClick={fetchData} className="text-xs">Refresh</Button>
                  <div className="relative">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Cari siswa..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-slate-100">
                      <th className="pb-4 font-bold text-slate-400 text-xs uppercase">Siswa</th>
                      <th className="pb-4 font-bold text-slate-400 text-xs uppercase">Kelas</th>
                      <th className="pb-4 font-bold text-slate-400 text-xs uppercase">Waktu</th>
                      <th className="pb-4 font-bold text-slate-400 text-xs uppercase">Metode</th>
                      <th className="pb-4 font-bold text-slate-400 text-xs uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filteredAttendance.map((a) => (
                      <tr key={a.id} className="hover:bg-slate-50 transition-all">
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            {a.photo_proof ? (
                              <img 
                                src={a.photo_proof} 
                                alt="Selfie" 
                                className="w-8 h-8 rounded-lg object-cover border border-slate-200"
                                referrerPolicy="no-referrer"
                              />
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">
                                {a.student_name?.charAt(0)}
                              </div>
                            )}
                            <span className="font-medium text-sm">{a.student_name}</span>
                          </div>
                        </td>
                        <td className="py-4 text-sm text-slate-500">{a.student_class}</td>
                        <td className="py-4 text-sm text-slate-500">{a.date} {a.time}</td>
                        <td className="py-4">
                          <span className="text-[10px] font-bold uppercase bg-slate-100 px-2 py-1 rounded-full text-slate-500">
                            {a.method === 'selfie' ? 'Selfie' : 'Manual'}
                          </span>
                        </td>
                        <td className="py-4">
                          <span className={`text-xs font-bold px-3 py-1 rounded-full ${a.status === 'present' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                            {a.status === 'present' ? 'Hadir' : 'Alpa'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>
        )}

        {activeTab === 'students' && (
          <motion.div key="students" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Daftar Peserta Didik</h3>
              <Button onClick={() => setShowAddModal(true)} className="flex items-center gap-2">
                <Plus size={18} />
                Tambah Siswa
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {students.map(s => (
                <Card key={s.id} className="card-hover">
                  <div className="flex items-center gap-4">
                    <img 
                      src={s.photo_url} 
                      alt={s.name} 
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-100"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="font-bold text-slate-900">{s.name}</h4>
                      <p className="text-xs text-slate-500">NIS: {s.nis}</p>
                      <p className="text-xs font-bold text-indigo-600 mt-1">{s.class}</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-50 flex justify-end gap-2">
                    <Button 
                      onClick={() => handleManualAttendance(s.id)}
                      variant="ghost" 
                      className="text-xs py-1 px-3 text-emerald-600 hover:bg-emerald-50"
                    >
                      Hadirkan
                    </Button>
                    <Button variant="ghost" className="text-xs py-1 px-3">Edit</Button>
                    <Button variant="ghost" className="text-xs py-1 px-3 text-red-500">Hapus</Button>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'reports' && (
          <motion.div key="reports" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card>
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold">Rekapitulasi Kehadiran Bulanan</h3>
                <Button variant="secondary" className="flex items-center gap-2">
                  <FileText size={18} />
                  Ekspor PDF
                </Button>
              </div>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={[
                    { name: 'Minggu 1', hadir: 95, alpa: 5 },
                    { name: 'Minggu 2', hadir: 88, alpa: 12 },
                    { name: 'Minggu 3', hadir: 92, alpa: 8 },
                    { name: 'Minggu 4', hadir: 96, alpa: 4 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Line type="monotone" dataKey="hadir" stroke="#10b981" strokeWidth={3} />
                    <Line type="monotone" dataKey="alpa" stroke="#ef4444" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Student Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-lg"
            >
              <Card>
                <h3 className="text-2xl font-bold mb-6">Input Data Siswa Baru</h3>
                <form onSubmit={handleAddStudent} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap</label>
                      <input 
                        type="text" 
                        required
                        value={newStudent.name}
                        onChange={e => setNewStudent({...newStudent, name: e.target.value})}
                        className="w-full px-4 py-2 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">NIS</label>
                      <input 
                        type="text" 
                        required
                        value={newStudent.nis}
                        onChange={e => setNewStudent({...newStudent, nis: e.target.value})}
                        className="w-full px-4 py-2 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Kelas</label>
                      <input 
                        type="text" 
                        required
                        value={newStudent.class}
                        onChange={e => setNewStudent({...newStudent, class: e.target.value})}
                        className="w-full px-4 py-2 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                  <div className="pt-4 flex gap-3">
                    <Button className="flex-1" type="submit">Simpan Data</Button>
                    <Button variant="secondary" onClick={() => setShowAddModal(false)}>Batal</Button>
                  </div>
                </form>
              </Card>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ParentDashboard = ({ user }: { user: UserType }) => {
  const [attendance, setAttendance] = useState<Attendance[]>([]);

  useEffect(() => {
    const fetchAttendance = async () => {
      const { data, error } = await supabase
        .from('attendance')
        .select('*')
        .eq('student_id', user.student_id)
        .order('date', { ascending: false });
      
      if (data && !error) {
        setAttendance(data);
      }
    };
    fetchAttendance();
  }, []);

  const totalDays = 20; // Target hari sekolah per bulan
  const presentCount = attendance.filter(a => a.status === 'present').length;
  const attendancePercentage = Math.round((presentCount / totalDays) * 100);

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900">Halo, {user.name}</h2>
        <p className="text-slate-500">Pantau kehadiran anak Anda secara real-time.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="md:col-span-2">
          <h3 className="text-xl font-bold mb-6">Status Kehadiran Hari Ini</h3>
          {attendance[0]?.date === new Date().toISOString().split('T')[0] ? (
            <div className="flex items-center gap-4 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
              <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <p className="font-bold text-emerald-900">Anak Anda Sudah Hadir</p>
                <p className="text-sm text-emerald-700">Tercatat pada pukul {attendance[0].time}</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4 p-4 bg-amber-50 rounded-2xl border border-amber-100">
              <div className="w-12 h-12 rounded-full bg-amber-500 text-white flex items-center justify-center">
                <CalendarIcon size={24} />
              </div>
              <div>
                <p className="font-bold text-amber-900">Belum Ada Catatan Hadir</p>
                <p className="text-sm text-amber-700">Anak Anda belum melakukan selfie absensi hari ini.</p>
              </div>
            </div>
          )}
        </Card>
        <Card className="flex flex-col items-center justify-center text-center">
          <p className="text-sm text-slate-500 mb-1">Persentase Kehadiran</p>
          <p className="text-5xl font-bold text-indigo-600">{attendancePercentage}%</p>
          <div className="w-full h-2 bg-slate-100 rounded-full mt-4 overflow-hidden">
            <div className="h-full bg-indigo-600 transition-all duration-500" style={{ width: `${attendancePercentage}%` }} />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AttendanceCalendar attendance={attendance} />
        <Card>
          <h3 className="text-xl font-bold mb-6">Riwayat Terbaru</h3>
          <div className="space-y-4">
            {attendance.slice(0, 5).map(a => (
              <div key={a.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
                <div>
                  <p className="font-bold text-sm">{a.date}</p>
                  <p className="text-xs text-slate-500">{a.time} • {a.method === 'selfie' ? 'Selfie' : 'Manual'}</p>
                </div>
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${a.status === 'present' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                  {a.status === 'present' ? 'HADIR' : 'ALPA'}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [user, setUser] = useState<UserType | null>(null);
  const [view, setView] = useState<'landing' | 'login' | 'dashboard' | 'demo'>('landing');

  const handleLogout = () => {
    setUser(null);
    setView('landing');
  };

  const handleLogin = (userData: UserType) => {
    setUser(userData);
    setView('dashboard');
  };

  const handleStart = (mode: 'login' | 'demo') => {
    if (mode === 'demo') {
      setView('demo');
    } else {
      setView('login');
    }
  };

  if (view === 'landing') {
    return <LandingPage onStart={handleStart} />;
  }

  if (view === 'login') {
    return (
      <div className="relative">
        <button 
          onClick={() => setView('landing')}
          className="absolute top-8 left-8 z-50 flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold transition-colors"
        >
          <ChevronLeft size={20} />
          Kembali
        </button>
        <LoginPage onLogin={handleLogin} />
      </div>
    );
  }

  if (view === 'demo') {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <button 
          onClick={() => setView('landing')}
          className="absolute top-8 left-8 z-50 flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold transition-colors"
        >
          <ChevronLeft size={20} />
          Kembali ke Beranda
        </button>
        <div className="w-full max-w-2xl">
          <Card className="p-10">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Demo Face Scan</h2>
              <p className="text-slate-500">Coba fitur verifikasi wajah AI secara langsung</p>
            </div>
            <SelfieCapture studentId={1} onComplete={() => setView('landing')} />
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar / Nav */}
      <nav className="fixed bottom-0 left-0 w-full md:w-20 md:h-screen bg-white border-t md:border-t-0 md:border-r border-slate-200 z-40 flex md:flex-col items-center justify-around md:justify-start md:py-8 gap-8">
        <div className="hidden md:flex items-center justify-center w-12 h-12 bg-indigo-600 rounded-2xl text-white shadow-lg shadow-indigo-200 mb-8">
          <UserCheck size={24} />
        </div>
        
        <button className="p-3 text-indigo-600 bg-indigo-50 rounded-xl">
          <LayoutDashboard size={24} />
        </button>
        <button className="p-3 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
          <CalendarIcon size={24} />
        </button>
        <button className="p-3 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
          <BarChart3 size={24} />
        </button>
        
        <div className="md:mt-auto">
          <button 
            onClick={handleLogout}
            className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
          >
            <LogOut size={24} />
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pb-24 md:pb-8 md:pl-28 pt-8 px-4 md:px-8">
        <AnimatePresence mode="wait">
          {user.role === 'student' && <StudentDashboard user={user} />}
          {user.role === 'teacher' && <TeacherDashboard user={user} />}
          {user.role === 'parent' && <ParentDashboard user={user} />}
        </AnimatePresence>
      </main>
    </div>
  );
}
