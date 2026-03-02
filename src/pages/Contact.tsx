import { useI18n } from '@/lib/i18n';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Phone, Mail, MapPin } from 'lucide-react';

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  subject: z.string().trim().min(2).max(200),
  message: z.string().trim().min(10).max(2000),
});

type FormData = z.infer<typeof schema>;

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const Contact = () => {
  const { t } = useI18n();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    const msg = `Message depuis le site:\n${data.name}\n${data.email}\n${data.subject}\n${data.message}`;
    const waUrl = `https://wa.me/213553774720?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');
    toast.success('Message envoyé !');
    reset();
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div {...fadeUp} className="text-center mb-16">
          <h1 className="font-display text-4xl md:text-5xl text-foreground mb-3">{t('contact.title')}</h1>
          <p className="text-stone">{t('contact.subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Departments */}
          <motion.div {...fadeUp}>
            <h2 className="font-display text-2xl text-foreground mb-6">{t('contact.departments')}</h2>
            <div className="space-y-4 mb-8">
              {[
                { dept: 'Produits Finis', name: 'KAOUTHAR', phone: '0563 89 21 64' },
                { dept: 'Produits Finis', name: 'FELLA', phone: '0563 91 09 15' },
                { dept: 'Tissus & Branding', name: 'HADJER', phone: '0550 17 06 65' },
                { dept: 'Showroom', name: 'AMIRA', phone: '0553 77 47 20' },
              ].map((a, i) => (
                <div key={i} className="flex items-center gap-3 p-3 border border-linen rounded hover:border-champagne transition-all">
                  <Phone className="w-4 h-4 text-taupe shrink-0" />
                  <div>
                    <p className="text-xs text-stone uppercase tracking-wider">{a.dept}</p>
                    <p className="text-sm text-foreground font-medium">{a.name} — {a.phone}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border border-linen rounded">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-taupe" />
                <span className="text-sm font-medium text-foreground">Showroom</span>
              </div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d204267.72637417932!2d2.9912698!3d36.7525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128fb26977847cd3%3A0x4de0e22484f0f096!2sAlgiers!5e0!3m2!1sfr!2sdz!4v1234567890"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                className="rounded"
              />
            </div>
          </motion.div>

          {/* Form */}
          <motion.div {...fadeUp}>
            <h2 className="font-display text-2xl text-foreground mb-6">{t('contact.form')}</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {[
                { name: 'name' as const, label: t('contact.name') },
                { name: 'email' as const, label: t('contact.email'), type: 'email' },
                { name: 'subject' as const, label: t('contact.subject') },
              ].map((field) => (
                <div key={field.name}>
                  <label className="text-xs font-medium text-stone uppercase tracking-wider mb-1 block">{field.label}</label>
                  <input
                    {...register(field.name)}
                    type={field.type || 'text'}
                    className={`w-full px-4 py-3 bg-parchment border border-linen text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-champagne rounded ${errors[field.name] ? 'border-destructive' : ''}`}
                  />
                </div>
              ))}
              <div>
                <label className="text-xs font-medium text-stone uppercase tracking-wider mb-1 block">{t('contact.message')}</label>
                <textarea
                  {...register('message')}
                  rows={5}
                  className={`w-full px-4 py-3 bg-parchment border border-linen text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-champagne rounded resize-none ${errors.message ? 'border-destructive' : ''}`}
                />
              </div>
              <button
                type="submit"
                className="w-full px-8 py-3 bg-foreground text-background text-sm font-medium tracking-wider uppercase hover:border-champagne border border-transparent transition-all duration-300"
              >
                {t('contact.send')}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
