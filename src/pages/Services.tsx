import { useI18n } from '@/lib/i18n';
import { motion } from 'framer-motion';
import { Printer, Star, Layers, Scissors, Sticker } from 'lucide-react';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const serviceData = [
  { icon: Printer, key: 'dtf', descKey: 'dtfDesc' },
  { icon: Star, key: 'broderie', descKey: 'broderieDesc' },
  { icon: Layers, key: 'serigraphie', descKey: 'serigraphieDesc' },
  { icon: Scissors, key: 'flex', descKey: 'flexDesc' },
  { icon: Sticker, key: 'autocollants', descKey: 'autocollantsDesc' },
];

const Services = () => {
  const { t } = useI18n();

  return (
    <section className="section-parchment py-20">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div {...fadeUp} className="text-center mb-16">
          <h1 className="font-display text-4xl md:text-5xl text-foreground mb-3">{t('services.title')}</h1>
          <p className="text-stone">{t('services.subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {serviceData.map((svc) => (
            <motion.div
              key={svc.key}
              {...fadeUp}
              className="bg-background border border-linen rounded p-8 text-center hover:border-champagne transition-all duration-300 group"
            >
              <svc.icon className="w-10 h-10 text-taupe mx-auto mb-4 group-hover:text-champagne transition-colors" strokeWidth={1.5} />
              <h3 className="font-display text-xl text-foreground mb-3">{t(`services.${svc.key}`)}</h3>
              <p className="text-sm text-stone leading-relaxed">{t(`services.${svc.descKey}`)}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="/contact"
            className="inline-block px-8 py-3 bg-foreground text-background text-sm font-medium tracking-wider uppercase hover:border-champagne border border-transparent transition-all duration-300"
          >
            {t('services.cta')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
