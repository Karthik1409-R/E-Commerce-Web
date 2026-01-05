"use client";

import { useSearchParams } from "next/navigation";
import Navbar from "../components/Navbar";
import HeroSection from "../components/dashboard/Hero";

export default function DashboardPage() {
  const params = useSearchParams();
  const error = params.get("error");

  return (
    <>
      <Navbar />
      <HeroSection />
    </>
  );
}
