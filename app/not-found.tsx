import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#eaf6fb] text-[#123b52] flex flex-col items-center justify-center px-6 py-24 text-center">
      <div className="max-w-md w-full rounded-3xl bg-white/80 p-8 shadow-[0_8px_30px_rgba(18,59,82,0.08)] border border-[#c5e3ec] backdrop-blur-sm">
        <p className="text-xs uppercase tracking-[0.32em] text-[#4f9ec0] font-medium">404 Error</p>
        <h1 className="mt-3 font-serif text-4xl sm:text-5xl text-[#123b52] tracking-tight">Page Not Found</h1>
        <p className="mt-4 text-sm leading-relaxed text-[#5d7c8d]">
          The page or route you are looking for does not exist or access is restricted.
        </p>
        <div className="mt-8 flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-[#123b52] px-6 py-3 text-sm font-medium text-white transition-all hover:bg-[#1a4e6b] hover:shadow-md"
          >
            Return to Sky Blue Cafe
          </Link>
        </div>
      </div>
    </main>
  )
}
