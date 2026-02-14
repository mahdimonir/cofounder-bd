"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-border-subtle pt-20 pb-12 px-6">
      <div className="container-max">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-blue rounded flex items-center justify-center text-white font-bold text-sm">C</div>
              <span className="text-xl font-bold tracking-tight text-foreground">CoFounderBD</span>
            </Link>
            <p className="text-secondary text-sm leading-relaxed max-w-sm">
              Helping businesses build scalable digital systems that drive measurable growth. Strategy, development, and performance marketing.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-bold text-foreground mb-6 uppercase tracking-wider">Agency</h4>
            <ul className="space-y-4">
              <li><Link href="/services" className="text-sm text-secondary hover:text-brand-blue transition-colors">Services</Link></li>
              <li><Link href="/portfolio" className="text-sm text-secondary hover:text-brand-blue transition-colors">Case Studies</Link></li>
              <li><Link href="/about" className="text-sm text-secondary hover:text-brand-blue transition-colors">About Us</Link></li>
              <li><Link href="/#contact" className="text-sm text-secondary hover:text-brand-blue transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-foreground mb-6 uppercase tracking-wider">Contact</h4>
            <ul className="space-y-4">
              <li className="text-sm text-secondary">Dhaka, Bangladesh</li>
              <li><a href="mailto:studio@cofounder.bd" className="text-sm text-secondary hover:text-brand-blue transition-colors">studio@cofounder.bd</a></li>
              <li className="text-sm text-secondary">+880 1700-000000</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-foreground mb-6 uppercase tracking-wider">Social</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-sm text-secondary hover:text-brand-blue transition-colors font-medium">LinkedIn</a></li>
              <li><a href="#" className="text-sm text-secondary hover:text-brand-blue transition-colors font-medium">Facebook</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border-subtle flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-secondary font-medium uppercase tracking-widest">© 2026 CoFounderBD. All rights reserved.</p>
          <div className="flex gap-8 text-xs text-secondary font-medium uppercase tracking-widest">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
