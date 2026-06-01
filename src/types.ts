export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  review: string;
  role: string;
  avatar: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface PreviewPage {
  id: string;
  title: string;
  category: string;
  bgColor: string;
  accentColor: string;
  iconName: string;
  description: string;
  fields: { label: string; placeholder: string; type: 'text' | 'checkbox' | 'radio' | 'textarea' }[];
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  badge?: string;
}

export interface InsideCategory {
  id: string;
  title: string;
  description: string;
  iconName: string;
  group: 'Baby Core' | 'Planning & Prep' | 'Health & Grow' | 'Mom & Home';
}

export interface BonusItem {
  id: string;
  title: string;
  description: string;
  badge: string;
  bgGrad: string;
  iconName: string;
}

export interface BabyProfile {
  name: string;
  expectedDate: string;
  birthDate: string;
  gender: 'boy' | 'girl' | 'undetermined';
  birthWeight: string;
  birthHeight: string;
  parentName: string;
}
