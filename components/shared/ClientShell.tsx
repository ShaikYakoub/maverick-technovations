"use client";

import { useState } from "react";
import FloatingNavbar from "@/components/shared/FloatingNavbar";
import CustomCursor from "@/components/shared/CustomCursor";
import LeadGenDrawer from "@/components/shared/LeadGenDrawer";
import Footer from "@/components/shared/Footer";

interface ClientShellProps {
  children: React.ReactNode;
}

export default function ClientShell({ children }: ClientShellProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <CustomCursor />
      <FloatingNavbar onOpenDrawer={() => setIsDrawerOpen(true)} />
      <main>{children}</main>
      <Footer />
      <LeadGenDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </>
  );
}
