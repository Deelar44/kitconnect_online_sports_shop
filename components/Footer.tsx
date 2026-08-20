"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { subscribeUser } from "@/app/actions/subscribe";

export default function Footer() {
  const [message, setMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const result = await subscribeUser(formData);

    setLoading(false);
    setSuccess(result.success);
    setMessage(result.message);

    if (result.success) {
      e.currentTarget.reset();
    }
  }

  return (
    <footer className="bg-brand-surface border-t border-brand-border mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-3">
              <span className="text-xl font-bold tracking-tight text-brand-text">
                KitConnect
              </span>
            </Link>
            <p className="text-sm text-brand-muted leading-relaxed">
              Your premier store for custom football team kits, tracksuits,
              crop-top jerseys, and personalized merchandise.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-brand-text uppercase tracking-wider mb-4">
              Shop
            </h4>
            <ul className="space-y-2 text-sm text-brand-muted">
              <li>
                <Link
                  href="/"
                  className="hover:text-brand-text transition-colors"
                >
                  Team Kits
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="hover:text-brand-text transition-colors"
                >
                  Tracksuits
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="hover:text-brand-text transition-colors"
                >
                  Crop-Top Jerseys
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="hover:text-brand-text transition-colors"
                >
                  Accessories & Cups
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold text-brand-text uppercase tracking-wider mb-4">
              Support
            </h4>
            <ul className="space-y-2 text-sm text-brand-muted">
              <li>
                <Link
                  href="https://wa.me/263785917383"
                  className="hover:text-brand-text transition-colors"
                >
                  Contact WhatsApp
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="hover:text-brand-text transition-colors"
                >
                  Order Tracking
                </Link>
              </li>
              <li>
                <Link
                  href="/printing-guidelines"
                  className="hover:text-brand-text transition-colors"
                >
                  Printing Guidelines
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="hover:text-brand-text transition-colors"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/terms"
                  className="hover:text-brand-text transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div>
            <h4 className="text-sm font-semibold text-brand-text uppercase tracking-wider mb-4">
              Stay Connected
            </h4>
            <p className="text-sm text-brand-muted mb-4">
              Get notified about new kit drops and exclusive fan merchandise
              discounts.
            </p>
            <form onSubmit={handleSubmit} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Enter your email"
                  className="bg-brand-bg border border-brand-border rounded-lg px-3 py-2 text-sm text-brand-text w-full focus:outline-hidden focus:ring-1 focus:ring-brand-primary"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-brand-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-hover transition-colors cursor-pointer disabled:opacity-50"
                >
                  {loading ? "..." : "Join"}
                </button>
              </div>
              {message && (
                <p
                  className={`text-xs ${success ? "text-green-600" : "text-red-600"}`}
                >
                  {message}
                </p>
              )}
            </form>
          </div>
        </div>

        <div className="border-t border-brand-border pt-8 flex flex-col sm:flex-row items-center justify-between text-sm text-brand-muted">
          <p>
            &copy; {new Date().getFullYear()} KitConnect Jersey Store. All
            rights reserved.
          </p>
          <p className="mt-4 sm:mt-0 flex items-center gap-1">
            Designed for football fans worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}
