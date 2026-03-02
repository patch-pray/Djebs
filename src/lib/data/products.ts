import joggerCream from '@/assets/products/jogger-cream.jpg';
import sweatCharcoal from '@/assets/products/sweat-charcoal.jpg';
import vesteBeige from '@/assets/products/veste-beige.jpg';
import pantalonNavy from '@/assets/products/pantalon-navy.jpg';
import pullOlive from '@/assets/products/pull-olive.jpg';
import sacocheTan from '@/assets/products/sacoche-tan.jpg';

export type ProductCategory = 'pantalon' | 'sweat' | 'jogger' | 'veste' | 'accessoires' | 'promo';

export interface Product {
  id: string;
  slug: string;
  name_fr: string;
  name_en: string;
  name_ar: string;
  description_fr: string;
  description_en: string;
  description_ar: string;
  category: ProductCategory;
  images: string[];
  price: number | null;
  sizes: string[];
  colors: string[];
  isPromo: boolean;
  isDrop: boolean;
  promoPrice?: number;
}

export const products: Product[] = [
  {
    id: '1',
    slug: 'jogger-premium-cream',
    name_fr: 'Jogger Premium Crème',
    name_en: 'Premium Cream Jogger',
    name_ar: 'جوغر بريميوم كريم',
    description_fr: 'Jogger confortable en tissu premium, coupe ajustée avec finitions soignées.',
    description_en: 'Comfortable premium fabric jogger, tailored fit with fine finishing.',
    description_ar: 'جوغر مريح من قماش فاخر، قصة مناسبة مع تشطيبات أنيقة.',
    category: 'jogger',
    images: [joggerCream],
    price: 3500,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Crème', 'Noir', 'Gris'],
    isPromo: false,
    isDrop: false,
  },
  {
    id: '2',
    slug: 'sweat-charcoal-classic',
    name_fr: 'Sweat-shirt Charcoal Classic',
    name_en: 'Classic Charcoal Sweatshirt',
    name_ar: 'سويت شيرت فحمي كلاسيك',
    description_fr: 'Sweat-shirt en coton épais, coupe oversize tendance avec capuche.',
    description_en: 'Thick cotton sweatshirt, trendy oversized fit with hood.',
    description_ar: 'سويت شيرت من القطن السميك، قصة أوفر سايز عصرية مع غطاء رأس.',
    category: 'sweat',
    images: [sweatCharcoal],
    price: 4200,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Charcoal', 'Noir'],
    isPromo: false,
    isDrop: true,
  },
  {
    id: '3',
    slug: 'veste-bomber-beige',
    name_fr: 'Veste Bomber Beige',
    name_en: 'Beige Bomber Jacket',
    name_ar: 'جاكيت بومبر بيج',
    description_fr: 'Veste bomber légère en tissu déperlant, parfaite pour la mi-saison.',
    description_en: 'Light water-repellent bomber jacket, perfect for mid-season.',
    description_ar: 'جاكيت بومبر خفيف من قماش مقاوم للماء، مثالي لمنتصف الموسم.',
    category: 'veste',
    images: [vesteBeige],
    price: 5800,
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['Beige', 'Kaki'],
    isPromo: false,
    isDrop: false,
  },
  {
    id: '4',
    slug: 'pantalon-cargo-navy',
    name_fr: 'Pantalon Cargo Navy',
    name_en: 'Navy Cargo Pants',
    name_ar: 'بنطلون كارغو نافي',
    description_fr: 'Pantalon cargo en coton résistant avec poches latérales.',
    description_en: 'Durable cotton cargo pants with side pockets.',
    description_ar: 'بنطلون كارغو من القطن المتين مع جيوب جانبية.',
    category: 'pantalon',
    images: [pantalonNavy],
    price: 3800,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Navy', 'Noir', 'Kaki'],
    isPromo: true,
    isDrop: false,
    promoPrice: 2900,
  },
  {
    id: '5',
    slug: 'pull-olive-premium',
    name_fr: 'Pull Olive Premium',
    name_en: 'Premium Olive Pullover',
    name_ar: 'بلوفر زيتوني فاخر',
    description_fr: 'Pull en maille épaisse, chaleureux et élégant pour les journées fraîches.',
    description_en: 'Thick knit pullover, warm and elegant for cool days.',
    description_ar: 'بلوفر من التريكو السميك، دافئ وأنيق للأيام الباردة.',
    category: 'sweat',
    images: [pullOlive],
    price: null,
    sizes: ['M', 'L', 'XL'],
    colors: ['Olive', 'Bordeaux'],
    isPromo: false,
    isDrop: false,
  },
  {
    id: '6',
    slug: 'sacoche-tan-cuir',
    name_fr: 'Sacoche Tan Cuir',
    name_en: 'Tan Leather Crossbody',
    name_ar: 'حقيبة كروس بودي جلد',
    description_fr: 'Sacoche en cuir synthétique premium, design minimaliste et pratique.',
    description_en: 'Premium synthetic leather crossbody bag, minimalist and practical design.',
    description_ar: 'حقيبة كروس بودي من الجلد الصناعي الفاخر، تصميم بسيط وعملي.',
    category: 'accessoires',
    images: [sacocheTan],
    price: 2500,
    sizes: ['Unique'],
    colors: ['Tan', 'Noir'],
    isPromo: false,
    isDrop: true,
  },
];

export const getProductBySlug = (slug: string) => products.find(p => p.slug === slug);
export const getProductsByCategory = (cat: ProductCategory) => products.filter(p => p.category === cat);
export const getFeaturedProducts = () => products.slice(0, 3);
export const getPromoProducts = () => products.filter(p => p.isPromo);
export const getDropProducts = () => products.filter(p => p.isDrop);
