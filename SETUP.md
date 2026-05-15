# Senpai Spot — Complete Setup Guide

## ✅ Your Blog ID is Already Connected

Blog ID **5909176973464303118** is pre-configured in `.env.local`.
Just install dependencies and run:

```bash
# 1. Install dependencies
npm install

# 2. Start — your real Blogger posts load automatically
npm run dev
```

Open **http://localhost:3000** — your live posts appear immediately.

---

## Connect Your Blogger Blog (reference)

### Option A — RSS Feed (Recommended, No API Key Needed)

1. Open `.env.local`
2. Set `NEXT_PUBLIC_BLOGGER_URL=https://YOURBLOGNAME.blogspot.com`
3. Restart the dev server: `npm run dev`

The site will now pull posts from your Blogger RSS feed automatically.

**Requirements:**
- Your Blogger blog must be **public** (not private)
- Posts must be published (not drafts)
- The JSON feed URL format: `https://yourblog.blogspot.com/feeds/posts/default?alt=json`

### Option B — Blogger API v3 (For More Features)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a project → Enable **Blogger API v3**
3. Create credentials → API Key (restrict to Blogger API)
4. Find your Blog ID: Blogger Dashboard → Settings → Basic → Blog ID
5. Add to `.env.local`:
   ```
   BLOGGER_API_KEY=your_api_key_here
   BLOGGER_BLOG_ID=your_blog_id_here
   ```

---

## Categories / Labels Setup

Senpai Spot maps Blogger **labels** to categories automatically:

| Blogger Label | Senpai Spot Category |
|---|---|
| `reviews`     | Reviews Page     |
| `manga`       | Manga Page       |
| `anime-news`  | Anime News Page  |
| `trending`    | Trending Page    |

**How to set up:** In Blogger, label your posts with any of these labels and they'll appear in the correct category pages.

---

## Running Locally

```bash
npm run dev      # Development server (http://localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## Deploy to Vercel

### Method 1: Vercel CLI
```bash
npm install -g vercel
vercel login
vercel --prod
```

### Method 2: GitHub + Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repository
4. Add these **Environment Variables** (copy-paste ready):

| Name | Value |
|---|---|
| `BLOGGER_BLOG_ID` | `5909176973464303118` |
| `NEXT_PUBLIC_BLOGGER_URL` | *(leave blank — auto-derived from Blog ID)* |
| `NEXT_PUBLIC_SITE_URL` | `https://yourdomain.com` |
| `NEXT_PUBLIC_SITE_NAME` | `Senpai Spot` |
| `BLOGGER_API_KEY` | *(optional — leave blank)* |

5. Click **Deploy**

**Custom Domain:** Vercel Dashboard → Settings → Domains → Add domain

---

## Update Content

Content is pulled live from your Blogger blog with a 5-minute cache. To update:

1. **Write posts in Blogger:** Go to [blogger.com](https://blogger.com) → New Post
2. **Add labels** to categorize posts (see Categories section above)
3. **Publish** — the site auto-updates within 5 minutes (or instantly in dev)

**Force refresh in production:** Trigger a new deployment on Vercel, or wait for the cache to expire (5 min for posts, 1 hour for categories).

---

## Project Structure

```
senpai-spot/
├── app/
│   ├── layout.tsx              # Root layout (Navbar, Footer, Particles)
│   ├── page.tsx                # Home page
│   ├── anime-news/page.tsx     # Anime News listing
│   ├── reviews/page.tsx        # Reviews listing
│   ├── manga/page.tsx          # Manga listing
│   ├── trending/page.tsx       # Trending page
│   ├── about/page.tsx          # About page
│   ├── contact/page.tsx        # Contact form
│   ├── search/page.tsx         # Search results
│   ├── post/[slug]/page.tsx    # Single post page
│   ├── not-found.tsx           # Custom 404
│   ├── sitemap.ts              # Auto-generated sitemap
│   ├── robots.ts               # Robots.txt
│   └── api/
│       ├── posts/route.ts      # Posts API endpoint
│       └── search/route.ts     # Search API endpoint
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Sticky navbar with search
│   │   ├── Footer.tsx          # Site footer
│   │   └── Sidebar.tsx         # Blog sidebar widget
│   ├── ui/
│   │   ├── PostCard.tsx        # Post card (3 variants)
│   │   ├── FeaturedPostCard.tsx # Hero-style card
│   │   ├── SkeletonLoader.tsx  # Loading skeletons
│   │   ├── BackToTop.tsx       # Scroll-to-top button
│   │   ├── ReadingProgress.tsx # Top reading progress bar
│   │   ├── SearchBar.tsx       # Search input
│   │   └── Pagination.tsx      # Page navigation
│   ├── sections/
│   │   ├── HeroSection.tsx     # Home page hero
│   │   └── SectionHeader.tsx   # Reusable section heading
│   └── animations/
│       ├── LoadingScreen.tsx   # Initial loading screen
│       ├── PageTransition.tsx  # Page fade transitions
│       ├── ScrollReveal.tsx    # Scroll-triggered reveals
│       └── ParticleBackground.tsx # Floating particle canvas
├── lib/
│   ├── blogger.ts              # Blogger API/RSS integration
│   ├── utils.ts                # Helper utilities
│   └── config.ts               # Site configuration
├── types/
│   └── index.ts                # TypeScript interfaces
├── .env.example                # Environment variable template
├── .env.local.example          # Local env template (copy to .env.local)
├── next.config.ts              # Next.js config
├── tailwind.config.ts          # Tailwind theme
├── vercel.json                 # Vercel deployment config
└── package.json
```

---

## SEO Features

- ✅ Auto-generated `sitemap.xml` with all posts
- ✅ `robots.txt` with correct rules
- ✅ Open Graph meta tags on every page
- ✅ Twitter Card meta tags
- ✅ Dynamic `<title>` and `<description>` per page/post
- ✅ Schema-ready article metadata
- ✅ Next.js ISR (incremental static regeneration) for performance

---

## Performance Features

- ✅ Server Components (no client JS overhead for static content)
- ✅ ISR caching (5–10 minute cache, instant CDN delivery)
- ✅ Next.js Image optimization with WebP/AVIF
- ✅ Lazy loading for all images
- ✅ Particle canvas runs at 30fps with automatic particle count scaling
- ✅ Framer Motion only loaded on interactive components

---

## Customization

### Change Theme Colors
Edit `tailwind.config.ts` → `theme.extend.colors.orange`:
```ts
'500': '#ff7a00',  // Change this to your preferred accent color
```
Also update CSS variables in `app/globals.css`:
```css
--orange-primary: #ff7a00;
```

### Change Site Name
1. Update `NEXT_PUBLIC_SITE_NAME` in `.env.local`
2. Search & replace `Senpai Spot` in `app/layout.tsx` and `lib/config.ts`

### Add New Category Pages
Duplicate `app/anime-news/page.tsx` and change the `getPostsByCategory` label.

### Add Google Analytics
Set `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX` in `.env.local`.
Then add the GA script in `app/layout.tsx`.
