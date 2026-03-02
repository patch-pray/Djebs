import { Link } from 'react-router-dom';
import { useI18n } from '@/lib/i18n';
import { Instagram, Facebook } from 'lucide-react';
import logo from '@/assets/logo.png';

const Footer = () => {
  const { t, dir } = useI18n();

  return (
    <footer className="section-navy py-16" dir={dir}>
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Logo & Tagline */}
          <div className="md:col-span-1">
            <img src={logo} alt="Djeb's" className="h-12 w-auto mb-3 brightness-0 invert" />
            <p className="text-champagne italic font-display text-sm">{t('footer.tagline')}</p>
            <p className="text-champagne italic font-display text-xs mt-0.5">L'élégance au quotidien</p>
          </div>

          {/* Pages */}
          <div>
            <h4 className="text-sm font-semibold tracking-[0.15em] uppercase mb-4 text-primary-foreground">{t('footer.pages')}</h4>
            <ul className="space-y-2">
              {[
                { to: '/', label: t('nav.home') },
                { to: '/products', label: t('nav.products') },
                { to: '/about', label: t('nav.about') },
                { to: '/drops', label: t('nav.drops') },
                { to: '/reseller', label: t('nav.reseller') },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-stone hover:text-champagne transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold tracking-[0.15em] uppercase mb-4 text-primary-foreground">{t('footer.services')}</h4>
            <ul className="space-y-2">
              {[t('services.dtf'), t('services.broderie'), t('services.serigraphie'), t('services.flex'), t('services.autocollants')].map((s) => (
                <li key={s} className="text-sm text-stone">{s}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold tracking-[0.15em] uppercase mb-4 text-primary-foreground">{t('footer.contact')}</h4>
            <div className="space-y-2 text-sm text-stone">
              <p>KAOUTHAR: 0563 89 21 64</p>
              <p>FELLA: 0563 91 09 15</p>
              <p>AMIRA: 0553 77 47 20</p>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-stone hover:text-champagne transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-stone hover:text-champagne transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-stone hover:text-champagne transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.75a8.18 8.18 0 004.76 1.52V6.84a4.84 4.84 0 01-1-.15z"/></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="divider-champagne mb-6" />
        <p className="text-center text-xs text-stone">{t('footer.copyright')}</p>
      </div>
    </footer>
  );
};

export default Footer;
