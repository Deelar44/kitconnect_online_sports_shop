import Link from "next/link";

export default function PrintingGuidelinesPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <span className="inline-block bg-brand-surface-subtle border border-brand-border text-brand-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          KitConnect Production Specs 🖨️
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-text">
          Custom Printing & Design Guidelines
        </h1>
        <p className="text-brand-muted text-sm sm:text-base leading-relaxed">
          To ensure your custom jerseys, name prints, squad numbers, and
          corporate merch turn out razor-sharp, please review our preparation
          and artwork specifications below.
        </p>
      </div>

      {/* Guidelines Sections */}
      <div className="space-y-6">
        {/* Section 1 */}
        <div className="bg-brand-surface border border-brand-border rounded-2xl p-6 sm:p-8 space-y-3 shadow-xs">
          <h2 className="text-xl font-bold text-brand-text flex items-center gap-2">
            <span>1.</span> Artwork & Vector Files
          </h2>
          <p className="text-sm text-brand-muted leading-relaxed">
            For team badges, custom sponsors, and brand logos, we prefer vector
            files (**SVG, AI, EPS, or high-res PDF**). Vector graphics can be
            scaled infinitely without losing quality, ensuring clean edges on
            heat-pressed vinyl and DTG prints.
          </p>
        </div>

        {/* Section 2 */}
        <div className="bg-brand-surface border border-brand-border rounded-2xl p-6 sm:p-8 space-y-3 shadow-xs">
          <h2 className="text-xl font-bold text-brand-text flex items-center gap-2">
            <span>2.</span> Raster Images (PNG / JPG)
          </h2>
          <p className="text-sm text-brand-muted leading-relaxed">
            If you are submitting standalone graphics or photo prints for merch
            (like water bottles or mugs), images must be at least{" "}
            <strong className="text-brand-text">300 DPI</strong> at full print
            size with a transparent background (PNG format preferred) to avoid
            pixelation.
          </p>
        </div>

        {/* Section 3 */}
        <div className="bg-brand-surface border border-brand-border rounded-2xl p-6 sm:p-8 space-y-3 shadow-xs">
          <h2 className="text-xl font-bold text-brand-text flex items-center gap-2">
            <span>3.</span> Color Modes (CMYK vs RGB)
          </h2>
          <p className="text-sm text-brand-muted leading-relaxed">
            While digital screens use RGB colors, our professional printers and
            vinyl cutters utilize CMYK and spot color matching. Subtle color
            shifts may occur between what you see on your phone screen and the
            physical fabric or merchandise.
          </p>
        </div>

        {/* Section 4 */}
        <div className="bg-brand-surface border border-brand-border rounded-2xl p-6 sm:p-8 space-y-3 shadow-xs">
          <h2 className="text-xl font-bold text-brand-text flex items-center gap-2">
            <span>4.</span> Name & Number Printing on Kits
          </h2>
          <p className="text-sm text-brand-muted leading-relaxed">
            When ordering custom squad names and numbers for 26/27 season kits,
            please double-check your spelling and number sequences before
            sending your order via WhatsApp. Custom prints are finalized exactly
            as requested.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-brand-surface border border-brand-border rounded-2xl p-8 text-center space-y-4 shadow-xs">
        <h3 className="text-lg font-bold text-brand-text">
          Have a custom design ready to print?
        </h3>
        <p className="text-sm text-brand-muted max-w-lg mx-auto">
          Send your files or design concepts directly to our team via WhatsApp
          for instant review and a quote.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <a
            href="https://wa.me/263785917383"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-700 text-white text-xs font-bold px-6 py-3 rounded-xl transition-colors shadow-xs"
          >
            Send Files via WhatsApp
          </a>
          <Link
            href="/shop"
            className="bg-brand-surface-subtle border border-brand-border text-brand-text text-xs font-bold px-6 py-3 rounded-xl hover:bg-brand-border transition-colors"
          >
            Browse Shop Catalog
          </Link>
        </div>
      </div>
    </div>
  );
}
