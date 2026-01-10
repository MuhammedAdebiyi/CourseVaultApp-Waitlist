'use client';

import { useState, useEffect } from 'react';
import { Users, Mail, CheckCircle2, Clock, Send, Lock } from 'lucide-react';

interface WaitlistEntry {
  id: number;
  email: string;
  created_at: string;
  notified: boolean;
  notified_at: string | null;
}

interface Stats {
  total: string;
  notified: string;
  pending: string;
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [stats, setStats] = useState<Stats>({ total: '0', notified: '0', pending: '0' });
  const [loading, setLoading] = useState(true);
  const [launching, setLaunching] = useState(false);
  const [launchResult, setLaunchResult] = useState<string | null>(null);

  useEffect(() => {
    // Check if already authenticated in this session
    const auth = sessionStorage.getItem('admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
      fetchWaitlist();
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        sessionStorage.setItem('admin_auth', 'true');
        setIsAuthenticated(true);
        setAuthError('');
        fetchWaitlist();
      } else {
        setAuthError('Invalid password');
        setPassword('');
      }
    } catch (error) {
      setAuthError('Authentication failed');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth');
    setIsAuthenticated(false);
    setPassword('');
  };

  const fetchWaitlist = async () => {
    try {
      const res = await fetch('/api/admin/waitlist');
      const data = await res.json();
      setEntries(data.entries);
      setStats(data.stats);
    } catch (error) {
      console.error('Failed to fetch waitlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLaunch = async () => {
    if (!confirm('Are you sure you want to send launch emails to all pending users?')) {
      return;
    }

    setLaunching(true);
    setLaunchResult(null);

    try {
      const res = await fetch('/api/admin/launch', {
        method: 'POST',
      });

      const data = await res.json();
      setLaunchResult(data.message);
      
      await fetchWaitlist();
    } catch (error: any) {
      setLaunchResult('Failed to send emails: ' + error.message);
    } finally {
      setLaunching(false);
    }
  };

  const exportCSV = () => {
    const csv = [
      ['Email', 'Joined', 'Notified', 'Notified At'].join(','),
      ...entries.map(e => [
        e.email,
        new Date(e.created_at).toLocaleDateString(),
        e.notified ? 'Yes' : 'No',
        e.notified_at ? new Date(e.notified_at).toLocaleDateString() : 'N/A'
      ].join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `waitlist-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-indigo-500/20 rounded-full">
                <Lock className="w-8 h-8 text-indigo-400" />
              </div>
            </div>
            
            <h1 className="text-2xl font-bold text-white text-center mb-2">
              Admin Access
            </h1>
            <p className="text-gray-400 text-center mb-6">
              Enter password to continue
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Admin password"
                required
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />

              {authError && (
                <p className="text-red-400 text-sm text-center">{authError}</p>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Loading Screen
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  // Admin Dashboard (authenticated)
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-gray-300">Manage your CourseVault waitlist</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl border border-white/20 transition"
          >
            Logout
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-500/20 rounded-xl">
                <Users className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Signups</p>
                <p className="text-3xl font-bold text-white">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/20 rounded-xl">
                <CheckCircle2 className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Notified</p>
                <p className="text-3xl font-bold text-white">{stats.notified}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-500/20 rounded-xl">
                <Clock className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Pending</p>
                <p className="text-3xl font-bold text-white">{stats.pending}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={handleLaunch}
            disabled={launching || parseInt(stats.pending) === 0}
            className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
            {launching ? 'Sending...' : `Send Launch Emails (${stats.pending})`}
          </button>

          <button
            onClick={exportCSV}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-xl border border-white/20 transition-all"
          >
            <Mail className="w-5 h-5" />
            Export CSV
          </button>
        </div>

        {/* Launch Result */}
        {launchResult && (
          <div className="mb-8 p-4 bg-green-500/20 border border-green-500/50 rounded-xl text-green-300">
            {launchResult}
          </div>
        )}

        {/* Waitlist Table */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Notified At
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {entries.map((entry) => (
                  <tr key={entry.id} className="hover:bg-white/5 transition">
                    <td className="px-6 py-4 text-white">{entry.email}</td>
                    <td className="px-6 py-4 text-gray-300">
                      {new Date(entry.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      {entry.notified ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-xs font-medium">
                          <CheckCircle2 className="w-3 h-3" />
                          Notified
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-xs font-medium">
                          <Clock className="w-3 h-3" />
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      {entry.notified_at 
                        ? new Date(entry.notified_at).toLocaleDateString()
                        : '-'
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}