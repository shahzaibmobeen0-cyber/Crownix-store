"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in every field.");
      return;
    }
    setSending(true);
    // In production this posts to /api/contact, which relays to email or Slack.
    setTimeout(() => {
      toast.success("Message sent — we usually reply within a day.");
      setForm({ name: "", email: "", message: "" });
      setSending(false);
    }, 700);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        required
        placeholder="Your Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full border border-white/15 bg-transparent px-4 py-3 text-sm focus:border-champagne focus:outline-none"
      />
      <input
        required
        type="email"
        placeholder="Your Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="w-full border border-white/15 bg-transparent px-4 py-3 text-sm focus:border-champagne focus:outline-none"
      />
      <textarea
        required
        rows={5}
        placeholder="How can we help?"
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        className="w-full border border-white/15 bg-transparent px-4 py-3 text-sm focus:border-champagne focus:outline-none"
      />
      <button type="submit" disabled={sending} className="btn-gold w-full disabled:opacity-50">
        {sending ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
