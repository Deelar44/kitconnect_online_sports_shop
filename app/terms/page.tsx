import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <span className="inline-block bg-brand-surface-subtle border border-brand-border text-brand-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          Legal & Policies 📜
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-text">
          Terms and Conditions
        </h1>
        <p className="text-brand-muted text-sm sm:text-base leading-relaxed">
          Please read these terms and conditions carefully before using
          KitConnect or placing orders via our platform.
        </p>
      </div>

      {/* Terms Sections */}
      <div className="space-y-6">
        <div className="bg-brand-surface border border-brand-border rounded-2xl p-6 sm:p-8 space-y-3 shadow-xs">
          <h2 className="text-xl font-bold text-brand-text">
            1. Acceptance of Terms
          </h2>
          <p className="text-sm text-brand-muted leading-relaxed">
            By accessing and using this website, you accept and agree to be
            bound by the terms and provision of this agreement. If you do not
            agree to abide by these terms, please do not use this site.
          </p>
        </div>

        <div className="bg-brand-surface border border-brand-border rounded-2xl p-6 sm:p-8 space-y-3 shadow-xs">
          <h2 className="text-xl font-bold text-brand-text">
            2. WhatsApp Orders & Inquiries
          </h2>
          <p className="text-sm text-brand-muted leading-relaxed">
            KitConnect utilizes WhatsApp as an instant checkout and inquiry
            channel. Clicking "Order via WhatsApp" transmits your selected item
            details, size, and pricing to our sales team. Orders are finalized
            and confirmed directly through WhatsApp communication.
          </p>
        </div>

        <div className="bg-brand-surface border border-brand-border rounded-2xl p-6 sm:p-8 space-y-3 shadow-xs">
          <h2 className="text-xl font-bold text-brand-text">
            3. Pricing & Inventory
          </h2>
          <p className="text-sm text-brand-muted leading-relaxed">
            All prices listed on the store are subject to change without notice.
            We reserve the right at any time to modify or discontinue products
            or services without notice. We shall not be liable to you or any
            third-party for any modification, price change, or discontinuation.
          </p>
        </div>

        <div className="bg-brand-surface border border-brand-border rounded-2xl p-6 sm:p-8 space-y-3 shadow-xs">
          <h2 className="text-xl font-bold text-brand-text">
            4. Custom Printing Policy
          </h2>
          <p className="text-sm text-brand-muted leading-relaxed">
            For custom name and number printing or custom merch orders,
            customers are responsible for verifying spelling and design specs
            prior to final confirmation on WhatsApp. Customized items cannot be
            returned or refunded unless defective.
          </p>
        </div>

        <div className="bg-brand-surface border border-brand-border rounded-2xl p-6 sm:p-8 space-y-3 shadow-xs">
          <h2 className="text-xl font-bold text-brand-text">
            5. Contact Information
          </h2>
          <p className="text-sm text-brand-muted leading-relaxed">
            If you have any questions about these Terms and Conditions, you can
            reach out to us directly via our WhatsApp support channel or check
            our main pages.
          </p>
        </div>
      </div>

      {/* Back to Shop */}
      <div className="text-center pt-4">
        <Link
          href="/shop"
          className="inline-block bg-brand-surface-subtle border border-brand-border text-brand-text text-xs font-bold px-6 py-3 rounded-xl hover:bg-brand-border transition-colors"
        >
          ← Return to Shop
        </Link>
      </div>
    </div>
  );
}
