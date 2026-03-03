import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useI18n } from '@/lib/i18n';
import { useCartStore } from '@/lib/cart';
import { ShoppingBag, Menu, Globe, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import logo from '@/assets/logo.png';

const localeConfig = [
  { code: 'fr' as const, label: 'FR', flag: '🇫🇷' },
  { code: 'en' as const, label: 'EN', flag: '🇬🇧' },
  { code: 'ar' as const, label: 'عربية', flag: '🇩🇿' },
];

const linkVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.08 * i, duration: 0.3, ease: 'easeOut' as const },
  }),
};

const Navbar = () => {
  const { t, locale, setLocale, dir } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const location = useLocation();
  const totalItems = useCartStore((s) => s.totalItems());

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/products', label: t('nav.products') },
    { to: '/services', label: t('nav.services') },
    { to: '/drops', label: t('nav.drops') },
    { to: '/reseller', label: t('nav.reseller') },
    { to: '/about', label: t('nav.about') },
    { to: '/contact', label: t('nav.contact') },
  ];

  const isRtl = dir === 'rtl';

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background ${
          scrolled ? 'shadow-[0_1px_0_0_hsl(var(--linen))]' : ''
        }`}
        dir={dir}
      >
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img src={logo} alt="Djeb's" className="h-10 md:h-12 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-xs font-medium tracking-[0.15em] uppercase transition-colors duration-200 relative pb-1 ${
                  location.pathname === link.to
                    ? 'text-foreground after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-champagne'
                    : 'text-stone hover:text-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Language switcher (desktop) */}
            <div className="relative hidden lg:block">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 text-xs font-medium text-stone hover:text-foreground transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span>{localeConfig.find((l) => l.code === locale)?.flag}</span>
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="absolute top-full mt-2 bg-background border border-linen rounded shadow-lg py-1 min-w-[120px]"
                    style={{ [isRtl ? 'left' : 'right']: 0 }}
                  >
                    {localeConfig.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => {
                          setLocale(l.code);
                          setLangOpen(false);
                        }}
                        className={`w-full px-4 py-2 text-sm text-start flex items-center gap-2 hover:bg-parchment transition-colors ${
                          locale === l.code
                            ? 'text-foreground font-medium'
                            : 'text-stone'
                        }`}
                      >
                        <span>{l.flag}</span>
                        <span>{l.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Cart (desktop) */}
            <Link
              to="/cart"
              className="relative text-stone hover:text-foreground transition-colors hidden lg:block"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-champagne text-[10px] font-semibold flex items-center justify-center text-primary-foreground">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Cart (mobile — always visible in top bar) */}
            <Link
              to="/cart"
              className="relative text-stone hover:text-foreground transition-colors lg:hidden"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-champagne text-[10px] font-semibold flex items-center justify-center text-primary-foreground">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden text-foreground p-1"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sheet Drawer */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent
          side={isRtl ? 'left' : 'right'}
          className="w-[300px] sm:w-[340px] bg-background p-0 flex flex-col"
          dir={dir}
        >
          {/* Drawer Header */}
          <SheetHeader className="px-6 pt-6 pb-4">
            <SheetTitle className="flex items-center gap-3">
              <img src={logo} alt="Djeb's" className="h-9 w-auto" />
            </SheetTitle>
          </SheetHeader>

          <Separator className="bg-linen" />

          {/* Nav Links */}
          <nav className="flex-1 overflow-y-auto px-4 py-4">
            <ul className="space-y-1">
              {navLinks.map((link, i) => {
                const isActive = location.pathname === link.to;
                return (
                  <motion.li
                    key={link.to}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={linkVariants}
                  >
                    <SheetClose asChild>
                      <Link
                        to={link.to}
                        className={`group flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                          isActive
                            ? 'bg-parchment text-foreground'
                            : 'text-stone hover:bg-parchment/50 hover:text-foreground'
                        }`}
                      >
                        {/* Active accent bar */}
                        <span
                          className={`w-1 h-5 rounded-full transition-all duration-200 ${
                            isActive
                              ? 'bg-champagne'
                              : 'bg-transparent group-hover:bg-linen'
                          }`}
                        />
                        <span
                          className={`flex-1 text-sm tracking-wide uppercase ${
                            isActive ? 'font-semibold' : 'font-medium'
                          }`}
                        >
                          {link.label}
                        </span>
                        <ChevronRight
                          className={`w-4 h-4 transition-all duration-200 ${
                            isActive
                              ? 'text-champagne opacity-100'
                              : 'opacity-0 group-hover:opacity-60'
                          } ${isRtl ? 'rotate-180' : ''}`}
                        />
                      </Link>
                    </SheetClose>
                  </motion.li>
                );
              })}
            </ul>
          </nav>

          <Separator className="bg-linen" />

          {/* Drawer Footer — Language + Cart */}
          <div className="px-6 py-5 space-y-4">
            {/* Language switcher */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.15em] text-stone mb-2 font-medium">
                {locale === 'ar' ? 'اللغة' : locale === 'fr' ? 'Langue' : 'Language'}
              </p>
              <div className="flex gap-2">
                {localeConfig.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setLocale(l.code)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-medium transition-all duration-200 ${
                      locale === l.code
                        ? 'bg-champagne text-primary-foreground'
                        : 'bg-parchment text-stone hover:text-foreground hover:bg-linen'
                    }`}
                  >
                    <span>{l.flag}</span>
                    <span>{l.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Cart link */}
            <SheetClose asChild>
              <Link
                to="/cart"
                className="flex items-center justify-between w-full px-4 py-3 rounded-lg bg-parchment hover:bg-linen transition-colors group"
              >
                <div className="flex items-center gap-3 text-foreground">
                  <ShoppingBag className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    {locale === 'ar' ? 'السلة' : locale === 'fr' ? 'Panier' : 'Cart'}
                  </span>
                </div>
                {totalItems > 0 && (
                  <span className="w-6 h-6 rounded-full bg-champagne text-xs font-semibold flex items-center justify-center text-primary-foreground">
                    {totalItems}
                  </span>
                )}
              </Link>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Navbar;
