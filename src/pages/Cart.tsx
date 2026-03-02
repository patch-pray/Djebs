import { useI18n } from '@/lib/i18n';
import { useCartStore } from '@/lib/cart';
import { motion } from 'framer-motion';
import { Trash2, ShoppingBag, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { locale } = useI18n();
  const { items, removeItem, clearCart } = useCartStore();

  const total = items.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);

  const handleWhatsAppOrder = () => {
    let msg = locale === 'fr'
      ? 'Bonjour, je souhaite passer commande:\n\n'
      : locale === 'ar'
        ? 'مرحباً، أريد تقديم طلب:\n\n'
        : 'Hello, I would like to place an order:\n\n';

    items.forEach((item) => {
      msg += `• ${item.name} — ${item.size} / ${item.color} x${item.quantity}`;
      if (item.price) msg += ` — ${item.price * item.quantity} DA`;
      msg += '\n';
    });

    if (total > 0) msg += `\nTotal: ${total} DA`;

    const waUrl = `https://wa.me/213563892164?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <section className="py-20 bg-background min-h-[60vh]">
      <div className="container mx-auto px-4 md:px-8 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-3xl text-foreground mb-8 flex items-center gap-3">
            <ShoppingBag className="w-7 h-7" />
            {locale === 'fr' ? 'Panier' : locale === 'ar' ? 'السلة' : 'Cart'}
          </h1>

          {items.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-stone mb-4">
                {locale === 'fr' ? 'Votre panier est vide' : locale === 'ar' ? 'سلتك فارغة' : 'Your cart is empty'}
              </p>
              <Link
                to="/products"
                className="inline-block px-6 py-3 border border-foreground text-foreground text-sm uppercase tracking-wider hover:bg-champagne hover:border-champagne hover:text-primary-foreground transition-all"
              >
                {locale === 'fr' ? 'Voir les produits' : locale === 'ar' ? 'عرض المنتجات' : 'View Products'}
              </Link>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-8">
                {items.map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 border border-linen rounded">
                    <img src={item.image} alt={item.name} className="w-16 h-20 object-cover rounded bg-parchment" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display text-foreground text-sm truncate">{item.name}</h3>
                      <p className="text-xs text-stone">{item.size} / {item.color} — x{item.quantity}</p>
                      <p className="text-sm text-taupe font-medium mt-1">
                        {item.price ? `${item.price * item.quantity} DA` : 'Sur demande'}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.productId, item.size, item.color)}
                      className="text-stone hover:text-destructive transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {total > 0 && (
                <div className="flex items-center justify-between p-4 bg-parchment rounded mb-6">
                  <span className="font-display text-lg text-foreground">Total</span>
                  <span className="font-display text-xl text-champagne">{total} DA</span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleWhatsAppOrder}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-foreground text-background text-sm font-medium tracking-wider uppercase transition-all hover:border-champagne border border-transparent"
                >
                  <MessageCircle className="w-4 h-4" />
                  {locale === 'fr' ? 'Commander via WhatsApp' : locale === 'ar' ? 'اطلب عبر واتساب' : 'Order via WhatsApp'}
                </button>
                <button
                  onClick={clearCart}
                  className="px-6 py-3 border border-linen text-stone text-sm font-medium tracking-wider uppercase hover:border-destructive hover:text-destructive transition-all"
                >
                  {locale === 'fr' ? 'Vider' : locale === 'ar' ? 'إفراغ' : 'Clear'}
                </button>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Cart;
