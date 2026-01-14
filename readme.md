# pablo.im

> Custom URL shortener built with Astro and Supabase

<picture>                                                               
  <source media="(prefers-color-scheme: dark)" srcset="https://pablo.im/landing/dark.png"> 
  <img src="https://pablo.im/landing/light.png#gh-light-mode-only">     
</picture>

## Tech Stack

- **Astro 5** with SSR
- **React** for interactive components
- **Supabase** for authentication and database
- **Tailwind CSS** for styling
- **Vercel** for deployment

## Development

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm run dev

# Build for production
pnpm run build

# Preview production build
pnpm run preview
```

## Environment Variables

Copy `.env.example` to `.env` and fill in your Supabase credentials:

```env
PUBLIC_SUPABASE_URL=your_supabase_url
PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```
