"use client";

import { useSearchParams } from "next/navigation";
import Navbar from "../components/Navbar";
import HeroSection from "../components/dashboard/Hero";
import ProductCategoriesPage from "../categories/page";
import ProductsPage from "../products/page";

export default function DashboardPage() {
  const params = useSearchParams();
  const error = params.get("error");

  return (
    <>
      <Navbar />
      <HeroSection />
      <ProductCategoriesPage />
      <ProductsPage/>
    </>
  );
}
