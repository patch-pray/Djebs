import { useI18n } from '@/lib/i18n';
import { motion } from 'framer-motion';
import notreHistoireImage from '@/assets/notre-histoire.jpg';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const About = () => {
  const { t } = useI18n();

  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <motion.div {...fadeUp}>
            <h1 className="font-display text-4xl md:text-5xl text-foreground mb-3">{t('about.title')}</h1>
            <p className="text-stone">{t('about.subtitle')}</p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="section-parchment py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeUp}>
              <img src={notreHistoireImage} alt="Atelier" className="w-full rounded shadow-lg" loading="lazy" />
            </motion.div>
            <motion.div {...fadeUp}>
              <p className="text-stone leading-relaxed text-lg">{t('about.story')}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="font-display text-3xl text-foreground mb-3">{t('about.values')}</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(['val1', 'val2', 'val3'] as const).map((key) => (
              <motion.div
                key={key}
                {...fadeUp}
                className="text-center p-8 border border-linen rounded hover:border-champagne transition-all"
              >
                <h3 className="font-display text-xl text-foreground mb-3">{t(`about.${key}Title`)}</h3>
                <p className="text-stone text-sm leading-relaxed">{t(`about.${key}`)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-navy py-20">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-2xl">
          <motion.div {...fadeUp}>
            <h2 className="font-display text-3xl text-primary-foreground mb-6">{t('about.mission')}</h2>
            <p className="text-stone text-lg leading-relaxed">{t('about.missionText')}</p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default About;
