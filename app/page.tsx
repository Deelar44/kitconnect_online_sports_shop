import Link from "next/link";
import Image from "next/image";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function getHomePageData() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set() {},
        remove() {},
      },
    },
  );

  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  const { data: clicks } = await supabase
    .from("product_clicks")
    .select("product_id");

  return {
    products: products || [],
    clicks: clicks || [],
  };
}

export default async function Home() {
  const { products, clicks } = await getHomePageData();

  const clickCounts = clicks.reduce((acc: any, curr: any) => {
    acc[curr.product_id] = (acc[curr.product_id] || 0) + 1;
    return acc;
  }, {});

  const trendingProducts = [...products].sort((a, b) => {
    return (clickCounts[b.id] || 0) - (clickCounts[a.id] || 0);
  });

  async function handleWhatsAppOrder(formData: FormData) {
    "use server";
    const productId = formData.get("productId")?.toString();
    const productTitle = formData.get("productTitle")?.toString();
    const productSeason = formData.get("productSeason")?.toString();

    if (productId) {
      const cookieStore = await cookies();
      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
        {
          cookies: {
            get(name: string) {
              return cookieStore.get(name)?.value;
            },
            set() {},
            remove() {},
          },
        },
      );

      await supabase.from("product_clicks").insert([{ product_id: productId }]);
    }

    const whatsappNumber = "263785917383";
    const message = encodeURIComponent(
      `Hi KitConnect, I'm interested in ordering the ${productSeason || "26/27"} season item: ${productTitle}`,
    );
    redirect(`https://wa.me/${whatsappNumber}?text=${message}`);
  }

  return (
    <div className="space-y-16 pb-16">
      {/* Dynamic Hero Section */}
      <section className="relative bg-brand-surface border-b border-brand-border py-24 px-6 lg:px-8 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <span className="inline-block bg-brand-surface-subtle border border-brand-border text-brand-primary text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
            Official 26/27 Season Drops ⚽
          </span>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-brand-text leading-tight">
            Elite Team Kits &{" "}
            <span className="text-brand-primary">Matchday Gear</span>
          </h1>
          <p className="text-base sm:text-lg text-brand-muted max-w-2xl mx-auto leading-relaxed">
            Gear up with official home, away, and third kits, premium
            tracksuits, crop-tops, and custom merch. Instant WhatsApp checkout
            with size customization.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link
              href="/shop"
              className="bg-brand-primary text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow-md hover:bg-brand-hover transition-colors"
            >
              Shop Full Catalog
            </Link>
            <a
              href="https://wa.me/263785917383"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-surface border border-brand-border text-brand-text px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-brand-surface-subtle transition-colors"
            >
              Direct WhatsApp Inquiry
            </a>
          </div>
        </div>
      </section>

      {/* Trending / Most Selling Section */}
      {trendingProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 lg:px-8 space-y-6">
          <div className="flex justify-between items-end border-b border-brand-border pb-4">
            <div>
              <span className="text-xs font-semibold text-brand-primary uppercase tracking-wider">
                Customer Favorites
              </span>
              <h2 className="text-2xl font-extrabold text-brand-text mt-0.5">
                Trending & Most Selling
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-xs font-semibold text-brand-muted hover:text-brand-text transition-colors"
            >
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.slice(0, 4).map((product) => (
              <div
                key={product.id}
                className="bg-brand-surface border border-brand-border rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-shadow group flex flex-col justify-between"
              >
                <div className="relative h-64 bg-brand-surface-subtle overflow-hidden flex items-center justify-center">
                  <span className="absolute top-3 left-3 z-10 bg-brand-primary text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-xs">
                    Trending
                  </span>
                  <span className="absolute top-3 right-3 z-10 bg-brand-text text-brand-bg text-xs font-bold px-2.5 py-1 rounded-md shadow-xs">
                    {product.season || "26/27"}
                  </span>
                  <Image
                    src={product.image_url}
                    alt={product.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-contain p-4 group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="p-5 space-y-3">
                  <div>
                    <span className="text-xs font-semibold text-brand-muted uppercase tracking-wider">
                      {product.category}
                    </span>
                    <h3 className="font-bold text-brand-text mt-1">
                      {product.title}
                    </h3>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-base font-extrabold text-brand-primary">
                      ${product.price.toFixed(2)}
                    </span>
                    <form action={handleWhatsAppOrder}>
                      <input
                        type="hidden"
                        name="productId"
                        value={product.id}
                      />
                      <input
                        type="hidden"
                        name="productTitle"
                        value={product.title}
                      />
                      <input
                        type="hidden"
                        name="productSeason"
                        value={product.season}
                      />
                      <button
                        type="submit"
                        className="bg-brand-surface-subtle border border-brand-border hover:bg-brand-primary hover:text-white text-brand-text text-xs font-semibold px-3 py-2 rounded-lg transition-colors cursor-pointer"
                      >
                        Order via WhatsApp
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Newest Arrivals Catalog Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 space-y-6">
        <div className="flex justify-between items-end border-b border-brand-border pb-4">
          <div>
            <span className="text-xs font-semibold text-brand-muted uppercase tracking-wider">
              Fresh Inventory
            </span>
            <h2 className="text-2xl font-extrabold text-brand-text mt-0.5">
              New Arrivals
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs font-semibold text-brand-primary hover:underline"
          >
            Browse Shop →
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-16 bg-brand-surface border border-brand-border rounded-2xl">
            <p className="text-brand-muted text-sm">
              No products found. Add items via your{" "}
              <Link href="/admin" className="text-brand-primary underline">
                Admin Dashboard
              </Link>
              !
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 8).map((product) => (
              <div
                key={product.id}
                className="bg-brand-surface border border-brand-border rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-shadow group flex flex-col justify-between"
              >
                <div className="relative h-64 bg-brand-surface-subtle overflow-hidden flex items-center justify-center">
                  <span className="absolute top-3 right-3 z-10 bg-brand-text text-brand-bg text-xs font-bold px-2.5 py-1 rounded-md shadow-xs">
                    {product.season || "26/27"}
                  </span>
                  <Image
                    src={product.image_url}
                    alt={product.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-contain p-4 group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="p-5 space-y-3">
                  <div>
                    <span className="text-xs font-semibold text-brand-muted uppercase tracking-wider">
                      {product.category}
                    </span>
                    <h3 className="font-bold text-brand-text mt-1">
                      {product.title}
                    </h3>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-base font-extrabold text-brand-primary">
                      ${product.price.toFixed(2)}
                    </span>
                    <form action={handleWhatsAppOrder}>
                      <input
                        type="hidden"
                        name="productId"
                        value={product.id}
                      />
                      <input
                        type="hidden"
                        name="productTitle"
                        value={product.title}
                      />
                      <input
                        type="hidden"
                        name="productSeason"
                        value={product.season}
                      />
                      <button
                        type="submit"
                        className="bg-brand-surface-subtle border border-brand-border hover:bg-brand-primary hover:text-white text-brand-text text-xs font-semibold px-3 py-2 rounded-lg transition-colors cursor-pointer"
                      >
                        Order via WhatsApp
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
