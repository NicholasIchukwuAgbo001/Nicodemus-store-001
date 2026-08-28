import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { SIZE_CHART } from '../../data/storeConfig';
import { X, Ruler, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useStore();
  const [activeTab, setActiveTab] = useState<'clothing' | 'shoes'>('clothing');

  if (!isSizeGuideOpen) return null;

  return (
    <AnimatePresence>
      <div id="size-guide-overlay" className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsSizeGuideOpen(false)}
          className="fixed inset-0 bg-[#141312]/60 backdrop-blur-xs"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative bg-[#FAF8F5] rounded-lg shadow-2xl max-w-2xl w-full p-6 sm:p-8 z-10 border border-[#E8E2DA] max-h-[90vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={() => setIsSizeGuideOpen(false)}
            className="absolute top-5 right-5 p-1.5 text-[#7D7771] hover:text-[#181716] rounded-full hover:bg-[#F2ECE3] transition-colors"
            aria-label="Close size guide"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#8F683D] mb-1">
            <Ruler className="w-4 h-4" />
            <span>Atelier Fit Guide</span>
          </div>

          <h3 className="font-editorial text-2xl sm:text-3xl text-[#181716] font-medium">
            NICODEMUS 001 Size & Measurements
          </h3>
          <p className="text-xs text-[#7D7771] mt-1.5">
            Designed according to international couture proportions. If you require custom measurement advice, our concierge is at your service.
          </p>

          {/* Category Switcher */}
          <div className="flex border-b border-[#E8E2DA] mt-6 mb-6">
            <button
              onClick={() => setActiveTab('clothing')}
              className={`pb-3 px-6 text-xs uppercase tracking-widest font-semibold transition-colors relative ${
                activeTab === 'clothing' ? 'text-[#181716]' : 'text-[#7D7771] hover:text-[#181716]'
              }`}
            >
              Apparel & Tailoring
              {activeTab === 'clothing' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#181716]" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('shoes')}
              className={`pb-3 px-6 text-xs uppercase tracking-widest font-semibold transition-colors relative ${
                activeTab === 'shoes' ? 'text-[#181716]' : 'text-[#7D7771] hover:text-[#181716]'
              }`}
            >
              Footwear & Heels
              {activeTab === 'shoes' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#181716]" />
              )}
            </button>
          </div>

          {/* Table Container */}
          {activeTab === 'clothing' ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#D5CDBD] text-[#181716] uppercase tracking-wider font-semibold">
                    <th className="py-3 px-3">Size</th>
                    <th className="py-3 px-3">Bust</th>
                    <th className="py-3 px-3">Waist</th>
                    <th className="py-3 px-3">Hips</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAE4DA] text-[#4A453F]">
                  {SIZE_CHART.clothing.map((row) => (
                    <tr key={row.size} className="hover:bg-[#F2ECE3] transition-colors">
                      <td className="py-3 px-3 font-semibold text-[#181716]">{row.size}</td>
                      <td className="py-3 px-3">{row.bust}</td>
                      <td className="py-3 px-3">{row.waist}</td>
                      <td className="py-3 px-3">{row.hips}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#D5CDBD] text-[#181716] uppercase tracking-wider font-semibold">
                    <th className="py-3 px-3">EU</th>
                    <th className="py-3 px-3">US</th>
                    <th className="py-3 px-3">UK</th>
                    <th className="py-3 px-3">Foot Length</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAE4DA] text-[#4A453F]">
                  {SIZE_CHART.shoes.map((row) => (
                    <tr key={row.eu} className="hover:bg-[#F2ECE3] transition-colors">
                      <td className="py-3 px-3 font-semibold text-[#181716]">{row.eu}</td>
                      <td className="py-3 px-3">{row.us}</td>
                      <td className="py-3 px-3">{row.uk}</td>
                      <td className="py-3 px-3">{row.cm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Measuring tips */}
          <div className="mt-8 p-4 bg-[#F2EDE5] rounded-sm border border-[#E8E2DA] flex items-start gap-3 text-xs text-[#5D5750]">
            <Sparkles className="w-4 h-4 text-[#C29E74] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#181716] font-semibold">Between sizes?</strong> For bias-cut silk and knitwear dresses, we recommend taking your standard size. For tailored virgin wool blazers, consider taking one size up if you prefer an oversized editorial drape.
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
