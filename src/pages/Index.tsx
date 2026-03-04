import { Link } from 'react-router-dom';
import { useI18n } from '@/lib/i18n';
import { motion } from 'framer-motion';
import { Printer, Scissors, Star, Layers, Sticker, CheckCircle2, ArrowRight } from 'lucide-react';
import { getFeaturedProducts, type Product } from '@/lib/data/products';
import heroImage from '@/assets/hero-atelier.jpg';
import resellerBg from '@/assets/reseller-bg.jpg';
import notreHistoireImage from '@/assets/notre-histoire.jpg';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6 },
};

const serviceIcons = [
  { icon: Printer, key: 'dtf' },
  { icon: Star, key: 'broderie' },
  { icon: Layers, key: 'serigraphie' },
  { icon: Scissors, key: 'flex' },
  { icon: Sticker, key: 'autocollants' },
];

const ProductCard = ({ product }: { product: Product }) => {
  const { locale, t } = useI18n();
  const name = locale === 'ar' ? product.name_ar : locale === 'en' ? product.name_en : product.name_fr;
  const categoryKey = `products.${product.category}`;

  return (
    <Link to={`/products/${product.slug}`} className="group">
      <div className="border border-linen rounded-2xl overflow-hidden transition-all duration-300 group-hover:border-champagne group-hover:shadow-lg bg-white">
        <div className="aspect-[3/4] overflow-hidden bg-parchment rounded-t-2xl">
          <img
            src={product.images[0]}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="p-4">
          <p className="text-xs text-stone uppercase tracking-wider mb-1">{t(categoryKey)}</p>
          <h3 className="font-display text-lg text-foreground mb-2">{name}</h3>
          <div className="flex items-center justify-between">
            <p className="text-sm text-taupe font-medium">
              {product.isPromo && product.promoPrice ? (
                <>
                  <span className="line-through text-stone mr-2">{product.price} DA</span>
                  <span className="text-champagne">{product.promoPrice} DA</span>
                </>
              ) : product.price ? (
                `${product.price} DA`
              ) : (
                t('featured.onRequest')
              )}
            </p>
          </div>
          <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-xs font-medium text-foreground uppercase tracking-wider flex items-center gap-1">
              {t('featured.viewDetails')} <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

const Index = () => {
  const { t } = useI18n();
  const featured = getFeaturedProducts();

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Atelier" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/60" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-semibold text-foreground leading-tight mb-4"
          >
            {t('hero.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display italic text-lg md:text-xl text-stone mb-8"
          >
            {t('hero.subtitle')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/products"
              className="px-8 py-3 bg-foreground text-background text-sm font-medium tracking-wider uppercase hover:border-champagne border border-transparent transition-all duration-300"
            >
              {t('hero.cta1')}
            </Link>
            <Link
              to="/services"
              className="px-8 py-3 bg-transparent text-foreground text-sm font-medium tracking-wider uppercase border border-foreground hover:bg-champagne hover:border-champagne hover:text-primary-foreground transition-all duration-300"
            >
              {t('hero.cta2')}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Gold Divider */}
      <div className="py-6">
        <div className="divider-champagne" />
      </div>

      {/* Services Scrolling Banner */}
      <section className="py-10 bg-background overflow-hidden">
        <div className="relative">
          <div className="flex animate-scroll w-max">
            {[...serviceIcons, ...serviceIcons, ...serviceIcons].map((svc, i) => (
              <div key={`${svc.key}-${i}`} className="flex flex-col items-center gap-3 px-10 md:px-14">
                <div className="w-14 h-14 rounded-full border border-linen bg-parchment flex items-center justify-center group-hover:border-champagne transition-colors duration-300">
                  <svc.icon className="w-7 h-7 text-taupe" strokeWidth={1.2} />
                </div>
                <span className="text-[11px] font-medium text-stone tracking-[0.15em] uppercase whitespace-nowrap">
                  {t(`services.${svc.key}`)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notre Histoire */}
      <section className="relative overflow-hidden bg-background">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px] lg:min-h-[700px]">
          {/* Image Side - Full bleed */}
          <motion.div 
            {...fadeUp} 
            className="relative overflow-hidden group"
          >
            <img
              src={notreHistoireImage}
              alt="Notre Histoire"
              className="w-full h-full min-h-[450px] object-cover transition-transform duration-1000 
                group-hover:scale-105"
              loading="lazy"
            />
            
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-background/30 
              lg:to-background/50 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 via-transparent to-transparent 
              pointer-events-none" />
          </motion.div>

          {/* Content Side */}
          <motion.div 
            {...fadeUp} 
            className="relative flex flex-col justify-center px-8 md:px-12 lg:px-20 xl:px-28 py-16 lg:py-24"
            style={{ backgroundColor: 'hsl(var(--parchment))' }}
          >
            {/* Background subtle pattern */}
            <div
              className="absolute inset-0 opacity-[0.02] pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)',
                backgroundSize: '24px 24px',
              }}
            />

            {/* Decorative vertical line */}
            <div className="absolute left-0 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-champagne/40 to-transparent 
              hidden lg:block" />

            <div className="relative z-10 max-w-xl">
              {/* Section label */}
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-3 text-champagne text-xs font-semibold 
                  tracking-[0.3em] uppercase mb-8"
              >
                <span className="w-10 h-px bg-champagne" />
                Notre Atelier
              </motion.span>

              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-10 leading-[1.1]">
                {t('histoire.title')}
              </h2>

              <div className="space-y-6 mb-10">
                <p className="text-stone leading-[2] text-base lg:text-lg">
                  {t('histoire.p1')}
                </p>
                <p className="text-stone leading-[2] text-base lg:text-lg">
                  {t('histoire.p2')}
                </p>
              </div>

              {/* CTA Link */}
              <Link
                to="/about"
                className="inline-flex items-center gap-3 text-foreground text-sm font-medium tracking-wider 
                  uppercase group/link hover:text-champagne transition-colors duration-300"
              >
                <span>En savoir plus</span>
                <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>

            {/* Bottom decorative element */}
            <div className="absolute bottom-12 right-12 hidden lg:flex items-center gap-2 opacity-30">
              <div className="w-2 h-2 rounded-full bg-champagne" />
              <div className="w-4 h-4 rounded-full border border-champagne" />
              <div className="w-6 h-6 rounded-full border border-champagne/50" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-3">
              {t('featured.title')}
            </h2>
            <p className="text-stone">{t('featured.subtitle')}</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
            {featured.map((p) => (
              <motion.div key={p.id} {...fadeUp}>
                <ProductCard product={p} />
              </motion.div>
            ))}
          </div>
          <div className="text-center">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-8 py-3 border border-foreground text-foreground text-sm font-medium tracking-wider uppercase hover:bg-champagne hover:border-champagne hover:text-primary-foreground transition-all duration-300"
            >
              {t('featured.viewAll')} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* DROP Section */}
      <section className="section-navy py-24">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <motion.div {...fadeUp}>
            <h2 className="font-display text-5xl md:text-7xl font-bold text-primary-foreground mb-4 tracking-tight">
              {t('drop.title')}
            </h2>
            <p className="text-lg text-stone mb-8">{t('drop.subtitle')}</p>
            <Link
              to="/drops"
              className="inline-block px-8 py-3 border border-champagne text-champagne text-sm font-medium tracking-wider uppercase hover:bg-champagne hover:text-primary-foreground transition-all duration-300"
            >
              {t('drop.cta')}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Reseller CTA */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src={resellerBg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/80 to-foreground/70" />
        </div>
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div {...fadeUp}>
              <span className="inline-block text-champagne text-xs font-medium tracking-[0.3em] uppercase mb-4">
                {t('reseller.subtitle')}
              </span>
              <h2 className="font-display text-4xl md:text-6xl text-background mb-12 leading-tight">
                {t('reseller.title')}
              </h2>
            </motion.div>
            <motion.div {...fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-5 max-w-2xl mx-auto mb-14 text-left">
              {(['adv1', 'adv2', 'adv3', 'adv4', 'adv5', 'adv6'] as const).map((key) => (
                <li key={key} className="flex items-start gap-3 list-none">
                  <CheckCircle2 className="w-5 h-5 text-champagne shrink-0 mt-0.5" />
                  <span className="text-background/85 text-sm leading-relaxed">{t(`reseller.${key}`)}</span>
                </li>
              ))}
            </motion.div>
            <motion.div {...fadeUp}>
              <Link
                to="/reseller"
                className="inline-block px-12 py-4 bg-champagne text-foreground text-sm font-semibold tracking-wider uppercase hover:bg-champagne-light transition-all duration-300 shadow-lg shadow-champagne/20"
              >
                {t('reseller.cta')}
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
