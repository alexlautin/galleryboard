# GalleryBoard

GalleryBoard is a collaborative classroom whiteboard platform built with Next.js, Supabase, and shadcn/ui. Teachers can create rooms, students can join with a code, and everyone gets a real-time, private whiteboard. Teachers can view live previews of all student boards.

## Features
- Create and join classroom rooms with unique codes
- Real-time whiteboard for each student
- Live preview of student boards for teachers
- Anonymous name generation for students
- Responsive, modern UI with Tailwind CSS and shadcn/ui
- Cloudflare Turnstile for anti-bot protection

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm, yarn, or pnpm
- Supabase project (with tables: `classrooms`, `classroom_students`, `drawing_updates`)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/galleryboard.git
   cd galleryboard
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Configure environment variables:**
   - Copy `.env.local.example` to `.env.local` and fill in your Supabase and Turnstile keys.
   - Required variables:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `NEXT_PUBLIC_TURNSTILE_SITE_KEY`

4. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open the app:**
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure
- `app/` - Next.js app directory (pages, layouts, components)
- `lib/` - Supabase client and helpers
- `components/` - UI primitives and shared components
- `public/` - Static assets (favicon, logo, etc.)

## Deployment
Deploy easily on [Vercel](https://vercel.com/) or your preferred platform. See [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying).

## License
MIT

---

Made by Alex Lautin, Andy Blumberg, and Jake Floch
