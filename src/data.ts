import { FeatureItem, InsideCategory, PreviewPage, Testimonial, BonusItem, FAQItem } from './types';

export const FEATURES: FeatureItem[] = [
  {
    id: 'feat_1',
    title: 'Baby Profile & Essential Bio',
    description: 'Keep critical info—like birth details, emergency keys, allergies, blood type, and pediatrician contacts—instantly accessible.',
    iconName: 'UserCheck',
    badge: 'Core Bio'
  },
  {
    id: 'feat_2',
    title: 'Daily Feeding Tracker',
    description: 'Track breast milk duration, formula fluid ounces, pumping sessions, and solid food introductions seamlessly day-to-day.',
    iconName: 'Milk',
    badge: 'Popular'
  },
  {
    id: 'feat_3',
    title: 'Sleep & Diaper Logbooks',
    description: 'Understand comfort and diaper patterns. Plot naps, sleep duration quality, diaper consistency, and tummy-time progressions.',
    iconName: 'MoonStar',
  },
  {
    id: 'feat_4',
    title: 'Growth & Height Tracker',
    description: 'Chart weight, heights, head circumferences, and growth percentiles from newborns up to five-year-olds with neat checkups.',
    iconName: 'Ruler',
  },
  {
    id: 'feat_5',
    title: 'Vaccination & Wellness Records',
    description: 'Keep on top of pediatric health. Logs childhood immunizations schedule and lists pediatric check-ins in one handy index.',
    iconName: 'HeartPulse',
    badge: 'Crucial'
  },
  {
    id: 'feat_6',
    title: 'Baby Shower Event Planner',
    description: 'Organise theme layouts, registries, budget constraints, guest RSVPs, seating schedules, and a dedicated gratitude gift log.',
    iconName: 'Sparkles',
  },
  {
    id: 'feat_7',
    title: 'Memory Book & Keepsakes',
    description: 'Preserve first words, belly laughs, first steps, holidays, sweet photos, hospital anklet captures, and keepsake moments.',
    iconName: 'BookHeart',
    badge: 'Keepsake'
  },
  {
    id: 'feat_8',
    title: 'Mother Wellness & Self-Care',
    description: 'Track hydration, nutritional intake, mental space states, postpartum rest, medical checkups, and gentle exercise records.',
    iconName: 'Activity',
  },
  {
    id: 'feat_9',
    title: 'Budget & Family Expense Log',
    description: 'Estimate gear, diapers, medicines, nurseries, clothes, and babysitter budgets to manage household expenses efficiently.',
    iconName: 'PiggyBank',
  },
  {
    id: 'feat_10',
    title: 'Emergency Medical Contacts',
    description: 'Dedicated emergency medical directory with phone lines for pediatricians, hospitals, poison controls, and babysisters.',
    iconName: 'ShieldAlert',
    badge: 'Safety'
  },
];

export const CATEGORIES: InsideCategory[] = [
  { id: 'cat_1', title: 'Baby Information', description: 'Comprehensive vitals, emergency list, and essential contacts.', iconName: 'User', group: 'Baby Core' },
  { id: 'cat_2', title: 'Daily Baby Care', description: 'Log nannying, feedings, diaper logs, and sleep schedules.', iconName: 'Activity', group: 'Baby Core' },
  { id: 'cat_3', title: 'Health Records', description: 'Immunization registers, drug trackers, and pediatrician notes.', iconName: 'ShieldCheck', group: 'Health & Grow' },
  { id: 'cat_4', title: 'Growth Tracking', description: 'Milestone milestones checklists and physical growth charts.', iconName: 'FlameKindling', group: 'Health & Grow' },
  { id: 'cat_5', title: 'Shopping Planner', description: 'Nursery setup gear lists, layette guides, and recurring items.', iconName: 'ShoppingCart', group: 'Planning & Prep' },
  { id: 'cat_6', title: 'Hospital Preparation', description: 'Delivery room luggage checklists and post-birth kits guides.', iconName: 'HeartHandshake', group: 'Planning & Prep' },
  { id: 'cat_7', title: 'Baby Shower Planning', description: 'Guest details trackers, RSVP records, budgeters, and thank-yous.', iconName: 'PartyPopper', group: 'Planning & Prep' },
  { id: 'cat_8', title: 'Daily Routine Planning', description: 'Visual calendars, morning checklists, and evening bedtime templates.', iconName: 'Clock4', group: 'Baby Core' },
  { id: 'cat_9', title: 'Memory Book', description: 'Baby firsts, toddler stories, photos frame boundaries, and keepsake boxes.', iconName: 'Award', group: 'Mom & Home' },
  { id: 'cat_10', title: 'Letters To My Baby', description: 'Creative journal prompts and blank canvas notes for letters.', iconName: 'MailOpen', group: 'Mom & Home' },
  { id: 'cat_11', title: 'Mother Wellness', description: 'Postpartum recovery calendars, mood ratings, and water dials.', iconName: 'Smile', group: 'Mom & Home' },
  { id: 'cat_12', title: 'Budget Planner', description: 'Baby shower expenses trackers and monthly baby budget sheets.', iconName: 'DollarSign', group: 'Mom & Home' },
  { id: 'cat_13', title: 'Emergency Contacts', description: 'Express poison controls, pediatric clinics, neighbors, and backups.', iconName: 'PhoneCall', group: 'Baby Core' },
];

export const PREVIEW_PAGES: PreviewPage[] = [
  {
    id: 'prev_1',
    title: 'Cover Page Layout',
    category: 'The Beginning',
    bgColor: 'bg-brand-cream',
    accentColor: '#E0CCBE',
    iconName: 'BookOpen',
    description: 'A gorgeous, watercolor-infused template displaying baby details, parent dedication, and arrival dates.',
    fields: [
      { label: 'Baby Name Dedicated:', placeholder: 'e.g. Liam Arthur Miller', type: 'text' },
      { label: 'Parent Name:', placeholder: 'e.g. Amelia & Thomas Miller', type: 'text' },
      { label: 'Due Date / Birthdate:', placeholder: 'e.g. October 12, 2026', type: 'text' },
    ]
  },
  {
    id: 'prev_2',
    title: 'Daily Feeding Log',
    category: 'Daily Baby Care',
    bgColor: 'bg-brand-pink-light',
    accentColor: '#F5D6D6',
    iconName: 'Milk',
    description: 'Track latch times, bottle fluids, pumping amounts, and reaction notes cleanly over 24-hour cycles.',
    fields: [
      { label: 'Breast feeding Latch times (L/R minutes)', placeholder: 'e.g. Left: 12m, Right: 15m', type: 'text' },
      { label: 'Formula Intake Quantity (oz / ml)', placeholder: 'e.g. 4.5 oz at 8:00 AM', type: 'text' },
      { label: 'Diaper Check Flag:', placeholder: 'e.g. Wet & Dirty', type: 'text' },
    ]
  },
  {
    id: 'prev_3',
    title: 'Sleep Tracker Schedule',
    category: 'Daily Baby Care',
    bgColor: 'bg-brand-sage-light',
    accentColor: '#CBD5C0',
    iconName: 'MoonStar',
    description: 'Analyze nighttime rhythms and daytime napping habits to fine-tune infant sleeping hygiene.',
    fields: [
      { label: 'Nap Start & End clock', placeholder: 'e.g. 10:15 AM - 11:30 AM', type: 'text' },
      { label: 'Sleep quality score', placeholder: 'e.g. Restless first 10 mins, then peaceful', type: 'text' },
      { label: 'Tummy Time duration', placeholder: 'e.g. 15 minutes overall', type: 'text' },
    ]
  },
  {
    id: 'prev_4',
    title: 'Growth Vitals Log',
    category: 'Health Records',
    bgColor: 'bg-brand-blue-light',
    accentColor: '#D6E4F5',
    iconName: 'Ruler',
    description: 'Note pediatric growth parameters, percentiles, and doctors observations over the vital 0-5 years window.',
    fields: [
      { label: 'Recorded Weight:', placeholder: 'e.g. 11 lbs 4 oz (5.1 kg)', type: 'text' },
      { label: 'Recorded Length / Height:', placeholder: 'e.g. 22.8 inches (58 cm)', type: 'text' },
      { label: 'Head Circumference:', placeholder: 'e.g. 14.5 inches', type: 'text' },
    ]
  },
  {
    id: 'prev_5',
    title: 'Vaccine Register Table',
    category: 'Health Records',
    bgColor: 'bg-brand-sage-light',
    accentColor: '#CBD5C0',
    iconName: 'HeartPulse',
    description: 'Keep vaccine calendars complete. Check off recommended shots, serial batch labels, and next dates due.',
    fields: [
      { label: 'Immunization Shot Administered:', placeholder: 'e.g. DTaP #1 & IPV #1', type: 'text' },
      { label: 'Clinic Name / Provider:', placeholder: 'e.g. Maplewood Heights Pediatrics', type: 'text' },
      { label: 'Observed Post-Vaccine Reactions:', placeholder: 'e.g. Slight fever in afternoon, iced leg', type: 'text' },
    ]
  },
  {
    id: 'prev_6',
    title: 'Baby Shower Event Planner',
    category: 'Planning & Prep',
    bgColor: 'bg-brand-pink-light',
    accentColor: '#F5D6D6',
    iconName: 'Sparkles',
    description: 'Keep tabs on baby shower themes, budgeting, guest list addresses, and instant gratitude gift tallies.',
    fields: [
      { label: 'Selected Themes & Venues:', placeholder: 'e.g. Watercolor Woodland theme, Backyard Tea', type: 'text' },
      { label: 'Estimated Overall Budget Allowance ($):', placeholder: 'e.g. 1,200', type: 'text' },
      { label: 'Registry Link & Store Locations:', placeholder: 'e.g. Babylist ID #489240', type: 'text' },
    ]
  },
  {
    id: 'prev_7',
    title: 'Letters & Sweet Milestones',
    category: 'Memories',
    bgColor: 'bg-brand-cream',
    accentColor: '#E0CCBE',
    iconName: 'BookHeart',
    description: 'Interactive cards to draft heartfelt words, upload memory pictures, and store toddler stories.',
    fields: [
      { label: 'Letters prompt: What you look like today...', placeholder: 'e.g. You have your dad\'s bright blue eyes...', type: 'textarea' },
      { label: 'New Milestone Achievements noticed:', placeholder: 'e.g. You rolled over from back to tummy today!', type: 'text' },
    ]
  },
  {
    id: 'prev_8',
    title: 'Baby Budget Planner',
    category: 'Financial Planning',
    bgColor: 'bg-brand-sage-light',
    accentColor: '#CBD5C0',
    iconName: 'PiggyBank',
    description: 'Understand baby expenditures. Segment gear, monthly diaper loads, formulas, clinic, and play toys.',
    fields: [
      { label: 'One-Time Gear Expenses:', placeholder: 'e.g. Stroller $450, Crib $300', type: 'text' },
      { label: 'Monthly Recurring Diapers & Formula ($):', placeholder: 'e.g. 150 per month', type: 'text' },
    ]
  },
];

export const BENEFITS = [
  { text: 'Never Miss Vaccinations', label: 'Safety First', icon: 'ShieldCheck' },
  { text: 'Track growth easily and look for healthy trajectories', label: 'Development', icon: 'TrendingUp' },
  { text: 'Keep family logs and letters forever in premium formats', label: 'Preservation', icon: 'Gift' },
  { text: 'Organise baby shower, nursery, layout lists and checklist registers', label: 'Etsy-style Design', icon: 'ClipboardList' },
  { text: 'Track baby gear costs, monthly budgets, and childcare rates', label: 'Financial Control', icon: 'PiggyBank' },
  { text: 'Reduce maternal or new parent stress with visual clean logs', label: 'Peace of Mind', icon: 'Heart' },
  { text: 'Print out sections as you need them or use on digital notebooks', label: 'Pure Versatility', icon: 'Layers' },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test_1',
    name: 'Eleanor Grace',
    rating: 5,
    role: 'First-Time Mother (Baby Chloe, 3 Months Check)',
    review: 'The absolute most complete, visually breathtaking baby planner I have ever laid my hands on. Using it on GoodNotes is a dream, and having my customized printable baby records instantly exported in high resolutions makes pediatric visits completely stress-free. Beautiful work!',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?fit=crop&w=150&h=150&q=80',
  },
  {
    id: 'test_2',
    name: 'Dr. Marcus & Sarah Lin',
    rating: 5,
    role: 'Parents & Pediatric Resident (Baby Ethan, 1 Year)',
    review: 'As medical professionals and parents, we love having our baby\'s health trackers, vaccination calendars, and diaper logs organized in an structured layout instead of chaotic, cluttered phone apps. The printouts are extremely neat and clear to write on.',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?fit=crop&w=150&h=150&q=80',
  },
  {
    id: 'test_3',
    name: 'Maya Henderson',
    rating: 5,
    role: 'Aunt & Baby Shower Sponsor (Gift Buyer)',
    review: 'I bought the Baby Care Diary bundle for my sister\'s baby shower. She literally cried when she saw the gorgeous watercolor pages and the Letter prompts! It\'s stylish, friendly, clean, and a hundred times better than commercial, generic planners.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?fit=crop&w=150&h=150&q=80',
  },
];

export const BONUSES: BonusItem[] = [
  {
    id: 'bon_1',
    title: 'Rainbow Theme Pages',
    description: 'A beautiful, warm boho pastel rainbow visual pack. Features matching layout lines, star prints, and clouds margins.',
    badge: '100% Free Included',
    bgGrad: 'from-[#FDF9F9] to-[#FFF5F5]',
    iconName: 'Sun',
  },
  {
    id: 'bon_2',
    title: 'Teddy Bear Theme Pages',
    description: 'Adorable teddy bear line sketches and watercolor illustrations in warm sand coordinates. Warm and incredibly cozy.',
    badge: 'Best For Boys & Girls',
    bgGrad: 'from-[#FCFBF8] to-[#F5EFE6]',
    iconName: 'Heart',
  },
  {
    id: 'bon_3',
    title: 'Safari Animal Pages',
    description: 'Watercolor baby wildlife borders representing cute happy giraffes, sleepy lions, gentle elephants, and playful zebras.',
    badge: 'Top Seller',
    bgGrad: 'from-[#F2F7F4] to-[#E6F0EA]',
    iconName: 'Compass',
  },
  {
    id: 'bon_4',
    title: 'Watercolour Baby Pages',
    description: 'Gentle paint splashes, floral wreaths, and pastel paint brush borders to style custom logs and photo sheets.',
    badge: 'Premium Watercolor',
    bgGrad: 'from-[#F1F6F8] to-[#E1ECF0]',
    iconName: 'Palette',
  },
  {
    id: 'bon_5',
    title: 'Monthly Photo Frames',
    description: 'Beautifully bordered monthly milestone sheets (1-12 Months) to style, frame, and preserve growth memories.',
    badge: 'Print Ready',
    bgGrad: 'from-[#FDF9F9] to-[#FAF2F2]',
    iconName: 'Image',
  },
  {
    id: 'bon_6',
    title: 'Cute Quote Pages',
    description: '15+ high-resolution typographic greeting card quotes. Ready to frame or print to decorate toddler nurseries.',
    badge: 'Home Decor',
    bgGrad: 'from-[#FCFBF8] to-[#F1ECE6]',
    iconName: 'Smile',
  },
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq_1',
    question: 'Can I print this planner at home or print shops?',
    answer: 'Absolutely! The physical aspect of this planner is designed with standardized 300 DPI high-resolution CMYK colors on standard A4 layout borders. You can print the entire 350-page binder, or just print active daily schedules and immunization sheets at home or local print shops (such as Staples or FedEx).',
  },
  {
    id: 'faq_2',
    question: 'Is it fully compatible with GoodNotes & Notability?',
    answer: 'Yes! The digital PDF version comes with embedded interactive page tracking tabs, letting you navigate sleep diaries, letters, growth trackers, and diaper files smoothly with standard digital pens on GoodNotes, Notability, Xodo, or any digital notebook app.',
  },
  {
    id: 'faq_3',
    question: 'Can I use this on Apple iPads and Android Tablets?',
    answer: 'Yes, this PDF is styled to scale perfectly on iPads, iPad Minis, Samsung Galaxy Tab, Surface Pro, and even mobile viewports. Any writing app that accepts PDF files is supported.',
  },
  {
    id: 'faq_4',
    question: 'Do I get Canva template access to edit fonts or colors?',
    answer: 'Yes! When you checkout, we provide a direct editable Canva Template Link. You can customize standard pastel colors, add/remove baby checklists, insert personal pediatric labels, or change fonts to match your nursery design or event branding.',
  },
  {
    id: 'faq_5',
    question: 'How many premium pages are included in the download bundle?',
    answer: 'The complete master bundle comprises over 250-350 premium, high-resolution printable and digital sheets, divided into 13 main sections to organize baby bio indices, milestone trackers, budget files, event timelines, immunization schedules, and letter lists.',
  },
  {
    id: 'faq_6',
    question: 'Can I reuse this planner for multiple children?',
    answer: 'Yes! Your single download grants you lifetime rights. You can reuse, customize, and print out fresh versions with our live personalization system for any subsequent siblings, twins, or family gifts!',
  },
];
