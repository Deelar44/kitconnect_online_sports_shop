import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <span className="inline-block bg-brand-surface-subtle border border-brand-border text-brand-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          Our Story ⚽
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-text">
          About KitConnect
        </h1>
        <p className="text-brand-muted text-sm sm:text-base leading-relaxed">
          Welcome to KitConnect—your ultimate destination for premium football
          kits, official 26/27 season merchandise, custom apparel, and digital
          design services.
        </p>
      </div>

      {/* Content Blocks */}
      <div className="space-y-6">
        <div className="bg-brand-surface border border-brand-border rounded-2xl p-6 sm:p-8 space-y-3 shadow-xs">
          <h2 className="text-xl font-bold text-brand-text">Who We Are</h2>
          <p className="text-sm text-brand-muted leading-relaxed">
            Founded with a passion for football and modern streetwear,
            KitConnect bridges the gap between fans and top-tier matchday gear.
            Whether you are looking for home, away, or third kits, tracksuits,
            crop-tops, or custom merch, we deliver quality you can wear with
            pride.
          </p>
        </div>

        <div className="bg-brand-surface border border-brand-border rounded-2xl p-6 sm:p-8 space-y-3 shadow-xs">
          <h2 className="text-xl font-bold text-brand-text">What We Do</h2>
          <p className="text-sm text-brand-muted leading-relaxed">
            Beyond football jerseys, we specialize in high-precision name and
            number printing, custom apparel, and digital web development/design
            services to help businesses and brands build a powerful online
            presence.
          </p>
        </div>

        <div className="bg-brand-surface border border-brand-border rounded-2xl p-6 sm:p-8 space-y-3 shadow-xs">
          <h2 className="text-xl font-bold text-brand-text">
            Instant WhatsApp Checkout
          </h2>
          <p className="text-sm text-brand-muted leading-relaxed">
            We make shopping seamless. Browse our catalog, select your size,
            build your wishlist, and check out instantly over WhatsApp to
            connect directly with our team for swift fulfillment.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-brand-surface border border-brand-border rounded-2xl p-8 text-center space-y-4 shadow-xs">
        <h3 className="text-lg font-bold text-brand-text">Ready to gear up?</h3>
        <p className="text-sm text-brand-muted max-w-lg mx-auto">
          Explore our latest 26/27 season drops and find your favorite team kit
          today.
        </p>
        <div>
          <Link
            href="/shop"
            className="inline-block bg-brand-primary text-white text-xs font-bold px-8 py-3.5 rounded-xl hover:bg-brand-hover transition-colors shadow-xs"
          >
            Explore Shop Catalog
          </Link>
        </div>
      </div>
    </div>
  );
}
