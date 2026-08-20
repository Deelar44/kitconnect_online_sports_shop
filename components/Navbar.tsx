"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, signInWithGoogle, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-brand-surface/90 backdrop-blur-md border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-extrabold text-xl text-brand-text tracking-tight flex items-center gap-2"
        >
          <span>KitConnect</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-brand-muted">
          <Link href="/" className="hover:text-brand-text transition-colors">
            Home
          </Link>
          <Link
            href="/shop"
            className="hover:text-brand-text transition-colors"
          >
            Shop
          </Link>
          <Link
            href="/wishlist"
            className="hover:text-brand-text transition-colors flex items-center gap-1.5"
          >
            <svg
              className="w-4 h-4 text-brand-primary"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
            Wishlist
          </Link>
        </nav>

        {/* Right Actions: Mobile Profile + Hamburger & Desktop Auth */}
        <div className="flex items-center gap-3">
          {/* Mobile Wishlist Icon */}
          <Link
            href="/wishlist"
            className="md:hidden p-2 text-brand-text hover:text-brand-primary transition-colors relative"
            title="Wishlist"
          >
            <svg
              className="w-5 h-5 text-brand-text"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          </Link>

          {/* Mobile Profile Avatar */}
          <Link href="/profile" className="md:hidden">
            {user && (
              <div className="relative w-9 h-9 rounded-full overflow-hidden border border-brand-border shrink-0 bg-brand-bg md:hidden">
                {user.user_metadata?.avatar_url ? (
                  <Image
                    src={user.user_metadata.avatar_url}
                    alt="Profile"
                    fill
                    sizes="36px"
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-brand-surface-subtle flex items-center justify-center text-xs font-bold text-brand-text">
                    {user.email?.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
            )}
          </Link>

          {/* Desktop User Section */}
          {user ? (
            <div className="hidden md:flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full overflow-hidden border border-brand-border shrink-0 bg-brand-bg">
                {user.user_metadata?.avatar_url ? (
                  <Image
                    src={user.user_metadata.avatar_url}
                    alt="Profile"
                    fill
                    sizes="36px"
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-brand-surface-subtle flex items-center justify-center text-xs font-bold text-brand-text">
                    {user.email?.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <span className="text-sm font-medium text-brand-text">
                {user.user_metadata?.full_name || user.email}
              </span>
              <button
                onClick={logout}
                className="bg-brand-surface-subtle border border-brand-border text-xs font-medium text-brand-text px-3 py-1.5 rounded-lg hover:bg-brand-border transition-colors cursor-pointer"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="hidden md:block">
              <button
                onClick={signInWithGoogle}
                className="bg-brand-primary hover:bg-brand-hover text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors cursor-pointer shadow-xs"
              >
                Sign In
              </button>
            </div>
          )}

          {/* Hamburger Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-brand-surface-subtle border border-brand-border text-brand-text hover:bg-brand-border transition-colors cursor-pointer"
            aria-label="Toggle Menu"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Slide-down / Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-brand-surface border-b border-brand-border px-6 py-6 space-y-4 animate-in slide-in-from-top-2">
          <nav className="flex flex-col space-y-3 text-base font-medium text-brand-text">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-brand-border/50 hover:text-brand-primary transition-colors"
            >
              Home
            </Link>
            <Link
              href="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-brand-border/50 hover:text-brand-primary transition-colors"
            >
              Shop
            </Link>
            <Link
              href="/wishlist"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-brand-border/50 hover:text-brand-primary transition-colors flex items-center justify-between"
            >
              <span>Wishlist</span>
              <svg
                className="w-4 h-4 text-brand-primary"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </Link>
          </nav>

          <div className="pt-2">
            <Link href="/profile">
              <span className="text-sm cursor-pointer text-brand-text hover:text-brand-primary transition-colors">
                Profile
              </span>

              {user ? (
                <div className="space-y-3">
                  <div className="text-xs text-brand-muted truncate">
                    Signed in as{" "}
                    <strong className="text-brand-text">{user.email}</strong>
                  </div>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      logout();
                    }}
                    className="w-full bg-red-500/10 border border-red-500/20 text-red-400 font-medium py-2.5 rounded-xl text-sm hover:bg-red-500/20 transition-colors cursor-pointer text-center"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    signInWithGoogle();
                  }}
                  className="w-full bg-brand-primary hover:bg-brand-hover text-white font-semibold py-3 rounded-xl text-sm transition-colors cursor-pointer shadow-xs text-center"
                >
                  Sign In with Google
                </button>
              )}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
