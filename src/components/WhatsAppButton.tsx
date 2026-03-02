import { useState } from 'react';
import { useI18n } from '@/lib/i18n';
import { MessageCircle, X, Package, Palette, Store } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const agents = [
  { icon: Package, labelKey: 'reseller.produitsFinis', name: 'KAOUTHAR', phone: '213563892164' },
  { icon: Package, labelKey: 'reseller.produitsFinis', name: 'FELLA', phone: '213563910915' },
  { icon: Palette, labelKey: 'reseller.tissusBranding', name: 'HADJER', phone: '213550170665' },
  { icon: Store, labelKey: 'reseller.showroom', name: 'AMIRA', phone: '213553774720' },
];

const WhatsAppButton = () => {
  const [open, setOpen] = useState(false);
  const { t } = useI18n();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="bg-background border border-linen rounded-lg shadow-xl p-4 w-72 mb-2"
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-display text-sm font-semibold text-foreground">{t('whatsapp.title')}</h4>
              <button onClick={() => setOpen(false)} className="text-stone hover:text-foreground">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2">
              {agents.map((agent, i) => (
                <a
                  key={i}
                  href={`https://wa.me/${agent.phone}?text=${encodeURIComponent('Bonjour, je vous contacte depuis le site Djeb\'s — L\'Aiguille Magique.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-2 rounded hover:bg-parchment transition-colors group"
                >
                  <agent.icon className="w-4 h-4 text-taupe" />
                  <div className="flex-1">
                    <p className="text-xs text-stone">{t(agent.labelKey)}</p>
                    <p className="text-sm font-medium text-foreground">{agent.name}</p>
                  </div>
                  <MessageCircle className="w-4 h-4 text-green-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-deep-navy flex items-center justify-center shadow-lg ring-2 ring-champagne/30 hover:ring-champagne/60 transition-all"
      >
        {open ? (
          <X className="w-6 h-6 text-primary-foreground" />
        ) : (
          <MessageCircle className="w-6 h-6 text-primary-foreground" />
        )}
      </button>
    </div>
  );
};

export default WhatsAppButton;
