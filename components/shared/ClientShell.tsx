"use client";

import { useState } from "react";
import FloatingNavbar from "@/components/shared/FloatingNavbar";
import CustomCursor from "@/components/shared/CustomCursor";
import LeadGenDrawer from "@/components/shared/LeadGenDrawer";
import Footer from "@/components/shared/Footer";
import WhatsAppBubble from "@/components/shared/WhatsAppBubble";
import DrawerContext from "@/context/drawer";

interface ClientShellProps {
  children: React.ReactNode;
}

export default function ClientShell({ children }: ClientShellProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const openDrawer = () => setIsDrawerOpen(true);

  return (
    <DrawerContext.Provider value={openDrawer}>
      <CustomCursor />
      <FloatingNavbar onOpenDrawer={openDrawer} />
      <main>{children}</main>
      <WhatsAppBubble />
      <Footer />
      <LeadGenDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </DrawerContext.Provider>
  );
}
