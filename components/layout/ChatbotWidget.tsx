"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  GREETING,
  QUICK_ROUTES,
  getBotReply,
} from "@/lib/chatbot";

interface Message {
  id: number;
  from: "bot" | "user";
  text: string;
  quickReplies?: string[];
}

export function ChatbotWidget() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, from: "bot", text: GREETING.text, quickReplies: GREETING.quickReplies },
  ]);
  const counter = useRef(2);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Allow other components (e.g. Contact page live-chat) to open the widget.
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("lc:open-chat", handler);
    return () => window.removeEventListener("lc:open-chat", handler);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, typing, open]);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setInput("");

    const route = QUICK_ROUTES[trimmed];
    setMessages((prev) => [
      ...prev,
      { id: counter.current++, from: "user", text: trimmed },
    ]);

    if (route) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: counter.current++,
            from: "bot",
            text: `Taking you to the ${trimmed.toLowerCase()} page now…`,
          },
        ]);
        setOpen(false);
        router.push(route);
      }, 500);
      return;
    }

    setTyping(true);
    setTimeout(() => {
      const reply = getBotReply(trimmed);
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: counter.current++,
          from: "bot",
          text: reply.text,
          quickReplies: reply.quickReplies,
        },
      ]);
    }, 850);
  };

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat assistant" : "Open chat assistant"}
        className="fixed bottom-5 right-5 z-[600] flex h-14 w-14 items-center justify-center rounded-full bg-brand-900 text-white shadow-soft-lg transition hover:bg-brand-800 dark:bg-brand-600 dark:hover:bg-brand-500"
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={open ? "x" : "chat"}
            initial={{ scale: 0.5, opacity: 0, rotate: -90 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.5, opacity: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
          >
            {open ? (
              <X className="h-6 w-6" />
            ) : (
              <MessageCircle className="h-6 w-6" />
            )}
          </motion.span>
        </AnimatePresence>
        {!open && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold-500 text-[10px] font-bold text-brand-950">
            1
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className="surface fixed bottom-24 right-5 z-[600] flex h-[32rem] max-h-[calc(100vh-7rem)] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-3xl border shadow-soft-lg"
            role="dialog"
            aria-label="LifeCare chat assistant"
          >
            {/* Header */}
            <div className="flex items-center gap-3 bg-gradient-to-r from-brand-900 to-brand-700 p-4 text-white">
              <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
                <Sparkles className="h-5 w-5 text-gold-300" />
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-accent-400 ring-2 ring-brand-800" />
              </span>
              <div className="leading-tight">
                <p className="font-semibold">Aria · LifeCare Assistant</p>
                <p className="text-xs text-white/70">Online — replies instantly</p>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="surface-2 flex-1 space-y-3 overflow-y-auto p-4"
            >
              {messages.map((m) => (
                <div key={m.id}>
                  <div
                    className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                        m.from === "user"
                          ? "rounded-br-md bg-brand-900 text-white dark:bg-brand-600"
                          : "surface rounded-bl-md border"
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                  {m.quickReplies && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {m.quickReplies.map((q) => (
                        <button
                          key={q}
                          onClick={() => send(q)}
                          className="rounded-full border border-brand-500/30 bg-brand-500/5 px-3 py-1.5 text-xs font-medium text-brand-700 transition hover:bg-brand-500/15 dark:text-brand-200"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="surface flex gap-1 rounded-2xl rounded-bl-md border px-4 py-3">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="h-2 w-2 rounded-full bg-slate-400"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="surface flex items-center gap-2 border-t p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message…"
                aria-label="Type your message"
                className="h-11 flex-1 rounded-full border bg-transparent px-4 text-sm focus:border-brand-500 focus:outline-none focus-visible:outline-gold-500"
              />
              <button
                type="submit"
                aria-label="Send message"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-900 text-white transition hover:bg-brand-800 dark:bg-brand-600"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
