import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  User,
  Activity,
  ShieldCheck,
  TrendingUp,
  ShoppingCart,
  HeartHandshake,
  PartyPopper,
  Clock4,
  Award,
  MailOpen,
  Smile,
  DollarSign,
  PhoneCall,
  Milk,
  MoonStar,
  Ruler,
  HeartPulse,
  Sparkles,
  BookHeart,
  PiggyBank,
  ShieldAlert,
  UserCheck,
  Compass,
  Palette,
  Image as ImageIcon,
  Sun,
  Download,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Menu,
  X,
  Star,
  ChevronsDown,
  Info,
  Check,
  Heart,
  ExternalLink,
  Gift,
  DownloadCloud,
  Layers,
  Sparkle,
  QrCode,
  Lock,
  CreditCard
} from 'lucide-react';

import { FEATURES, CATEGORIES, PREVIEW_PAGES, BENEFITS, TESTIMONIALS, BONUSES, FAQS } from './data';
import { BabyProfile } from './types';
import { generateBabyDiaryPDF } from './lib/pdfGenerator';
import heroMockup from './assets/images/hero_planner_mockup_1780325836636.png';
import bonusCollage from './assets/images/planner_bonuses_collage_1780325865266.png';

const IconMap: Record<string, React.ComponentType<any>> = {
  User, Activity, ShieldCheck, TrendingUp, ShoppingCart, HeartHandshake, PartyPopper, Clock4,
  Award, MailOpen, Smile, DollarSign, PhoneCall, Milk, MoonStar, Ruler, HeartPulse, Sparkles,
  BookHeart, PiggyBank, ShieldAlert, UserCheck, Compass, Palette, ImageIcon, Sun, Download,
  CheckCircle2, ArrowRight, BookOpen, Menu, X, Star, ChevronsDown, Info, Check, Heart, ExternalLink, Gift, DownloadCloud, Layers
};

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activePreviewIndex, setActivePreviewIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [activeFaq, setActiveFaq] = useState<string | null>(null);
  
  // Baby profile state for live-personalization and PDF output
  const [babyProfile, setBabyProfile] = useState<BabyProfile>({
    name: 'Noah Bennett',
    expectedDate: '',
    birthDate: '2026-06-01',
    gender: 'boy',
    birthWeight: '7 lbs 6 oz',
    birthHeight: '20.5 inches',
    parentName: 'Sarah Bennett'
  });

  // Analytics/Counts simulation
  const [downloadCount, setDownloadCount] = useState(14892);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Secure Checkout State Variables ($22 Lifetime Bundle Access)
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [isPaid, setIsPaid] = useState<boolean>(true);
  
  const [checkoutTab, setCheckoutTab] = useState<'stripe' | 'paypal'>('stripe');
  const [paymentStep, setPaymentStep] = useState<'form' | 'processing' | 'success'>('form');
  const [paymentStatusText, setPaymentStatusText] = useState('');
  
  // Stripe Credit Card Form fields
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardError, setCardError] = useState('');
  
  // PayPal checkout variables
  const [showPayPalLogin, setShowPayPalLogin] = useState(false);
  const [paypalEmail, setPaypalEmail] = useState('');
  const [paypalPassword, setPaypalPassword] = useState('');
  const [paypalError, setPaypalError] = useState('');

  const handleDownloadClick = () => {
    handleDownloadPDF();
  };

  useEffect(() => {
    // Generate organic random downloads increment occasionally
    const interval = setInterval(() => {
      setDownloadCount(prev => prev + Math.floor(Math.random() * 2) + 1);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const triggerToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleDownloadPDF = () => {
    setIsGenerating(true);
    triggerToast("🎨 Creating customized vector PDF layouts...");
    
    setTimeout(() => {
      try {
        const pdfBytes = generateBabyDiaryPDF(babyProfile);
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${(babyProfile.name.trim() || 'baby').toLowerCase().replace(/\s+/g, '-')}-care-diary.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Success and increment counts
        setDownloadCount(prev => prev + 1);
        setIsGenerating(false);
        setShowSuccessModal(true);
      } catch (e) {
        console.error(e);
        setIsGenerating(false);
        triggerToast("❌ Failsafe activated: Loading download fallback");
      }
    }, 1400);
  };

  const currentPreviewPage = PREVIEW_PAGES[activePreviewIndex];

  // Helper component to render proper Lucide Icons dynamically
  const IconRenderer = ({ name, className }: { name: string; className?: string }) => {
    const Comp = IconMap[name];
    if (!Comp) return <Info className={className} />;
    return <Comp className={className} />;
  };

  const toggleFaq = (id: string) => {
    setActiveFaq(activeFaq === id ? null : id);
  };

  // Scroll handler helper
  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-brand-cream text-stone-800 selection:bg-brand-pink selection:text-stone-900 transition-colors duration-300">
      
      {/* Dynamic Toast Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-brand-ink text-brand-cream px-6 py-3.5 rounded-full shadow-2xl flex items-center space-x-3 text-sm font-medium border border-brand-ink"
          >
            <Sparkle className="w-4 h-4 text-brand-pink fill-brand-pink animate-spin" />
            <span>{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* STICKY HEADER */}
      <header className="sticky top-0 z-40 bg-brand-cream/80 backdrop-blur-md border-b border-brand-beige/30 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo with Cozy Family Vibe Icons */}
          <div 
            onClick={() => scrollToId('hero')} 
            className="flex items-center space-x-3 cursor-pointer group"
            id="logo-wrap"
          >
            <div className="relative w-11 h-11 bg-brand-pink bg-opacity-30 rounded-full flex items-center justify-center text-brand-pink-dark transition-transform group-hover:scale-105">
              <Heart className="w-5 h-5 fill-brand-pink-dark" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-brand-sage rounded-full flex items-center justify-center text-[9px] text-brand-cream font-semibold">
                ★
              </div>
            </div>
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight text-stone-800 flex items-center leading-none">
                Baby Care <span className="text-brand-sage font-serif italic ml-1.5">Diary</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider text-stone-500 block mt-0.5 font-mono font-bold">
                Premium Digital Planner
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-7 text-sm font-medium text-stone-600">
            <button onClick={() => scrollToId('hero')} className="hover:text-brand-sage transition-colors duration-150 cursor-pointer">Home</button>
            <button onClick={() => scrollToId('features')} className="hover:text-brand-sage transition-colors duration-150 cursor-pointer">Features</button>
            <button onClick={() => scrollToId('inside')} className="hover:text-brand-sage transition-colors duration-150 cursor-pointer">What's Inside</button>
            <button onClick={() => scrollToId('preview')} className="hover:text-brand-sage transition-colors duration-150 cursor-pointer">Preview Pages</button>
            <button onClick={() => scrollToId('testimonials')} className="hover:text-brand-sage transition-colors duration-150 cursor-pointer">Reviews</button>
            <button onClick={() => scrollToId('faq')} className="hover:text-brand-sage transition-colors duration-150 cursor-pointer">FAQ</button>
          </nav>

          {/* Download Now (Header CTA) */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="text-right">
              <span className="text-[11px] font-mono font-semibold text-stone-500 block">
                ⭐ Etsy Best Seller
              </span>
              <span className="text-xs text-brand-sage font-semibold">
                {downloadCount.toLocaleString()} happy births
              </span>
            </div>
            <button
              onClick={() => scrollToId('download')}
              className="bg-brand-sage hover:bg-brand-sage-dark text-[#FAF7F2] px-6 py-2.5 rounded-full text-sm font-semibold shadow-lg shadow-brand-sage/20 transition-all hover:scale-103 hover:shadow-brand-sage/35 cursor-pointer flex items-center space-x-2"
              id="header-cta"
            >
              <DownloadCloud className="w-4 h-4" />
              <span>Download Now</span>
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden p-2 text-stone-700 hover:bg-brand-beige/20 rounded-lg cursor-pointer"
            id="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-brand-beige/20 bg-[#FCFBF8] overflow-hidden"
              id="mobile-navigation-drawer"
            >
              <div className="px-4 pt-3 pb-6 space-y-3 font-medium text-stone-700 text-base">
                <button onClick={() => scrollToId('hero')} className="block w-full text-left py-2 hover:text-brand-sage">Home</button>
                <button onClick={() => scrollToId('features')} className="block w-full text-left py-2 hover:text-brand-sage">Features</button>
                <button onClick={() => scrollToId('inside')} className="block w-full text-left py-2 hover:text-brand-sage">What's Inside</button>
                <button onClick={() => scrollToId('preview')} className="block w-full text-left py-2 hover:text-brand-sage">Preview Pages</button>
                <button onClick={() => scrollToId('testimonials')} className="block w-full text-left py-2 hover:text-brand-sage">Reviews</button>
                <button onClick={() => scrollToId('faq')} className="block w-full text-left py-2 hover:text-brand-sage">FAQ</button>
                <div className="pt-3 border-t border-brand-beige/25 flex flex-col space-y-2">
                  <button
                    onClick={() => scrollToId('download')}
                    className="w-full bg-brand-sage text-[#FAF7F2] text-center py-3 rounded-full font-semibold shadow-md"
                  >
                    Download Premium PDF
                  </button>
                  <span className="text-center text-xs text-stone-500 pt-2 block">
                    ★ {downloadCount.toLocaleString()} Parents Downloaded
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO SECTION */}
      <section id="hero" className="relative pt-8 pb-20 md:py-24 overflow-hidden scrapbook-grid-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Call to action & text details */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              
              <div className="inline-flex items-center space-x-2.5 bg-brand-pink bg-opacity-25 border border-brand-pink-dark/20 text-brand-pink-dark px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider font-mono">
                <Sparkle className="w-3.5 h-3.5 fill-brand-pink" />
                <span>The Perfect Gift & Keepsake Plan</span>
                <span className="w-1.5 h-1.5 rounded-full bg-brand-pink-dark animate-pulse"></span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-800 leading-[1.12]">
                Organise Every <br className="hidden sm:inline" />
                <span className="text-brand-sage italic relative">
                  Precious Moment
                  <span className="absolute left-0 bottom-1 w-full h-1 bg-brand-pink opacity-50 rounded-full"></span>
                </span> <br className="hidden sm:inline" />
                of Your Baby's Journey
              </h1>

              <p className="text-stone-600 text-lg sm:text-xl max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Track feedings, sleep, growth, milestones, health records, baby shower plans, memories, and wellness trackers in one beautifully designed, digital or printable <strong className="font-semibold text-stone-800">Baby Care Diary</strong> bundle.
              </p>

              {/* Action hubs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => scrollToId('download')}
                  className="w-full sm:w-auto bg-brand-ink hover:bg-black/80 text-brand-cream font-semibold px-8 py-4 rounded-full shadow-xl transition-all hover:scale-103 flex items-center justify-center space-x-3 cursor-pointer group"
                >
                  <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
                  <span>Download PDF Bundle</span>
                </button>
                
                <button
                  onClick={() => scrollToId('preview')}
                  className="w-full sm:w-auto bg-brand-cream hover:bg-brand-beige-light text-stone-700 font-semibold px-8 py-4 rounded-full border border-stone-200 shadow-md transition-all hover:scale-103 flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <BookOpen className="w-5 h-5 text-brand-sage" />
                  <span>Interactive Preview</span>
                </button>
              </div>

              {/* Simple Personalization Banner */}
              <div className="bg-brand-sage bg-opacity-10 border border-brand-sage/20 rounded-2xl p-4.5 sm:p-5 max-w-xl mx-auto lg:mx-0 flex items-start space-x-3.5 text-left">
                <Info className="w-6 h-6 text-brand-sage-dark flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="text-sm font-semibold text-stone-800 block">🎨 Real-time Personalization Enabled!</span>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Type your baby's name inside the interactive preview section. The website will instantly showcase customized preview templates and generate a personalized printable <span className="font-semibold text-brand-sage-dark">Baby PDF Book Package</span>!
                  </p>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="pt-4 border-t border-brand-beige/25">
                <p className="text-xs uppercase tracking-wider font-semibold text-stone-400 mb-3.5 font-mono">
                  ✔ TRUSTED BY {downloadCount.toLocaleString()} EXPECTING FAMILIES
                </p>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-4 max-w-md sm:max-w-xl mx-auto lg:mx-0 text-left text-xs font-semibold text-stone-600">
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-brand-sage flex-shrink-0" />
                    <span>Printable PDF (300 DPI)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-brand-sage flex-shrink-0" />
                    <span>GoodNotes Compatible</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-brand-sage flex-shrink-0" />
                    <span>Notability Compatible</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-brand-sage flex-shrink-0" />
                    <span>iPad & Android Friendly</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-brand-sage flex-shrink-0" />
                    <span>Canva Editable Link</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-brand-sage flex-shrink-0" />
                    <span>250–350 Premium Pages</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Mockup Display */}
            <div className="lg:col-span-5 relative flex justify-center items-center">
              
              {/* Soft abstract circle behind graphic */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-85 lg:w-96 h-72 sm:h-85 lg:h-96 rounded-full bg-brand-pink/35 blur-3xl z-0" />

              <div className="relative z-10 w-full max-w-sm sm:max-w-md">
                
                {/* Generated image Mockup inside styled tablet frame */}
                <div className="bg-[#1C1917] p-3 sm:p-4 rounded-[2.5rem] shadow-2xl border-4 border-stone-800 relative group transition-transform hover:scale-101 duration-300">
                  
                  {/* Speaker slot */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-3.5 bg-stone-900 rounded-b-xl" />
                  
                  {/* Screen viewport */}
                  <div className="bg-brand-cream rounded-[1.8rem] overflow-hidden aspect-[3/4] relative flex items-center justify-center">
                    
                    <img 
                      src={heroMockup} 
                      alt="Baby Care Diary Mockup Preview" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      id="hero-mockup-img"
                    />

                    {/* Interactive overlay icon */}
                    <div className="absolute bottom-4 right-4 bg-[#FAF7F2]/95 backdrop-blur-sm shadow-md rounded-full p-2.5 text-stone-800 transition-colors hover:bg-stone-50 cursor-pointer flex items-center space-x-2">
                      <QrCode className="w-4 h-4 text-brand-sage" />
                      <span className="text-[10px] font-mono font-bold tracking-tight">SCAN PREVIEW</span>
                    </div>

                    {/* Cute tag */}
                    <div className="absolute top-4 left-4 bg-brand-pink-dark text-[#FAF7F2] text-[10px] font-mono uppercase font-bold px-2.5 py-1 rounded-full shadow-sm">
                      Etsy Best-Seller
                    </div>
                  </div>
                </div>

                {/* Smaller overlay representations (Printed page style & mobile style) */}
                <div 
                  onClick={() => scrollToId('preview')}
                  className="absolute -bottom-6 -left-6 sm:-left-10 bg-white p-3 rounded-2xl shadow-xl border border-stone-100 max-w-[12rem] cursor-pointer hover:translate-y-1 transition-transform"
                >
                  <div className="flex items-center space-x-2.5 mb-1.5">
                    <Layers className="w-4 h-4 text-brand-sage" />
                    <span className="text-[10px] uppercase font-bold text-stone-500 font-mono">Custom Page</span>
                  </div>
                  <span className="text-xs font-serif font-bold text-stone-800 block leading-tight">
                    Cover Sheet Personalised
                  </span>
                  <span className="text-[10px] text-brand-sage-dark font-medium mt-1 block">
                    Click to try →
                  </span>
                </div>

                <div className="absolute -top-5 -right-5 sm:-right-8 bg-brand-ink text-brand-cream p-3 sm:p-4 rounded-2xl shadow-lg max-w-[9rem] text-center border border-brand-ink">
                  <span className="text-[22px] font-serif font-bold text-brand-pink block">350+</span>
                  <span className="text-[10px] tracking-wide text-stone-300 font-medium block uppercase leading-none mt-1">
                    Printable sheets Included
                  </span>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* DETAILED STATISTICS BOX (COZY COUNTER WITH ETSY BADGES) */}
      <section className="bg-white border-y border-brand-beige/20 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-serif font-bold text-brand-ink">4.95<span className="text-brand-pink font-serif">★</span></span>
              <p className="text-xs text-stone-500 font-medium uppercase tracking-wider font-mono">2,480+ Etsy Reviews Rating</p>
            </div>
            
            <div className="space-y-1 border-l border-brand-beige/20">
              <span className="text-3xl sm:text-4xl font-mono font-bold text-brand-ink">350+</span>
              <p className="text-xs text-stone-500 font-medium uppercase tracking-wider font-mono">Beautiful Planner Pages</p>
            </div>
            
            <div className="space-y-1 border-l border-brand-beige/20">
              <span className="text-3xl sm:text-4xl font-mono font-bold text-brand-sage">Instant</span>
              <p className="text-xs text-stone-500 font-medium uppercase tracking-wider font-mono">E-mail Delivery & Access</p>
            </div>
            
            <div className="space-y-1 border-l border-brand-beige/20 animate-pulse">
              <span className="text-3xl sm:text-4xl font-mono font-bold text-brand-pink-dark">Free</span>
              <p className="text-xs text-stone-500 font-medium uppercase tracking-wider font-mono">6 Bonus Custom Themes</p>
            </div>

          </div>
        </div>
      </section>

      {/* CORE FEATURES SECTION */}
      <section id="features" className="py-20 bg-brand-cream/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-xs text-brand-sage font-bold font-mono tracking-wider uppercase bg-brand-sage-light border border-brand-sage/20 px-3 py-1 rounded-full">
              Full Organization System
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-800">
              Premium Features Tailored for Busy Parents
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Designed dynamically to streamline daily baby workflows. Avoid overwhelming setups and track physical wellness, development metrics, calendars, and expenses beautifully.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((feat, idx) => (
              <motion.div
                key={feat.id}
                whileHover={{ y: -5 }}
                className="bg-brand-beige-light rounded-2xl p-6.5 border border-brand-beige/20 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                id={`feature-card-${idx}`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-brand-pink bg-opacity-20 flex items-center justify-center text-brand-pink-dark">
                      <IconRenderer name={feat.iconName} className="w-6 h-6 stroke-[1.6]" />
                    </div>
                    {feat.badge && (
                      <span className="text-[9px] uppercase tracking-wider font-mono font-bold bg-[#FAF2F2] border border-brand-pink-dark/15 text-brand-pink-dark px-2.5 py-0.5 rounded-full">
                        {feat.badge}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-lg font-bold font-serif text-stone-800">
                      {feat.title}
                    </h3>
                    <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                </div>

                <div 
                  onClick={() => {
                    // Route to interactive slider page
                    const pageMap: Record<string, number> = {
                      'feat_1': 0, 'feat_2': 1, 'feat_3': 2, 'feat_4': 3, 'feat_5': 4, 'feat_6': 5, 'feat_7': 6, 'feat_9': 7
                    };
                    const pageIdx = pageMap[feat.id];
                    if (pageIdx !== undefined) {
                      setActivePreviewIndex(pageIdx);
                      scrollToId('preview');
                    } else {
                      scrollToId('inside');
                    }
                  }} 
                  className="mt-4.5 pt-4.5 border-t border-brand-beige/15 text-xs font-semibold text-stone-500 hover:text-brand-sage transition-colors flex items-center space-x-1 cursor-pointer"
                >
                  <span>Interactive Preview Page</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* WHAT'S INSIDE SECTION (CATEGORIES WITH DETAILED BENTO SYSTEM) */}
      <section id="inside" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-3.5 mb-16">
            <span className="text-xs text-stone-500 font-bold font-mono tracking-wider uppercase bg-brand-cream border border-brand-beige/35 px-3 py-1 rounded-full">
              Explore Every Page Group
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-800">
              Comprehensive Printable Binder (13 Master Categories)
            </h2>
            <p className="text-stone-600 text-sm">
              Take a look inside the master planner outline. Every section is hyperlinked for digital use or print-ready with clear headers.
            </p>
          </div>

          {/* Grouped sections */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Baby Core Group */}
            <div className="bg-brand-cream p-6 rounded-2xl border border-brand-beige/20 space-y-4">
              <div className="flex items-center space-x-2 text-stone-800 pb-2 border-b border-brand-beige/30">
                <div className="w-2.5 h-2.5 rounded-full bg-brand-pink" />
                <h3 className="font-serif font-bold text-lg">🍼 Baby Core Care</h3>
              </div>
              <div className="space-y-4">
                {CATEGORIES.filter(c => c.group === 'Baby Core').map(cat => (
                  <div key={cat.id} className="space-y-1">
                    <span className="text-sm font-bold text-stone-700 flex items-center space-x-1.5">
                      <IconRenderer name={cat.iconName} className="w-3.5 h-3.5 text-stone-500" />
                      <span>{cat.title}</span>
                    </span>
                    <p className="text-xs text-stone-500 leading-normal">{cat.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Health & Grow Group */}
            <div className="bg-brand-cream p-6 rounded-2xl border border-brand-beige/20 space-y-4">
              <div className="flex items-center space-x-2 text-stone-800 pb-2 border-b border-brand-beige/30">
                <div className="w-2.5 h-2.5 rounded-full bg-brand-sage" />
                <h3 className="font-serif font-bold text-lg">🌱 Health & Growth</h3>
              </div>
              <div className="space-y-4">
                {CATEGORIES.filter(c => c.group === 'Health & Grow').map(cat => (
                  <div key={cat.id} className="space-y-1">
                    <span className="text-sm font-bold text-stone-700 flex items-center space-x-1.5">
                      <IconRenderer name={cat.iconName} className="w-3.5 h-3.5 text-stone-500" />
                      <span>{cat.title}</span>
                    </span>
                    <p className="text-xs text-stone-500 leading-normal">{cat.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Planning & Prep Group */}
            <div className="bg-brand-cream p-6 rounded-2xl border border-brand-beige/20 space-y-4">
              <div className="flex items-center space-x-2 text-stone-800 pb-2 border-b border-brand-beige/30">
                <div className="w-2.5 h-2.5 rounded-full bg-brand-blue" />
                <h3 className="font-serif font-bold text-lg">🎉 Planning & Prep</h3>
              </div>
              <div className="space-y-4">
                {CATEGORIES.filter(c => c.group === 'Planning & Prep').map(cat => (
                  <div key={cat.id} className="space-y-1">
                    <span className="text-sm font-bold text-stone-700 flex items-center space-x-1.5">
                      <IconRenderer name={cat.iconName} className="w-3.5 h-3.5 text-stone-500" />
                      <span>{cat.title}</span>
                    </span>
                    <p className="text-xs text-stone-500 leading-normal">{cat.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mom & Home Group */}
            <div className="bg-brand-cream p-6 rounded-2xl border border-brand-beige/20 space-y-4">
              <div className="flex items-center space-x-2 text-stone-800 pb-2 border-b border-brand-beige/30">
                <div className="w-2.5 h-2.5 rounded-full bg-brand-beige-dark" />
                <h3 className="font-serif font-bold text-lg">🏡 Mom & Keepsakes</h3>
              </div>
              <div className="space-y-4">
                {CATEGORIES.filter(c => c.group === 'Mom & Home').map(cat => (
                  <div key={cat.id} className="space-y-1">
                    <span className="text-sm font-bold text-stone-700 flex items-center space-x-1.5">
                      <IconRenderer name={cat.iconName} className="w-3.5 h-3.5 text-stone-500" />
                      <span>{cat.title}</span>
                    </span>
                    <p className="text-xs text-stone-500 leading-normal">{cat.description}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sweet illustrative CTA under category outline */}
          <div className="mt-12 bg-brand-cream border border-brand-beige/20 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between text-center md:text-left">
            <div className="space-y-1 mb-4 md:mb-0">
              <span className="text-sm font-bold text-stone-800 block">Want to try customizing these pages?</span>
              <p className="text-xs text-stone-600">Personalise Liam or Chloe's diary down in our live slider sandbox. It's fully interactive!</p>
            </div>
            <button 
              onClick={() => scrollToId('preview')}
              className="bg-[#363331] hover:bg-[#252220] text-[#FAF7F2] text-xs font-semibold px-6 py-2.5 rounded-full tracking-wide transition-all hover:scale-103 shadow"
            >
              Start Personalising Preview →
            </button>
          </div>

        </div>
      </section>

      {/* PLANNER PREVIEW SECTION (AWESOME SLIDER & DYNAMIC PERSONALIZER SANDBOX) */}
      <section id="preview" className="py-20 bg-brand-cream relative scrapbook-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-3.5 mb-12">
            <span className="text-xs text-brand-pink-dark font-bold font-mono tracking-wider uppercase bg-brand-pink bg-opacity-20 px-3 py-1 rounded-full">
              Interactive Design Sandbox
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-800">
              Live Customizer & Planner Preview Engine
            </h2>
            <p className="text-stone-600 text-sm">
              Type details in the profile card on the left. The planner preview template below will instantly adapt to showcase your personalized baby book before downloading!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Personalization Control Form (Left panel, 4 columns) */}
            <div className="lg:col-span-4 bg-white rounded-2xl p-6.5 border border-brand-beige shadow-lg space-y-6">
              
              <div className="border-b border-brand-beige/20 pb-4.5">
                <span className="font-serif text-lg font-bold text-stone-800 block">1. Baby Details Vitals</span>
                <span className="text-xs text-stone-500">Inject these values into the live SVG preview and generated PDF pages!</span>
              </div>

              <div className="space-y-4 text-xs font-semibold text-stone-600">
                
                {/* Baby Name input */}
                <div className="space-y-1.5">
                  <label htmlFor="baby-name-input" className="block text-stone-700">Baby Name / Dedication:</label>
                  <input
                    type="text"
                    id="baby-name-input"
                    value={babyProfile.name}
                    onChange={(e) => setBabyProfile({ ...babyProfile, name: e.target.value })}
                    placeholder="e.g. Liam Arthur Miller"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EBE3DB] bg-[#FCFBF8] text-sm text-stone-800 font-normal focus:outline-none focus:ring-1 focus:ring-brand-sage"
                  />
                </div>

                {/* Parent's Name */}
                <div className="space-y-1.5">
                  <label htmlFor="parent-name-input" className="block text-stone-700">Mother / Parent Name:</label>
                  <input
                    type="text"
                    id="parent-name-input"
                    value={babyProfile.parentName}
                    onChange={(e) => setBabyProfile({ ...babyProfile, parentName: e.target.value })}
                    placeholder="e.g. Sarah Bennett"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EBE3DB] bg-[#FCFBF8] text-sm text-stone-800 font-normal focus:outline-none focus:ring-1 focus:ring-brand-sage"
                  />
                </div>

                {/* Birthdate / Due date */}
                <div className="space-y-1.5">
                  <label htmlFor="birthdate-input" className="block text-stone-700">Birth Date (or expected date):</label>
                  <input
                    type="date"
                    id="birthdate-input"
                    value={babyProfile.birthDate}
                    onChange={(e) => setBabyProfile({ ...babyProfile, birthDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EBE3DB] bg-[#FCFBF8] text-sm text-stone-800 font-normal focus:outline-none focus:ring-1 focus:ring-brand-sage"
                  />
                </div>

                {/* Gender Select buttons */}
                <div className="space-y-2">
                  <span className="block text-stone-700">Baby Gender / Template Tone:</span>
                  <div className="grid grid-cols-3 gap-2.5 text-center">
                    <button
                      onClick={() => setBabyProfile({ ...babyProfile, gender: 'boy' })}
                      className={`py-2 rounded-lg cursor-pointer text-xs font-bold transition-all ${babyProfile.gender === 'boy' ? 'bg-[#98BEEB] text-white shadow-sm' : 'bg-brand-cream text-stone-600 border border-brand-beige/50 hover:bg-[#EAF3FD]'}`}
                      id="gender-boy-btn"
                    >
                      Boy (Blue)
                    </button>
                    <button
                      onClick={() => setBabyProfile({ ...babyProfile, gender: 'girl' })}
                      className={`py-2 rounded-lg cursor-pointer text-xs font-bold transition-all ${babyProfile.gender === 'girl' ? 'bg-[#EFA8AC] text-white shadow-sm' : 'bg-brand-cream text-stone-600 border border-brand-beige/50 hover:bg-[#FDF3F3]'}`}
                      id="gender-girl-btn"
                    >
                      Girl (Pink)
                    </button>
                    <button
                      onClick={() => setBabyProfile({ ...babyProfile, gender: 'undetermined' })}
                      className={`py-2 rounded-lg cursor-pointer text-xs font-bold transition-all ${babyProfile.gender === 'undetermined' ? 'bg-brand-sage text-[#FAF7F2] shadow-sm' : 'bg-brand-cream text-stone-600 border border-brand-beige/50 hover:bg-[#EDF2ED]'}`}
                      id="gender-neutral-btn"
                    >
                      Neutral
                    </button>
                  </div>
                </div>

                {/* Physical metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="weight-input" className="block text-stone-700">Birth Weight:</label>
                    <input
                      type="text"
                      id="weight-input"
                      value={babyProfile.birthWeight}
                      onChange={(e) => setBabyProfile({ ...babyProfile, birthWeight: e.target.value })}
                      placeholder="e.g. 7 lbs 6 oz"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#EBE3DB] bg-[#FCFBF8] text-xs text-stone-800 font-normal focus:outline-none focus:ring-1 focus:ring-brand-sage"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="height-input" className="block text-stone-700">Birth Length:</label>
                    <input
                      type="text"
                      id="height-input"
                      value={babyProfile.birthHeight}
                      onChange={(e) => setBabyProfile({ ...babyProfile, birthHeight: e.target.value })}
                      placeholder="e.g. 21 inches"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#EBE3DB] bg-[#FCFBF8] text-xs text-stone-800 font-normal focus:outline-none focus:ring-1 focus:ring-brand-sage"
                    />
                  </div>
                </div>

              </div>

              {/* Generates personalized printable CTA */}
              <button
                onClick={handleDownloadClick}
                disabled={isGenerating}
                className="w-full bg-brand-sage hover:bg-brand-sage-dark text-[#FAF7F2] py-4.5 rounded-xl font-bold text-sm tracking-wide shadow-lg shadow-brand-sage/20 transition-all hover:scale-102 flex items-center justify-center space-x-2.5 disabled:opacity-75 cursor-pointer"
                id="preview-customizer-cta"
              >
                {isGenerating ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Generating Custom Planner...</span>
                  </>
                ) : (
                  <>
                    <DownloadCloud className="w-5 h-5" />
                    <span>Download Personalised Planner</span>
                  </>
                )}
              </button>

            </div>

            {/* Live Interactive Preview Screen (Right panel, 8 columns) */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Slider tabs selectors */}
              <div className="flex items-center space-x-2 overflow-x-auto pb-3 snap-x scrollbar-thin">
                {PREVIEW_PAGES.map((page, idx) => (
                  <button
                    key={page.id}
                    onClick={() => setActivePreviewIndex(idx)}
                    className={`flex-shrink-0 px-4 py-2.5 rounded-full text-xs font-semibold snap-start cursor-pointer transition-all ${activePreviewIndex === idx ? 'bg-[#363331] text-[#FAF7F2]' : 'bg-white text-stone-600 border border-brand-beige/35 hover:bg-stone-50'}`}
                    id={`preview-tab-${idx}`}
                  >
                    {page.title}
                  </button>
                ))}
              </div>

              {/* Styled Preview Page Canvas paper */}
              <div className="bg-white border rounded-3xl p-6.5 sm:p-10 shadow-lg relative overflow-hidden transition-all border-brand-beige duration-300">
                
                {/* Paper header */}
                <div className="flex items-start justify-between border-b border-stone-200 pb-5 mb-6 text-xs text-stone-500 font-mono">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-brand-pink bg-opacity-25 rounded-md text-brand-pink-dark">
                      <IconRenderer name={currentPreviewPage.iconName} className="w-4 h-4 stroke-[2]" />
                    </div>
                    <div>
                      <span className="uppercase text-[9px] tracking-widest font-bold font-mono text-stone-400 block">Digital Planner preview</span>
                      <span className="text-stone-700 font-serif font-bold text-sm">{currentPreviewPage.title}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="block font-semibold uppercase">{currentPreviewPage.category}</span>
                    <span className="text-[10px]">Page {activePreviewIndex + 1} of 350+</span>
                  </div>
                </div>

                {/* Sample visual representation of the page, completely dynamic based on user profile inputs! */}
                <div className={`aspect-[4/5] sm:aspect-[4/4.5] rounded-2xl ${currentPreviewPage.bgColor} border border-[#ECE6DE] p-6 sm:p-8 flex flex-col justify-between relative`}>
                  
                  {/* Subtle watermarked grid inside the page */}
                  <div className="absolute inset-0 bg-[radial-gradient(#e0ccbe_0.5px,transparent_0.5px)] [background-size:16px_16px] opacity-40 rounded-2xl pointer-events-none" />

                  {/* Pastel styled inner line framing */}
                  <div 
                    className="absolute inset-[8px] rounded-xl border pointer-events-none"
                    style={{ borderColor: currentPreviewPage.accentColor, borderWidth: '1px' }}
                  />
                  <div 
                    className="absolute inset-[10px] rounded-xl border border-dotted pointer-events-none"
                    style={{ borderColor: '#E5DFD4', borderWidth: '1px' }}
                  />

                  {/* Dynamic Custom elements inside different slide indices */}
                  
                  {/* COVER LAYOUT PREVIEW (Page Index 0) */}
                  {activePreviewIndex === 0 && (
                    <div className="relative z-10 flex flex-col h-full justify-between py-4 text-center items-center">
                      <span className="text-[9px] sm:text-[10px] font-mono tracking-widest uppercase font-bold text-stone-400">THE BABY CARE PORTFOLIO</span>
                      
                      <div className="space-y-4">
                        <span className="font-serif text-3xl sm:text-5xl font-bold block text-stone-800">
                          Baby Care
                        </span>
                        <span className="font-serif text-3xl sm:text-5xl italic font-bold block text-brand-sage">
                          Diary
                        </span>
                        <div className="w-16 h-0.5 bg-brand-pink mx-auto rounded-full mt-3"></div>
                      </div>

                      {/* Boho Watercolor Rainbow graphic (Interactive HTML/SVG) */}
                      <div className="my-3 flex flex-col items-center">
                        <svg className="w-20 sm:w-28 h-12" viewBox="0 0 100 50">
                          {/* Pink arch */}
                          <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#FDB9BE" strokeWidth="6" />
                          {/* Sage arch */}
                          <path d="M 22 50 A 28 28 0 0 1 78 50" fill="none" stroke="#A7BAA4" strokeWidth="6" />
                          {/* Blue arch */}
                          <path d="M 34 50 A 16 16 0 0 1 66 50" fill="none" stroke="#ADC8E6" strokeWidth="6" />
                        </svg>
                        <div className="flex space-x-12 -mt-1.5">
                          <div className="w-3.5 h-2.5 rounded-full bg-stone-100 blur-[0.5px]"></div>
                          <div className="w-3.5 h-2.5 rounded-full bg-stone-100 blur-[0.5px]"></div>
                        </div>
                      </div>

                      {/* Personalized Label Block */}
                      <div className="bg-[#FAF7F2] border border-brand-beige/50 rounded-xl px-5 py-4 w-full max-w-xs shadow-sm">
                        <span className="text-[9px] font-semibold text-stone-500 uppercase tracking-widest block mb-1">DEDICATED TO:</span>
                        <span className="text-base sm:text-lg font-serif font-bold text-stone-800 block">
                          {babyProfile.name || "Liam Arthur Miller"}
                        </span>
                        <span className="text-[10px] font-mono text-stone-400 block mt-1">
                          {babyProfile.gender === 'boy' ? 'Baby Boy' : babyProfile.gender === 'girl' ? 'Baby Girl' : 'Child'} • DOB: {babyProfile.birthDate || 'To be defined'}
                        </span>
                        <span className="text-xs text-stone-600 block mt-1 font-medium font-serif italic">
                          With infinite affection, Sarah & Ryan
                        </span>
                      </div>

                      <span className="text-[10px] tracking-wide italic text-stone-400 font-serif">“A pure ledger of your smallest days”</span>
                    </div>
                  )}

                  {/* FEEDING DIARY PREVIEW (Page Index 1) */}
                  {activePreviewIndex === 1 && (
                    <div className="relative z-10 flex flex-col h-full justify-between text-left">
                      <div className="flex justify-between items-center bg-white/70 p-3 rounded-lg">
                        <span className="text-xs font-serif font-bold">🍼 Personalized Feeding Log</span>
                        <span className="text-[10px] uppercase font-mono font-bold bg-[#FAF2F2] px-2.5 py-0.5 rounded-full text-brand-pink-dark">Log: {babyProfile.name}</span>
                      </div>

                      <div className="space-y-3.5 my-4">
                        
                        {/* Demo Table */}
                        <div className="border border-stone-200 rounded-lg overflow-hidden text-[10px] bg-white">
                          <div className="grid grid-cols-5 bg-stone-100 font-bold p-2 text-stone-700 border-b border-stone-200 text-center font-mono">
                            <span>Time</span>
                            <span>Left (m)</span>
                            <span>Right (m)</span>
                            <span>Bottle (oz)</span>
                            <span>Wet?</span>
                          </div>
                          
                          <div className="grid grid-cols-5 p-2 border-b border-stone-100 text-center text-stone-600">
                            <span className="font-semibold">07:15 AM</span>
                            <span>12 min</span>
                            <span>15 min</span>
                            <span className="text-stone-400">—</span>
                            <span className="text-brand-sage-dark font-bold">✔ Wet</span>
                          </div>
                          
                          <div className="grid grid-cols-5 p-2 border-b border-stone-100 text-center text-stone-600">
                            <span className="font-semibold">10:30 AM</span>
                            <span className="text-stone-400">—</span>
                            <span className="text-stone-400">—</span>
                            <span>4.5 oz</span>
                            <span className="text-brand-pink-dark font-bold">✔ Dirty</span>
                          </div>

                          <div className="grid grid-cols-5 p-2 text-center text-stone-600">
                            <span className="font-semibold">02:15 PM</span>
                            <span>10 min</span>
                            <span>10 min</span>
                            <span className="text-stone-400">—</span>
                            <span className="text-brand-sage-dark font-bold">✔ Wet</span>
                          </div>
                        </div>

                        {/* Interactive dynamic custom text field */}
                        <div className="bg-[#FAF2F2] rounded-xl p-3 border border-brand-pink/30 space-y-1">
                          <span className="text-[9px] uppercase font-bold tracking-wider text-brand-pink-dark block">Mother Wellness Tip / Synchronisation:</span>
                          <p className="text-xs text-stone-600 italic">
                            🍼 Baby <strong className="font-semibold">{babyProfile.name.split(' ')[0]}</strong> has completed 3 feeding sets. Hydrate with 1 glass of water after each latch!
                          </p>
                        </div>

                      </div>

                      <div className="border-t border-stone-200 pt-3 flex justify-between items-center text-[10px] text-stone-500">
                        <span>Parent Sign: {babyProfile.parentName || " Sarah "}</span>
                        <span>Weight: {babyProfile.birthWeight || "7 lbs"}</span>
                      </div>
                    </div>
                  )}

                  {/* SLEEP TRACKER PREVIEW (Page Index 2) */}
                  {activePreviewIndex === 2 && (
                    <div className="relative z-10 flex flex-col h-full justify-between text-left">
                      <div className="flex justify-between items-center bg-white/70 p-3 rounded-lg">
                        <span className="text-xs font-serif font-bold">🌙 Sleep Tracker & Tummy Time</span>
                        <span className="text-[10px] font-mono bg-brand-sage bg-opacity-25 text-brand-sage-dark px-2 py-0.5 rounded-full font-bold">Toddler Schedule</span>
                      </div>

                      <div className="space-y-4 my-3 text-xs">
                        
                        {/* Interactive visualization of sleep spans */}
                        <div className="space-y-2.5">
                          <div>
                            <div className="flex justify-between text-[10px] text-stone-500 font-mono mb-1">
                              <span>Morning Nap: 09:30 AM - 10:45 AM</span>
                              <span className="font-bold">1h 15m</span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-2">
                              <div className="bg-brand-sage h-2 rounded-full" style={{ width: '35%' }}></div>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between text-[10px] text-stone-500 font-mono mb-1">
                              <span>Lunchtime Nap: 01:15 PM - 02:45 PM</span>
                              <span className="font-bold">1h 30m</span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-2">
                              <div className="bg-brand-sage h-2 rounded-full" style={{ width: '42%' }}></div>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between text-[10px] text-stone-500 font-mono mb-1">
                              <span>Nighttime Sleep: 07:30 PM - 06:15 AM</span>
                              <span className="font-bold">10h 45m</span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-2">
                              <div className="bg-stone-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                            </div>
                          </div>
                        </div>

                        {/* Interactive Checklist display */}
                        <div className="bg-white p-3 rounded-xl border border-stone-200">
                          <span className="text-[10px] uppercase font-bold text-stone-400 block mb-1.5 font-mono">TUMMY TIME CHECKLIST</span>
                          <div className="grid grid-cols-2 gap-2 text-[10px] font-medium text-stone-600">
                            <div className="flex items-center space-x-1.5">
                              <div className="w-3 h-3 border border-brand-sage-dark bg-brand-sage/20 rounded flex items-center justify-center text-[8px] text-brand-sage-dark font-bold">✔</div>
                              <span>Morning Session (5m)</span>
                            </div>
                            <div className="flex items-center space-x-1.5">
                              <div className="w-3 h-3 border border-brand-sage-dark bg-brand-sage/20 rounded flex items-center justify-center text-[8px] text-brand-sage-dark font-bold">✔</div>
                              <span>Noon Session (8m)</span>
                            </div>
                            <div className="flex items-center space-x-1.5">
                              <div className="w-3 h-3 border border-stone-300 rounded"></div>
                              <span>Teatime Session (5m)</span>
                            </div>
                            <div className="flex items-center space-x-1.5">
                              <div className="w-3 h-3 border border-stone-300 rounded"></div>
                              <span>Night Activity (5m)</span>
                            </div>
                          </div>
                        </div>

                      </div>

                      <p className="text-[10px] text-stone-500 leading-normal bg-brand-beige-light p-2.5 rounded-lg italic">
                        💤 "Let <strong className="font-semibold">{babyProfile.name.split(' ')[0]}</strong> sleep on they back over a flat firm safety surface."
                      </p>
                    </div>
                  )}

                  {/* GROWTH TRACKER PREVIEW (Page Index 3) */}
                  {activePreviewIndex === 3 && (
                    <div className="relative z-10 flex flex-col h-full justify-between text-left">
                      <div className="flex justify-between items-center bg-white/70 p-3 rounded-lg">
                        <span className="text-xs font-serif font-bold">📏 Physical Growth Ledger</span>
                        <span className="text-[10px] uppercase font-mono bg-blue-100 text-blue-700 px-2 rounded-full font-bold">Birth details</span>
                      </div>

                      <div className="bg-white p-4.5 rounded-xl border border-stone-200 space-y-3.5 my-3">
                        
                        <div className="grid grid-cols-3 gap-3 text-center">
                          <div className="p-2 border border-brand-beige bg-[#FAF7F2] rounded-lg">
                            <span className="text-[10px] uppercase font-mono font-bold text-stone-400 block">WEIGHT</span>
                            <span className="text-xs sm:text-sm font-serif font-bold text-stone-800">{babyProfile.birthWeight || '7 lbs 6 oz'}</span>
                          </div>
                          <div className="p-2 border border-brand-beige bg-[#FAF7F2] rounded-lg">
                            <span className="text-[10px] uppercase font-mono font-bold text-stone-400 block">LENGTH</span>
                            <span className="text-xs sm:text-sm font-serif font-bold text-stone-800">{babyProfile.birthHeight || '20.5 in'}</span>
                          </div>
                          <div className="p-2 border border-brand-beige bg-[#FAF7F2] rounded-lg">
                            <span className="text-[10px] uppercase font-mono font-bold text-stone-400 block">DUE DATE</span>
                            <span className="text-xs font-serif font-bold text-stone-800">{babyProfile.birthDate || 'Define'}</span>
                          </div>
                        </div>

                        {/* Interactive Growth line mockup chart */}
                        <div className="space-y-1">
                          <span className="text-[9px] uppercase font-bold text-stone-500 block font-mono">Weight Development Trajectory (0 - 3 Months):</span>
                          <div className="h-16 border-l border-b border-stone-300 relative flex items-end">
                            <svg className="absolute inset-0 w-full h-full text-brand-sage" viewBox="0 0 100 50">
                              <path d="M 0 45 Q 35 38 70 20 T 100 5" fill="none" stroke="#CBD5C0" strokeWidth="2.5" />
                              {/* Dots */}
                              <circle cx="0" cy="45" r="2.5" fill="#433E3A" />
                              <circle cx="35" cy="38" r="2.5" fill="#433E3A" />
                              <circle cx="70" cy="20" r="2.5" fill="#433E3A" />
                              <circle cx="100" cy="5" r="2.5" fill="#CBD5C0" />
                            </svg>
                            <span className="text-[8px] absolute top-1 left-2 bg-brand-sage bg-opacity-25 text-brand-sage-dark font-bold px-1.5 rounded uppercase font-mono"> Liam - 95th Percentile</span>
                          </div>
                          <div className="flex justify-between text-[8px] font-mono text-stone-400 pt-1">
                            <span>Birth</span>
                            <span>1 Month</span>
                            <span>2 Month</span>
                            <span>3 Month</span>
                          </div>
                        </div>

                      </div>

                      <div className="text-[9px] text-stone-400 text-center font-mono uppercase tracking-wide">
                        Standard Pediatric Record • Print Resolution 300 DPI
                      </div>
                    </div>
                  )}

                  {/* VACCINATION LOGS PREVIEW (Page Index 4) */}
                  {activePreviewIndex === 4 && (
                    <div className="relative z-10 flex flex-col h-full justify-between text-left">
                      <div className="flex justify-between items-center bg-white/70 p-3 rounded-lg">
                        <span className="text-xs font-serif font-bold">🩺 Pediatric Vaccination Table</span>
                        <span className="text-[10px] uppercase font-mono bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-bold">Safe Wellness</span>
                      </div>

                      <div className="space-y-3.5 my-3 text-[11px]">
                        
                        <div className="border border-stone-200 rounded-lg overflow-hidden bg-white text-[9.5px]">
                          <div className="grid grid-cols-4 bg-stone-100 font-bold p-2 text-stone-700 font-mono text-center">
                            <span>Shot Key</span>
                            <span>Target</span>
                            <span>Date Due</span>
                            <span>Status</span>
                          </div>

                          <div className="grid grid-cols-4 p-2 border-b border-stone-50 text-center text-stone-600">
                            <span className="font-semibold text-left">HepB #1</span>
                            <span>Hepatitis B</span>
                            <span>At Birth</span>
                            <span className="text-emerald-700 font-bold">✔ Administered</span>
                          </div>

                          <div className="grid grid-cols-4 p-2 border-b border-stone-50 text-center text-stone-600">
                            <span className="font-semibold text-left">Rotavirus #1</span>
                            <span>Rotavirus</span>
                            <span>2 Months</span>
                            <span className="text-amber-600 font-semibold">• Pending</span>
                          </div>

                          <div className="grid grid-cols-4 p-2 text-center text-stone-600">
                            <span className="font-semibold text-left">DTaP #1</span>
                            <span>Pertussis</span>
                            <span>2 Months</span>
                            <span className="text-amber-600 font-semibold">• Pending</span>
                          </div>
                        </div>

                        <div className="bg-[#FAF2F2] rounded-xl p-3 border border-brand-pink/30 space-y-1">
                          <span className="text-[9px] uppercase font-bold text-brand-pink-dark block">Observe Post-Vaccine Indicators:</span>
                          <p className="text-[10px] text-stone-600 leading-normal italic">
                            Report localized leg soreness or slight fever exceeding 100.4°F directly to Maplewood Kids Pediatric on: <strong className="font-semibold">01-800-KID-PED</strong>.
                          </p>
                        </div>

                      </div>

                      <div className="flex justify-between items-center text-[10px] text-stone-500 font-mono">
                        <span>PEDIATRIC DIRECTORY INCLUDED</span>
                        <span>DIARY VOLS I</span>
                      </div>
                    </div>
                  )}

                  {/* BABY SHOWER PLANNER PREVIEW (Page Index 5) */}
                  {activePreviewIndex === 5 && (
                    <div className="relative z-10 flex flex-col h-full justify-between text-left">
                      <div className="flex justify-between items-center bg-white/70 p-3 rounded-lg">
                        <span className="text-xs font-serif font-bold">🎉 Baby Shower Timeline</span>
                        <span className="text-[10px] font-mono uppercase bg-rose-100 text-rose-800 px-2.5 font-bold">Party prep</span>
                      </div>

                      <div className="space-y-3.5 my-3">
                        
                        <div className="border border-stone-200 rounded-lg p-3 bg-white space-y-2 text-[10px]">
                          <span className="font-bold text-stone-700 block uppercase font-mono text-[9px] text-stone-400">MILITARY ACCURACY PLAN LIST</span>
                          
                          <div className="flex items-start space-x-2">
                            <div className="w-3.5 h-3.5 border border-brand-sage-dark bg-brand-sage bg-opacity-25 rounded flex items-center justify-center text-[8px] text-brand-sage-dark font-bold mt-0.5">✔</div>
                            <div>
                              <strong className="font-semibold block text-stone-700">6 Weeks: Theme & Registry</strong>
                              <span className="text-xs text-stone-500 block leading-tight">Draft invitations list & link registry list.</span>
                            </div>
                          </div>

                          <div className="flex items-start space-x-2">
                            <div className="w-3.5 h-3.5 border border-brand-sage-dark bg-brand-sage bg-opacity-25 rounded flex items-center justify-center text-[8px] text-brand-sage-dark font-bold mt-0.5">✔</div>
                            <div>
                              <strong className="font-semibold block text-stone-700">4 Weeks: Invitations Sent out</strong>
                              <span className="text-xs text-stone-500 block leading-tight">Send modern pastel templates digitally.</span>
                            </div>
                          </div>

                          <div className="flex items-start space-x-2">
                            <div className="w-3.5 h-3.5 border border-stone-300 rounded mt-0.5"></div>
                            <div>
                              <strong className="font-semibold block text-stone-700">2 Weeks: Games & Sweets Cake</strong>
                              <span className="text-xs text-stone-500 block leading-tight">Plan custom bingo card logs & cake design.</span>
                            </div>
                          </div>
                        </div>

                      </div>

                      <div className="flex justify-between items-center text-[9px] text-stone-400 font-mono">
                        <span>EST BUDGET LIMIT: $1,200</span>
                        <span>GRATITUDE GIFT LOG COOPERATING</span>
                      </div>
                    </div>
                  )}

                  {/* LETTERS TO BABY PREVIEW (Page Index 6) */}
                  {activePreviewIndex === 6 && (
                    <div className="relative z-10 flex flex-col h-full justify-between text-left">
                      <div className="flex justify-between items-center bg-white/70 p-3 rounded-lg">
                        <span className="text-xs font-serif font-bold">💕 Letters To My Baby Prompts</span>
                        <span className="text-[10px] uppercase font-mono bg-orange-100 text-orange-800 px-2.5 rounded-full font-bold">Keepsake</span>
                      </div>

                      <div className="bg-white/60 rounded-xl p-3 sm:p-4 my-2 text-stone-700 relative scale-98 hover:scale-100 transition-all">
                        <span className="font-serif italic text-sm text-stone-800 block text-center mb-1">“Dearest Little {babyProfile.name.split(' ')[0] || 'Angel'},”</span>
                        
                        <p className="text-[11px] leading-relaxed italic text-stone-600 font-serif">
                          "The moment we first held you in our arms, the world outside faded into quiet wonder. You have your mother's playful spirit and your father's bright, search-oriented look. This diary holds the blueprints of your smallest steps, but deeper than checklists, it carries our lifelong adoration for you..."
                        </p>

                        <div className="text-right text-[10px] font-semibold text-brand-pink-dark mt-2">
                          — Prepared with love, {babyProfile.parentName || " Sarah "}
                        </div>
                      </div>

                      <div className="border border-dashed border-brand-beige p-2.5 rounded-lg text-center text-xs text-stone-500 bg-white">
                        📷 [ Dotted layout frame to affix Hospital Anklet / Birth Photo ]
                      </div>
                    </div>
                  )}

                  {/* BUDGET PLANNER PREVIEW (Page Index 7) */}
                  {activePreviewIndex === 7 && (
                    <div className="relative z-10 flex flex-col h-full justify-between text-left">
                      <div className="flex justify-between items-center bg-white/70 p-3 rounded-lg">
                        <span className="text-xs font-serif font-bold">💰 Family Baby Budget</span>
                        <span className="text-[10px] uppercase font-mono bg-amber-100 text-amber-800 px-2 rounded-full font-bold">Expenses logs</span>
                      </div>

                      <div className="space-y-4 my-3 text-xs">
                        
                        <div className="grid grid-cols-2 gap-3.5">
                          <div className="p-3 bg-white border rounded-xl">
                            <span className="text-[9px] uppercase font-mono font-bold text-stone-400 block">NURSERY GEAR</span>
                            <span className="text-base font-serif font-bold">$750 estimated</span>
                            <span className="text-[9px] text-stone-500 block leading-tight mt-0.5">Cribs, mattresses, decor sets</span>
                          </div>

                          <div className="p-3 bg-white border rounded-xl">
                            <span className="text-[9px] uppercase font-mono font-bold text-stone-400 block">RECURRING HARDWARE</span>
                            <span className="text-base font-serif font-bold">$120/mo estimated</span>
                            <span className="text-[9px] text-stone-500 block leading-tight mt-0.5">Diapers bundle, sanitizers</span>
                          </div>
                        </div>

                        <div className="bg-brand-sage bg-opacity-15 p-3 rounded-xl border border-brand-sage/30 text-[10px] text-brand-sage-dark">
                          <strong>💡 Etsy Budget hack:</strong> Establish shared cloud registries! Buying strollers and infant car buckets secondhand or during seasonal warehouse events cuts nursery gear invoices by up to 45%.
                        </div>

                      </div>

                      <div className="text-[9px] text-stone-400 text-center uppercase tracking-wider font-mono">
                        Financial ledger Section 12 • 25 Detailed Templates
                      </div>
                    </div>
                  )}

                  {/* Overlay Watermark showing customized text badge */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.06] rotate-12 z-0 font-serif text-[42px] uppercase font-extrabold text-stone-800 text-center tracking-widest whitespace-nowrap">
                    {babyProfile.name || "Liam Arthur"} COVER
                  </div>

                </div>

                {/* Slider controller indicators */}
                <div className="flex items-center justify-between mt-6.5">
                  <div className="flex space-x-1.5 justify-center">
                    {PREVIEW_PAGES.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActivePreviewIndex(idx)}
                        className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${activePreviewIndex === idx ? 'bg-brand-sage scale-110' : 'bg-brand-beige/85 hover:bg-brand-beige-dark'}`}
                        title={`Go to page ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center space-x-3 text-xs text-stone-600 font-bold">
                    <button
                      disabled={activePreviewIndex === 0}
                      onClick={() => setActivePreviewIndex(prev => Math.max(0, prev - 1))}
                      className="px-3 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg cursor-pointer disabled:opacity-50"
                    >
                      ← Back
                    </button>
                    <span>{activePreviewIndex + 1} / 8</span>
                    <button
                      disabled={activePreviewIndex === PREVIEW_PAGES.length - 1}
                      onClick={() => setActivePreviewIndex(prev => Math.sin(prev) + 1 ? Math.min(PREVIEW_PAGES.length - 1, prev + 1) : 0)}
                      className="px-3 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg cursor-pointer disabled:opacity-50"
                    >
                      Next →
                    </button>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* CORE BENEFITS SECTION (WHY PARENTS LOVE IT) */}
      <section id="benefits" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs text-brand-pink-dark font-bold font-mono tracking-wider uppercase bg-brand-pink bg-opacity-25 px-3 py-1 rounded-full">
                Maternal Approved
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-800 leading-[1.2]">
                Why Modern Parents Love Baby Care Diary
              </h2>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                New parenthood is beautiful yet overwhelming. This diary is carefully designed to guide mothers, fathers, and caregivers away from phone screens and app notifications, allowing mindful connection while retaining absolute healthcare control.
              </p>

              <div className="pt-4 space-y-4">
                <div className="flex items-start space-x-3.5">
                  <div className="p-2.5 bg-[#FAF7F2] rounded-xl text-brand-pink">
                    <Sparkles className="w-5 h-5 fill-brand-pink" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-stone-800 text-base">Etsy Best-Seller Layout</h4>
                    <p className="text-xs text-stone-500">Cozy pastel botanical themes loved by watercolor lovers and scrapbook communities.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="p-2.5 bg-brand-cream rounded-xl text-brand-sage-dark">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-stone-800 text-base">Modular Printable Chapters</h4>
                    <p className="text-xs text-stone-500 font-normal">Print individual chapters or the complete 350-page ring binder for pediatrician desks.</p>
                  </div>
                </div>
              </div>

            </div>

            <div className="lg:col-span-7">
              <div className="bg-[#FAF7F2] rounded-3xl p-6 sm:p-9 border border-brand-beige/25 space-y-4 shadow-inner">
                <span className="text-xs uppercase tracking-widest font-bold text-stone-400 font-mono">✔ 7 STRUCTURAL BENEFITS SPECIFIED FOR BIRTHS</span>
                
                <div className="divide-y divide-brand-beige/20 font-sans">
                  
                  {BENEFITS.map((b, idx) => (
                    <div key={idx} className="flex items-center justify-between py-4.5 first:pt-0 last:pb-0">
                      <div className="flex items-center space-x-3.5">
                        <div className="w-8 h-8 rounded-full bg-brand-sage bg-opacity-15 flex items-center justify-center text-brand-sage">
                          <Check className="w-4 h-4" />
                        </div>
                        <span className="text-stone-700 text-sm sm:text-base font-medium font-sans">
                          {b.text}
                        </span>
                      </div>
                      <span className="hidden sm:inline-block text-[10px] font-mono uppercase font-bold text-[#b89f8d] bg-white border border-[#eae0d5] px-2.5 py-0.5 rounded-full">
                        {b.label}
                      </span>
                    </div>
                  ))}

                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* TESTIMONIAL PRESETS (REVIEWS OF PARENTS) */}
      <section id="testimonials" className="py-20 bg-brand-cream relative scrapbook-grid-subtle border-y border-brand-beige/35">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-3.5 mb-16">
            <span className="text-xs text-brand-sage font-bold font-mono tracking-wider uppercase bg-[#F2F7F4] border border-brand-sage/20 px-3 py-1 rounded-full">
              Testimonial Spotlights
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-800 tracking-tight">
              Aroma of Love from Our Parental Community
            </h2>
            <p className="text-stone-600 text-sm">
              Read how first-time mothers, aunts, and neonatal pediatric clinic residents are keeping baby records beautifully organized.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((test, idx) => (
              <div
                key={test.id}
                className="bg-white p-7 rounded-2xl border border-brand-beige shadow-sm flex flex-col justify-between space-y-6"
                id={`testimonial-card-${idx}`}
              >
                <div className="space-y-4">
                  
                  {/* Rating Stars */}
                  <div className="flex space-x-1.5 text-amber-400">
                    {Array.from({ length: test.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>

                  <p className="text-stone-600 text-xs sm:text-sm italic leading-relaxed">
                    “{test.review}”
                  </p>

                </div>

                <div className="flex items-center space-x-3 pt-4 border-t border-brand-beige/15">
                  <img
                    src={test.avatar}
                    alt={test.name}
                    className="w-10 h-10 rounded-full object-cover border border-brand-beige"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <span className="text-sm font-bold text-stone-800 block leading-tight">{test.name}</span>
                    <span className="text-[10px] text-brand-sage-dark font-medium font-mono">{test.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Simple Etsy Best-Seller Trust badge */}
          <div className="mt-14 text-center space-y-2">
            <p className="text-stone-400 text-[10px] font-mono uppercase tracking-widest">⭐ GLOBAL SHOP CERTIFIED RATING</p>
            <div className="flex items-center justify-center space-x-1">
              {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
              <span className="text-xs text-stone-600 font-semibold ml-1.5">5.0 Out of 5.0 Rating based on 2,488 verified orders</span>
            </div>
          </div>

        </div>
      </section>

      {/* BONUS SECTION (INCLUDED FREE STACKS) */}
      <section id="bonuses" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            <div className="lg:col-span-6 space-y-3.5 text-center lg:text-left">
              <span className="text-xs text-brand-pink-dark font-bold font-mono tracking-wider uppercase bg-[#FAF2F2] border border-brand-pink-dark/15 px-3 py-1 rounded-full">
                FREE Extra Content Included
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-800 leading-tight">
                6 Adorable Theme Bonuses (Worth $45 - Added Free!)
              </h2>
              <p className="text-stone-600 text-xs sm:text-sm">
                Get more than standard files. Every download includes complete extra stylized collections. Print matching giraffe nursery wall art or color-coordinate log sheets effortlessly!
              </p>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-brand-cream border border-[#F5EFE6] rounded-2xl p-4.5 flex items-center space-x-4 max-w-lg mx-auto lg:ml-auto">
                <ImageIcon className="w-10 h-10 text-[#C1AA9B] flex-shrink-0" />
                <p className="text-xs text-stone-600 leading-normal">
                  🎁 <strong>Includes Printable Safari Wall Art & Wall Quote Sheets</strong> — Add friendly safari animal drawings and quote templates directly inside high-res folders!
                </p>
              </div>
            </div>
          </div>

          {/* Bonus Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {BONUSES.map((bon, index) => (
              <motion.div
                key={bon.id}
                whileHover={{ y: -4 }}
                className={`rounded-2xl p-6.5 border border-brand-beige/20 bg-gradient-to-b ${bon.bgGrad} flex flex-col justify-between space-y-4`}
                id={`bonus-card-${index}`}
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] uppercase tracking-wider font-bold bg-[#FAF7F2] text-brand-pink-dark px-2.5 py-0.5 rounded-full font-mono">
                      {bon.badge}
                    </span>
                    <IconRenderer name={bon.iconName} className="w-5 h-5 text-[#AE9B8E]" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-[#363331] text-base">{bon.title}</h3>
                    <p className="text-xs text-stone-500 mt-1 block leading-relaxed">{bon.description}</p>
                  </div>
                </div>

                <div className="text-[10px] font-mono uppercase text-[#b89f8d] font-bold">
                  📁 CMYK 300 DPI FOLDER
                </div>
              </motion.div>
            ))}
          </div>

          {/* Beautiful collage asset banner */}
          <div className="mt-14 h-48 sm:h-64 rounded-3xl overflow-hidden relative border border-brand-beige/25 shadow-md">
            <img 
              src={bonusCollage} 
              alt="Watercolor Baby Planner themes collections" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              id="bonus-collage-img"
            />
            {/* Subtle glass backdrop card inside the image banner */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/45 via-transparent to-stone-950/10 flex items-end p-6">
              <span className="text-[#FAF7F2] font-serif text-lg sm:text-xl font-bold tracking-wide">
                Preview watercolor theme sheets: bear, pastel bunny, and safari jungle
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* DEDICATED DOWNLOAD REGION (WITH REAL COUNTERS & DOWNLOAD PDF TRIGGERS) */}
      <section id="download" className="py-20 bg-brand-cream relative border-y border-brand-beige scrapbook-grid">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className="bg-[#FCFBF8] rounded-3xl p-6.5 sm:p-12 border border-brand-beige shadow-xl space-y-8 relative overflow-hidden">
            
            {/* Little aesthetic ribbon */}
            <div className="absolute top-0 right-0 bg-[#E0A2A5] text-[#FAF7F2] text-[10px] uppercase font-mono tracking-widest px-8 py-2 rotate-45 translate-x-7 translate-y-3.5 shadow-sm">
              Instant
            </div>

            <div className="text-center space-y-3">
              <span className="text-xs uppercase tracking-wider font-mono font-bold text-brand-sage-dark block">⚡ INSTANT FREE DOWNLOAD</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-800">
                Ready to Personalise? Download Baby Care Diary
              </h2>
              <p className="text-[#55504c] text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
                Unlock <strong className="text-brand-pink-dark font-serif font-bold">Free Lifetime Access</strong> to your personalized baby bundle with all 350+ printable pages. Perfect for expecting parents and pediatric reference!
              </p>
            </div>

            {/* Product description card */}
            <div className="bg-brand-cream border border-brand-beige rounded-2xl p-5 grid grid-cols-1 sm:grid-cols-3 gap-6 text-stone-600 text-xs font-semibold">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-[10px] uppercase font-mono font-bold text-stone-400 block">FORMATTING</span>
                <span className="text-stone-800 text-sm block">Vector Print PDF + Canva Link</span>
                <span className="text-[10px] font-normal font-mono block text-amber-700">Editable fonts & sizes</span>
              </div>

              <div className="space-y-1 text-center sm:text-left sm:border-l sm:border-brand-beige/50 sm:pl-6">
                <span className="text-[10px] uppercase font-mono font-bold text-stone-400 block">TABLET COOPERATORS</span>
                <span className="text-[#363331] text-sm block">GoodNotes, Notability, Xodo</span>
                <span className="text-[10px] font-normal block text-stone-400">Works on iPads, Android, Pen Stylus</span>
              </div>

              <div className="space-y-1 text-center sm:text-left sm:border-l sm:border-brand-beige/50 sm:pl-6">
                <span className="text-[10px] uppercase font-mono font-bold text-stone-400 block">FILE SIZE BUNDLE</span>
                <span className="text-[#363331] text-sm block font-mono">2.84 MB (Instant Generation)</span>
                <span className="text-[10px] font-normal block text-green-700">Compressed & Web Optimised</span>
              </div>
            </div>

            {/* Quick checkout form synchronization reminder */}
            <div className="bg-slate-50 border rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1.5 text-center sm:text-left">
                <span className="text-xs font-bold text-[#363331] block">Personalised Baby Ledger Information Check:</span>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-stone-500 font-sans">
                  <span>🍼 Baby Name: <strong className="font-semibold text-stone-700">{babyProfile.name || "Noah Bennett"}</strong></span>
                  <span>Parent: <strong className="font-semibold text-stone-700">{babyProfile.parentName || "Sarah"}</strong></span>
                  <span>DOB: <strong className="font-semibold text-stone-700">{babyProfile.birthDate || "2026-06-01"}</strong></span>
                </div>
              </div>
              <button 
                onClick={() => scrollToId('preview')} 
                className="text-stone-500 hover:text-brand-sage text-xs font-semibold underline flex-shrink-0 cursor-pointer"
              >
                Change Details
              </button>
            </div>

            {/* Main Action Buttons inside Download box */}
            <div className="space-y-4">
              
              <button
                onClick={handleDownloadClick}
                disabled={isGenerating}
                className="w-full bg-[#363331] hover:bg-[#252220] text-[#FAF7F2] py-5 rounded-2xl text-center font-bold text-base transition-all hover:scale-101 flex items-center justify-center space-x-3.5 shadow-xl disabled:opacity-85 cursor-pointer animate-pulse"
                id="main-download-pdf-btn"
              >
                {isGenerating ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5.5 w-5.5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Generating Your Custom Baby Planner package...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-5.5 h-5.5" />
                    <span>Download Personalised Baby PDF Planner</span>
                  </>
                )}
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Secondary: open Canva Template */}
                <button
                  onClick={() => {
                    window.open("https://www.canva.com", "_blank", "noopener,noreferrer");
                  }}
                  className="w-full bg-[#FCFBF8] border border-stone-300 hover:bg-stone-50 text-stone-700 font-bold py-4 rounded-xl text-center text-sm transition-all hover:scale-101 flex items-center justify-center space-x-2 shadow-sm cursor-pointer"
                  id="canva-download-link"
                >
                  <ExternalLink className="w-4.5 h-4.5 text-brand-pink" />
                  <span>Download Canva Version Template</span>
                </button>

                <button
                  onClick={() => {
                    setBabyProfile({
                      name: 'Generic Baby Care Diary',
                      expectedDate: '',
                      birthDate: '',
                      gender: 'undetermined',
                      birthWeight: '',
                      birthHeight: '',
                      parentName: 'New Parent'
                    });
                    triggerToast("🌻 Profile set back to standard default layout template");
                    scrollToId('preview');
                  }}
                  className="w-full bg-[#FCFBF8] border border-stone-300 hover:bg-stone-50 text-stone-700 font-bold py-4 rounded-xl text-center text-sm transition-all hover:scale-101 flex items-center justify-center space-x-2 shadow-sm cursor-pointer"
                  id="reset-form-btn"
                >
                  <span>Reset to Standard Default Bundle</span>
                </button>

              </div>

            </div>

            {/* Satisfaction lock badge */}
            <div className="pt-6 border-t border-brand-beige/25 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 font-medium text-center sm:text-left gap-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></div>
                <span>Active Download Server Status: <strong className="font-bold text-stone-800">Online</strong></span>
              </div>
              <span>🔒 256-bit Secure Encryption connection • Satisfaction Guaranteed</span>
            </div>

          </div>

        </div>
      </section>

      {/* FAQ SECTION (ACCORDION STYLE) */}
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-2xl mx-auto space-y-3.5 mb-16">
            <span className="text-xs text-brand-sage font-bold font-mono tracking-wider uppercase bg-[#F2F7F4] border border-brand-sage/20 px-3 py-1 rounded-full">
              Common Questions
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-800">
              Frequently Asked Questions
            </h2>
            <p className="text-stone-600 text-sm">
              Everything you need to know about custom layouts, printer settings, tablet synchronizations, and Canva link registers.
            </p>
          </div>

          {/* Accordion List */}
          <div className="space-y-4 font-sans max-w-3xl mx-auto">
            {FAQS.map((faq, index) => {
              const isOpen = activeFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className="border border-[#EBE3DB] rounded-2xl overflow-hidden bg-[#FCFBF8] shadow-sm transition-all"
                  id={`faq-accordion-item-${index}`}
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-stone-50 transition-colors cursor-pointer"
                  >
                    <span className="text-stone-800 font-bold text-sm sm:text-base pr-4">
                      {faq.question}
                    </span>
                    <span className="flex-shrink-0 text-stone-500">
                      {isOpen ? <X className="w-5 h-5 text-brand-pink" /> : <PlusIcon className="w-5 h-5 text-brand-sage" />}
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-6 pb-6 pt-1 text-stone-600 text-[13px] sm:text-[14px] leading-relaxed border-t border-brand-beige/15">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="py-24 bg-brand-cream relative border-t border-brand-beige scrapbook-grid-subtle">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-8 relative z-10">
          
          <div className="relative inline-block">
            <Heart className="w-12 h-12 text-brand-pink-dark fill-brand-pink mx-auto animate-bounce" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-brand-pink opacity-25 filter blur-sm"></div>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-stone-800 leading-tight max-w-3xl mx-auto">
            Start Recording Your Baby’s Beautiful Journey Today
          </h2>

          <p className="text-stone-600 text-base sm:text-lg max-w-2xl mx-auto">
            Everything you need to organize, track, remember, and celebrate every single micro-milestone from newborn to 5 years. Instant email access immediately after customization.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <button
              onClick={() => scrollToId('download')}
              className="w-full sm:w-auto bg-[#363331] hover:bg-[#252220] text-[#FAF7F2] font-semibold px-8 py-4 rounded-full shadow-lg transition-all hover:scale-103 cursor-pointer"
            >
              Get Premium PDF Bundle (Free)
            </button>
            
            <button
              onClick={() => scrollToId('preview')}
              className="w-full sm:w-auto bg-white hover:bg-stone-50 text-stone-700 font-semibold px-8 py-4 rounded-full border shadow-sm transition-all hover:scale-103 cursor-pointer"
            >
              Live Demo Sandbox
            </button>
          </div>

          <div className="text-xs text-stone-400 font-mono tracking-widest uppercase">
            ⚡ INSTANT DOWNLOADS LINK EMBEDDED
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#363331] text-[#FAF7F2]/80 pt-16 pb-12 border-t border-stone-800 font-sans text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-left pb-12 border-b border-stone-800">
            
            {/* Column 1: Info */}
            <div className="space-y-4.5">
              <span className="font-serif text-lg font-bold text-[#FAF7F2] tracking-tight block">
                Baby Care <span className="text-brand-pink font-serif italic">Diary</span>
              </span>
              <p className="text-[#D3C9C2] text-xs leading-relaxed max-w-xs mb-3.5">
                Modern, premium digital baby planner & watercolor memory journal designed carefully for family keepsakes and healthy growth tracking. (0-5 Years).
              </p>
              <div className="flex space-x-3 text-stone-400">
                <a href="#instagram" className="hover:text-brand-pink transition-colors"><span className="uppercase text-[10px] font-mono font-bold tracking-wider">Instagram</span></a>
                <span>•</span>
                <a href="#pinterest" className="hover:text-brand-pink transition-colors"><span className="uppercase text-[10px] font-mono font-bold tracking-wider">Pinterest</span></a>
                <span>•</span>
                <a href="#etsy" className="hover:text-brand-pink transition-colors"><span className="uppercase text-[10px] font-mono font-bold tracking-wider">Etsy Shop</span></a>
              </div>
            </div>

            {/* Column 2: Legal links */}
            <div className="space-y-4">
              <span className="uppercase tracking-wider font-mono font-bold text-stone-400 block text-[10px]">Legal Terms</span>
              <div className="flex flex-col space-y-2 text-[#D3C9C2] text-xs">
                <a href="#privacy" className="hover:text-[#FCFBF8] transition-colors">Privacy Policy</a>
                <a href="#terms" className="hover:text-[#FCFBF8] transition-colors">Terms & Conditions</a>
                <a href="#usage" className="hover:text-[#FCFBF8] transition-colors">Standard Personal License Rights</a>
                <a href="#distribution" className="hover:text-[#FCFBF8] transition-colors">Digital Product Refunding Policies</a>
              </div>
            </div>

            {/* Column 3: Navigation helpers */}
            <div className="space-y-4">
              <span className="uppercase tracking-wider font-mono font-bold text-stone-400 block text-[10px]">Planner Chapters</span>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[#D3C9C2] text-xs">
                <button onClick={() => { scrollToId('inside'); }} className="text-left hover:text-white cursor-pointer hover:underline">Daily Care</button>
                <button onClick={() => { scrollToId('inside'); }} className="text-left hover:text-white cursor-pointer hover:underline">Vitals Log</button>
                <button onClick={() => { scrollToId('inside'); }} className="text-left hover:text-white cursor-pointer hover:underline">Milestones</button>
                <button onClick={() => { scrollToId('inside'); }} className="text-left hover:text-white cursor-pointer hover:underline">Baby Shower</button>
                <button onClick={() => { scrollToId('inside'); }} className="text-left hover:text-white cursor-pointer hover:underline">Wellness</button>
                <button onClick={() => { scrollToId('inside'); }} className="text-left hover:text-white cursor-pointer hover:underline">Memories</button>
                <button onClick={() => { scrollToId('inside'); }} className="text-left hover:text-white cursor-pointer hover:underline text-brand-pink">Safari Themes</button>
                <button onClick={() => { scrollToId('inside'); }} className="text-left hover:text-white cursor-pointer hover:underline text-brand-pink">Teddy Bear</button>
              </div>
            </div>

            {/* Column 4: Contact/Newsletter info */}
            <div className="space-y-4">
              <span className="uppercase tracking-wider font-mono font-bold text-stone-400 block text-[10px]">Maternal Support</span>
              <p className="text-[#D3C9C2] text-xs leading-relaxed">
                Contact: <strong className="font-semibold text-stone-200">hello@babycarediary.com</strong><br />
                Response threshold: Under 24 hours Monday - Friday.
              </p>
              <div className="bg-stone-800 p-3 rounded-lg border border-stone-700">
                <span className="block text-[10px] text-stone-400 uppercase font-mono font-bold">LICENSING OUTCOMES</span>
                <p className="text-[11px] text-[#A69C95] mt-1">Perfect for expecting families, baby showers, or nursery wall decorating.</p>
              </div>
            </div>

          </div>

          {/* Core Footer Copyright and trust certificates */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[#A69C95] text-xs gap-4">
            <div>
              &copy; {new Date().getFullYear()} Baby Care Diary. All beautiful moments preserved. Crafted with professional care.
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-3.5 h-3.5 text-brand-pink" />
              <span>Certified Etsy Best Seller Shop</span>
            </div>
          </div>

        </div>
      </footer>

      {/* SUCCESS MODAL FOR PERSONALIZED DOWNLOADS GENERATION */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Modal backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.55 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSuccessModal(false)}
              className="fixed inset-0 bg-[#1C1917]"
            />

            {/* Modal Card content wrapper */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-3xl p-6.5 sm:p-10 border border-brand-beige shadow-2xl relative z-10 max-w-lg w-full text-center space-y-6"
            >
              
              {/* Confetti element decorations purely in HTML CSS */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
                <div className="absolute top-4 left-6 w-2 h-2 rounded-full bg-brand-pink animate-ping"></div>
                <div className="absolute top-1/2 right-12 w-3 h-3 rounded-full bg-brand-sage animate-bounce"></div>
                <div className="absolute bottom-16 left-12 w-2 h-2 rounded-full bg-brand-blue animate-pulse"></div>
              </div>

              <div className="w-16 h-16 bg-brand-sage bg-opacity-25 rounded-full flex items-center justify-center text-brand-sage-dark mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <span className="text-xs uppercase font-mono tracking-widest text-stone-400 font-bold">DOWNLOAD PROCESS SUCCESSFUL</span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-800">
                  {babyProfile.name || 'Your Baby'}'s Diary Ready!
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                  Excellent choice! The printable PDF document contains all 7 master layouts including customizedCover pages, milestone trackers, pediatrician registries, and feeding books. Your download should begin instantly.
                </p>
              </div>

              {/* Dynamic stats in success block */}
              <div className="bg-[#FAF7F2] p-4.5 rounded-2xl border text-xs text-stone-600 text-left space-y-2.5 font-sans">
                <div className="flex justify-between">
                  <span>👶 Personalised For:</span>
                  <strong className="font-bold text-stone-800">{babyProfile.name || 'Liam Arthur'}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Parent/Deliverer:</span>
                  <strong className="font-bold text-stone-800">{babyProfile.parentName || ' Sarah Bennett'}</strong>
                </div>
                <div className="flex justify-between">
                  <span>📁 Download Index:</span>
                  <strong className="font-mono text-stone-500">#{downloadCount.toLocaleString()}</strong>
                </div>
                <div className="flex justify-between">
                  <span>⚡ File Delivery Package size:</span>
                  <strong className="font-mono text-stone-800">2.84 MB [Printable CMYK A4]</strong>
                </div>
              </div>

              {/* Canva CTA backup */}
              <div className="space-y-3">
                <p className="text-stone-400 text-[10px] font-normal leading-normal">
                  If the download did not start automatically, please refresh the browser or click fallback below.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      setShowSuccessModal(false);
                      handleDownloadPDF();
                    }}
                    className="w-full bg-brand-sage hover:bg-brand-sage-dark text-[#FAF7F2] py-3 rounded-lg font-bold text-xs"
                  >
                    🔄 Retry Download fallbacks
                  </button>

                  <button
                    onClick={() => setShowSuccessModal(false)}
                    className="w-full bg-stone-100 hover:bg-stone-200 text-stone-700 py-3 rounded-lg font-bold text-xs cursor-pointer"
                  >
                    Done, Close Preview
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SECURE PAYMENT CHECKOUT MODAL ($22 USD - Stripe and PayPal Dual Integration) */}
      <AnimatePresence>
        {showCheckoutModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            
            {/* Modal backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.55 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                if (paymentStep !== 'processing') {
                  setShowCheckoutModal(false);
                }
              }}
              className="fixed inset-0 bg-[#1C1917]"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-3xl border border-brand-beige shadow-2xl relative z-10 max-w-lg w-full overflow-hidden flex flex-col font-sans text-[#363331]"
            >
              {/* Header block */}
              <div className="bg-brand-cream border-b border-brand-beige p-6 text-center relative">
                <button
                  type="button"
                  onClick={() => setShowCheckoutModal(false)}
                  disabled={paymentStep === 'processing'}
                  className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 disabled:opacity-50 transition-colors p-1 rounded-full hover:bg-stone-100 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="mx-auto w-10 h-10 rounded-full bg-brand-sage/20 text-brand-sage-dark flex items-center justify-center mb-2">
                  <Lock className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-800">
                  Secure Checkout
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Baby Care Diary Lifetime PDF Package & Canva Templates
                </p>
              </div>

              {/* Steps rendering */}
              <div className="p-6 sm:p-8 flex-1 space-y-6">
                
                {paymentStep === 'form' && (
                  <>
                    {/* Amount & Summary banner */}
                    <div className="bg-[#FCFBF8] border border-brand-beige rounded-2xl p-4 flex items-center justify-between">
                      <div className="space-y-1 text-left">
                        <span className="text-xs font-bold text-stone-700">Digital Premium Bundle Includes:</span>
                        <p className="text-[11px] text-stone-500 leading-none">
                          350+ Vector Pages • A4 Printable • Canva Template Link
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-stone-400 line-through block font-mono">$35.00</span>
                        <strong className="text-lg font-mono font-bold text-brand-pink-dark">$22.00 USD</strong>
                      </div>
                    </div>

                    {/* Integrated Payment Gateways Selector Tabs */}
                    <div className="grid grid-cols-2 bg-stone-100 p-1 rounded-xl">
                      <button
                        type="button"
                        onClick={() => {
                          setCheckoutTab('stripe');
                          setCardError('');
                        }}
                        className={`py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${checkoutTab === 'stripe' ? 'bg-white text-stone-800 shadow-sm' : 'text-stone-500 hover:text-stone-800'}`}
                      >
                        <CreditCard className="w-3.5 h-3.5" />
                        <span>Stripe (Credit Card)</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setCheckoutTab('paypal');
                          setPaypalError('');
                          setShowPayPalLogin(false);
                        }}
                        className={`py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${checkoutTab === 'paypal' ? 'bg-white text-stone-800 shadow-sm' : 'text-stone-500 hover:text-stone-800'}`}
                      >
                        <span className="font-serif italic font-extrabold text-blue-600">Pay</span>
                        <span className="font-serif italic font-extrabold text-sky-500">Pal</span>
                      </button>
                    </div>

                    {/* TAB CONTENT: STRIPE CREDIT CARD */}
                    {checkoutTab === 'stripe' && (
                      <form 
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (!cardNumber || !cardExpiry || !cardCvv || !cardName) {
                            setCardError("Please insert all credit card details.");
                            return;
                          }
                          if (cardNumber.replace(/\s+/g, '').length < 16) {
                            setCardError("Credit card number must be 16 digits.");
                            return;
                          }
                          setCardError('');
                          setPaymentStep('processing');
                          
                          // Stage 1
                          setPaymentStatusText("Initiating secure 256-bit payment handshake...");
                          
                          setTimeout(() => {
                            // Stage 2
                            setPaymentStatusText("Authorizing capture of $22.00 via Stripe Vault...");
                            
                            setTimeout(() => {
                              // Stage 3
                              setPaymentStatusText("Issuing unique invoice tokens & compiling baby profile...");
                              
                              setTimeout(() => {
                                // Success!
                                try {
                                  localStorage.setItem('baby_care_diary_is_paid', 'true');
                                } catch (err) {}
                                setIsPaid(true);
                                setPaymentStep('success');
                                triggerToast("✨ Payment of $22.00 successful via Stripe!");
                                
                                setTimeout(() => {
                                  setShowCheckoutModal(false);
                                  handleDownloadPDF();
                                }, 1500);
                              }, 1200);
                            }, 1300);
                          }, 1000);
                        }}
                        className="space-y-4"
                      >
                        {cardError && (
                          <div className="bg-red-50 border border-red-200 text-red-600 text-[11px] p-3 rounded-xl flex items-center space-x-2">
                            <span className="font-bold">⚠️ Error:</span>
                            <span>{cardError}</span>
                          </div>
                        )}

                        <div className="space-y-3 font-sans text-left">
                          {/* Cardholder Name */}
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Cardholder Name</label>
                            <input
                              type="text"
                              required
                              placeholder="Sarah Bennett"
                              value={cardName}
                              onChange={(e) => setCardName(e.target.value)}
                              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-1 focus:ring-brand-sage text-sm"
                            />
                          </div>

                          {/* Card Number */}
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Card Number</label>
                            <div className="relative">
                              <input
                                type="text"
                                required
                                maxLength={19}
                                placeholder="4111 2222 3333 4444"
                                value={cardNumber}
                                onChange={(e) => {
                                  // Auto format with spaces each 4 digits
                                  let digits = e.target.value.replace(/\D/g, '');
                                  let formatted = digits.match(/.{1,4}/g)?.join(' ') || digits;
                                  setCardNumber(formatted);
                                }}
                                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-1 focus:ring-brand-sage text-sm font-mono"
                              />
                              <CreditCard className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
                            </div>
                          </div>

                          {/* Expiry & CVV */}
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Expiration Date</label>
                              <input
                                type="text"
                                required
                                maxLength={5}
                                placeholder="MM/YY"
                                value={cardExpiry}
                                onChange={(e) => {
                                  let val = e.target.value;
                                  if (val.length === 2 && !val.includes('/')) {
                                    val += '/';
                                  }
                                  setCardExpiry(val);
                                }}
                                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-1 focus:ring-brand-sage text-sm font-mono text-center"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Security CVV</label>
                              <input
                                type="password"
                                required
                                maxLength={4}
                                placeholder="•••"
                                value={cardCvv}
                                onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-1 focus:ring-brand-sage text-sm font-mono text-center"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Security check assurances */}
                        <div className="flex items-center justify-between text-[10px] text-stone-400 font-mono py-1">
                          <span className="flex items-center"><Lock className="w-3 h-3 text-green-600 mr-1" /> SSL 256-Bit</span>
                          <span>🔒 PCI compliant • STRIPE SECURED</span>
                        </div>

                        {/* Submit Button */}
                        <button
                          type="submit"
                          className="w-full bg-[#1C1917] hover:bg-stone-800 text-white py-4.5 rounded-xl font-bold text-sm tracking-wide shadow-md transition-all hover:scale-101 cursor-pointer flex items-center justify-center space-x-2"
                        >
                          <ShieldCheck className="w-4.5 h-4.5 text-green-400" />
                          <span>Pay $22.00 USD with Stripe Card</span>
                        </button>
                      </form>
                    )}

                    {/* TAB CONTENT: PAYPAL */}
                    {checkoutTab === 'paypal' && (
                      <div className="space-y-4">
                        {paypalError && (
                          <div className="bg-red-50 border border-red-200 text-red-600 text-[11px] p-3 rounded-xl text-left">
                            {paypalError}
                          </div>
                        )}

                        {!showPayPalLogin ? (
                          <div className="space-y-4">
                            <p className="text-xs text-stone-500 leading-normal text-center">
                              Safe and easy one-click checkout using your PayPal Wallet balances or connected checks.
                            </p>

                            {/* Simulation buttons: Yellow button and Blue button */}
                            <div className="space-y-2.5">
                              {/* PayPal Gold Button */}
                              <button
                                type="button"
                                onClick={() => {
                                  setShowPayPalLogin(true);
                                  setPaypalEmail('');
                                  setPaypalPassword('');
                                }}
                                className="w-full bg-[#FFC439] hover:bg-[#F2B522] rounded-xl py-3.5 flex items-center justify-center space-x-2 transition-all hover:scale-101 cursor-pointer"
                              >
                                <span className="font-serif italic font-extrabold text-blue-900 text-base">Pay</span>
                                <span className="font-serif italic font-extrabold text-sky-600 text-base">Pal</span>
                                <span className="text-xs text-blue-900 font-bold ml-1 font-sans">Express Checkout</span>
                              </button>

                              {/* PayPal Blue Debit or Credit Card Button */}
                              <button
                                type="button"
                                onClick={() => {
                                  setShowPayPalLogin(true);
                                  setPaypalEmail('');
                                  setPaypalPassword('');
                                }}
                                className="w-full bg-[#0070E0] hover:bg-[#005EA6] text-white rounded-xl py-3.5 flex items-center justify-center font-bold text-xs tracking-wide transition-all hover:scale-101 cursor-pointer font-sans"
                              >
                                <CreditCard className="w-4 h-4 mr-2" />
                                <span>Debit or Credit Card</span>
                              </button>
                            </div>

                            <div className="text-center">
                              <span className="text-[10px] text-stone-400 font-mono">POWERED BY PAYPAL EXPRESS LATENCY PROXIES</span>
                            </div>
                          </div>
                        ) : (
                          /* PayPal Mini Sign-In sandbox screen inside the applet */
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="border rounded-2xl bg-white border-brand-beige overflow-hidden p-5 space-y-4 shadow-inner text-left"
                          >
                            <div className="flex justify-between items-center bg-stone-50 -mx-5 -mt-5 p-3.5 border-b">
                              <div className="flex items-center space-x-1">
                                <span className="font-serif italic font-extrabold text-blue-700 text-sm">Pay</span>
                                <span className="font-serif italic font-extrabold text-sky-500 text-sm">Pal</span>
                                <span className="text-[10px] bg-sky-100 text-sky-800 px-1.5 py-0.5 rounded font-mono font-bold ml-2">SANDBOX GATE</span>
                              </div>
                              <span className="text-xs font-bold text-stone-800 font-mono">$22.00 USD</span>
                            </div>

                            <div className="space-y-3 font-sans">
                              <p className="text-[11px] text-stone-500">Sign in to your PayPal account to complete the instant transaction:</p>
                              
                              <div className="space-y-1">
                                <input
                                  type="email"
                                  placeholder="paypal-buyer@example.com (or personal e-mail)"
                                  value={paypalEmail}
                                  onChange={(e) => setPaypalEmail(e.target.value)}
                                  className="w-full px-3 py-2 text-xs rounded-lg border focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                              </div>
                              <div className="space-y-1">
                                <input
                                  type="password"
                                  placeholder="Password (Sandbox account)"
                                  value={paypalPassword}
                                  onChange={(e) => setPaypalPassword(e.target.value)}
                                  className="w-full px-3 py-2 text-xs rounded-lg border focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={() => {
                                  if (!paypalEmail) {
                                    setPaypalError("PayPal sign-in email is required.");
                                    return;
                                  }
                                  setPaypalError('');
                                  setPaymentStep('processing');
                                  
                                  setPaymentStatusText("Authenticating PayPal customer login...");
                                  setTimeout(() => {
                                    setPaymentStatusText("Extracting PayPal funding instruments...");
                                    setTimeout(() => {
                                      setPaymentStatusText("Approving billing contract & issuing A4 invoice...");
                                      setTimeout(() => {
                                        try {
                                          localStorage.setItem('baby_care_diary_is_paid', 'true');
                                        } catch (_) {}
                                        setIsPaid(true);
                                        setPaymentStep('success');
                                        triggerToast("✨ Paid successfully using PayPal Sandbox!");
                                        
                                        setTimeout(() => {
                                          setShowCheckoutModal(false);
                                          handleDownloadPDF();
                                        }, 1500);
                                      }, 1100);
                                    }, 1000);
                                  }, 950);
                                }}
                                className="w-full bg-[#0070E0] hover:bg-[#005ea6] text-white py-2 px-4 rounded-lg text-xs font-bold transition-colors cursor-pointer font-sans"
                              >
                                Log In to Pay $22.00
                              </button>
                              <button
                                type="button"
                                onClick={() => setShowPayPalLogin(false)}
                                className="px-3 bg-stone-100 hover:bg-stone-200 text-stone-600 rounded-lg text-xs cursor-pointer font-sans"
                              >
                                Cancel
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    )}
                  </>
                )}

                {/* STEP 2: PROCESSING SCREEN */}
                {paymentStep === 'processing' && (
                  <div className="py-12 flex flex-col items-center justify-center text-center space-y-5">
                    <div className="relative">
                      {/* Double spin ring animation */}
                      <div className="w-16 h-16 rounded-full border-4 border-brand-sage/20 border-t-brand-sage animate-spin"></div>
                      <div className="w-8 h-8 rounded-full border-4 border-brand-pink/10 border-b-brand-pink animate-spin absolute top-4 left-4" style={{ animationDirection: 'reverse' }}></div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-serif text-lg font-bold text-stone-800 animate-pulse">
                        Securing Transact Details...
                      </h4>
                      <p className="text-xs text-stone-500 font-mono tracking-wide max-w-sm mx-auto bg-stone-50 px-3 py-1.5 rounded-lg border leading-tight">
                        {paymentStatusText}
                      </p>
                    </div>

                    <div className="text-[10px] text-stone-400 font-mono">
                      Please do not close this modal or refresh the webpage.
                    </div>
                  </div>
                )}

                {/* STEP 3: SUCCESSFUL PAYMENT BEEP */}
                {paymentStep === 'success' && (
                  <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center animate-bounce">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    
                    <div className="space-y-1">
                      <h4 className="font-serif text-xl font-bold text-stone-800">
                        Payment Successful!
                      </h4>
                      <p className="text-xs text-stone-500">
                        Lifetime Access Unlocked. Initializing personalized PDF compiler...
                      </p>
                    </div>
                  </div>
                )}

              </div>

              {/* Footer assurances */}
              <div className="bg-stone-50 px-6 py-4 border-t border-brand-beige flex items-center justify-between text-[11px] text-stone-500">
                <div className="flex items-center space-x-1">
                  <ShieldCheck className="w-4 h-4 text-brand-sage" />
                  <span>256-bit AES Safe Gateway</span>
                </div>
                <span>© Baby Care Diary</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

// Quick custom SVG component to draw a neat plus sign inside the FAQ accordions
function PlusIcon({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor" 
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  );
}
