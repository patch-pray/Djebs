import { useI18n } from '@/lib/i18n';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Gem, Target, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import notreHistoireImage from '@/assets/notre-histoire.jpg';
import heroImage from '@/assets/hero-atelier.jpg';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.15 } },
  viewport: { once: true },
};

const staggerChild = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const valueIcons = [Heart, Gem, Sparkles];

const About = () => {
  const { t } = useI18n();

  return (
    <>
      {/* Hero - Full Width Impact */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Atelier" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/50 to-foreground/80" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2 mb-8 rounded-full bg-champagne/20 backdrop-blur-sm border border-champagne/30"
          >
            <Sparkles className="w-4 h-4 text-champagne" />
            <span className="text-champagne text-xs font-semibold tracking-[0.2em] uppercase">Notre Histoire</span>
          </motion.span>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl text-background mb-6 leading-[1.1]"
          >
            {t('about.title')}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-background/80 text-lg md:text-xl max-w-2xl mx-auto"
          >
            {t('about.subtitle')}
          </motion.p>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Story - Split Section */}
      <section className="relative overflow-hidden bg-background">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
          {/* Image Side */}
          <motion.div 
            {...fadeUp} 
            className="relative overflow-hidden group order-2 lg:order-1"
          >
            <img 
              src={notreHistoireImage} 
              alt="Atelier" 
              className="w-full h-full min-h-[400px] object-cover transition-transform duration-1000 group-hover:scale-105" 
              loading="lazy" 
            />
            <div className="absolute inset-0 bg-gradient-to-l from-background/30 to-transparent pointer-events-none" />
          </motion.div>

          {/* Content Side */}
          <motion.div 
            {...fadeUp} 
            className="relative flex flex-col justify-center px-8 md:px-12 lg:px-20 py-16 lg:py-24 order-1 lg:order-2"
            style={{ backgroundColor: 'hsl(var(--parchment))' }}
          >
            {/* Decorative pattern */}
            <div
              className="absolute inset-0 opacity-[0.02] pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)',
                backgroundSize: '24px 24px',
              }}
            />

            {/* Vertical accent */}
            <div className="absolute right-0 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-champagne/40 to-transparent hidden lg:block" />

            <div className="relative z-10 max-w-xl">
              <span className="inline-flex items-center gap-3 text-champagne text-xs font-semibold tracking-[0.3em] uppercase mb-8">
                <span className="w-10 h-px bg-champagne" />
                L'Atelier
              </span>

              <h2 className="font-display text-4xl md:text-5xl text-foreground mb-10 leading-[1.1]">
                Notre Passion
              </h2>

              <p className="text-stone leading-[2] text-base lg:text-lg">
                {t('about.story')}
              </p>

              {/* Decorative */}
              <div className="mt-12 flex items-center gap-3">
                <div className="w-12 h-px bg-gradient-to-r from-champagne to-transparent" />
                <div className="w-2 h-2 rounded-full bg-champagne/50" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values - Modern Cards */}
      <section className="py-28 bg-background relative overflow-hidden">
        {/* Background decorations */}
        <div
          className="absolute top-20 -left-32 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, hsla(37,41%,54%,0.06) 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-20 -right-32 w-[350px] h-[350px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, hsla(37,41%,54%,0.05) 0%, transparent 70%)' }}
        />

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <motion.div {...fadeUp} className="text-center mb-20">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-champagne/10 text-champagne text-xs font-semibold tracking-[0.2em] uppercase mb-6">
              <Gem className="w-3.5 h-3.5" />
              Nos Valeurs
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">
              {t('about.values')}
            </h2>
            <p className="text-stone text-base max-w-lg mx-auto">
              Les principes qui guident chaque création
            </p>
          </motion.div>

          <motion.div 
            {...staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            {(['val1', 'val2', 'val3'] as const).map((key, i) => {
              const Icon = valueIcons[i];
              return (
                <motion.div
                  key={key}
                  {...staggerChild}
                  className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/80 to-parchment/60 
                    border border-linen/80 backdrop-blur-sm p-8 lg:p-10
                    hover:border-champagne/60 hover:shadow-2xl hover:shadow-champagne/10 
                    hover:-translate-y-2 transition-all duration-500 ease-out"
                >
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-champagne/0 to-champagne/5 
                    group-hover:from-champagne/5 group-hover:to-champagne/10 
                    transition-all duration-500 pointer-events-none" />

                  {/* Number badge */}
                  <span className="absolute top-6 right-6 text-[11px] font-bold text-champagne/25 tracking-widest 
                    group-hover:text-champagne/40 transition-colors duration-300">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* Icon */}
                  <div className="relative w-14 h-14 rounded-2xl gradient-champagne flex items-center justify-center mb-6 
                    shadow-lg shadow-champagne/20 group-hover:shadow-xl group-hover:shadow-champagne/30
                    group-hover:scale-110 transition-all duration-400">
                    <Icon className="w-6 h-6 text-foreground" strokeWidth={1.5} />
                  </div>

                  <h3 className="relative z-10 font-display text-xl text-foreground mb-4">
                    {t(`about.${key}Title`)}
                  </h3>
                  <p className="relative z-10 text-stone text-sm leading-relaxed">
                    {t(`about.${key}`)}
                  </p>

                  {/* Bottom line */}
                  <div className="absolute bottom-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-champagne/20 to-transparent 
                    scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Mission - Full Width Dark */}
      <section className="relative py-32 overflow-hidden" style={{ backgroundColor: 'hsl(var(--deep-navy))' }}>
        {/* Background accents */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, hsla(37,41%,54%,0.08) 0%, transparent 70%)' }}
        />

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 mb-8">
              <Target className="w-5 h-5 text-champagne" />
              <span className="text-champagne text-xs font-semibold tracking-[0.3em] uppercase">Notre Mission</span>
            </div>

            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-primary-foreground mb-8 leading-[1.15]">
              {t('about.mission')}
            </h2>

            <p className="text-stone text-lg md:text-xl leading-relaxed mb-12">
              {t('about.missionText')}
            </p>

            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 gradient-champagne text-foreground 
                text-sm font-semibold tracking-wider uppercase rounded-full 
                hover:shadow-lg hover:shadow-champagne/25 transition-all duration-300 group"
            >
              <span>Contactez-nous</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>

        {/* Bottom decorative elements */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 opacity-30">
          <div className="w-1.5 h-1.5 rounded-full bg-champagne" />
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-champagne to-transparent" />
          <div className="w-1.5 h-1.5 rounded-full bg-champagne" />
        </div>
      </section>
    </>
  );
};

export default About;
