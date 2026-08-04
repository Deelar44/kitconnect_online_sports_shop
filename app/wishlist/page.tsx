"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/client";
import Image from "next/image";
import Link from "next/link";

export default function WishlistPage() {
  const [likedProducts, setLikedProducts] = useState<any[]>([]);
  const [productSizes, setProductSizes] = useState<{ [key: string]: string }>(
    {},
  );
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    fetchLikedProducts();
  }, []);

  async function fetchLikedProducts() {
    setLoading(true);
    const savedLikes = JSON.parse(
      localStorage.getItem("kitconnect_likes") || "[]",
    );

    if (savedLikes.length === 0) {
      setLikedProducts([]);
      setLoading(false);
      return;
    }

    const { data } = await supabase
      .from("products")
      .select("*")
      .in("id", savedLikes);

    if (data) {
      setLikedProducts(data);
      const sizes: any = {};
      data.forEach((p) => {
        sizes[p.id] = "M";
      });
      setProductSizes(sizes);
    }
    setLoading(false);
  }

  function removeLike(id: string) {
    const savedLikes = JSON.parse(
      localStorage.getItem("kitconnect_likes") || "[]",
    );
    const updatedLikes = savedLikes.filter((item: string) => item !== id);
    localStorage.setItem("kitconnect_likes", JSON.stringify(updatedLikes));
    setLikedProducts(likedProducts.filter((p) => p.id !== id));
  }

  async function handleWhatsAppCheckout(product: any) {
    const selectedSize = productSizes[product.id] || "M";

    // Log analytics click
    await supabase.from("product_clicks").insert([{ product_id: product.id }]);

    const whatsappNumber = "263785917383";
    const message = encodeURIComponent(
      `Hi KitConnect! I'd like to order from my Wishlist:\n⚽ *${product.title}*\n🏷️ Season: ${product.season || "26/27"}\n📏 Size: ${selectedSize}\n💰 Price: $${product.price.toFixed(2)}`,
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  }

  const sizes = ["S", "M", "L", "XL", "XXL"];

  if (loading) {
    return (
      <div className="text-center py-24 text-brand-muted">
        Loading your wishlist...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">
      <div className="space-y-2">
        <span className="inline-block bg-brand-surface-subtle border border-brand-border text-brand-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          Saved Favorites ❤️
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-brand-text">
          Your Liked Items Wishlist
        </h1>
        <p className="text-brand-muted text-sm">
          Review your favorite kits and merch, pick your size, and order
          instantly over WhatsApp.
        </p>
      </div>

      {likedProducts.length === 0 ? (
        <div className="text-center py-20 bg-brand-surface border border-brand-border rounded-2xl space-y-4">
          <p className="text-brand-muted text-sm">
            Your wishlist is currently empty. Heart some items while browsing
            the shop!
          </p>
          <Link
            href="/shop"
            className="inline-block bg-brand-primary text-white text-xs font-bold px-6 py-3 rounded-xl hover:bg-brand-hover transition-colors"
          >
            Explore Shop Catalog
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {likedProducts.map((product) => {
            const currentSize = productSizes[product.id] || "M";

            return (
              <div
                key={product.id}
                className="bg-brand-surface border border-brand-border rounded-2xl overflow-hidden shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-64 bg-brand-surface-subtle overflow-hidden flex items-center justify-center">
                    <span className="absolute top-3 left-3 z-10 bg-brand-text text-brand-bg text-xs font-bold px-2.5 py-1 rounded-md shadow-xs">
                      {product.season || "26/27"}
                    </span>
                    <button
                      onClick={() => removeLike(product.id)}
                      className="absolute top-3 right-3 z-10 bg-brand-surface/90 border border-brand-border p-2 rounded-full text-red-500 hover:bg-brand-surface transition-colors cursor-pointer"
                      title="Remove from wishlist"
                    >
                      ❤️
                    </button>
                    <Image
                      src={product.image_url}
                      alt={product.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-contain p-4"
                    />
                  </div>

                  <div className="p-5 space-y-4">
                    <div>
                      <span className="text-xs font-semibold text-brand-muted uppercase tracking-wider">
                        {product.category}
                      </span>
                      <h3 className="font-bold text-brand-text mt-1">
                        {product.title}
                      </h3>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-brand-muted uppercase tracking-wider block">
                        Select Size:{" "}
                        <span className="text-brand-text font-bold">
                          {currentSize}
                        </span>
                      </label>
                      <div className="flex gap-1.5">
                        {sizes.map((sz) => (
                          <button
                            key={sz}
                            onClick={() =>
                              setProductSizes({
                                ...productSizes,
                                [product.id]: sz,
                              })
                            }
                            className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition-colors cursor-pointer ${
                              currentSize === sz
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

                <div className="p-5 pt-0 flex items-center justify-between border-t border-brand-border mt-4">
                  <div>
                    <span className="text-xs text-brand-muted block">
                      Price
                    </span>
                    <span className="text-lg font-extrabold text-brand-primary">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>

                  <button
                    onClick={() => handleWhatsAppCheckout(product)}
                    className="bg-green-600 hover:bg-green-700 text-white font-medium text-xs px-4 py-2.5 rounded-xl transition-colors shadow-xs cursor-pointer"
                  >
                    💬 Order via WhatsApp
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
