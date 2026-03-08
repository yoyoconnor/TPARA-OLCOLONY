import Link from "next/link";
import Logo from "@/components/logo";
import {
  GraduationCap,
  ShoppingBag,
  UtensilsCrossed,
  Target,
  Calendar,
  Users,
  TrendingUp,
  Heart,
  CreditCard,
  Star,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
} from "lucide-react";

const divisions = [
  {
    icon: GraduationCap,
    title: "Junior Golf Academy",
    description:
      "Comprehensive youth programs from ages 5-16 with certified PGA instructors, Trackman technology, and tournament preparation.",
    href: "/dashboard/academy",
  },
  {
    icon: ShoppingBag,
    title: "Golf Operations & Pro Shop",
    description:
      "Book tee times, browse equipment and apparel, and access all golf operations from one place.",
    href: "/dashboard/pro-shop",
  },
  {
    icon: UtensilsCrossed,
    title: "The Grill",
    description:
      "Enjoy our full-service grill featuring Southern favorites, craft beverages, and member-exclusive pricing.",
    href: "/dashboard/grill",
  },
  {
    icon: Target,
    title: "Driving Range",
    description:
      "Practice facilities with covered bays, Trackman technology, and group/individual range sessions.",
    href: "/dashboard/driving-range",
  },
];

const features = [
  { icon: Calendar, title: "Online Booking", description: "Reserve tee times, lessons, and classes with just a few clicks" },
  { icon: Users, title: "Expert Coaching", description: "PGA-certified instructors with Trackman and V1 Pro technology" },
  { icon: TrendingUp, title: "Performance Tracking", description: "Monitor progress with detailed analytics and skill assessments" },
  { icon: Heart, title: "Member Community", description: "Tournaments, events, and a vibrant golf community in Tuscaloosa" },
  { icon: CreditCard, title: "Flexible Plans", description: "Monthly, annual, family, and junior memberships to fit every golfer" },
  { icon: Star, title: "Family Friendly", description: "Programs for all ages from Little Links to adult group lessons" },
];

// Membership & Fees from golf.tcpara.org/membership
const plans = [
  {
    name: "ParaPro Membership",
    price: 199,
    interval: "mo",
    features: [
      "Ol' Colony Golf Unlimited",
      "PARA Tennis + Bowers Park Pool",
      "All-Inclusive PARA Membership",
      "$25 one-time registration",
      "$25/mo per additional family member",
      "Senior (62+) & Youth (3–15): 10% off · Ages 2 & under: FREE",
    ],
    note: "Billed on the 5th of each month. $60 annual non-resident fee (waived if you live or work in Tuscaloosa County).",
    popular: true,
  },
  {
    name: "Annual Pass — Unlimited",
    price: 1800,
    interval: "yr",
    features: [
      "Monday–Sunday unlimited play",
      "$25 cart (18 holes) · $15 cart (9 holes)",
      "20% off soft goods · 10% off hard goods",
      "$2 off large range baskets",
      "$40 USGA GHIN handicap service",
    ],
    note: "Month-to-month with yearly contract. 30-day written notice to cancel.",
  },
  {
    name: "Annual Pass — Senior (62+)",
    price: 1375,
    interval: "yr",
    features: [
      "Monday–Friday unlimited play",
      "Same cart & merchandise discounts",
      "$2 off large range baskets",
      "USGA GHIN handicap service",
    ],
    note: "Ages 62 & older.",
  },
  {
    name: "Annual Pass — Student / Junior",
    price: 750,
    interval: "semester / yr",
    features: [
      "Student: $750 per semester",
      "Junior: $750 per year",
      "Full access within plan terms",
      "Cart & merchandise discounts",
    ],
    note: "Student or Junior rates. Present ID at purchase.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Sticky header - modern PARA-style */}
      <header className="sticky top-0 z-50 border-b border-[rgba(78,50,39,0.08)] bg-white/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <Logo size="sm" shape="toast" />
            <span className="font-bold text-[var(--brand-brown)] hidden sm:inline">Ol&apos; Colony Golf</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#divisions" className="text-sm font-medium text-[var(--brand-brown)]/80 hover:text-[var(--brand-brown)] transition-colors">Programs</a>
            <a href="#membership" className="text-sm font-medium text-[var(--brand-brown)]/80 hover:text-[var(--brand-brown)] transition-colors">Membership</a>
            <a href="#contact" className="text-sm font-medium text-[var(--brand-brown)]/80 hover:text-[var(--brand-brown)] transition-colors">Contact</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-[var(--brand-brown)] hover:text-[var(--brand-green)] transition-colors"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="brand-button-primary inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition-all"
            >
              Join
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section - Forward Together / Find Your Path */}
      <section className="brand-shell relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.18) 0%, transparent 34%), radial-gradient(circle at 80% 25%, rgba(120,162,47,0.2) 0%, transparent 28%), radial-gradient(circle at 75% 80%, rgba(78,50,39,0.15) 0%, transparent 24%)",
          }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/70 mb-4">
              A PARA Property
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-5">
              Find your path.
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 mb-2 font-medium">
              Ol&apos; Colony Golf Course
            </p>
            <p className="text-lg text-white/75 mb-8 max-w-xl">
              Golf, academy, pro shop, and grill — one place. Join the community and explore programs, tee times, and memberships.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/register"
                className="brand-button-primary inline-flex items-center justify-center gap-2 rounded-xl px-8 py-3.5 text-lg font-semibold transition-all"
              >
                Become a Member
                <ChevronRight className="w-5 h-5" />
              </Link>
              <a
                href="#divisions"
                className="brand-button-secondary inline-flex items-center justify-center gap-2 rounded-xl px-8 py-3.5 text-lg font-semibold transition-all"
              >
                Explore Programs
              </a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Explore Programs - like tcpara.org */}
      <section id="divisions" className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-[var(--brand-green)] mb-2">Explore</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--brand-brown)] mb-3">
              Programs &amp; divisions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From junior academy to pro shop and grill — find what fits you.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {divisions.map((div) => (
              <Link
                key={div.title}
                href={div.href}
                className="group relative rounded-2xl border border-[rgba(78,50,39,0.1)] bg-white p-6 transition-all duration-300 hover:border-[rgba(120,162,47,0.4)] hover:shadow-xl hover:-translate-y-0.5"
              >
                <div className="absolute left-0 right-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-[var(--brand-brown)] to-[var(--brand-green)]" />
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--brand-cream)] transition-colors group-hover:bg-[var(--brand-green)] group-hover:text-white">
                  <div.icon className="h-6 w-6 text-[var(--brand-brown)] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {div.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {div.description}
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-[var(--brand-green)] transition-all group-hover:gap-2">
                  Learn more <ChevronRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why join - modern card grid */}
      <section id="features" className="bg-[rgba(247,241,231,0.6)] py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-[var(--brand-green)] mb-2">Why join</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--brand-brown)] mb-3">
              One platform. Full experience.
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Book tee times, lessons, and classes; shop the pro shop; order from the grill — all in one place.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="flex gap-4">
                <div className="shrink-0 w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-[rgba(78,50,39,0.1)]">
                  <feature.icon className="w-5 h-5 text-[var(--brand-green)]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Section */}
      <section id="membership" className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-[var(--brand-green)] mb-2">Membership</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--brand-brown)] mb-3">
              Explore a PARA membership
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Golf-only or full PARA access — choose the plan that fits. All include this platform.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-xl p-6 ${
                  plan.popular
                    ? "text-white shadow-xl"
                    : "bg-white border border-[rgba(78,50,39,0.1)]"
                }`}
                style={
                  plan.popular
                    ? {
                        background:
                          "linear-gradient(145deg, var(--brand-brown) 0%, #3d5c2e 55%, var(--brand-green) 100%)",
                      }
                    : undefined
                }
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-xl bg-[var(--brand-green)] px-3 py-1 text-xs font-bold text-white">
                    BEST VALUE
                  </div>
                )}
                <h3
                  className={`font-semibold text-lg mb-2 ${
                    plan.popular ? "text-white" : "text-gray-900"
                  }`}
                >
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <span
                    className={`text-3xl font-bold ${
                      plan.popular ? "text-white" : "text-gray-900"
                    }`}
                  >
                    ${plan.price}
                  </span>
                  <span
                    className={
                      plan.popular ? "text-white/70" : "text-gray-500"
                    }
                  >
                    /{plan.interval}
                  </span>
                </div>
                {plan.note && (
                  <p className={`text-xs mb-3 ${plan.popular ? "text-white/78" : "text-gray-500"}`}>
                    {plan.note}
                  </p>
                )}
                <ul className="space-y-2 mb-6 flex-1">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className={`flex items-start gap-2 text-sm ${
                        plan.popular ? "text-white/88" : "text-gray-600"
                      }`}
                    >
                      <svg
                        className={`w-4 h-4 mt-0.5 shrink-0 ${
                          plan.popular ? "text-[var(--brand-green)]/90" : "text-[var(--brand-green)]"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/register"
                  className={`mt-auto block text-center py-2.5 rounded-xl font-medium text-sm transition-colors ${
                    plan.popular
                      ? "bg-white text-[var(--brand-brown)] hover:bg-[var(--brand-cream)]"
                      : "brand-button-primary text-white"
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA + Footer - single merged gradient */}
      <footer id="contact" className="brand-shell text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-14 pb-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Join as a PARA member today
          </h2>
          <p className="text-lg text-white/85 mb-5 max-w-xl mx-auto">
            Ol&apos; Colony Golf — one of seven PARA activity centers. Register online and get started.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="brand-button-primary inline-flex items-center justify-center gap-2 rounded-xl px-8 py-3.5 font-semibold transition-all"
            >
              Create account
            </Link>
            <Link
              href="/login"
              className="brand-button-secondary inline-flex items-center justify-center rounded-xl px-8 py-3.5 font-semibold transition-all"
            >
              Sign in
            </Link>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Logo size="sm" light shape="toast" />
                <span className="font-bold text-white">Ol&apos; Colony Golf</span>
              </div>
              <p className="text-xs uppercase tracking-wider text-white/60 mb-1.5">A PARA Property</p>
              <p className="text-sm leading-relaxed text-white/68">
                Tuscaloosa County Parks &amp; Recreation Authority. Quality golf, academy, and community.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-3">Site links</h4>
              <ul className="space-y-1.5">
                <li>
                  <a href="https://www.tcpara.org/" target="_blank" rel="noopener noreferrer" className="text-sm text-white/68 hover:text-[var(--brand-green)] transition-colors">
                    tcpara.org
                  </a>
                </li>
                <li>
                  <Link href="/" className="text-sm text-white/68 hover:text-[var(--brand-green)] transition-colors">
                    Ol&apos; Colony Golf Course
                  </Link>
                </li>
                <li>
                  <a href="https://www.tcpara.org/" target="_blank" rel="noopener noreferrer" className="text-sm text-white/68 hover:text-[var(--brand-green)] transition-colors">
                    Tennis Center
                  </a>
                </li>
                <li>
                  <a href="https://www.tuscaloosa.com/" target="_blank" rel="noopener noreferrer" className="text-sm text-white/68 hover:text-[var(--brand-green)] transition-colors">
                    Tuscaloosa City
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-3">Contact</h4>
              <ul className="space-y-2 text-sm text-white/68">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 shrink-0 text-white/50" />
                  205-562-3220
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 shrink-0 text-white/50" />
                  webtrac@tcpara.org
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-white/50" />
                  123 Colony Drive, Tuscaloosa, AL 35401
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-3">Hours</h4>
              <ul className="space-y-1.5 text-sm text-white/68">
                <li>Office: 8am–5pm, Mon–Fri</li>
                <li>Course: Mon–Fri 6am–7pm</li>
                <li>Sat 6am–6pm · Sun 7am–5pm</li>
                <li className="pt-1.5 text-[var(--brand-green)]">Grill: 10am–6pm daily</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row">
            <p className="text-sm text-white/46">
              © {new Date().getFullYear()} Ol&apos; Colony Golf Course. A PARA property.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-sm text-white/46">
              <a href="https://www.tcpara.org/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--brand-green)] transition-colors">
                Tuscaloosa County Parks &amp; Recreation Authority
              </a>
              <a href="https://thecontech.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--brand-green)] transition-colors">
                Built by Contech
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
