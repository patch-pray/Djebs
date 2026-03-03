import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '@/lib/i18n';
import { motion } from 'framer-motion';
import { products, type ProductCategory } from '@/lib/data/products';
import { ArrowRight } from 'lucide-react';

const categories: { key: string; value: ProductCategory | 'all' }[] = [
  { key: 'products.all', value: 'all' },
  { key: 'products.pantalon', value: 'pantalon' },
  { key: 'products.sweat', value: 'sweat' },
  { key: 'products.jogger', value: 'jogger' },
  { key: 'products.veste', value: 'veste' },
  { key: 'products.accessoires', value: 'accessoires' },
  { key: 'products.promo', value: 'promo' },
];

const Products = () => {
  const { t, locale } = useI18n();
  const [active, setActive] = useState<ProductCategory | 'all'>('all');

  const filtered = active === 'all'
    ? products
    : active === 'promo'
      ? products.filter((p) => p.isPromo)
      : products.filter((p) => p.category === active);

  return (
    <>
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <h1 className="font-display text-4xl md:text-5xl text-foreground mb-3">{t('products.title')}</h1>
            <p className="text-stone">{t('products.subtitle')}</p>
          </motion.div>

          {/* Filter bar */}
          <div className="bg-linen rounded p-2 flex flex-wrap justify-center gap-1 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActive(cat.value)}
                className={`px-4 py-2 text-xs font-medium tracking-wider uppercase transition-all duration-200 rounded ${
                  active === cat.value
                    ? 'bg-background text-foreground shadow-sm border-b-2 border-champagne'
                    : 'text-stone hover:text-foreground'
                }`}
              >
                {t(cat.key)}
              </button>
            ))}
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((product) => {
              const name = locale === 'ar' ? product.name_ar : locale === 'en' ? product.name_en : product.name_fr;
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Link to={`/products/${product.slug}`} className="group">
                    <div className="border border-linen rounded-2xl overflow-hidden transition-all duration-300 group-hover:border-champagne group-hover:shadow-lg bg-white">
                      <div className="aspect-[3/4] overflow-hidden bg-parchment rounded-t-2xl relative">
                        <img
                          src={product.images[0]}
                          alt={name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        {product.isPromo && (
                          <span className="absolute top-3 left-3 bg-deep-navy text-primary-foreground text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded">
                            Promo
                          </span>
                        )}
                        {product.isDrop && (
                          <span className="absolute top-3 right-3 bg-champagne text-primary-foreground text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded">
                            Drop
                          </span>
                        )}
                      </div>
                      <div className="p-4">
                        <p className="text-xs text-stone uppercase tracking-wider mb-1">{t(`products.${product.category}`)}</p>
                        <h3 className="font-display text-lg text-foreground mb-2">{name}</h3>
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
                        <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="text-xs font-medium text-foreground uppercase tracking-wider flex items-center gap-1">
                            {t('featured.viewDetails')} <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Products;
