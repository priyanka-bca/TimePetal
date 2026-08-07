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
    <div className="min-h-screen bg-[#FFF5F7] text-black p-6 sm:p-10 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-pink-200">
        <div>
          <Link href="/dashboard" className="text-xs font-extrabold text-black hover:opacity-75 flex items-center gap-1 mb-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
          </Link>
          <h1 className="font-serif text-3xl font-extrabold text-black">
            TimePetal Admin Portal
          </h1>
        </div>
        <span className="px-3 py-1 rounded-full bg-pink-100 border border-pink-200 text-black text-xs font-extrabold flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5 text-pink-500" /> System Healthy (99.99% Uptime)
        </span>
      </div>

      {/* Admin Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card rounded-2xl p-6 border border-pink-200 space-y-2 bg-white">
          <div className="flex justify-between items-center text-xs text-black font-extrabold">
            <span>Total Registered Users</span>
            <Users className="w-4 h-4 text-pink-500" />
          </div>
          <p className="font-serif text-3xl font-extrabold text-black">12,480</p>
          <p className="text-[11px] text-pink-600 font-extrabold">+14% this month</p>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-pink-200 space-y-2 bg-white">
          <div className="flex justify-between items-center text-xs text-black font-extrabold">
            <span>Monthly Recurring Revenue</span>
            <DollarSign className="w-4 h-4 text-pink-500" />
          </div>
          <p className="font-serif text-3xl font-extrabold text-black">$14,820</p>
          <p className="text-[11px] text-pink-600 font-extrabold">+22% MRR growth</p>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-pink-200 space-y-2 bg-white">
          <div className="flex justify-between items-center text-xs text-black font-extrabold">
            <span>Active Subscribers</span>
            <TrendingUp className="w-4 h-4 text-pink-500" />
          </div>
          <p className="font-serif text-3xl font-extrabold text-black">2,960</p>
          <p className="text-[11px] text-pink-600 font-extrabold">78% Premium Conversion</p>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-pink-200 space-y-2 bg-white">
          <div className="flex justify-between items-center text-xs text-black font-extrabold">
            <span>Memories Preserved</span>
            <BookOpen className="w-4 h-4 text-pink-500" />
          </div>
          <p className="font-serif text-3xl font-extrabold text-black">342,100</p>
          <p className="text-[11px] text-pink-600 font-extrabold">Stored & Encrypted</p>
        </div>
      </div>

      {/* Users Table */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-pink-200 space-y-6 bg-white">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="font-serif text-2xl font-extrabold text-black">Recent User Registrations</h2>
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-black absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search user email..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-pink-50 border border-pink-200 text-xs text-black font-extrabold focus:outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-extrabold text-black">
            <thead>
              <tr className="border-b border-pink-100 text-black">
                <th className="pb-3">User</th>
                <th className="pb-3">Email</th>
                <th className="pb-3">Tier</th>
                <th className="pb-3">Entries</th>
                <th className="pb-3">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pink-100">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-pink-50">
                  <td className="py-3 font-extrabold text-black">{u.name}</td>
                  <td className="py-3 text-black font-bold">{u.email}</td>
                  <td className="py-3">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                        u.tier === "Premium"
                          ? "bg-pink-200 text-black border border-pink-300"
                          : "bg-pink-50 text-black border border-pink-200"
                      }`}
                    >
                      {u.tier}
                    </span>
                  </td>
                  <td className="py-3 text-black font-bold">{u.entries}</td>
                  <td className="py-3 text-black font-bold">{u.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
