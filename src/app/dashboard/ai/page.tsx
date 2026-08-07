"use client";

import { useState } from "react";
import { Sparkles, Send, Bot, RefreshCw } from "lucide-react";

import { useAuth } from "@/lib/auth";

export default function AiPage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: `Hello ${user?.name || "Friend"}. I am your TimePetal Reflection Companion. What thought or feeling would you like to reflect on today?`
    }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { sender: "user", text: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "That sounds like a deeply meaningful moment. Remember to acknowledge how far you've come on your journey!"
        }
      ]);
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto text-black">
      <div className="flex items-center justify-between pb-4 border-b border-pink-200">
        <div>
          <span className="text-xs font-extrabold text-black uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-pink-500" /> Optional AI Companion
          </span>
          <h1 className="font-serif text-3xl font-extrabold text-black mt-1">
            Gentle Reflection Assistant
          </h1>
        </div>
      </div>

      <div className="glass-card rounded-3xl p-6 border border-pink-200 h-[500px] flex flex-col justify-between bg-white">
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-lg p-4 rounded-2xl text-sm font-semibold ${
                  m.sender === "user"
                    ? "bg-gradient-to-r from-pink-400 to-rose-400 text-black border border-pink-300 shadow-sm"
                    : "bg-pink-50 text-black border border-pink-200"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-pink-100 flex gap-2">
          <input
            type="text"
            placeholder="Ask for journaling prompts, memory summaries..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 px-4 py-3 rounded-2xl bg-pink-50 border border-pink-200 text-sm font-extrabold text-black focus:outline-none focus:border-pink-400 placeholder-zinc-400"
          />
          <button
            onClick={handleSend}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-black font-extrabold text-sm shadow-md border border-pink-300 flex items-center gap-1 btn-shimmer"
          >
            <Send className="w-4 h-4 text-black" />
          </button>
        </div>
      </div>
    </div>
  );
}
