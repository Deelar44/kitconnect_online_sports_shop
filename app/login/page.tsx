"use client";

import { useState, FormEvent } from "react";
import { createClient } from "@/lib/client";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const handleAuth = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setError(error.message);
      else alert("Check your email for the confirmation link!");
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) setError(error.message);
      else window.location.href = "/";
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="flex min-h-screen bg-brand-bg">
      {/* Left Column: Form Section */}
      <div className="flex flex-col justify-center px-6 py-12 lg:px-8 w-full lg:w-1/2">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {/* Logo */}
          <Link
            href="/"
            className="flex justify-center items-center gap-3 group"
          >
            <div className="relative w-12 h-12 overflow-hidden rounded-xl border border-brand-border shadow-xs">
              <Image
                src="/images/kits/logo.png"
                alt="KitConnect Logo"
                fill
                className="object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <span className="text-2xl font-bold tracking-tight text-brand-text">
              KitConnect
            </span>
          </Link>

          <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-brand-text">
            {isSignUp
              ? "Create your KitConnect account"
              : "Sign in to KitConnect"}
          </h2>

          {/* Toggle Tabs */}
          <div className="flex bg-brand-surface-subtle p-1 rounded-xl mt-6 border border-brand-border">
            <button
              type="button"
              onClick={() => setIsSignUp(false)}
              className={`w-1/2 py-2 text-sm font-semibold rounded-lg transition-all ${
                !isSignUp
                  ? "bg-brand-bg text-brand-text shadow-xs border border-brand-border"
                  : "text-brand-muted hover:text-brand-text"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setIsSignUp(true)}
              className={`w-1/2 py-2 text-sm font-semibold rounded-lg transition-all ${
                isSignUp
                  ? "bg-brand-bg text-brand-text shadow-xs border border-brand-border"
                  : "text-brand-muted hover:text-brand-text"
              }`}
            >
              Sign Up
            </button>
          </div>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-4" onSubmit={handleAuth}>
            {error && (
              <div className="p-3 text-sm text-brand-danger bg-red-50 rounded-lg border border-red-200">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-brand-text">
                Email address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-brand-border rounded-lg shadow-xs focus:ring-brand-primary focus:border-brand-primary text-sm bg-brand-bg text-brand-text"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-text">
                Password
              </label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-3 py-2 pr-10 border border-brand-border rounded-lg shadow-xs focus:ring-brand-primary focus:border-brand-primary text-sm bg-brand-bg text-brand-text"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-brand-muted hover:text-brand-text transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 border border-transparent rounded-lg shadow-xs text-sm font-medium text-white bg-brand-primary hover:bg-brand-hover focus:outline-hidden transition-colors cursor-pointer"
            >
              {loading ? "Processing..." : isSignUp ? "Sign Up" : "Sign In"}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-brand-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-brand-bg text-brand-muted">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google Sign In Button */}
            <button
              onClick={handleGoogleSignIn}
              type="button"
              className="mt-6 w-full flex items-center justify-center gap-3 py-2.5 px-4 border border-brand-border rounded-lg shadow-xs bg-brand-bg text-sm font-medium text-brand-text hover:bg-brand-surface transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.19v3.15C3.17 21.36 7.23 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.19C.43 8.1 0 9.99 0 12s.43 3.9 1.19 5.42l4.09-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.23 0 3.17 2.64 1.19 6.58l4.09 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              Sign in with Google
            </button>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-brand-surface border-l border-brand-border items-center justify-center overflow-hidden p-12">
        <div className="relative z-20 max-w-md space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-brand-primary flex items-center justify-center text-white shadow-lg">
            <svg
              className="w-8 h-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <h3 className="text-3xl font-bold tracking-tight text-brand-text">
            Gear Up & Connect
          </h3>
          <p className="text-brand-muted text-base leading-relaxed">
            Discover custom team kits, tracksuits, crop-top jerseys, flat caps,
            stainless steel cups, and jersey name printing with instant WhatsApp
            support.
          </p>
        </div>
      </div>
    </div>
  );
}
