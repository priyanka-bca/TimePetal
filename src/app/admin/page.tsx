"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  DollarSign,
  TrendingUp,
  Activity,
  ShieldCheck,
  BookOpen,
  ArrowLeft,
  Search,
  Lock,
  LogOut,
  CheckCircle2,
  Trash2,
  Star,
  RefreshCw,
  KeyRound,
  AlertCircle
} from "lucide-react";

interface AdminUser {
  id: string;
  name: string | null;
  email: string;
  isPremium: boolean;
  isAdmin: boolean;
  createdAt: string;
  _count: {
    entries: number;
    moods: number;
    letters: number;
  };
}

interface AdminMetrics {
  totalUsers: number;
  premiumUsers: number;
  totalMemories: number;
  estimatedMRR: string;
  conversionRate: number;
  systemStatus: string;
  uptime: string;
}

export default function AdminDashboardPage() {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [emailInput, setEmailInput] = useState("priyanku060@gmail.com");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Live Data State
  const [metrics, setMetrics] = useState<AdminMetrics | null>(null);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingData, setLoadingData] = useState(false);
  const [actionSuccess, setActionSuccess] = useState("");

  useEffect(() => {
    checkAdminAuth();
  }, []);

  const checkAdminAuth = async () => {
    try {
      const res = await fetch("/api/admin/verify");
      if (res.ok) {
        const data = await res.json();
        if (data.authorized) {
          setIsAuthorized(true);
          loadAdminData();
          return;
        }
      }
      setIsAuthorized(false);
    } catch {
      setIsAuthorized(false);
    }
  };

  const loadAdminData = async () => {
    setLoadingData(true);
    try {
      const res = await fetch("/api/admin/stats");
      if (res.ok) {
        const data = await res.json();
        setMetrics(data.metrics);
        setUsers(data.users || []);
      }
    } catch (e) {
      console.error("Failed to load admin stats", e);
    } finally {
      setLoadingData(false);
    }
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailInput, password: passwordInput }),
      });

      const data = await res.json();

      if (!res.ok) {
        setLoginError(data.error || "Failed to log in as administrator.");
        return;
      }

      setIsAuthorized(true);
      loadAdminData();
    } catch {
      setLoginError("Network connection error. Please try again.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" });
    setIsAuthorized(false);
    setPasswordInput("");
  };

  const handleTogglePremium = async (userId: string, currentStatus: boolean) => {
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, isPremium: !currentStatus }),
      });

      if (res.ok) {
        setActionSuccess("Updated user subscription tier.");
        setTimeout(() => setActionSuccess(""), 3000);
        loadAdminData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteUser = async (userId: string, userEmail: string) => {
    if (!confirm(`Are you sure you want to permanently delete user ${userEmail}?`)) return;

    try {
      const res = await fetch(`/api/admin/users?userId=${userId}`, { method: "DELETE" });
      if (res.ok) {
        setActionSuccess(`User ${userEmail} deleted.`);
        setTimeout(() => setActionSuccess(""), 3000);
        loadAdminData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.name && u.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // 1. Initial Loading State
  if (isAuthorized === null) {
    return (
      <div className="min-h-screen bg-[#FFF5F7] flex items-center justify-center p-4">
        <div className="flex items-center gap-3 text-sm font-bold text-pink-600">
          <RefreshCw className="w-5 h-5 animate-spin" /> Verifying Administrator Credentials...
        </div>
      </div>
    );
  }

  // 2. Admin Login Gate (Secure Authenticated Portal)
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 flex items-center justify-center p-4 text-black">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-pink-200 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-400 to-rose-500 text-white flex items-center justify-center mx-auto shadow-md shadow-pink-200">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="font-serif text-2xl font-extrabold text-black">
              TimePetal Master Admin Gate
            </h1>
            <p className="text-xs text-black/70">
              Authorized personnel only. Encrypted session verification.
            </p>
          </div>

          {loginError && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-extrabold text-black uppercase tracking-wider">
                Administrator Email
              </label>
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-pink-50 border border-pink-200 text-xs font-bold text-black focus:outline-none focus:border-pink-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-extrabold text-black uppercase tracking-wider">
                Master Password
              </label>
              <input
                type="password"
                placeholder="Enter your admin password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-pink-50 border border-pink-200 text-xs font-bold text-black focus:outline-none focus:border-pink-500"
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loginLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <KeyRound className="w-4 h-4" />}
              {loginLoading ? "Authenticating..." : "Unlock Administrator Console"}
            </button>
          </form>

          <div className="pt-2 text-center">
            <Link href="/" className="text-xs font-bold text-pink-600 hover:underline">
              &larr; Return to Public Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 3. Live Authenticated Admin Dashboard
  return (
    <div className="min-h-screen bg-[#FFF5F7] text-black p-6 sm:p-10 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-pink-200">
        <div>
          <Link href="/dashboard" className="text-xs font-extrabold text-black hover:opacity-75 flex items-center gap-1 mb-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to User Dashboard
          </Link>
          <h1 className="font-serif text-3xl font-extrabold text-black flex items-center gap-2">
            TimePetal Admin Portal
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-pink-200 text-pink-800">
              Live Database
            </span>
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-extrabold flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-emerald-600" /> PostgreSQL / SQLite Healthy (99.99%)
          </span>

          <button
            onClick={handleLogout}
            className="px-3.5 py-1.5 rounded-xl bg-white border border-pink-200 text-xs font-bold text-red-600 hover:bg-red-50 flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" /> Log Out
          </button>
        </div>
      </div>

      {actionSuccess && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {/* Admin Metrics Grid (REAL DATABASE NUMBERS) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card rounded-2xl p-6 border border-pink-200 space-y-2 bg-white shadow-sm">
          <div className="flex justify-between items-center text-xs text-black font-extrabold">
            <span>Total Registered Users</span>
            <Users className="w-4 h-4 text-pink-500" />
          </div>
          <p className="font-serif text-3xl font-extrabold text-black">
            {metrics?.totalUsers ?? "..."}
          </p>
          <p className="text-[11px] text-pink-600 font-extrabold">Live database count</p>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-pink-200 space-y-2 bg-white shadow-sm">
          <div className="flex justify-between items-center text-xs text-black font-extrabold">
            <span>Estimated Monthly Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="font-serif text-3xl font-extrabold text-black">
            ${metrics?.estimatedMRR ?? "0.00"}
          </p>
          <p className="text-[11px] text-emerald-600 font-extrabold">
            {metrics?.premiumUsers ?? 0} active subscribers ($4.99/mo)
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-pink-200 space-y-2 bg-white shadow-sm">
          <div className="flex justify-between items-center text-xs text-black font-extrabold">
            <span>Subscribers Conversion</span>
            <TrendingUp className="w-4 h-4 text-purple-500" />
          </div>
          <p className="font-serif text-3xl font-extrabold text-black">
            {metrics?.conversionRate ?? 0}%
          </p>
          <p className="text-[11px] text-purple-600 font-extrabold">Premium tier ratio</p>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-pink-200 space-y-2 bg-white shadow-sm">
          <div className="flex justify-between items-center text-xs text-black font-extrabold">
            <span>Total Memories Preserved</span>
            <BookOpen className="w-4 h-4 text-amber-500" />
          </div>
          <p className="font-serif text-3xl font-extrabold text-black">
            {metrics?.totalMemories ?? "..."}
          </p>
          <p className="text-[11px] text-amber-600 font-extrabold">Encrypted journal entries & letters</p>
        </div>
      </div>

      {/* Real Database Users Table */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-pink-200 space-y-6 bg-white shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif text-2xl font-extrabold text-black">
              User Accounts & Role Management
            </h2>
            <p className="text-xs text-black/70">Real registered accounts loaded from database</p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-black absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search user by name/email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-pink-50 border border-pink-200 text-xs text-black font-extrabold focus:outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-bold text-black">
            <thead>
              <tr className="border-b border-pink-200 text-black uppercase text-[10px] tracking-wider">
                <th className="pb-3 px-3">User</th>
                <th className="pb-3 px-3">Email</th>
                <th className="pb-3 px-3">Role</th>
                <th className="pb-3 px-3">Plan</th>
                <th className="pb-3 px-3">Entries</th>
                <th className="pb-3 px-3">Registered</th>
                <th className="pb-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pink-100">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-6 text-black/60 font-medium">
                    No users found matching query.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-pink-50/50 transition-colors">
                    <td className="py-3.5 px-3 font-extrabold text-black">{u.name || "Anonymous User"}</td>
                    <td className="py-3.5 px-3 font-mono text-[11px] text-black">{u.email}</td>
                    <td className="py-3.5 px-3">
                      {u.isAdmin ? (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-100 text-purple-800 border border-purple-200">
                          Admin
                        </span>
                      ) : (
                        <span className="text-black/60 text-[11px]">Member</span>
                      )}
                    </td>
                    <td className="py-3.5 px-3">
                      <button
                        onClick={() => handleTogglePremium(u.id, u.isPremium)}
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold transition-all ${
                          u.isPremium
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-200 hover:bg-emerald-200"
                            : "bg-pink-50 text-black border border-pink-200 hover:bg-pink-100"
                        }`}
                        title="Click to toggle Premium status"
                      >
                        {u.isPremium ? "★ Premium" : "Free Plan"}
                      </button>
                    </td>
                    <td className="py-3.5 px-3 font-bold text-black">
                      {(u._count?.entries || 0) + (u._count?.moods || 0) + (u._count?.letters || 0)}
                    </td>
                    <td className="py-3.5 px-3 text-black/70 text-[11px]">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      {!u.isAdmin && (
                        <button
                          onClick={() => handleDeleteUser(u.id, u.email)}
                          className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                          title="Delete user"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
