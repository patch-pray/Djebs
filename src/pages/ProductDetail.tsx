import { useParams, Link } from 'react-router-dom';
import { useI18n } from '@/lib/i18n';
import { getProductBySlug, products } from '@/lib/data/products';
import { useCartStore } from '@/lib/cart';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';

const ProductDetail = () => {
  const { slug } = useParams();
  const { t, locale } = useI18n();
  const product = getProductBySlug(slug || '');
  const addItem = useCartStore((s) => s.addItem);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  if (!product) {
    return (
      <div className="py-32 text-center">
        <h1 className="font-display text-3xl text-foreground mb-4">Product not found</h1>
        <Link to="/products" className="text-champagne underline">← {t('featured.viewAll')}</Link>
      </div>
    );
  }

  const name = locale === 'ar' ? product.name_ar : locale === 'en' ? product.name_en : product.name_fr;
  const description = locale === 'ar' ? product.description_ar : locale === 'en' ? product.description_en : product.description_fr;

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error(locale === 'fr' ? 'Veuillez sélectionner une taille et une couleur' : locale === 'ar' ? 'يرجى اختيار المقاس واللون' : 'Please select a size and color');
      return;
    }
    addItem({
      productId: product.id,
      name,
      price: product.isPromo && product.promoPrice ? product.promoPrice : product.price,
      size: selectedSize,
      color: selectedColor,
      quantity: 1,
      image: product.images[0],
    });
    toast.success(locale === 'fr' ? 'Ajouté au panier' : locale === 'ar' ? 'تمت الإضافة إلى السلة' : 'Added to cart');
  };

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <Link to="/products" className="inline-flex items-center gap-2 text-sm text-stone hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> {t('products.title')}
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="aspect-[3/4] overflow-hidden rounded bg-parchment"
          >
            <img src={product.images[0]} alt={name} className="w-full h-full object-cover" />
          </motion.div>

          {/* Details */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <p className="text-xs text-stone uppercase tracking-wider mb-2">{t(`products.${product.category}`)}</p>
            <h1 className="font-display text-3xl md:text-4xl text-foreground mb-4">{name}</h1>

            <div className="divider-champagne !mx-0 !w-12 mb-6" />

            <p className="text-stone leading-relaxed mb-6">{description}</p>

            <p className="text-2xl font-display text-foreground mb-8">
              {product.isPromo && product.promoPrice ? (
                <>
                  <span className="line-through text-stone text-lg mr-3">{product.price} DA</span>
                  <span className="text-champagne">{product.promoPrice} DA</span>
                </>
              ) : product.price ? (
                `${product.price} DA`
              ) : (
                <span className="text-taupe">{t('featured.onRequest')}</span>
              )}
            </p>

            {/* Size selector */}
            <div className="mb-6">
              <p className="text-xs font-medium text-stone uppercase tracking-wider mb-3">Taille</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border text-sm transition-all ${
                      selectedSize === size
                        ? 'border-champagne bg-champagne text-primary-foreground'
                        : 'border-linen text-stone hover:border-foreground'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color selector */}
            <div className="mb-8">
              <p className="text-xs font-medium text-stone uppercase tracking-wider mb-3">Couleur</p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 border text-sm transition-all ${
                      selectedColor === color
                        ? 'border-champagne bg-champagne text-primary-foreground'
                        : 'border-linen text-stone hover:border-foreground'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-foreground text-background text-sm font-medium tracking-wider uppercase hover:border-champagne border border-transparent transition-all duration-300"
            >
              <ShoppingBag className="w-4 h-4" />
              {locale === 'fr' ? 'Ajouter au Panier' : locale === 'ar' ? 'إضافة إلى السلة' : 'Add to Cart'}
            </button>
          </motion.div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-20">
            <div className="divider-champagne mb-10" />
            <h2 className="font-display text-2xl text-foreground mb-8 text-center">
              {locale === 'fr' ? 'Produits similaires' : locale === 'ar' ? 'منتجات مشابهة' : 'Related Products'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {related.map((p) => {
                const n = locale === 'ar' ? p.name_ar : locale === 'en' ? p.name_en : p.name_fr;
                return (
                  <Link key={p.id} to={`/products/${p.slug}`} className="group">
                    <div className="border border-linen rounded overflow-hidden group-hover:border-champagne transition-all">
                      <div className="aspect-[3/4] overflow-hidden bg-parchment">
                        <img src={p.images[0]} alt={n} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-display text-foreground">{n}</h3>
                        <p className="text-sm text-taupe">{p.price ? `${p.price} DA` : t('featured.onRequest')}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductDetail;
