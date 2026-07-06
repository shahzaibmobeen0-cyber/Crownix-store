import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle } from "lucide-react";
import ContactForm from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Crownix Store — email, WhatsApp, or the contact form.",
};

export default function ContactPage() {
  return (
    <div className="container-lux py-32">
      <div className="mb-12 max-w-lg">
        <p className="eyebrow mb-3">Get in Touch</p>
        <h1 className="font-display text-5xl text-ivory">Contact Crownix</h1>
      </div>

      <div className="grid gap-14 lg:grid-cols-2">
        <div>
          <ContactForm />
          <div className="mt-10 space-y-4 border-t border-white/10 pt-8 text-sm text-ivory/70">
            <p className="flex items-center gap-3">
              <Mail size={16} className="text-champagne" /> support@crownixstore.com
            </p>
            <p className="flex items-center gap-3">
              <MessageCircle size={16} className="text-champagne" /> WhatsApp: +92 300 1234567
            </p>
            <p className="flex items-center gap-3">
              <MapPin size={16} className="text-champagne" /> Lahore, Pakistan
            </p>
          </div>
        </div>

        {/* Google Maps placeholder — swap for a real <iframe> embed once the address is set */}
        <div className="relative min-h-[360px] overflow-hidden border border-white/10 bg-onyx-800">
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-ivory/40">
            <MapPin size={28} />
            <p className="font-mono text-xs uppercase tracking-widest2">Google Maps Embed Placeholder</p>
            <p className="max-w-xs text-center text-xs">
              Replace this block with an &lt;iframe&gt; using your Google Maps embed URL once
              the storefront address is finalized.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
