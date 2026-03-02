import { useI18n } from '@/lib/i18n';
import { motion } from 'framer-motion';
import { MapPin, Clock, Phone } from 'lucide-react';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const Showroom = () => {
  const { t } = useI18n();

  return (
    <section className="section-parchment py-20">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div {...fadeUp} className="text-center mb-16">
          <h1 className="font-display text-4xl md:text-5xl text-foreground mb-3">{t('showroom.title')}</h1>
          <p className="text-stone">{t('showroom.subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div {...fadeUp}>
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-champagne mt-0.5" />
                <div>
                  <h3 className="font-display text-lg text-foreground mb-1">{t('showroom.hours')}</h3>
                  <p className="text-stone text-sm">{t('showroom.hoursText')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-champagne mt-0.5" />
                <div>
                  <h3 className="font-display text-lg text-foreground mb-1">{t('showroom.contactPerson')}</h3>
                  <p className="text-stone text-sm">AMIRA — 0553 77 47 20</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-champagne mt-0.5" />
                <div>
                  <h3 className="font-display text-lg text-foreground mb-1">Adresse</h3>
                  <p className="text-stone text-sm">Alger, Algérie</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div {...fadeUp}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d204267.72637417932!2d2.9912698!3d36.7525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128fb26977847cd3%3A0x4de0e22484f0f096!2sAlgiers!5e0!3m2!1sfr!2sdz!4v1234567890"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              className="rounded shadow-lg"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Showroom;
