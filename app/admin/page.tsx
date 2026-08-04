"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/client";
import Image from "next/image";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState("");

  const [products, setProducts] = useState<any[]>([]);
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [clicks, setClicks] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("kits");
  const [season, setSeason] = useState("26/27");
  const [price, setPrice] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);

  const supabase = createClient();
  const ADMIN_SECRET = "KITCONNECT4560";

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (passcode === ADMIN_SECRET) {
      setIsAuthenticated(true);
      setAuthError("");
      loadDashboardData();
    } else {
      setAuthError("Incorrect admin passcode.");
    }
  }

  async function loadDashboardData() {
    setFetching(true);

    const { data: prodData } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    const { data: subData } = await supabase
      .from("subscribers")
      .select("*")
      .order("created_at", { ascending: false });

    const { data: clickData } = await supabase
      .from("product_clicks")
      .select("product_id");

    if (prodData) setProducts(prodData);
    if (subData) setSubscribers(subData);
    if (clickData) setClicks(clickData);

    setFetching(false);
  }

  async function handleAddProduct(e: React.FormEvent) {
    e.preventDefault();
    if (!files || files.length === 0) {
      setMessage("Please select at least one image file (Home, Away, etc.).");
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const uploadedUrls: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}_${i}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("kits")
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from("kits")
          .getPublicUrl(fileName);

        uploadedUrls.push(publicUrlData.publicUrl);
      }

      const { error: insertError } = await supabase.from("products").insert([
        {
          title,
          category,
          season,
          price: parseFloat(price),
          image_url: uploadedUrls[0],
          image_gallery: uploadedUrls,
        },
      ]);

      if (insertError) throw insertError;

      setMessage(
        `Product added successfully with ${uploadedUrls.length} kit views! 🎉`,
      );
      setTitle("");
      setPrice("");
      setFiles(null);
      loadDashboardData();
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this product?")) return;

    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) {
      alert(`Error deleting: ${error.message}`);
    } else {
      loadDashboardData();
    }
  }

  const clickCounts = clicks.reduce((acc: any, curr: any) => {
    acc[curr.product_id] = (acc[curr.product_id] || 0) + 1;
    return acc;
  }, {});

  const rankedProducts = [...products].sort((a, b) => {
    return (clickCounts[b.id] || 0) - (clickCounts[a.id] || 0);
  });

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-6 py-24">
        <div className="bg-brand-surface border border-brand-border rounded-2xl p-8 shadow-xs space-y-6">
          <div>
            <span className="text-xs font-semibold text-brand-muted uppercase tracking-wider">
              Restricted Area
            </span>
            <h1 className="text-2xl font-bold text-brand-text mt-1">
              Admin Passkey Required
            </h1>
          </div>

          {authError && (
            <div className="p-3 rounded-xl text-sm bg-red-50 text-red-700 border border-red-200">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Enter passcode"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-2.5 text-sm text-brand-text focus:outline-hidden focus:ring-1 focus:ring-brand-primary"
              required
            />
            <button
              type="submit"
              className="w-full bg-brand-primary text-white font-medium py-2.5 rounded-xl text-sm hover:bg-brand-hover transition-colors cursor-pointer"
            >
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-xs font-semibold text-brand-muted uppercase tracking-wider">
            KitConnect Control Center
          </span>
          <h1 className="text-3xl font-extrabold text-brand-text mt-1">
            Store Performance Dashboard 📊
          </h1>
        </div>
        <button
          onClick={loadDashboardData}
          className="bg-brand-surface border border-brand-border px-4 py-2 rounded-xl text-sm font-medium text-brand-text hover:bg-brand-surface-subtle transition-colors shadow-xs cursor-pointer"
        >
          Refresh Stats
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-brand-surface border border-brand-border rounded-2xl p-6 shadow-xs space-y-2">
          <span className="text-xs font-semibold text-brand-muted uppercase tracking-wider">
            Total Products
          </span>
          <p className="text-3xl font-extrabold text-brand-text">
            {products.length}
          </p>
        </div>
        <div className="bg-brand-surface border border-brand-border rounded-2xl p-6 shadow-xs space-y-2">
          <span className="text-xs font-semibold text-brand-muted uppercase tracking-wider">
            Newsletter Subscribers
          </span>
          <p className="text-3xl font-extrabold text-brand-primary">
            {subscribers.length}
          </p>
        </div>
        <div className="bg-brand-surface border border-brand-border rounded-2xl p-6 shadow-xs space-y-2">
          <span className="text-xs font-semibold text-brand-muted uppercase tracking-wider">
            WhatsApp Inquiries
          </span>
          <p className="text-3xl font-extrabold text-green-600">
            {clicks.length}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Add Product Section with Multiple Images */}
        <div className="bg-brand-surface border border-brand-border rounded-2xl p-8 shadow-xs space-y-6">
          <div>
            <h2 className="text-xl font-bold text-brand-text">
              Publish Multi-Kit Item
            </h2>
            <p className="text-xs text-brand-muted mt-1">
              Select multiple images (Home, Away, Third) to enable kit sliders.
            </p>
          </div>

          {message && (
            <div
              className={`p-4 rounded-xl text-sm ${message.includes("success") ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleAddProduct} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-brand-text uppercase tracking-wider mb-2">
                Product Title
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Manchester City Home/Away/Third"
                className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-2.5 text-sm text-brand-text focus:outline-hidden focus:ring-1 focus:ring-brand-primary"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-brand-text uppercase tracking-wider mb-2">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-brand-bg border border-brand-border rounded-xl px-3 py-2.5 text-sm text-brand-text"
                >
                  <option value="kits">Kits</option>
                  <option value="tracksuits">Tracksuits</option>
                  <option value="croptop">Crop-Top</option>
                  <option value="merch">Merch</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-brand-text uppercase tracking-wider mb-2">
                  Season
                </label>
                <select
                  value={season}
                  onChange={(e) => setSeason(e.target.value)}
                  className="w-full bg-brand-bg border border-brand-border rounded-xl px-3 py-2.5 text-sm text-brand-text"
                >
                  <option value="26/27">26/27</option>
                  <option value="25/26">25/26</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-brand-text uppercase tracking-wider mb-2">
                  Price ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="35.00"
                  className="w-full bg-brand-bg border border-brand-border rounded-xl px-3 py-2.5 text-sm text-brand-text"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-brand-text uppercase tracking-wider mb-2">
                Kit Images (Select multiple: Home, Away, Third...)
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                required
                onChange={(e) => setFiles(e.target.files)}
                className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-2 text-sm text-brand-muted file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-brand-surface-subtle file:text-brand-text cursor-pointer"
              />
              <p className="text-xs text-brand-muted mt-1">
                Hold Ctrl/Cmd to select multiple files at once.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-primary text-white font-medium py-3 rounded-xl text-sm hover:bg-brand-hover transition-colors cursor-pointer disabled:opacity-50"
            >
              {loading ? "Uploading All Views..." : "Publish Multi-Kit Product"}
            </button>
          </form>
        </div>

        {/* Subscribers List */}
        <div className="bg-brand-surface border border-brand-border rounded-2xl p-8 shadow-xs space-y-6">
          <h2 className="text-xl font-bold text-brand-text">
            Subscribers ({subscribers.length})
          </h2>
          <p className="text-sm text-brand-muted">
            Emails collected from footer newsletter signups.
          </p>

          <div className="max-h-72 overflow-y-auto divide-y divide-brand-border border border-brand-border rounded-xl bg-brand-bg p-4 space-y-2">
            {subscribers.length === 0 ? (
              <p className="text-sm text-brand-muted text-center py-4">
                No subscribers yet.
              </p>
            ) : (
              subscribers.map((sub) => (
                <div
                  key={sub.id}
                  className="flex justify-between items-center py-2 text-sm"
                >
                  <span className="text-brand-text font-medium">
                    {sub.email}
                  </span>
                  <span className="text-xs text-brand-muted">
                    {new Date(sub.created_at).toLocaleDateString()}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Inventory Management Table */}
      <div className="bg-brand-surface border border-brand-border rounded-2xl p-8 shadow-xs space-y-6">
        <h2 className="text-xl font-bold text-brand-text">
          Manage Store Inventory
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-brand-border text-xs uppercase tracking-wider text-brand-muted">
                <th className="py-3 px-4">Item</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Season</th>
                <th className="py-3 px-4">Views / Gallery</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border text-sm">
              {products.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-brand-surface-subtle transition-colors"
                >
                  <td className="py-3 px-4 flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-brand-border shrink-0 bg-brand-bg">
                      <Image
                        src={item.image_url}
                        alt={item.title}
                        fill
                        sizes="40px"
                        className="object-contain"
                      />
                    </div>
                    <span className="font-semibold text-brand-text">
                      {item.title}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-brand-muted capitalize">
                    {item.category}
                  </td>
                  <td className="py-3 px-4">
                    <span className="bg-brand-surface-subtle border border-brand-border text-xs px-2 py-1 rounded font-medium">
                      {item.season}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-xs text-brand-muted font-medium">
                      {item.image_gallery
                        ? `${item.image_gallery.length} views`
                        : "1 view"}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-bold text-brand-primary">
                    ${item.price.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-50 text-red-600 border border-red-200 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-red-100 transition-colors cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
