"use client";

import { useState } from "react";
import { Settings, ShieldCheck, Download, Lock, User, CheckCircle2 } from "lucide-react";

export default function SettingsPage() {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleExportData = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto text-black">
      <div className="flex items-center justify-between pb-4 border-b border-pink-200">
        <div>
          <span className="text-xs font-extrabold text-black uppercase tracking-wider flex items-center gap-1.5">
            <Settings className="w-3.5 h-3.5 text-pink-500" /> Security & Account
          </span>
          <h1 className="font-serif text-3xl font-extrabold text-black mt-1">
            Vault Settings
          </h1>
        </div>
      </div>

      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-pink-200 space-y-6 bg-white">
        <div className="space-y-4">
          <h2 className="font-serif text-xl font-extrabold text-black flex items-center gap-2">
            <User className="w-5 h-5 text-pink-500" /> Account Profile
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-extrabold">
            <div>
              <label className="text-black uppercase block mb-1">Display Name</label>
              <input
                type="text"
                defaultValue="Sophia Rose"
                className="w-full px-4 py-2.5 rounded-xl bg-pink-50 border border-pink-200 text-black font-extrabold"
              />
            </div>
            <div>
              <label className="text-black uppercase block mb-1">Email Address</label>
              <input
                type="email"
                defaultValue="sophia@deardiary.app"
                className="w-full px-4 py-2.5 rounded-xl bg-pink-50 border border-pink-200 text-black font-extrabold"
              />
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-pink-100 space-y-4">
          <h2 className="font-serif text-xl font-extrabold text-black flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-pink-500" /> Data Portability & Export
          </h2>
          <p className="text-xs text-black font-semibold">
            Download your complete diary vault (all entries, photo links, and sealed time capsules) into a single JSON file.
          </p>

          <button
            onClick={handleExportData}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-black font-extrabold text-xs shadow-md border border-pink-300 flex items-center gap-2 btn-shimmer"
          >
            {downloadSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-black" /> Vault Backup Exported!
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-black" /> Export Complete Diary Vault (JSON)
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
