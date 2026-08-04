# KitConnect ⚽

KitConnect is a modern, full-stack e-commerce web application built for football fans and sports apparel enthusiasts. It features official 26/27 and 25/26 season team kits, tracksuits, crop-top jerseys, custom merchandise, an interactive multi-image kit slider, wishlist management, and instant WhatsApp checkout with analytics tracking.

---

## 🚀 Key Features

- **Interactive Catalog & Multi-Kit Sliders:** Browse gear by categories (Kits, Tracksuits, Crop-Tops, Merch) and view multi-angle kit views (Home, Away, Third).
- **Size Customization:** Select sizes (`S`, `M`, `L`, `XL`, `XXL`) directly on product cards and wishlists.
- **Instant WhatsApp Checkout:** Seamlessly transmits item details, sizes, seasons, and prices directly to WhatsApp.
- **Wishlist & Likes:** Save your favorite items with a modern heart toggle and manage them on your dedicated wishlist page.
- **User Profiles & Order History:** Secure Google OAuth authentication via Supabase with tracked customer order history.
- **Admin Dashboard:** Passcode-protected control center to upload multi-image products, view newsletter subscribers, track WhatsApp conversion clicks, and manage inventory.
- **Support & Legal Pages:** Includes About Us, Terms & Conditions, and Custom Printing Guidelines.

---

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router, Server Actions, Turbopack)
- **Styling:** Tailwind CSS (Custom Athletic Theme)
- **Database & Auth:** Supabase (PostgreSQL, Row Level Security, SSR Auth, Storage Buckets)
- **Language:** TypeScript / React

---

## 📦 Project Structure

```text
kitconnect_online_sports_shop/
├── app/
│   ├── about/          # About Us page
│   ├── admin/          # Admin
│   ├── printing-guidelines/ # Custom printing specs
│   ├── profile/        # User account & order history
│   ├── shop/           # Main interactive catalog
│   ├── terms/          # Terms & Conditions
│   ├── wishlist/       # Saved liked items
│   ├── layout.tsx      # Root layout with Auth & Navbar
│   ├── page.tsx        # Homepage (Hero & Trending sections)
│   └── globals.css     # Global styles & custom athletic theme
├── components/
│   ├── AuthProvider.tsx # Supabase Auth context provider
│   ├── Navbar.tsx      # Responsive navigation bar & mobile menu
│   └── ...
├── lib/
│   └── client.ts       # Supabase client setup
└── next.config.js      # Next.js remote image configurations
```
