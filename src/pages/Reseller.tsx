import { useI18n } from '@/lib/i18n';
import { motion } from 'framer-motion';
import { CheckCircle2, Phone, ArrowRight, Sparkles, Truck, Shield, Palette, Box, Headphones } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import resellerBg from '@/assets/reseller-bg.jpg';

const schema = z.object({
  fullName: z.string().trim().min(2).max(100),
  shopName: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(8).max(20),
  email: z.string().trim().email().max(255),
  wilaya: z.string().trim().min(1),
  message: z.string().trim().max(1000).optional(),
});

type FormData = z.infer<typeof schema>;

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.6 },
};

const advantages = [
  { key: 'adv1', icon: Sparkles },
  { key: 'adv2', icon: Palette },
  { key: 'adv3', icon: Box },
  { key: 'adv4', icon: Shield },
  { key: 'adv5', icon: Truck },
  { key: 'adv6', icon: Headphones },
] as const;

const agents = [
  { dept: 'produitsFinis', name: 'KAOUTHAR', phone: '0563 89 21 64', wa: '213563892164' },
  { dept: 'produitsFinis', name: 'FELLA', phone: '0563 91 09 15', wa: '213563910915' },
  { dept: 'tissusBranding', name: 'HADJER', phone: '0550 17 06 65', wa: '213550170665' },
  { dept: 'showroom', name: 'AMIRA', phone: '0553 77 47 20', wa: '213553774720' },
];

const Reseller = () => {
  const { t } = useI18n();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    const msg = `Nouvelle demande revendeur:\n${data.fullName}\n${data.shopName}\n${data.phone}\n${data.email}\n${data.wilaya}\n${data.message || ''}`;
    const waUrl = `https://wa.me/213563892164?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');
    toast.success('Demande envoyée !');
    reset();
  };

  return (
    <>
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src={resellerBg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/85 via-foreground/75 to-foreground/90" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block text-champagne text-xs font-medium tracking-[0.3em] uppercase mb-5"
          >
            {t('reseller.subtitle')}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl md:text-6xl text-background mb-5"
          >
            {t('reseller.title')}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <a
              href="#form"
              className="inline-flex items-center gap-2 px-8 py-3 bg-champagne text-foreground text-sm font-semibold tracking-wider uppercase hover:bg-champagne-light transition-all duration-300"
            >
              {t('reseller.cta')} <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Advantages Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div {...fadeUp} className="text-center mb-14">
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-3">
              {t('reseller.advantages')}
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {advantages.map((adv, i) => (
              <motion.div
                key={adv.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative p-7 border border-linen rounded-sm bg-parchment hover:border-champagne transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-full bg-background border border-linen flex items-center justify-center mb-4 group-hover:border-champagne transition-colors">
                  <adv.icon className="w-5 h-5 text-champagne" strokeWidth={1.5} />
                </div>
                <p className="text-foreground text-sm leading-relaxed font-medium">
                  {t(`reseller.${adv.key}`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Agents + Form */}
      <section id="form" className="section-parchment py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            {/* Left: Agents */}
            <motion.div {...fadeUp}>
              <h2 className="font-display text-2xl md:text-3xl text-foreground mb-8">
                {t('reseller.contactTitle')}
              </h2>
              <div className="space-y-4">
                {agents.map((a, i) => (
                  <a
                    key={i}
                    href={`https://wa.me/${a.wa}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-background border border-linen rounded-sm hover:border-champagne transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-full bg-parchment border border-linen flex items-center justify-center group-hover:border-champagne transition-colors">
                      <Phone className="w-4 h-4 text-taupe group-hover:text-champagne transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-stone uppercase tracking-wider">{t(`reseller.${a.dept}`)}</p>
                      <p className="text-sm text-foreground font-semibold">{a.name}</p>
                    </div>
                    <span className="text-sm text-stone font-medium tabular-nums">{a.phone}</span>
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div {...fadeUp}>
              <h2 className="font-display text-2xl md:text-3xl text-foreground mb-8">
                {t('reseller.formTitle')}
              </h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {[
                  { name: 'fullName' as const, label: t('reseller.fullName') },
                  { name: 'shopName' as const, label: t('reseller.shopName') },
                  { name: 'phone' as const, label: t('reseller.phone') },
                  { name: 'email' as const, label: t('reseller.email'), type: 'email' },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="text-xs font-medium text-stone uppercase tracking-wider mb-2 block">
                      {field.label}
                    </label>
                    <input
                      {...register(field.name)}
                      type={field.type || 'text'}
                      className={`w-full px-4 py-3.5 bg-background border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-champagne/30 focus:border-champagne rounded-sm transition-all duration-200 ${
                        errors[field.name] ? 'border-destructive' : 'border-linen'
                      }`}
                    />
                  </div>
                ))}

                <div>
                  <label className="text-xs font-medium text-stone uppercase tracking-wider mb-2 block">
                    {t('reseller.wilaya')}
                  </label>
                  <select
                    {...register('wilaya')}
                    className="w-full px-4 py-3.5 bg-background border border-linen text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-champagne/30 focus:border-champagne rounded-sm transition-all duration-200"
                  >
                    <option value="">--</option>
                    {Array.from({ length: 58 }, (_, i) => (
                      <option key={i + 1} value={`${i + 1}`}>{`${String(i + 1).padStart(2, '0')} - Wilaya ${i + 1}`}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-stone uppercase tracking-wider mb-2 block">
                    {t('reseller.message')}
                  </label>
                  <textarea
                    {...register('message')}
                    rows={4}
                    className="w-full px-4 py-3.5 bg-background border border-linen text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-champagne/30 focus:border-champagne rounded-sm resize-none transition-all duration-200"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-foreground text-background text-sm font-semibold tracking-wider uppercase hover:bg-champagne hover:text-foreground border border-transparent transition-all duration-300"
                >
                  {t('reseller.submit')}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Reseller;
