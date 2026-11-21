"use client";

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BrandIcon } from '@/components/landing/brand-icon';
import { siteConfig } from '@/lib/site';

/** Floating "Chat on WhatsApp" button — appears after a little scroll. */
export function WhatsAppFab() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 320);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const href = `https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent('Hi BigBrosAI, I’d like to know more.')}`;
  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with BigBrosAI on WhatsApp"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ type: 'spring', stiffness: 380, damping: 24 }}
          className="group fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-[#25D366] p-3.5 text-white shadow-[0_12px_30px_-8px_rgba(37,211,102,0.65)] sm:bottom-6 sm:right-6"
        >
          <span className="animate-soft-ping absolute inset-0 rounded-full bg-[#25D366]/40" aria-hidden />
          <BrandIcon slug="whatsapp" color="#fff" className="relative h-6 w-6" />
          <span className="relative hidden max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300 group-hover:max-w-[9rem] group-hover:pr-1 sm:inline">Chat with us</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
