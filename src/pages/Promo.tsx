import { useI18n } from '@/lib/i18n';
import { motion } from 'framer-motion';
import { getPromoProducts } from '@/lib/data/products';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Promo = () => {
  const { t, locale } = useI18n();
  const promoProducts = getPromoProducts();

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-display text-4xl md:text-5xl text-foreground mb-3">{t('promoPage.title')}</h1>
          <p className="text-stone">{t('promoPage.subtitle')}</p>
        </motion.div>

        {promoProducts.length === 0 ? (
          <p className="text-center text-stone">
            {locale === 'fr' ? 'Aucune promotion en cours.' : locale === 'ar' ? 'لا توجد عروض حالياً.' : 'No promotions currently.'}
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {promoProducts.map((p) => {
              const name = locale === 'ar' ? p.name_ar : locale === 'en' ? p.name_en : p.name_fr;
              return (
                <Link key={p.id} to={`/products/${p.slug}`} className="group">
                  <div className="border border-linen rounded overflow-hidden group-hover:border-champagne transition-all relative">
                    <div className="aspect-[3/4] overflow-hidden bg-parchment relative">
                      <img src={p.images[0]} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                      <span className="absolute top-3 left-3 bg-deep-navy text-primary-foreground text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded">
                        Promo
                      </span>
                      <span className="absolute top-3 right-3 text-champagne italic font-display text-sm">
                        {t('promoPage.limited')}
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-display text-lg text-foreground mb-2">{name}</h3>
                      <p className="text-sm">
                        <span className="line-through text-stone mr-2">{p.price} DA</span>
                        <span className="text-champagne font-medium">{p.promoPrice} DA</span>
                      </p>
                      <span className="mt-2 text-xs text-foreground uppercase tracking-wider flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {t('featured.viewDetails')} <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Promo;
