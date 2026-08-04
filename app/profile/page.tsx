"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const savedOrders = localStorage.getItem("kitconnect_orders");
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  if (loading) {
    return (
      <div className="text-center py-24 text-brand-muted">
        Loading profile...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-6 py-24 text-center space-y-6">
        <div className="bg-brand-surface border border-brand-border rounded-2xl p-8 shadow-xs space-y-4">
          <h1 className="text-2xl font-bold text-brand-text">Account Locked</h1>
          <p className="text-sm text-brand-muted">
            Please sign in with your Google account to view your profile and
            order history.
          </p>
          <Link
            href="/shop"
            className="inline-block bg-brand-primary text-white text-xs font-semibold px-6 py-3 rounded-xl hover:bg-brand-hover transition-colors"
          >
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-10">
      {/* User Info Card */}
      <div className="bg-brand-surface border border-brand-border rounded-2xl p-8 shadow-xs flex flex-col sm:flex-row items-center gap-6">
        <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-brand-border shrink-0 bg-brand-bg">
          {user.user_metadata?.avatar_url ? (
            <Image
              src={user.user_metadata.avatar_url}
              alt="Profile"
              fill
              sizes="96px"
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-brand-surface-subtle flex items-center justify-center text-xl font-bold text-brand-text">
              {user.email?.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        <div className="space-y-1.5 text-center sm:text-left">
          <span className="text-xs font-semibold text-brand-primary uppercase tracking-wider">
            Verified Customer
          </span>
          <h1 className="text-2xl font-extrabold text-brand-text">
            {user.user_metadata?.full_name || "KitConnect Member"}
          </h1>
          <p className="text-sm text-brand-muted">{user.email}</p>
        </div>
      </div>

      {/* Order History Section */}
      <div className="bg-brand-surface border border-brand-border rounded-2xl p-8 shadow-xs space-y-6">
        <div>
          <h2 className="text-xl font-bold text-brand-text">
            Your WhatsApp Order Inquiries
          </h2>
          <p className="text-sm text-brand-muted mt-0.5">
            Track items you have sent to WhatsApp for checkout.
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-brand-border rounded-xl">
            <p className="text-sm text-brand-muted">
              No order inquiries recorded yet. Pick a jersey in the shop and
              order via WhatsApp!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order, idx) => (
              <div
                key={idx}
                className="bg-brand-bg border border-brand-border rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-brand-border shrink-0 bg-brand-surface">
                    <Image
                      src={order.image_url}
                      alt={order.product_title}
                      fill
                      sizes="56px"
                      className="object-contain p-1"
                    />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-semibold text-brand-text text-sm">
                      {order.product_title}
                    </h4>
                    <div className="flex flex-wrap gap-2 text-xs text-brand-muted">
                      <span>
                        Size:{" "}
                        <strong className="text-brand-text">
                          {order.size}
                        </strong>
                      </span>
                      <span>•</span>
                      <span>
                        Season:{" "}
                        <strong className="text-brand-text">
                          {order.season}
                        </strong>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full sm:w-auto gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-brand-border">
                  <span className="text-base font-extrabold text-brand-primary">
                    ${order.price.toFixed(2)}
                  </span>
                  <span className="text-xs bg-brand-surface-subtle border border-brand-border px-3 py-1.5 rounded-lg text-brand-muted font-medium">
                    Sent to WhatsApp
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
