"use client";

import React, { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { User, Mail, Shield, Key, Loader2, CheckCircle2, AlertCircle, LogOut, Camera, Calendar, Link2 } from "lucide-react";
import { Navbar } from "@/components/navbar";

export default function ProfilePage() {
  const { data: session, status, update } = useSession();
  const loading = status === "loading";

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState<string | null>(null);
  const [profileError, setProfileError] = useState<string | null>(null);

  // Password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setImage(session.user.image || "");
    }
  }, [session]);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSuccess(null);
    setProfileError(null);
    setProfileSaving(true);

    try {
      const res = await fetch("/api/auth/update-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, image }),
      });

      const data = await res.json();

      if (!res.ok) {
        setProfileError(data.error || "Failed to update profile.");
      } else {
        setProfileSuccess("Profile updated successfully.");
        await update({ name, image });
      }
    } catch {
      setProfileError("An unexpected error occurred.");
    } finally {
      setProfileSaving(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordSuccess(null);
    setPasswordError(null);

    if (newPassword !== confirmNewPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }

    setPasswordSaving(true);

    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword, confirmNewPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        setPasswordError(data.error || "Failed to update password.");
      } else {
        setPasswordSuccess("Password updated successfully.");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      }
    } catch {
      setPasswordError("An error occurred while updating password.");
    } finally {
      setPasswordSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-8">
          <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
        </div>
      </div>
    );
  }

  const provider = (session?.user as { provider?: string })?.provider || "email";
  const emailVerified = (session?.user as { emailVerified?: Date | boolean | null })?.emailVerified;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-secondary/10 to-background flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 md:p-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-6">
          <div>
            <h1 className="text-3xl font-bold font-serif tracking-tight text-foreground">
              Account Settings
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage your identity, linked providers, and security preferences
            </p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-destructive/10 hover:bg-destructive/20 text-destructive text-sm font-medium transition"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>

        {/* Profile Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Identity summary sidebar */}
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-card/60 backdrop-blur-xl border border-border/60 shadow-xl space-y-6 text-center">
              <div className="relative w-24 h-24 mx-auto rounded-3xl overflow-hidden bg-gradient-to-br from-amber-400 via-purple-500 to-indigo-600 p-1 shadow-lg">
                {session?.user?.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={session.user.image}
                    alt={session.user.name || "Avatar"}
                    className="w-full h-full object-cover rounded-[22px]"
                  />
                ) : (
                  <div className="w-full h-full bg-background rounded-[22px] flex items-center justify-center text-3xl font-serif font-bold text-amber-500">
                    {session?.user?.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                )}
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground font-serif">
                  {session?.user?.name || "Sanctuary Member"}
                </h2>
                <p className="text-sm text-muted-foreground flex items-center justify-center gap-1.5 mt-1">
                  <Mail className="w-3.5 h-3.5" />
                  {session?.user?.email}
                </p>
              </div>

              {/* Linked Accounts Badge */}
              <div className="pt-4 border-t border-border/40 space-y-3 text-left">
                <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <Link2 className="w-3.5 h-3.5" /> Linked Login Methods
                </div>

                <div className="flex flex-wrap gap-2">
                  {(provider === "google" || provider === "both") && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                      </svg>
                      Google OAuth
                    </span>
                  )}
                  {(provider === "email" || provider === "both") && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                      <Mail className="w-3.5 h-3.5" /> Password Auth
                    </span>
                  )}
                </div>

                {/* Email Verification Status */}
                <div className="pt-2">
                  {emailVerified ? (
                    <span className="inline-flex items-center gap-1.5 text-xs text-emerald-500 font-medium">
                      <CheckCircle2 className="w-4 h-4" /> Email Verified
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs text-amber-500 font-medium">
                      <AlertCircle className="w-4 h-4" /> Email Unverified
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Form details section */}
          <div className="md:col-span-2 space-y-8">
            {/* Edit Profile Form */}
            <div className="p-6 sm:p-8 rounded-3xl bg-card/60 backdrop-blur-xl border border-border/60 shadow-xl space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground">Personal Profile</h3>
                  <p className="text-xs text-muted-foreground">Update your display name and avatar URL</p>
                </div>
              </div>

              {profileSuccess && (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{profileSuccess}</span>
                </div>
              )}

              {profileError && (
                <div className="p-4 rounded-2xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{profileError}</span>
                </div>
              )}

              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-11 px-4 rounded-2xl bg-secondary/40 border border-border/80 text-foreground outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Avatar Image URL
                  </label>
                  <div className="relative">
                    <Camera className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="url"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      placeholder="https://example.com/avatar.jpg"
                      className="w-full h-11 pl-10 pr-4 rounded-2xl bg-secondary/40 border border-border/80 text-foreground outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={profileSaving}
                  className="px-6 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-medium text-sm transition shadow-md flex items-center gap-2 disabled:opacity-50"
                >
                  {profileSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Profile Changes"}
                </button>
              </form>
            </div>

            {/* Change Password Form */}
            <div className="p-6 sm:p-8 rounded-3xl bg-card/60 backdrop-blur-xl border border-border/60 shadow-xl space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
                  <Key className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground">Security & Password</h3>
                  <p className="text-xs text-muted-foreground">Change your password or link password authentication</p>
                </div>
              </div>

              {passwordSuccess && (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{passwordSuccess}</span>
                </div>
              )}

              {passwordError && (
                <div className="p-4 rounded-2xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{passwordError}</span>
                </div>
              )}

              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Required if you already have a password"
                    className="w-full h-11 px-4 rounded-2xl bg-secondary/40 border border-border/80 text-foreground outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    New Password
                  </label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min 8 chars, 1 uppercase, 1 number, 1 special char"
                    className="w-full h-11 px-4 rounded-2xl bg-secondary/40 border border-border/80 text-foreground outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    required
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full h-11 px-4 rounded-2xl bg-secondary/40 border border-border/80 text-foreground outline-none focus:border-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={passwordSaving || !newPassword}
                  className="px-6 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-medium text-sm transition shadow-md flex items-center gap-2 disabled:opacity-50"
                >
                  {passwordSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Update Password"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
