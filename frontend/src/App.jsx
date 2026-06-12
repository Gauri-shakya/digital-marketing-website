import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import WhyUs from './components/WhyUs';
import Testimonials from './components/Testimonials';
import NewsSection from './components/NewsSection';
import ContactForm from './components/ContactForm';
import Terms from './components/Terms';
import Privacy from './components/Privacy';
import PageHero from './components/PageHero';
import ScrollProgressBar from './components/ScrollProgressBar';
import ScrollToTop from './components/ScrollToTop';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import NotFound from './components/NotFound';
import Lenis from 'lenis';

const AdminDashboard = lazy(() => import('./components/AdminDashboard'));
const ChatWidget = lazy(() => import('./components/ChatWidget'));

// ── Page transition wrapper ──
const pageVariants = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -12, transition: { duration: 0.25, ease: 'easeIn' } },
};

function PageTransition({ children }) {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      {children}
    </motion.div>
  );
}

// ── Layout wrapper ──
function Layout({ children }) {
  return (
    <>
      <CustomCursor />
      <ScrollProgressBar />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <ScrollToTop />
      <Suspense fallback={null}>
        <ChatWidget />
      </Suspense>
    </>
  );
}

// ── Pages ──
function HomePage() {
  return (
    <Layout>
      <Helmet>
        <title>Tech Digi | AI-Powered Marketing Agency</title>
        <meta name="description" content="AI-Powered Business Website & Automation System for Tech Digi. Grow your brand with SEO, Social Media, and Web Design." />
      </Helmet>
      <PageTransition>
        <Hero />
        <About />
        <Services />
        <WhyUs />
        <Testimonials />
      </PageTransition>
    </Layout>
  );
}

function AboutPage() {
  return (
    <Layout>
      <Helmet>
        <title>About Us | Tech Digi</title>
        <meta name="description" content="Learn about Tech Digi — an AI-powered marketing agency helping brands grow with data-driven strategies." />
      </Helmet>
      <PageTransition>
        <PageHero
          badge="Who We Are"
          title="We Build"
          highlight="Digital Success"
          subtitle="Tech Digi is an AI-powered marketing agency combining cutting-edge technology with creative strategies to deliver exceptional results."
        />
        <About />
      </PageTransition>
    </Layout>
  );
}

function ServicesPage() {
  return (
    <Layout>
      <Helmet>
        <title>Services | Tech Digi</title>
        <meta name="description" content="Explore Tech Digi services — SEO, Social Media, Web Design, PPC Ads, Content Marketing and Analytics." />
      </Helmet>
      <PageTransition>
        <PageHero
          badge="Our Expertise"
          title="Services That Drive"
          highlight="Growth"
          subtitle="From SEO to social media and beyond — we offer everything your brand needs to dominate the digital landscape."
        />
        <Services />
      </PageTransition>
    </Layout>
  );
}

function NewsPage() {
  return (
    <Layout>
      <Helmet>
        <title>News | Tech Digi</title>
        <meta name="description" content="Stay updated with the latest digital marketing news and industry insights from Tech Digi." />
      </Helmet>
      <PageTransition>
        <PageHero
          badge="Industry Insights"
          title="Latest"
          highlight="Marketing News"
          subtitle="Stay ahead of the curve with the latest trends, tips, and news from the world of digital marketing."
        />
        <NewsSection />
      </PageTransition>
    </Layout>
  );
}

function ContactPage() {
  return (
    <Layout>
      <Helmet>
        <title>Contact | Tech Digi</title>
        <meta name="description" content="Get in touch with Tech Digi. We're ready to help you grow your business." />
      </Helmet>
      <PageTransition>
        <PageHero
          badge="Get In Touch"
          title="Let's Grow Your"
          highlight="Business"
          subtitle="Have a project in mind? We'd love to hear about it. Send us a message and we'll get back to you as soon as possible."
        />
        <ContactForm />
      </PageTransition>
    </Layout>
  );
}

function TermsPage() {
  return (
    <Layout>
      <Helmet>
        <title>Terms of Service | Tech Digi</title>
        <meta name="description" content="Terms of Service for Tech Digi." />
      </Helmet>
      <PageTransition>
        <PageHero
          badge="Legal"
          title="Terms of"
          highlight="Service"
          subtitle="Please read these terms and conditions carefully before using our services."
        />
        <Terms />
      </PageTransition>
    </Layout>
  );
}

function PrivacyPage() {
  return (
    <Layout>
      <Helmet>
        <title>Privacy Policy | Tech Digi</title>
        <meta name="description" content="Privacy Policy for Tech Digi." />
      </Helmet>
      <PageTransition>
        <PageHero
          badge="Legal"
          title="Privacy"
          highlight="Policy"
          subtitle="How we collect, use, and protect your personal information."
        />
        <Privacy />
      </PageTransition>
    </Layout>
  );
}

// ── Animated Routes wrapper ──
function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route
          path="/admin"
          element={
            <Suspense fallback={<div className="h-screen flex items-center justify-center text-white">Loading...</div>}>
              <AdminDashboard />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

// ── Scroll to top on navigation ──
function ScrollToTopNav() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// ── App ──
function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <HelmetProvider>
      <Router>
        <ScrollToTopNav />
        <Toaster
          position="bottom-right"
          toastOptions={{ style: { background: '#1E293B', color: '#F8FAFC' } }}
        />
        <Preloader />
        <AnimatedRoutes />
      </Router>
    </HelmetProvider>
  );
}

export default App;
