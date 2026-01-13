"use client";

import { useSearchParams } from "next/navigation";
import Navbar from "../components/Navbar";
import HeroSection from "../components/dashboard/Hero";
import ProductsPage from "../products/page";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

export default function DashboardPage() {
  const params = useSearchParams();
  const error = params.get("error");

  return (
    <>
      <Navbar />
      <HeroSection />
      <ProductsPage />
      <Testimonials />
      <Footer />
    </>
  );
}
