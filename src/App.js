import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import ProductsSection from "./components/ProductsSection";
import LeadSection from "./components/LeadSection";
import ServicesSection from "./components/ServicesSection";
import TestimonialsSection from "./components/TestimonialsSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import ConversionBar from "./components/ConversionBar";
import { trackLeadEvent } from "./lib/adTracking";

const HomePage = () => {
  useEffect(() => {
    trackLeadEvent("landing_page_viewed", {
      path: window.location.pathname,
      referrer: document.referrer || "direct",
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#111111] pb-20 md:pb-0">
      <Header />
      <main>
        <HeroSection />
        <ProductsSection />
        <LeadSection />
        <ServicesSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
      <ConversionBar />
    </div>
  );
};

const routerBasename =
  process.env.NODE_ENV === "production" ? process.env.PUBLIC_URL : "/";

const App = () => (
  <BrowserRouter basename={routerBasename}>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
    <Toaster richColors position="top-right" />
  </BrowserRouter>
);

export default App;
