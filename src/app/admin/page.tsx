"use client";

import Link from "next/link";
import {
  Users,
  DollarSign,
  TrendingUp,
  Activity,
  ShieldCheck,
  BookOpen,
  ArrowLeft,
  Search
} from "lucide-react";

export default function AdminDashboardPage() {
  const users = [
    { id: "u-1", name: "Sophia Rose", email: "sophia@deardiary.app", tier: "Premium", entries: 42, joined: "2026-01-12" },
    { id: "u-2", name: "Elena Rostova", email: "elena@deardiary.app", tier: "Premium", entries: 89, joined: "2026-02-05" },
    { id: "u-3", name: "Mia Chen", email: "mia@deardiary.app", tier: "Free", entries: 14, joined: "2026-04-18" },
    { id: "u-4", name: "Aria Thorne", email: "aria@deardiary.app", tier: "Premium", entries: 120, joined: "2025-11-09" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 p-6 sm:p-10 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <Link href="/dashboard" className="text-xs font-semibold text-rose-500 hover:text-rose-600 flex items-center gap-1 mb-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
          </Link>
          <h1 className="font-serif text-3xl font-bold text-slate-900 dark:text-white">
            DearDiary Admin Portal
          </h1>
        </div>
        <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-300 text-xs font-bold flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5" /> System Healthy (99.99% Uptime)
        </span>
      </div>

      {/* Admin Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card rounded-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-500">
            <span>Total Registered Users</span>
            <Users className="w-4 h-4 text-rose-500" />
          </div>
          <p className="font-serif text-3xl font-bold text-slate-900 dark:text-white">12,480</p>
          <p className="text-[11px] text-emerald-500 font-semibold">+14% this month</p>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-500">
            <span>Monthly Recurring Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="font-serif text-3xl font-bold text-slate-900 dark:text-white">$14,820</p>
          <p className="text-[11px] text-emerald-500 font-semibold">+22% MRR growth</p>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-500">
            <span>Active Subscribers</span>
            <TrendingUp className="w-4 h-4 text-purple-500" />
          </div>
          <p className="font-serif text-3xl font-bold text-slate-900 dark:text-white">2,960</p>
          <p className="text-[11px] text-purple-500 font-semibold">78% Premium Conversion</p>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-500">
            <span>Memories Preserved</span>
            <BookOpen className="w-4 h-4 text-amber-500" />
          </div>
          <p className="font-serif text-3xl font-bold text-slate-900 dark:text-white">342,100</p>
          <p className="text-[11px] text-amber-500 font-semibold">Stored & Encrypted</p>
        </div>
      </div>

      {/* Users Table */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 space-y-6">
        <h2 className="font-serif text-xl font-bold text-slate-800 dark:text-slate-100">
          User Accounts & Subscription Tiers
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
            <thead className="border-b border-slate-200 dark:border-slate-800 uppercase font-bold text-[10px] text-slate-400">
              <tr>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Subscription Plan</th>
                <th className="py-3 px-4">Entries</th>
                <th className="py-3 px-4">Joined Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-rose-50/50 dark:hover:bg-slate-900/50 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900 dark:text-slate-100">{u.name}</td>
                  <td className="py-3 px-4">{u.email}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      u.tier === "Premium" ? "bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300" : "bg-slate-100 text-slate-600"
                    }`}>
                      {u.tier}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-medium">{u.entries} memories</td>
                  <td className="py-3 px-4 text-slate-400">{u.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
