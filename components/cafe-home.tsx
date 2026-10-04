'use client'

import React, { useState, useEffect } from 'react'

function AutoSliderImage({ images, alt }: { images: string[]; alt: string }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (images.length <= 1) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 1600)
    return () => clearInterval(interval)
  }, [images])

  return (
    <div className="relative h-full w-full overflow-hidden">
      {images.map((src, idx) => (
        <img
          key={src}
          src={src}
          alt={`${alt} ${idx + 1}`}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-in-out group-hover:scale-105 ${
            idx === currentIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        />
      ))}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5 px-2.5 py-1 rounded-full bg-[#123b52]/50 backdrop-blur-sm pointer-events-none">
        {images.map((_, idx) => (
          <span
            key={idx}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === currentIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

function LazyVideo({ src, className }: { src: string; className?: string }) {
  const videoRef = React.useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {})
          } else {
            video.pause()
          }
        })
      },
      { threshold: 0.15 }
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <video
      ref={videoRef}
      src={src}
      loop
      muted
      playsInline
      preload="metadata"
      className={className}
    />
  )
}

type Category = 'all' | 'sandwiches' | 'pastas' | 'chinese' | 'desserts' | 'beverages'

interface MenuItem {
  name: string
  category: Category
  description: string
  price: string
  tag?: string
  isVeg?: boolean
}

const menuCategories: { id: Category; label: string }[] = [
  { id: 'all', label: 'All Items' },
  { id: 'sandwiches', label: 'Sandwiches & Burgers' },
  { id: 'pastas', label: 'Pastas' },
  { id: 'chinese', label: 'Chinese' },
  { id: 'desserts', label: 'Desserts' },
  { id: 'beverages', label: 'Brews & Shakes' },
]

const allMenuItems: MenuItem[] = [
  // Sandwiches & Burgers
  {
    name: 'Paneer Tikka Grilled Panini',
    category: 'sandwiches',
    description: 'Herb-marinated paneer, spicy mint chutney, crisp bell peppers & melted mozzarella in pressed bread.',
    price: '₹180',
    tag: 'Bestseller',
    isVeg: true,
  },
  {
    name: 'Truffle Mushroom & Corn Melt',
    category: 'sandwiches',
    description: 'Slow-sautéed button mushrooms, sweet corn, garlic herb aioli & golden cheddar on toasted bread.',
    price: '₹190',
    tag: "Chef's Special",
    isVeg: true,
  },
  {
    name: 'Crispy Peri-Peri Burger',
    category: 'sandwiches',
    description: 'Crunchy golden patty, fiery peri-peri drizzle, house cabbage slaw & sliced cheese in a soft bun.',
    price: '₹170',
    tag: 'Popular',
    isVeg: true,
  },
  {
    name: 'Classic Garden Club Sandwich',
    category: 'sandwiches',
    description: 'Triple-layered toasted bread with crisp cucumber, tomato, herb mayo spread and layered cheddar.',
    price: '₹160',
    isVeg: true,
  },

  // Pastas
  {
    name: 'Creamy Alfredo Penne',
    category: 'pastas',
    description: 'Silky parmesan cream sauce with sautéed zucchini, broccoli, garlic and cracked black pepper.',
    price: '₹220',
    tag: 'Bestseller',
    isVeg: true,
  },
  {
    name: 'Spicy Arrabiata Fusilli',
    category: 'pastas',
    description: 'Fiery San Marzano tomato pomodoro, crushed chili flakes, garlic, fresh basil & extra virgin olive oil.',
    price: '₹200',
    isVeg: true,
  },
  {
    name: 'Signature Pink Sauce Pasta',
    category: 'pastas',
    description: 'The best of both worlds: rich parmesan cream balanced with tangy tomato sugo and Italian herbs.',
    price: '₹230',
    tag: "House Special",
    isVeg: true,
  },
  {
    name: 'Cheesy Baked Lasagna',
    category: 'pastas',
    description: 'Layered pasta sheets with roasted farm vegetables, velvety bechamel and bubbling melted cheese.',
    price: '₹250',
    isVeg: true,
  },

  // Chinese
  {
    name: 'Chili Paneer (Dry / Gravy)',
    category: 'chinese',
    description: 'Crisp cottage cheese cubes wok-tossed with ginger, garlic, crunchy capsicum & dark soy glaze.',
    price: '₹190',
    tag: 'Bestseller',
    isVeg: true,
  },
  {
    name: 'Hakka Street Noodles',
    category: 'chinese',
    description: 'Wok-tossed springy noodles with julienned vegetables, spring onions, light soy & aromatic white pepper.',
    price: '₹170',
    tag: 'Popular',
    isVeg: true,
  },
  {
    name: 'Fiery Schezwan Fried Rice',
    category: 'chinese',
    description: 'Fragrant basmati rice tossed with garden veggies in our fiery house-made schezwan chili sauce.',
    price: '₹180',
    isVeg: true,
  },
  {
    name: 'Crispy Honey Chili Potatoes',
    category: 'chinese',
    description: 'Double-crisped potato fingers tossed in a sticky sweet chili glaze and toasted white sesame seeds.',
    price: '₹160',
    tag: 'Must Try',
    isVeg: true,
  },

  // Desserts
  {
    name: 'Sizzling Brownie with Ice Cream',
    category: 'desserts',
    description: 'Warm, gooey walnut fudge brownie served on a sizzling platter with rich vanilla gelato & hot chocolate fudge.',
    price: '₹190',
    tag: 'Bestseller',
    isVeg: true,
  },
  {
    name: 'Blueberry Glazed Cheesecake',
    category: 'desserts',
    description: 'Velvety New York style baked cheesecake layered with slow-simmered wild blueberry compote.',
    price: '₹210',
    tag: 'Popular',
    isVeg: true,
  },
  {
    name: 'Warm Nutella Waffle',
    category: 'desserts',
    description: 'Crispy golden Belgian waffle generously smothered with Nutella spread, choco chips & whipped cream.',
    price: '₹180',
    isVeg: true,
  },

  // Brews & Shakes
  {
    name: 'Sky Blue Signature Latte',
    category: 'beverages',
    description: 'Handcrafted espresso poured over sweet blue vanilla syrup, velvety chilled milk & silky cold foam.',
    price: '₹160',
    tag: 'Signature',
    isVeg: true,
  },
  {
    name: 'Classic Thick Cold Coffee',
    category: 'beverages',
    description: 'Bold espresso shot blended with chilled milk and a generous scoop of rich vanilla ice cream.',
    price: '₹150',
    tag: 'Bestseller',
    isVeg: true,
  },
  {
    name: 'Belgian Dark Chocolate Shake',
    category: 'beverages',
    description: 'Decadent imported cocoa blended with creamy milk, topped with chocolate curls and fudge drizzle.',
    price: '₹170',
    isVeg: true,
  },
  {
    name: 'Mint Lime Sparkler',
    category: 'beverages',
    description: 'Freshly muddled garden mint leaves, zesty lemon juice, crushed ice and bubbly chilled soda.',
    price: '₹130',
    isVeg: true,
  },
]

interface CustomerReview {
  name: string
  role: string
  rating: number
  tag: string
  comment: string
  initials: string
  date: string
  video?: string
  image?: string
  images?: string[]
}

const customerReviews: CustomerReview[] = [
  {
    name: 'Sneha Patil',
    role: 'BIET College Student',
    rating: 5,
    tag: 'Regular Hangout',
    images: ['/guest-bike.jpg', '/guest-insta.jpg'],
    comment: 'The Pink Sauce Pasta and Sky Blue Latte are literally the best in Davanagere. Perfect peaceful spot to study or chill with friends after college hours!',
    initials: 'SP',
    date: '2 days ago',
  },
  {
    name: 'Karthik Gowda',
    role: 'Birthday Group',
    rating: 5,
    tag: 'Birthday Party',
    video: '/cafe-reel-2.mp4',
    comment: "Celebrated my friend's 20th birthday party here. The rooftop Sky Booth decor, balloon setup, and warm bakes were incredible. Everyone loved the vibe and food!",
    initials: 'KG',
    date: 'Last week',
  },
  {
    name: 'Pooja & Friends',
    role: 'Food Explorer',
    rating: 5,
    tag: 'Must Visit',
    video: '/cafe-reel-3.mp4',
    comment: 'The Chili Paneer and Crispy Peri-Peri Burger were super fresh and flavorful. The ambiance with soft lighting and music makes you want to stay for hours.',
    initials: 'PF',
    date: '2 weeks ago',
  },
]

export function CafeHome() {
  const [activeCategory, setActiveCategory] = useState<Category>('all')

  const filteredItems = activeCategory === 'all'
    ? allMenuItems
    : allMenuItems.filter(item => item.category === activeCategory)

  return (
    <main className="min-h-screen bg-[#eaf6fb] text-[#123b52]">
      {/* Navigation */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <a href="#top" className="font-serif text-2xl tracking-[0.16em]">SKY BLUE</a>
        <div className="hidden items-center gap-8 text-sm tracking-wide md:flex">
          <a href="#gallery" className="transition-colors hover:text-[#4f9ec0]">Gallery</a>
          <a href="#menu" className="transition-colors hover:text-[#4f9ec0]">Menu</a>
          <a href="#reviews" className="transition-colors hover:text-[#4f9ec0]">Reviews</a>
          <a href="#visit" className="transition-colors hover:text-[#4f9ec0]">Visit us</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="top" className="mx-auto flex flex-col gap-8 px-6 pb-20 pt-6 lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-10 lg:pb-24 lg:pt-10 lg:min-h-[calc(100vh-80px)]">
        {/* Seamlessly blended illustration into the background (no artificial card box) */}
        <div className="order-1 lg:order-2 flex items-center justify-center relative max-w-md mx-auto w-full lg:max-w-lg py-2">
          <img
            src="/sky-blue-illustration.jpg"
            alt="Sky Blue Cafe"
            className="w-full h-auto max-h-[260px] sm:max-h-[300px] lg:max-h-[370px] object-contain mix-blend-multiply transition-transform duration-500 hover:scale-[1.02]"
          />
        </div>

        {/* On mobile: Appears right after the picture. On desktop: Appears in left column */}
        <div className="order-2 lg:order-1 max-w-xl">
          <p className="mb-6 text-xs uppercase tracking-[0.32em] text-[#3e7891]">Chinese · Sandwiches · Pastas · Desserts</p>
          <h1 className="font-serif text-6xl leading-[0.95] tracking-[-0.04em] sm:text-7xl lg:text-8xl">
            A little light<br /><em className="font-normal text-[#4f9ec0]">in your day.</em>
          </h1>
          <div className="mt-9 flex flex-wrap gap-4">
            <a href="#menu" className="rounded-full bg-[#123b52] px-6 py-3 text-sm text-white transition-all hover:bg-[#1a4e6b] hover:shadow-md">
              Explore the menu
            </a>
            <a href="#gallery" className="rounded-full border border-[#123b52]/30 px-6 py-3 text-sm text-[#123b52] transition-all hover:bg-white/60">
              View gallery
            </a>
          </div>
        </div>
      </section>

      {/* 1-Page Gallery Section */}
      <section id="gallery" className="border-y border-[#c5e3ec] bg-[#d8f0f6] px-6 py-16 lg:px-10 lg:py-24 lg:min-h-screen lg:flex lg:flex-col lg:justify-center">
        <div className="mx-auto max-w-7xl w-full">
          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.32em] text-[#4f9ec0]">The Space &amp; Vibe</p>
            <h2 className="mt-2 font-serif text-4xl sm:text-5xl text-[#123b52]">Moments at Sky Blue</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                type: 'image',
                src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
                title: "Sunlit Tables",
                desc: "Warm daylight & quiet corners",
              },
              {
                type: 'slider',
                images: ['/events-1.jpg', '/events-2.jpg', '/events-3.jpg'],
                title: 'Events',
                desc: 'Festivals, live DJs & celebrations',
              },
              {
                type: 'video',
                src: "/gallery-video.mp4",
                title: "Cafe Ambiance",
                desc: "Warm lights, calm vibes & cozy corners",
              },
              {
                type: 'slider',
                images: ["/celebrations.jpg", "/celebrations-2.jpg", "/celebrations-3.jpg"],
                title: "Celebrations",
                desc: "Birthdays, festive vibes & happy memories",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl bg-white/70 p-3.5 shadow-[0_8px_30px_rgba(18,59,82,0.06)] border border-[#c5e3ec] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(18,59,82,0.12)]"
              >
                <div className="relative h-60 sm:h-64 lg:h-72 w-full overflow-hidden rounded-2xl bg-[#123b52]/5">
                  {item.type === 'video' && item.src ? (
                    <LazyVideo
                      src={item.src}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : item.type === 'slider' && item.images ? (
                    <AutoSliderImage images={item.images} alt={item.title} />
                  ) : item.src ? (
                    <img
                      src={item.src}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#123b52]/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
                <div className="p-3.5">
                  <h3 className="font-serif text-xl text-[#123b52]">{item.title}</h3>
                  <p className="mt-1 text-xs text-[#668391]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Modern Menu Section */}
      <section id="menu" className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        {/* Menu Heading */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <p className="mb-3 text-xs uppercase tracking-[0.32em] text-[#4f9ec0]">Crafted Fresh Daily</p>
          <h2 className="font-serif text-4xl sm:text-5xl tracking-[-0.03em] text-[#123b52]">Our Cafe Menu</h2>
          <p className="mt-3 text-sm leading-6 text-[#5d7c8d]">
            From sizzling Chinese bowls and grilled artisan paninis to stone-tossed pastas, signature desserts, and handcrafted sips.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="mb-12 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {menuCategories.map((cat) => {
            const isActive = activeCategory === cat.id
            const count = cat.id === 'all'
              ? allMenuItems.length
              : allMenuItems.filter(i => i.category === cat.id).length

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? 'bg-[#123b52] text-white shadow-md shadow-[#123b52]/15 scale-[1.02]'
                    : 'bg-white/70 text-[#123b52] border border-[#c5e3ec] hover:bg-white hover:border-[#83c5db]'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  isActive ? 'bg-white/20 text-white' : 'bg-[#eaf6fb] text-[#4f9ec0]'
                }`}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Menu Cards Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <article
              key={item.name}
              className="group relative flex flex-col justify-between rounded-3xl border border-[#c5e3ec] bg-white/75 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#83c5db] hover:bg-white hover:shadow-[0_12px_30px_rgba(18,59,82,0.08)]"
            >
              <div>
                <div className="mb-3 flex items-center justify-between">
                  {/* Veg indicator symbol */}
                  <div className="flex items-center gap-1.5">
                    <span className="flex h-4 w-4 items-center justify-center rounded-[3px] border border-emerald-600 bg-white">
                      <span className="h-2 w-2 rounded-full bg-emerald-600" />
                    </span>
                    <span className="text-[11px] font-medium uppercase tracking-wider text-emerald-700">Veg</span>
                  </div>

                  {/* Badge Tag */}
                  {item.tag && (
                    <span className="rounded-full bg-[#d8f0f6] px-2.5 py-0.5 text-[11px] font-medium text-[#123b52] border border-[#b8e2ed]">
                      {item.tag}
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-2xl text-[#123b52] group-hover:text-[#4f9ec0] transition-colors">
                  {item.name}
                </h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#668391]">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-[#eaf6fb] pt-4">
                <span className="font-serif text-xl font-bold text-[#123b52]">
                  {item.price}
                </span>
                <span className="text-[11px] uppercase tracking-wider text-[#4f9ec0] font-medium">
                  Freshly Made
                </span>
              </div>
            </article>
          ))}
        </div>

      </section>

      {/* Customer Reviews Section */}
      <section id="reviews" className="border-y border-[#c5e3ec] bg-[#d8f0f6] px-6 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl w-full">
          {/* Header */}
          <div className="mb-10 text-center max-w-2xl mx-auto">
            <p className="mb-3 text-xs uppercase tracking-[0.32em] text-[#4f9ec0]">Customer Experiences · 4.9 ★ Rating</p>
            <h2 className="font-serif text-4xl sm:text-5xl text-[#123b52] tracking-[-0.03em]">Loved by Our Guests</h2>
            <p className="mt-3 text-sm leading-6 text-[#5d7c8d]">
              What students, families, and birthday groups say about their time at Sky Blue Cafe.
            </p>
          </div>

          {/* Reviews Cards Grid */}
          <div className="flex flex-wrap justify-center gap-6">
            {customerReviews.map((review, index) =>
              review.video || review.images || review.image ? (
                <div
                  key={index}
                  className="group relative flex flex-col overflow-hidden rounded-3xl bg-white/70 p-3.5 shadow-[0_8px_30px_rgba(18,59,82,0.06)] border border-[#c5e3ec] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(18,59,82,0.12)] w-full sm:w-[calc(50%-12px)] lg:w-[calc((100%-72px)/4)] h-[346px] sm:h-[362px] lg:h-[394px]"
                >
                  <div className="relative h-full w-full overflow-hidden rounded-2xl bg-[#123b52]/5">
                    {review.video ? (
                      <LazyVideo
                        src={review.video}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : review.images ? (
                      <AutoSliderImage
                        images={review.images}
                        alt={review.name || 'Sky Blue Cafe guest'}
                      />
                    ) : (
                      <img
                        src={review.image}
                        alt={review.name || 'Sky Blue Cafe customer'}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
                  </div>
                </div>
              ) : null
            )}
          </div>

          {/* Visiting with friends / Birthday Banner */}
          <div className="mt-14 rounded-3xl border border-[#c5e3ec] bg-white/75 p-6 sm:p-8 text-center max-w-3xl mx-auto backdrop-blur-sm shadow-xs">
            <p className="font-serif text-2xl text-[#123b52]">Visiting with friends or celebrating a birthday?</p>
            <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#5d7c8d]">
              All our dishes are prepared fresh to order. Customize your spice levels or ask for chef recommendations at the counter.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#visit"
                className="inline-flex items-center gap-2 rounded-full bg-[#123b52] px-6 py-3 text-xs sm:text-sm font-medium text-white transition-all hover:bg-[#1a4e6b] hover:shadow-md"
              >
                Find Us Near BIET College
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="visit" className="bg-[#123b52] px-6 py-16 text-[#eaf6fb] lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-10 md:flex-row md:items-end">
          <div>
            <p className="font-serif text-3xl tracking-[0.16em]">SKY BLUE</p>
            <p className="mt-2 text-sm text-[#7bb8cc]">Chinese · Sandwiches · Pastas · Desserts · Specialty Sips</p>
            <p className="mt-4 text-sm text-[#a9d3df]">
              Near BIET College Road · Davanagere, Karnataka 577004
            </p>
            <p className="mt-1 text-xs text-[#7bb8cc]">
              Instagram: <a href="https://instagram.com/sky_blue_cafe_davanagere" target="_blank" rel="noreferrer" className="underline hover:text-white">@sky_blue_cafe_davanagere</a>
            </p>
          </div>
          <div className="text-sm leading-7 text-[#a9d3df] md:text-right">
            <p className="font-medium text-[#eaf6fb]">Open Everyday · 10:00 AM – 10:30 PM</p>
            <p>Dine-in · Takeaway · Warm Vibes</p>
            <p className="mt-2 text-xs text-[#7bb8cc]">Made with care for every guest.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}

export { CafeHome as default }
