import { useI18n } from '@/lib/i18n';
import { motion } from 'framer-motion';
import {
  CheckCircle2, Phone, ArrowRight, Sparkles, Truck,
  Shield, Palette, Box, Headphones, MessageCircle,
} from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import resellerBg from '@/assets/reseller-bg.jpg';

/* ── Schema ─────────────────────────────────────────── */
const schema = z.object({
  fullName: z.string().trim().min(2).max(100),
  shopName: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(8).max(20),
  email: z.string().trim().email().max(255),
  wilaya: z.string().trim().min(1),
  message: z.string().trim().max(1000).optional(),
});

type FormData = z.infer<typeof schema>;

/* ── Animation helpers ──────────────────────────────── */
const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true, margin: '-40px' },
};

const staggerChild = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

/* ── Data ───────────────────────────────────────────── */
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

/* ── Component ──────────────────────────────────────── */
const Reseller = () => {
  const { t } = useI18n();
  const { register, handleSubmit, formState: { errors }, reset, control } = useForm<FormData>({
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
      {/* ═══════════ HERO ═══════════ */}
      <section className="relative py-36 md:py-44 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img src={resellerBg} alt="" className="w-full h-full object-cover scale-105" />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/90 via-foreground/75 to-foreground/95" />
        </div>

        {/* Decorative radial glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse, hsla(37,41%,54%,0.15) 0%, transparent 70%)',
          }}
        />

        <div className="container mx-auto px-4 relative z-10 text-center">
          {/* Animated pill badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2 mb-7 rounded-full glass-card-dark"
          >
            <Sparkles className="w-3.5 h-3.5 text-champagne" />
            <span className="text-champagne text-xs font-medium tracking-[0.25em] uppercase">
              {t('reseller.subtitle')}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-display text-4xl sm:text-5xl md:text-7xl text-background mb-6 leading-[1.1]"
          >
            {t('reseller.title')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-background/70 text-sm md:text-base max-w-md mx-auto mb-9"
          >
            {t('reseller.subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <a
              href="#form"
              className="shimmer-btn inline-flex items-center gap-2.5 px-9 py-4 gradient-champagne text-foreground text-sm font-semibold tracking-wider uppercase rounded-full hover:shadow-lg hover:shadow-champagne/25 transition-all duration-300"
            >
              {t('reseller.cta')} <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>

        {/* Bottom fade to content */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* ═══════════ ADVANTAGES BENTO GRID ═══════════ */}
      <section className="py-28 bg-background relative overflow-hidden">
        {/* Subtle background pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* Decorative floating orbs */}
        <div
          className="absolute top-20 -left-32 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, hsla(37,41%,54%,0.08) 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-10 -right-20 w-[300px] h-[300px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, hsla(37,41%,54%,0.06) 0%, transparent 70%)' }}
        />

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <motion.div {...fadeUp} className="text-center mb-20">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-champagne/10 text-champagne text-xs font-semibold tracking-[0.2em] uppercase mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              {t('reseller.subtitle')}
            </span>
            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl text-foreground mb-5">
              {t('reseller.advantages')}
            </h2>
            <p className="text-stone text-sm md:text-base max-w-lg mx-auto">
              Des avantages exclusifs pour nos partenaires revendeurs
            </p>
            <div className="divider-champagne mt-8" />
          </motion.div>

          {/* Modern Bento Grid */}
          <motion.div
            {...staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto"
          >
            {advantages.map((adv, i) => {
              const Icon = adv.icon;
              // First two cards span full width on larger screens for variety
              const isFeature = i === 0 || i === 1;
              return (
                <motion.div
                  key={adv.key}
                  {...staggerChild}
                  className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/80 to-parchment/60 
                    border border-linen/80 backdrop-blur-sm
                    hover:border-champagne/60 hover:shadow-2xl hover:shadow-champagne/15 
                    hover:-translate-y-2 transition-all duration-500 ease-out cursor-default
                    ${isFeature ? 'lg:col-span-1 p-8 min-h-[220px]' : 'p-7 min-h-[200px]'}`}
                >
                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-champagne/0 via-champagne/0 to-champagne/5 
                    group-hover:from-champagne/5 group-hover:via-transparent group-hover:to-champagne/10 
                    transition-all duration-500 pointer-events-none" />

                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-champagne/10 to-transparent 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-full" />

                  {/* Numbered badge */}
                  <span className="absolute top-5 right-6 text-[11px] font-bold text-champagne/25 tracking-widest 
                    group-hover:text-champagne/40 transition-colors duration-300">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* Icon container with animated glow */}
                  <div className="relative w-14 h-14 rounded-2xl gradient-champagne flex items-center justify-center mb-6 
                    shadow-lg shadow-champagne/20 group-hover:shadow-xl group-hover:shadow-champagne/30
                    group-hover:scale-110 transition-all duration-400">
                    <Icon className="w-6 h-6 text-foreground" strokeWidth={1.5} />
                    {/* Pulse ring on hover */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-champagne/30 scale-100 opacity-0 
                      group-hover:scale-125 group-hover:opacity-0 transition-all duration-700 
                      group-hover:animate-pulse" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <p className="text-foreground text-[15px] leading-relaxed font-medium pr-8 
                      group-hover:text-foreground/90 transition-colors duration-300">
                      {t(`reseller.${adv.key}`)}
                    </p>
                  </div>

                  {/* Bottom decorative line */}
                  <div className="absolute bottom-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-champagne/20 to-transparent 
                    scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
                </motion.div>
              );
            })}
          </motion.div>

          {/* Bottom CTA hint */}
          <motion.div 
            {...fadeUp} 
            className="text-center mt-16"
          >
            <a
              href="#form"
              className="inline-flex items-center gap-2 text-champagne text-sm font-medium hover:gap-3 transition-all duration-300"
            >
              <span>Rejoignez notre réseau</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ AGENTS + FORM ═══════════ */}
      <section id="form" className="py-24 relative overflow-hidden" style={{ backgroundColor: 'hsl(var(--parchment))' }}>
        {/* Decorative glow orb */}
        <div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, hsla(37,41%,54%,0.08) 0%, transparent 70%)',
          }}
        />

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">

            {/* ── Left: Agents ── */}
            <motion.div {...fadeUp}>
              <span className="inline-block text-champagne text-xs font-medium tracking-[0.25em] uppercase mb-3">
                WhatsApp
              </span>
              <h2 className="font-display text-2xl md:text-4xl text-foreground mb-3">
                {t('reseller.contactTitle')}
              </h2>
              <p className="text-stone text-sm mb-8 max-w-sm">
                {t('reseller.subtitle')}
              </p>

              <div className="space-y-3">
                {agents.map((a, i) => (
                  <motion.a
                    key={i}
                    href={`https://wa.me/${a.wa}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="flex items-center gap-4 p-4 bg-background rounded-xl border border-linen
                      hover:border-champagne hover:shadow-lg hover:shadow-champagne/8
                      transition-all duration-300 group"
                  >
                    {/* Avatar-style icon */}
                    <div className="w-11 h-11 rounded-full gradient-champagne flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                      <Phone className="w-4 h-4 text-foreground" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] text-stone uppercase tracking-[0.2em] mb-0.5">
                        {t(`reseller.${a.dept}`)}
                      </p>
                      <p className="text-sm text-foreground font-semibold">{a.name}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm text-stone font-medium tabular-nums hidden sm:block">
                        {a.phone}
                      </span>
                      <MessageCircle className="w-4 h-4 text-green-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* ── Right: Form ── */}
            <motion.div {...fadeUp}>
              <span className="inline-block text-champagne text-xs font-medium tracking-[0.25em] uppercase mb-3">
                {t('reseller.cta')}
              </span>
              <h2 className="font-display text-2xl md:text-4xl text-foreground mb-8">
                {t('reseller.formTitle')}
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Name fields row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-stone uppercase tracking-wider mb-2 block">
                      {t('reseller.fullName')}
                    </label>
                    <Input
                      {...register('fullName')}
                      className={`h-12 rounded-xl bg-background border-linen focus-visible:ring-champagne/30 focus-visible:border-champagne ${
                        errors.fullName ? 'border-destructive' : ''
                      }`}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-stone uppercase tracking-wider mb-2 block">
                      {t('reseller.shopName')}
                    </label>
                    <Input
                      {...register('shopName')}
                      className={`h-12 rounded-xl bg-background border-linen focus-visible:ring-champagne/30 focus-visible:border-champagne ${
                        errors.shopName ? 'border-destructive' : ''
                      }`}
                    />
                  </div>
                </div>

                {/* Phone & Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-stone uppercase tracking-wider mb-2 block">
                      {t('reseller.phone')}
                    </label>
                    <Input
                      {...register('phone')}
                      className={`h-12 rounded-xl bg-background border-linen focus-visible:ring-champagne/30 focus-visible:border-champagne ${
                        errors.phone ? 'border-destructive' : ''
                      }`}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-stone uppercase tracking-wider mb-2 block">
                      {t('reseller.email')}
                    </label>
                    <Input
                      {...register('email')}
                      type="email"
                      className={`h-12 rounded-xl bg-background border-linen focus-visible:ring-champagne/30 focus-visible:border-champagne ${
                        errors.email ? 'border-destructive' : ''
                      }`}
                    />
                  </div>
                </div>

                {/* Wilaya select */}
                <div>
                  <label className="text-xs font-medium text-stone uppercase tracking-wider mb-2 block">
                    {t('reseller.wilaya')}
                  </label>
                  <Controller
                    name="wilaya"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="h-12 rounded-xl bg-background border-linen focus:ring-champagne/30 focus:border-champagne">
                          <SelectValue placeholder="--" />
                        </SelectTrigger>
                        <SelectContent className="max-h-60">
                          {Array.from({ length: 58 }, (_, i) => (
                            <SelectItem key={i + 1} value={`${i + 1}`}>
                              {`${String(i + 1).padStart(2, '0')} - Wilaya ${i + 1}`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                {/* Message textarea */}
                <div>
                  <label className="text-xs font-medium text-stone uppercase tracking-wider mb-2 block">
                    {t('reseller.message')}
                  </label>
                  <Textarea
                    {...register('message')}
                    rows={4}
                    className="rounded-xl bg-background border-linen resize-none focus-visible:ring-champagne/30 focus-visible:border-champagne"
                  />
                </div>

                {/* Submit button */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-14 shimmer-btn gradient-champagne text-foreground text-sm font-semibold tracking-wider uppercase rounded-xl border-0 hover:shadow-lg hover:shadow-champagne/25 hover:scale-[1.01] transition-all duration-300"
                >
                  {t('reseller.submit')}
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Reseller;
