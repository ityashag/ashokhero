import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import ProductsSection from "./components/ProductsSection";
import ServicesSection from "./components/ServicesSection";
import TestimonialsSection from "./components/TestimonialsSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

const HomePage = () => (
  <div className="min-h-screen bg-[#09090B]">
    <Header />
    <main>
      <HeroSection />
      <ProductsSection />
      <ServicesSection />
      <TestimonialsSection />
      <ContactSection />
    </main>
    <Footer />
  </div>
);

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
    <Toaster richColors position="top-right" />
  </BrowserRouter>
);

export default App;
