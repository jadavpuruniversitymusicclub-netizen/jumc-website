"use client";
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface PortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PortalModal = ({ isOpen, onClose }: PortalModalProps) => {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-transparent"
          />
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-[95%] md:w-full max-w-md max-h-[90vh] overflow-y-auto bg-acoustic-surface rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.35)] p-6 md:p-8 border-2 border-amber-500/35"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-charcoal/5 transition-colors text-charcoal"
            >
              <X size={20} />
            </button>

            <div className="mb-8">
              <h2 className="text-3xl font-black text-charcoal tracking-tight">JUMC Portal</h2>
              <p className="text-charcoal-muted mt-2">Sign in or register to join the collective.</p>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-bold text-charcoal mb-1">Full Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 rounded-xl bg-white/50 border border-charcoal/20 focus:outline-none focus:border-crimson focus:ring-1 focus:ring-crimson transition-all text-charcoal"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-charcoal mb-1">Institution / College</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 rounded-xl bg-white/50 border border-charcoal/20 focus:outline-none focus:border-crimson focus:ring-1 focus:ring-crimson transition-all text-charcoal"
                  placeholder="e.g., Jadavpur University"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-charcoal mb-1">Primary Instrument</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 rounded-xl bg-white/50 border border-charcoal/20 focus:outline-none focus:border-crimson focus:ring-1 focus:ring-crimson transition-all text-charcoal"
                  placeholder="e.g., Acoustic Guitar, Vocals"
                />
              </div>
              <button 
                type="submit"
                className="w-full mt-4 py-4 bg-crimson text-white rounded-xl font-bold uppercase tracking-widest hover:bg-red-700 transition-colors shadow-lg"
              >
                Enter Portal
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PortalModal;
