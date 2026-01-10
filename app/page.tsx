'use client';

import { useState } from 'react';
import { Brain, Sparkles, MessageSquare, FileText, Users, Timer, Target, Map, Headphones, BarChart3, Languages, Database, CheckCircle2, Twitter, Instagram } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setSuccess(true);
      setEmail('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { icon: Brain, name: 'AI-Powered Quiz Generator', badge: 'Core' },
    { icon: Sparkles, name: 'Smart Flashcard Creator', badge: 'Core' },
    { icon: MessageSquare, name: 'Interactive PDF Chat', badge: 'Premium' },
    { icon: FileText, name: 'AI Summary Generation', badge: 'Core' },
    { icon: Users, name: 'Study Together Rooms', badge: 'Plus' },
    { icon: Timer, name: 'Pomodoro Study Timer', badge: 'Premium' },
    { icon: Target, name: 'Exam Mode Practice', badge: 'Plus' },
    { icon: Map, name: 'AI Mind Maps', badge: 'Plus' },
    { icon: Headphones, name: 'Audio Summaries (TTS)', badge: 'Plus' },
    { icon: BarChart3, name: 'Smart Analytics', badge: 'Premium' },
    { icon: Languages, name: 'Translation Support', badge: 'Plus' },
    { icon: Database, name: 'Cloud Storage', badge: 'All Plans' },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -inset-[10px] opacity-50">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          {/* Logo & Brand */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="relative w-20 h-20">
              <Image 
                src="/logo.png" 
                alt="CourseVault" 
                fill 
                className="object-cover"
              />
            </div>
              <h2 className="text-4xl font-bold text-white">
                CourseVault
              </h2>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-8 tracking-tight">
              Welcome to the Future
            </h1>

            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-500/20 backdrop-blur-sm border border-green-500/50 rounded-full">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-sm font-semibold">Coming Soon</span>
              </div>
            </div>

            <p className="text-2xl sm:text-3xl text-indigo-300 font-medium mb-4">
              Your AI-Powered Study Companion
            </p>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Transform your PDFs into summaries, flashcards, and quizzes. Study smarter with AI that understands your learning style.
            </p>
          </div>

          {/* Waitlist Form */}
          <div className="max-w-md mx-auto mb-16">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full px-6 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-gray-400 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                />
              </div>
              
              <button
                type="submit"
                disabled={loading || success}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-2xl text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? 'Joining...' : success ? 'You\'re on the list!' : 'Join the Waitlist'}
              </button>
            </form>

            {success && (
              <div className="mt-4 p-4 bg-green-500/20 backdrop-blur-sm border border-green-500/50 rounded-2xl">
                <div className="flex items-center gap-3 text-green-300">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <p className="text-sm font-medium">
                    Check your email! We've sent you a confirmation.
                  </p>
                </div>
              </div>
            )}

            {error && (
              <div className="mt-4 p-4 bg-red-500/20 backdrop-blur-sm border border-red-500/50 rounded-2xl text-red-300 text-sm font-medium text-center">
                {error}
              </div>
            )}
          </div>

          {/* Features Grid */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white text-center mb-8">
              Powerful Features for Smarter Learning
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group relative p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <feature.icon className="w-8 h-8 text-indigo-400 mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="text-white font-semibold text-sm mb-2">
                    {feature.name}
                  </h3>
                  <span className="inline-block px-2 py-1 bg-indigo-500/20 text-indigo-300 rounded-lg text-xs font-medium">
                    {feature.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Social Proof */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-8 px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
              <div>
                <div className="text-3xl font-bold text-white">1,000+</div>
                <div className="text-sm text-gray-400">Waitlist Members</div>
              </div>
              <div className="w-px h-12 bg-white/10"></div>
              <div>
                <div className="text-3xl font-bold text-white">12</div>
                <div className="text-sm text-gray-400">Core Features</div>
              </div>
              <div className="w-px h-12 bg-white/10"></div>
              <div>
                <div className="text-3xl font-bold text-white">FREE</div>
                <div className="text-sm text-gray-400">30-Day Trial</div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="text-center">
            <p className="text-gray-300 mb-4 font-medium">Follow us for updates</p>
            <div className="flex justify-center gap-4">
              <a
                href="https://x.com/coursevaultapp"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all"
              >
                <Twitter className="w-5 h-5 text-sky-400 group-hover:scale-110 transition-transform" />
                <span className="text-white font-medium">Twitter</span>
              </a>

              <a
                href="https://www.instagram.com/coursevault.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all"
              >
                <Instagram className="w-5 h-5 text-pink-400 group-hover:scale-110 transition-transform" />
                <span className="text-white font-medium">Instagram</span>
              </a>

              <a
                href="https://www.tiktok.com/@coursevaultapp"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all"
              >
                <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
                <span className="text-white font-medium">TikTok</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-white/10 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <p className="text-gray-400 text-sm">
            Made with passion for students everywhere
          </p>
          <p className="text-gray-500 text-xs mt-2">
            © 2025 CourseVault. All rights reserved.
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </main>
  );
}