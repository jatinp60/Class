# WorldSip

WorldSip is a static, Vercel-ready beverage discovery storefront with curated boxes, individual drinks, cart, discounts, checkout UI, reviews, FAQ, and a browser-persistent community feed/chat.

## Deploy to Vercel

### Option 1 — GitHub
1. Create a new GitHub repository.
2. Upload all files from this folder to the repository root.
3. In Vercel, choose **Add New → Project**.
4. Import the GitHub repository.
5. Framework Preset: **Other**.
6. Build Command: leave empty.
7. Output Directory: leave empty.
8. Deploy.

### Option 2 — Vercel CLI
```bash
npx vercel
```

## Local preview
Open `index.html` directly, or run:
```bash
npm run dev
```

## Current architecture
- Pure static HTML/CSS/JavaScript
- No build step
- No dependencies required for production
- Cart, discount state, community posts, comments, and chat are stored in `localStorage`
- Works on Vercel as a static site

## Important
The storefront UI and checkout flow are production-style, but real payment processing, inventory, order persistence, authentication, and multi-user real-time community chat require backend services. The current community system is browser-local and the checkout does not charge cards.

To make commerce live, connect a payment provider such as Stripe and a backend/database. For real community accounts/chat, connect a hosted database/realtime service such as Supabase or Firebase.
