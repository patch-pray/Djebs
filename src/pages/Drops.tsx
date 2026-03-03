import { useI18n } from '@/lib/i18n';
import { motion } from 'framer-motion';
import { getDropProducts } from '@/lib/data/products';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

const Drops = () => {
  const { t, locale } = useI18n();
  const dropProducts = getDropProducts();

  // Countdown to next Friday
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const getNextFriday = () => {
      const now = new Date();
      const next = new Date(now);
      next.setDate(now.getDate() + ((5 - now.getDay() + 7) % 7 || 7));
      next.setHours(20, 0, 0, 0);
      return next;
    };

    const tick = () => {
      const diff = getNextFriday().getTime() - Date.now();
      if (diff <= 0) return;
      setCountdown({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="section-navy py-24">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-primary-foreground mb-4">{t('drops.title')}</h1>
            <p className="text-stone text-lg mb-10">{t('drops.subtitle')}</p>

            <p className="text-xs text-stone uppercase tracking-widest mb-4">{t('drops.countdown')}</p>
            <div className="flex justify-center gap-6">
              {[
                { val: countdown.days, label: locale === 'ar' ? 'أيام' : locale === 'fr' ? 'Jours' : 'Days' },
                { val: countdown.hours, label: locale === 'ar' ? 'ساعات' : locale === 'fr' ? 'Heures' : 'Hours' },
                { val: countdown.minutes, label: locale === 'ar' ? 'دقائق' : locale === 'fr' ? 'Min' : 'Min' },
                { val: countdown.seconds, label: locale === 'ar' ? 'ثوان' : locale === 'fr' ? 'Sec' : 'Sec' },
              ].map((unit) => (
                <div key={unit.label} className="text-center">
                  <span className="font-display text-4xl md:text-5xl text-champagne">{String(unit.val).padStart(2, '0')}</span>
                  <p className="text-xs text-stone mt-1">{unit.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Drop Products */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="font-display text-3xl text-foreground mb-10 text-center">{t('drops.past')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {dropProducts.map((p) => {
              const name = locale === 'ar' ? p.name_ar : locale === 'en' ? p.name_en : p.name_fr;
              return (
                <Link key={p.id} to={`/products/${p.slug}`} className="group">
                  <div className="border border-linen rounded-2xl overflow-hidden group-hover:border-champagne group-hover:shadow-lg transition-all duration-300 bg-white">
                    <div className="aspect-[3/4] overflow-hidden bg-parchment rounded-t-2xl">
                      <img src={p.images[0]} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-display text-lg text-foreground mb-1">{name}</h3>
                      <p className="text-sm text-taupe">{p.price ? `${p.price} DA` : t('featured.onRequest')}</p>
                      <span className="mt-2 text-xs text-champagne uppercase tracking-wider flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {t('featured.viewDetails')} <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Drops;
