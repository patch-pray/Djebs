import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import { useI18n } from '@/lib/i18n';

const Layout = ({ children }: { children: ReactNode }) => {
  const { dir } = useI18n();

  return (
    <div dir={dir} className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16 md:pt-20">{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Layout;
