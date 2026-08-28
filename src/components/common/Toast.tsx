import React from 'react';
import { useStore } from '../../context/StoreContext';
import { CheckCircle2, AlertCircle, Info, XCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useStore();

  return (
    <div 
      id="toast-container" 
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4"
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="pointer-events-auto bg-[#181716] text-[#FAF8F5] p-4 rounded-lg shadow-2xl border border-[#2D2A26] flex items-start gap-3 relative overflow-hidden"
          >
            {/* Status indicator bar */}
            <div 
              className={`absolute left-0 top-0 bottom-0 w-1 ${
                toast.type === 'success' ? 'bg-[#C29E74]' :
                toast.type === 'error' ? 'bg-[#D9534F]' :
                toast.type === 'warning' ? 'bg-[#E5A93C]' : 'bg-[#A88860]'
              }`} 
            />

            <div className="shrink-0 mt-0.5">
              {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-[#C29E74]" />}
              {toast.type === 'error' && <XCircle className="w-5 h-5 text-[#D9534F]" />}
              {toast.type === 'warning' && <AlertCircle className="w-5 h-5 text-[#E5A93C]" />}
              {toast.type === 'info' && <Info className="w-5 h-5 text-[#FAF8F5]/80]" />}
            </div>

            <div className="flex-1 min-w-0 pr-4">
              <p className="text-xs font-semibold tracking-wider uppercase text-[#C29E74]">
                {toast.title}
              </p>
              <p className="text-sm text-[#E6E1D8] mt-0.5 line-clamp-2 leading-relaxed">
                {toast.message}
              </p>
            </div>

            <button
              onClick={() => dismissToast(toast.id)}
              className="text-[#9E968B] hover:text-[#FAF8F5] transition-colors p-1"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
