'use client';

import { useState } from 'react';
import { supabase } from '../lib/supabase';

// 1. Optional: Add theme props if the login is specific to a venue's brand
interface LoginProps {
  primaryColor?: string;
  fontFamily?: string;
  bgStyle?: string;
  buttonStyle?: string;
}

export default function Login({ 
  primaryColor = "#C5A358", 
  fontFamily = "font-serif", 
  bgStyle = "bg-[#0A0A0A]",
  buttonStyle = "solid" 
}: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Dynamic Style Helpers
  const accentColor = { color: primaryColor };
  const accentBorder = { borderColor: primaryColor };
  const accentBg = { backgroundColor: primaryColor };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    
    if (error) alert(error.message);
    else window.location.href = '/admin'; // Redirect to your venues list
  };

  return (
    <div className={`min-h-screen ${bgStyle} ${fontFamily} flex items-center justify-center p-6 transition-colors duration-1000`}>
      {/* Background architectural accent */}
      <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] border border-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] border border-white/10 rounded-full blur-3xl" />
      </div>

      <form 
        onSubmit={handleLogin} 
        className="max-w-sm w-full space-y-10 border border-white/5 p-12 bg-white/[0.01] backdrop-blur-sm relative z-10"
      >
        <div className="text-center space-y-2">
          <h2 className="text-4xl italic font-light text-white leading-tight">
            Admin <span style={accentColor}>Access</span>
          </h2>
          <p className="text-[9px] tracking-[0.5em] text-gray-500 uppercase">
            Verify Identity to Manage Venues
          </p>
        </div>

        <div className="space-y-6">
          <div className="relative group">
            <input 
              type="email" 
              required
              placeholder="Email" 
              className="w-full bg-transparent border-b border-white/10 py-4 text-white placeholder-gray-600 focus:outline-none transition-colors"
              style={{'--tw-focus-border-color': primaryColor} as any}
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          <div className="relative group">
            <input 
              type="password" 
              required
              placeholder="Password" 
              className="w-full bg-transparent border-b border-white/10 py-4 text-white placeholder-gray-600 focus:outline-none transition-colors"
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={buttonStyle === 'outline' ? accentBorder : accentBg}
          className={`w-full py-5 text-black uppercase tracking-[0.4em] text-[10px] font-bold transition-all duration-500 relative overflow-hidden group
            ${buttonStyle === 'solid' ? 'text-black' : 'text-white hover:text-black'}
            ${buttonStyle === 'glass' ? 'backdrop-blur-md bg-white/10 border-white/20' : ''}`}
        >
          {/* Animated fill for outline/glass buttons */}
          {buttonStyle !== 'solid' && (
            <div 
              style={accentBg}
              className="absolute inset-0 z-0 translate-y-full transition-transform duration-500 group-hover:translate-y-0" 
            />
          )}
          <span className="relative z-10">{loading ? 'Verifying...' : 'Authenticate'}</span>
        </button>

        <div className="text-center">
          <a href="/" className="text-[8px] tracking-[0.3em] text-gray-600 uppercase hover:text-white transition-colors">
            Return to Public Portal
          </a>
        </div>
      </form>
    </div>
  );
}