"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/client";
import Image from "next/image";
import Link from "next/link";

export default function ShopPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("all");

  // State management per product card: { [productId]: { selectedSize: 'M', activeImageIndex: 0, liked: false } }
  const [productState, setProductState] = useState<{
    [key: string]: { size: string; imgIndex: number; liked: boolean };
  }>({});

  // Order history state
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [showOrdersModal, setShowOrdersModal] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    fetchProducts();
    loadSavedOrders();
  }, [category]);

  function getSavedLikes() {
    const savedLikes = localStorage.getItem("kitconnect_likes");
    return savedLikes ? JSON.parse(savedLikes) : [];
  }

  function updateSavedLikes(id: string, liked: boolean) {
    const savedLikes = getSavedLikes();
    const updatedLikes = liked
      ? Array.from(new Set([...savedLikes, id]))
      : savedLikes.filter((item: string) => item !== id);
    localStorage.setItem("kitconnect_likes", JSON.stringify(updatedLikes));
  }

  async function fetchProducts() {
    setLoading(true);
    let query = supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    if (category !== "all") {
      query = query.eq("category", category);
    }
    const { data } = await query;
    if (data) {
      setProducts(data);
      const savedLikes = getSavedLikes();
      const initialStates: any = {};
      data.forEach((p) => {
        initialStates[p.id] = {
          size: "M",
          imgIndex: 0,
          liked: savedLikes.includes(p.id),
        };
      });
      setProductState(initialStates);
    }
    setLoading(false);
  }

  function loadSavedOrders() {
    const saved = localStorage.getItem("kitconnect_orders");
    if (saved) {
      setRecentOrders(JSON.parse(saved));
    }
  }

  function updateItemState(id: string, key: string, value: any) {
    setProductState((prev) => ({
      ...prev,
      [id]: { ...prev[id], [key]: value },
    }));
    if (key === "liked") {
      updateSavedLikes(id, value);
    }
  }

  async function handleWhatsAppCheckout(product: any) {
    const state = productState[product.id] || { size: "M", imgIndex: 0 };
    const selectedSize = state.size;
    const orderItem = {
      product_title: product.title,
      season: product.season || "26/27",
      size: selectedSize,
      price: product.price,
      image_url: product.image_url,
      created_at: new Date().toISOString(),
    };

    // Save to local state and localStorage for order history
    const updatedOrders = [orderItem, ...recentOrders];
    setRecentOrders(updatedOrders);
    localStorage.setItem("kitconnect_orders", JSON.stringify(updatedOrders));

    await supabase.from("product_clicks").insert([{ product_id: product.id }]);
    await supabase.from("customer_orders").insert([orderItem]);

    const whatsappNumber = "263785917383";
    const message = encodeURIComponent(
      `Hi KitConnect! I'd like to order:\n⚽ *${product.title}*\n🏷️ Season: ${product.season || "26/27"}\n📏 Size: ${selectedSize}\n💰 Price: $${product.price.toFixed(2)}`,
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  }

  const categories = [
    { label: "All Gear", value: "all" },
    { label: "Kits & Jerseys", value: "kits" },
    { label: "Tracksuits", value: "tracksuits" },
    { label: "Crop-Tops", value: "croptop" },
    { label: "Merch & Cups", value: "merch" },
  ];

  const sizes = ["S", "M", "L", "XL", "XXL"];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
      {/* Header & Order History Button */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        <div className="space-y-2">
          <span className="inline-block bg-brand-surface-subtle border border-brand-border text-brand-text text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
            KitConnect Interactive Catalog ⚽
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-brand-text">
            Official Team Kits & Gear
          </h1>
          <p className="text-brand-muted text-sm">
            Slide between Home, Away & Third kits, pick your size, and order
            instantly via WhatsApp.
          </p>
        </div>

        <button
          onClick={() => setShowOrdersModal(true)}
          className="bg-brand-surface border border-brand-border hover:bg-brand-surface-subtle text-brand-text px-5 py-3 rounded-xl font-medium text-sm transition-colors shadow-xs flex items-center gap-2 cursor-pointer shrink-0"
        >
          📦 My Order History ({recentOrders.length})
        </button>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setCategory(cat.value)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
              category === cat.value
                ? "bg-brand-primary text-white shadow-xs"
                : "bg-brand-surface border border-brand-border text-brand-text hover:bg-brand-surface-subtle"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="text-center py-20 text-brand-muted">
          Loading catalog...
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 bg-brand-surface border border-brand-border rounded-2xl">
          <p className="text-brand-muted text-sm">
            No items found in this category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => {
            const currentState = productState[product.id] || {
              size: "M",
              imgIndex: 0,
              liked: false,
            };

            const kitVariants = [product.image_url];

            return (
              <div
                key={product.id}
                className="bg-brand-surface border border-brand-border rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  {/* Image & Slider Container */}
                  <div className="relative h-72 bg-brand-surface-subtle overflow-hidden flex items-center justify-center group">
                    {/* Season Badge */}
                    <span className="absolute top-3 left-3 z-10 bg-brand-text text-brand-bg text-xs font-bold px-2.5 py-1 rounded-md shadow-xs">
                      {product.season || "26/27"}
                    </span>

                    {/* Like Button */}
                    <button
                      onClick={() =>
                        updateItemState(
                          product.id,
                          "liked",
                          !currentState.liked,
                        )
                      }
                      className="absolute top-3 right-3 z-10 bg-brand-surface/80 backdrop-blur-xs border border-brand-border p-2 rounded-full text-brand-text hover:bg-brand-surface transition-colors cursor-pointer"
                    >
                      {currentState.liked ? "❤️" : "🤍"}
                    </button>

                    <Image
                      src={product.image_url}
                      alt={product.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-contain p-4 group-hover:scale-105 transition-transform"
                    />

                    {/* Simulated Slider Dots */}
                    <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
                      <span
                        className="w-2 h-2 rounded-full bg-brand-primary"
                        title="Kit View"
                      ></span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-6 space-y-4">
                    <div>
                      <span className="text-xs font-semibold text-brand-muted uppercase tracking-wider">
                        {product.category}
                      </span>
                      <h3 className="font-bold text-lg text-brand-text mt-1">
                        {product.title}
                      </h3>
                    </div>

                    {/* Size Selector Box Check / Buttons */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-brand-muted uppercase tracking-wider block">
                        Select Size:{" "}
                        <span className="text-brand-text font-bold">
                          {currentState.size}
                        </span>
                      </label>
                      <div className="flex gap-1.5">
                        {sizes.map((sz) => (
                          <button
                            key={sz}
                            onClick={() =>
                              updateItemState(product.id, "size", sz)
                            }
                            className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition-colors cursor-pointer ${
                              currentState.size === sz
                                ? "bg-brand-primary text-white border-brand-primary"
                                : "bg-brand-bg border-brand-border text-brand-text hover:bg-brand-surface-subtle"
                            }`}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Price & WhatsApp Checkout Button */}
                <div className="p-6 pt-0 flex items-center justify-between border-t border-brand-border mt-4">
                  <div>
                    <span className="text-xs text-brand-muted block">
                      Price
                    </span>
                    <span className="text-xl font-extrabold text-brand-primary">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>

                  <button
                    onClick={() => handleWhatsAppCheckout(product)}
                    className="bg-green-600 hover:bg-green-700 text-white font-medium text-xs px-4 py-3 rounded-xl transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    💬 Order via WhatsApp
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Order History Modal / Drawer */}
      {showOrdersModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end">
          <div className="bg-brand-surface w-full max-w-md h-full p-6 overflow-y-auto space-y-6 shadow-2xl flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-brand-border pb-4">
                <div>
                  <h2 className="text-xl font-bold text-brand-text">
                    Your Order History
                  </h2>
                  <p className="text-xs text-brand-muted">
                    Items you've sent inquiries for via WhatsApp.
                  </p>
                </div>
                <button
                  onClick={() => setShowOrdersModal(false)}
                  className="text-brand-muted hover:text-brand-text font-bold text-lg p-2 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                {recentOrders.length === 0 ? (
                  <p className="text-center text-sm text-brand-muted py-12">
                    No orders placed yet. Pick a jersey and chat on WhatsApp!
                  </p>
                ) : (
                  recentOrders.map((order, idx) => (
                    <div
                      key={idx}
                      className="bg-brand-bg border border-brand-border rounded-xl p-4 flex gap-4 items-center"
                    >
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-brand-border shrink-0 bg-brand-surface">
                        <Image
                          src={order.image_url}
                          alt={order.product_title}
                          fill
                          sizes="64px"
                          className="object-contain p-1"
                        />
                      </div>
                      <div className="space-y-1 overflow-hidden">
                        <h4 className="font-semibold text-brand-text text-sm truncate">
                          {order.product_title}
                        </h4>
                        <div className="flex gap-2 text-xs text-brand-muted">
                          <span>
                            Size:{" "}
                            <strong className="text-brand-text">
                              {order.size}
                            </strong>
                          </span>
                          <span>•</span>
                          <span>{order.season}</span>
                        </div>
                        <p className="text-xs font-bold text-brand-primary">
                          ${order.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <button
              onClick={() => setShowOrdersModal(false)}
              className="w-full bg-brand-surface-subtle border border-brand-border py-3 rounded-xl text-sm font-medium text-brand-text hover:bg-brand-border transition-colors cursor-pointer"
            >
              Close Drawer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
