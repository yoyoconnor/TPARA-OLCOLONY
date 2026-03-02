import Link from "next/link";
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
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-800 via-green-900 to-green-950">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(201,168,76,0.1) 0%, transparent 50%)",
          }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-100 text-sm font-medium">
                A Tuscaloosa Parks &amp; Recreation Association Property
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Welcome to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-200">
                Ol&apos; Colony
              </span>{" "}
              Golf Course
            </h1>
            <p className="text-lg sm:text-xl text-green-100/80 mb-8 leading-relaxed max-w-2xl">
              Your complete golf experience — from junior academy programs and
              expert coaching to tee times, pro shop, and grill. All managed
              through one unified platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-500 hover:to-yellow-600 text-white px-8 py-3.5 rounded-lg font-semibold text-lg transition-all shadow-lg shadow-yellow-900/20"
              >
                Become a Member
                <ChevronRight className="w-5 h-5" />
              </Link>
              <a
                href="#divisions"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/30 hover:border-white/60 text-white px-8 py-3.5 rounded-lg font-semibold text-lg transition-all"
              >
                Explore Programs
              </a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Course image — featured on the page */}
      <section className="bg-gray-50 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
            The course
          </h2>
          <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200/80">
            <img
              src="/hero-bg.jpg"
              alt="Ol' Colony Golf Course — scenic view of the course with water and greens"
              className="w-full aspect-video object-cover"
            />
          </div>
        </div>
      </section>

      {/* Divisions Section */}
      <section id="divisions" className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our Divisions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From youth development to daily operations, every aspect of
              Ol&apos; Colony is designed for an exceptional golf experience.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {divisions.map((div) => (
              <div
                key={div.title}
                className="group relative bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-green-200 transition-all duration-300"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-600 to-green-400 rounded-t-xl" />
                <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-100 transition-colors">
                  <div.icon className="w-6 h-6 text-green-700" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {div.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {div.description}
                </p>
                <span className="inline-flex items-center gap-1 text-green-700 text-sm font-medium group-hover:gap-2 transition-all">
                  Learn More <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 sm:py-28 bg-green-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Ol&apos; Colony?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need for a complete golf experience, powered by
              modern technology and expert staff.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="flex gap-4">
                <div className="shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <feature.icon className="w-5 h-5 text-green-700" />
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
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Membership Plans
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose the plan that fits your game. All memberships include access
              to our unified platform.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-xl p-6 ${
                  plan.popular
                    ? "bg-green-800 text-white ring-2 ring-green-600 shadow-xl"
                    : "bg-white border border-gray-200"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full">
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
                      plan.popular ? "text-green-200" : "text-gray-500"
                    }
                  >
                    /{plan.interval}
                  </span>
                </div>
                {plan.note && (
                  <p className={`text-xs mb-3 ${plan.popular ? "text-green-200/90" : "text-gray-500"}`}>
                    {plan.note}
                  </p>
                )}
                <ul className="space-y-2 mb-6">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className={`flex items-start gap-2 text-sm ${
                        plan.popular ? "text-green-100" : "text-gray-600"
                      }`}
                    >
                      <svg
                        className={`w-4 h-4 mt-0.5 shrink-0 ${
                          plan.popular ? "text-green-300" : "text-green-600"
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
                  className={`block text-center py-2.5 rounded-lg font-medium text-sm transition-colors ${
                    plan.popular
                      ? "bg-white text-green-800 hover:bg-green-50"
                      : "bg-green-700 text-white hover:bg-green-800"
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-green-800 to-green-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Elevate Your Game?
          </h2>
          <p className="text-lg text-green-100/80 mb-8 max-w-2xl mx-auto">
            Join hundreds of members who trust Ol&apos; Colony for golf, dining,
            coaching, and community in Tuscaloosa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-500 hover:to-yellow-600 text-white px-8 py-3.5 rounded-lg font-semibold transition-all"
            >
              Create Your Account
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center border-2 border-white/30 hover:border-white/60 text-white px-8 py-3.5 rounded-lg font-semibold transition-all"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-green-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-green-700 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">OC</span>
                </div>
                <span className="font-bold text-lg">Ol&apos; Colony</span>
              </div>
              <p className="text-green-300/70 text-sm leading-relaxed">
                A Tuscaloosa Parks and Recreation Association property. Serving
                the Tuscaloosa community with quality golf experiences since
                1972.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {["Programs", "Membership", "Tee Times", "Academy", "Pro Shop", "The Grill"].map(
                  (link) => (
                    <li key={link}>
                      <a href="#" className="text-green-300/70 hover:text-white text-sm transition-colors">
                        {link}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-green-300/70 text-sm">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                  123 Colony Drive, Tuscaloosa, AL 35401
                </li>
                <li className="flex items-center gap-2 text-green-300/70 text-sm">
                  <Phone className="w-4 h-4 shrink-0" />
                  (205) 555-0100
                </li>
                <li className="flex items-center gap-2 text-green-300/70 text-sm">
                  <Mail className="w-4 h-4 shrink-0" />
                  info@olcolonygolf.com
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Hours</h4>
              <ul className="space-y-2 text-green-300/70 text-sm">
                <li>Mon–Fri: 6:00 AM – 7:00 PM</li>
                <li>Saturday: 6:00 AM – 6:00 PM</li>
                <li>Sunday: 7:00 AM – 5:00 PM</li>
                <li className="pt-2 text-green-400">Grill: 10 AM – 6 PM Daily</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-green-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-green-400/60 text-sm">
              © 2026 Ol&apos; Colony Golf Course. All rights reserved.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-sm">
              <p className="text-green-400/60">
                A TPARA Property · Tuscaloosa Parks &amp; Recreation Association
              </p>
              <a
                href="https://thecontech.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-400/60 hover:text-green-300 transition-colors"
              >
                Built by Contech
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
