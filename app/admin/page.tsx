'use client';

import { useState, useEffect } from 'react';
import { Download, Send, Loader2, Users } from 'lucide-react';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [emails, setEmails] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);

  const handleLogin = () => {
    // Simple password check - replace with your password
    if (password === 'coursevault2025') {
      setAuthenticated(true);
      fetchEmails();
    } else {
      alert('Wrong password');
    }
  };

  const fetchEmails = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/waitlist');
      const data = await res.json();
      setEmails(data.emails || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendLaunchEmails = async () => {
    if (!confirm('Send launch emails to all waitlist members?')) return;
    
    setSending(true);
    try {
      const res = await fetch('/api/admin/launch', { method: 'POST' });
      const data = await res.json();
      alert(`Sent ${data.count} emails!`);
      fetchEmails();
    } catch (error) {
      alert('Failed to send emails');
    } finally {
      setSending(false);
    }
  };

  const downloadCSV = () => {
    const csv = ['Email,Created At,Notified']
      .concat(emails.map(e => `${e.email},${e.created_at},${e.notified}`))
      .join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'waitlist.csv';
    a.click();
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-gray-800 p-8 rounded-2xl max-w-md w-full">
          <h1 className="text-2xl font-bold text-white mb-6">Admin Login</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            placeholder="Enter password"
            className="w-full px-4 py-3 bg-gray-700 text-white rounded-xl mb-4"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Waitlist Dashboard</h1>
          <div className="flex gap-3">
            <button
              onClick={downloadCSV}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-xl"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
            <button
              onClick={sendLaunchEmails}
              disabled={sending}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl disabled:opacity-50"
            >
              {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              Send Launch Emails
            </button>
          </div>
        </div>

        <div className="bg-gray-800 rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-indigo-400" />
            <div>
              <div className="text-3xl font-bold text-white">{emails.length}</div>
              <div className="text-gray-400">Total Signups</div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-2xl overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-gray-400">Loading...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-white font-semibold">#</th>
                    <th className="px-6 py-3 text-left text-white font-semibold">Email</th>
                    <th className="px-6 py-3 text-left text-white font-semibold">Joined</th>
                    <th className="px-6 py-3 text-left text-white font-semibold">Notified</th>
                  </tr>
                </thead>
                <tbody>
                  {emails.map((email, index) => (
                    <tr key={index} className="border-t border-gray-700">
                      <td className="px-6 py-4 text-gray-400">{index + 1}</td>
                      <td className="px-6 py-4 text-white">{email.email}</td>
                      <td className="px-6 py-4 text-gray-400">
                        {new Date(email.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-xs ${
                          email.notified ? 'bg-green-900 text-green-300' : 'bg-gray-700 text-gray-300'
                        }`}>
                          {email.notified ? 'Yes' : 'No'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}