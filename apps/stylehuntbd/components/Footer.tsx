"use client";

import { siteConfig } from "@/lib/site-config";
import { Footer as SharedFooter } from "@cofounder/ui";
import { Facebook, Instagram } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com/stylehuntbd.ctg" },
    { icon: Instagram, href: "https://instagram.com" },
  ];

  return (
    <SharedFooter 
      tagline={siteConfig.tagline}
      socialLinks={socialLinks}
      className="mt-20"
      logoComponent={<Logo variant="full" />}
    />
  );
}
