import path from "node:path";
import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

// Match Prisma CLI: file:./dev.db is relative to project root
const dbPath = path.join(process.cwd(), "dev.db");
const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // --- Real Staff from golf.tcpara.org/staff ---
  await prisma.staff.createMany({
    data: [
      { name: "John Gray, PGA", title: "Director of Golf", email: "jgray@tcpara.org", division: "operations", shift: "7 AM - 5 PM", status: "active", bio: "Awarded the 2019 Bill Strausbaugh Award from the Alabama/Northwest Florida Section PGA." },
      { name: "Gib Fox", title: "Director of Maintenance", email: "gfox@tcpara.org", division: "greens", shift: "5 AM - 1 PM", status: "active", bio: "Oversees all course maintenance for the Jerry Pate designed 18-hole championship course." },
      { name: "Michael Shivetts", title: "Golf Professional, Director of Player Development", email: "mshivetts@tcpara.org", division: "operations", shift: "8 AM - 5 PM", status: "active", bio: "Performance Consultant specializing in player development using Trackman and V1 Pro technology." },
      { name: "Lisa Martin", title: "Pro Shop Manager", email: "lmartin@tcpara.org", division: "pro_shop", shift: "7 AM - 4 PM", status: "active", bio: "Manages all Pro Shop operations including merchandise, tee times, and member services." },
      { name: "Andy Smelley", title: "Program Director, Junior Golf", email: "asmelley@tcpara.org", division: "academy", shift: "8 AM - 5 PM", status: "active", bio: "Leads the Tuscaloosa Junior Golf Academy programs and curriculum development." },
      { name: "Clay Tyler", title: "Director of Tuscaloosa Junior Golf Tour", email: "ctyler@tcpara.org", division: "academy", shift: "8 AM - 5 PM", status: "active", bio: "Manages the Junior Golf Tour including tournament scheduling and player development pathways." },
      { name: "Leah Price", title: "Food & Beverage Manager", email: "lprice@tcpara.org", division: "grill", shift: "7 AM - 4 PM", status: "active", bio: "Manages the Bounce Back Grille including menu development, staff, and catering services." },
      { name: "Bob Montgomery, PGA", title: "Equipment Fitting Specialist", email: "bmontgomery@tcpara.org", division: "pro_shop", shift: "9 AM - 4 PM", status: "active", bio: "PGA-certified equipment fitting specialist providing custom club fitting services." },
    ],
  });

  // --- Coaches (based on real staff) ---
  const coachAndy = await prisma.coach.create({
    data: {
      name: "Andy Smelley",
      email: "asmelley@tcpara.org",
      bio: "Program Director for the Tuscaloosa Junior Golf Academy. Designs curriculum around age levels and ability, creating a comfortable and fun learning environment for all junior golfers.",
      specialties: JSON.stringify(["Junior Development", "Curriculum Design", "Tournament Prep", "Player Pathway"]),
      certifications: JSON.stringify(["PGA Professional", "US Kids Golf Certified"]),
      rating: 4.9,
      lessonsGiven: 1842,
      hourlyRate: 85,
      availability: JSON.stringify(["Mon-Fri 8AM-5PM", "Sat 8AM-12PM"]),
    },
  });

  const coachMichael = await prisma.coach.create({
    data: {
      name: "Michael Shivetts",
      email: "mshivetts@tcpara.org",
      bio: "Golf Professional and Director of Player Development. Performance Consultant utilizing the Brion Hardin Teaching Facility with Trackman Launch Monitor, V1 Pro Software, and Explaner Plane System.",
      specialties: JSON.stringify(["Swing Analysis", "Trackman Coaching", "Player Development", "Club Fitting"]),
      certifications: JSON.stringify(["PGA Professional", "Trackman Certified", "V1 Pro Certified"]),
      rating: 4.85,
      lessonsGiven: 1256,
      hourlyRate: 95,
      availability: JSON.stringify(["Mon-Fri 8AM-5PM", "Sat 9AM-2PM"]),
    },
  });

  const coachClay = await prisma.coach.create({
    data: {
      name: "Clay Tyler",
      email: "ctyler@tcpara.org",
      bio: "Director of the Tuscaloosa Junior Golf Tour. Focuses on providing on-course experience in low-pressure settings to help juniors develop competitive skills and course management.",
      specialties: JSON.stringify(["Tournament Direction", "Course Management", "Competitive Play", "Mental Game"]),
      certifications: JSON.stringify(["PGA Associate", "First Tee Certified"]),
      rating: 4.9,
      lessonsGiven: 978,
      hourlyRate: 80,
      availability: JSON.stringify(["Mon-Fri 8AM-5PM", "Sat 7AM-1PM"]),
    },
  });

  const coachBob = await prisma.coach.create({
    data: {
      name: "Bob Montgomery, PGA",
      email: "bmontgomery@tcpara.org",
      bio: "PGA-certified Equipment Fitting Specialist. Expert in custom club fitting and equipment optimization for golfers of all skill levels.",
      specialties: JSON.stringify(["Equipment Fitting", "Club Selection", "Full Swing", "Adult Instruction"]),
      certifications: JSON.stringify(["PGA Professional", "Callaway Certified Fitter", "Titleist Certified Fitter"]),
      rating: 4.8,
      lessonsGiven: 645,
      hourlyRate: 75,
      availability: JSON.stringify(["Mon-Sat 9AM-4PM"]),
    },
  });

  // --- Membership & Fees from golf.tcpara.org/membership ---
  await prisma.membershipPlan.createMany({
    data: [
      {
        name: "ParaPro Membership",
        description: "Ol' Colony Golf Unlimited, PARA Tennis, All-Inclusive PARA, Bowers Park Pool. Billed on the 5th of each month.",
        price: 199,
        interval: "monthly",
        features: JSON.stringify([
          "Ol' Colony Golf Unlimited Membership",
          "PARA Tennis Membership",
          "All-Inclusive PARA Membership",
          "Bowers Park Pool Summer Membership",
          "$25 registration fee (one-time) · $60 annual non-resident fee (waived in Tuscaloosa County)",
          "$25/month per additional family member",
          "Senior (62+): 10% off · Youth (3–15): 10% off · Ages 2 & under: FREE",
        ]),
        sortOrder: 1,
      },
      {
        name: "Annual Pass — Unlimited",
        description: "$1800 ($170/month). Monday–Sunday. Month-to-month with yearly contract. 30-day written notice to cancel.",
        price: 1800,
        interval: "annual",
        features: JSON.stringify([
          "$25 — 18 hole cart · $15 — 9 hole cart",
          "20% off soft goods · 10% off hard goods",
          "$2 off large range baskets",
          "$40 USGA GHIN handicap service",
          "Present membership at time of purchase",
        ]),
        sortOrder: 2,
      },
      {
        name: "Annual Pass — Senior (62+)",
        description: "$1375 ($130/month). Monday–Friday only. Ages 62 & older.",
        price: 1375,
        interval: "annual",
        features: JSON.stringify([
          "Monday–Friday unlimited access",
          "Same cart & merchandise discounts as Unlimited",
          "$2 off large range baskets",
          "$40 USGA GHIN handicap service",
        ]),
        sortOrder: 3,
      },
      {
        name: "Annual Pass — Student",
        description: "$750 per semester. Enrolled students.",
        price: 750,
        interval: "semester",
        features: JSON.stringify([
          "Full semester access",
          "Cart & merchandise discounts",
          "Range basket discounts",
        ]),
        sortOrder: 4,
      },
      {
        name: "Annual Pass — Junior",
        description: "$750 per year. Age 17 & under.",
        price: 750,
        interval: "annual",
        features: JSON.stringify([
          "Year-round access",
          "Cart & merchandise discounts",
          "TJGA program discounts",
        ]),
        sortOrder: 5,
      },
    ],
  });

  // --- Academy Classes based on TJGA programs ---
  await prisma.academyClass.createMany({
    data: [
      {
        name: "TJGA Introduction to Golf",
        description: "First exposure to golf through fun, age-appropriate activities. Learn grip, stance, and basic swing in a safe environment.",
        coachId: coachAndy.id,
        ageGroup: "5-7",
        skillLevel: "Beginner",
        schedule: "Saturdays 9:00 AM",
        spotsTotal: 12,
        spotsFilled: 9,
        price: 45,
        location: "Practice Green & Short Course",
      },
      {
        name: "TJGA Junior Fundamentals",
        description: "Building core skills: full swing, short game, rules of the game and golf etiquette. Fun drills and games incorporated into every class.",
        coachId: coachAndy.id,
        ageGroup: "8-11",
        skillLevel: "Beginner-Intermediate",
        schedule: "Tues/Thurs 4:00 PM",
        spotsTotal: 10,
        spotsFilled: 8,
        price: 65,
        location: "Brion Hardin Teaching Facility",
      },
      {
        name: "TJGA Competitive Prep",
        description: "Tournament preparation, course strategy, mental game, and advanced techniques for junior golfers aspiring to compete.",
        coachId: coachClay.id,
        ageGroup: "12-17",
        skillLevel: "Intermediate-Advanced",
        schedule: "Mon/Wed/Fri 3:30 PM",
        spotsTotal: 8,
        spotsFilled: 7,
        price: 95,
        location: "Ol' Colony Championship Course",
      },
      {
        name: "TJGA Short Game Mastery",
        description: "Focused training on putting, chipping, and bunker play. From tee to green, participants learn every aspect of the short game.",
        coachId: coachAndy.id,
        ageGroup: "8-17",
        skillLevel: "All Levels",
        schedule: "Wednesdays 5:00 PM",
        spotsTotal: 10,
        spotsFilled: 5,
        price: 55,
        location: "Short Game Area",
      },
      {
        name: "Trackman Junior Lab",
        description: "Technology-enhanced instruction at the Brion Hardin Teaching Facility using Trackman Launch Monitor and V1 Pro Software for data-driven improvement.",
        coachId: coachMichael.id,
        ageGroup: "10-17",
        skillLevel: "Intermediate+",
        schedule: "Fridays 4:00 PM",
        spotsTotal: 6,
        spotsFilled: 6,
        price: 85,
        location: "Brion Hardin Teaching Facility",
      },
      {
        name: "Junior Golf Tour Prep",
        description: "On-course experience in a low-pressure setting. Gain competitive skills, course management, and tournament readiness.",
        coachId: coachClay.id,
        ageGroup: "10-17",
        skillLevel: "Intermediate",
        schedule: "Saturdays 8:00 AM",
        spotsTotal: 16,
        spotsFilled: 12,
        price: 40,
        location: "Ol' Colony Championship Course",
      },
    ],
  });

  // --- Real Greens Fees from golf.tcpara.org/rates ---
  await prisma.greensFee.createMany({
    data: [
      { category: "regular_weekday", description: "18 Holes with Cart (Mon-Thu)", price: 63, notes: "Tuscaloosa County resident discount available", sortOrder: 1 },
      { category: "regular_weekday", description: "18 Holes Walking (Mon-Thu)", price: 47, sortOrder: 2 },
      { category: "regular_weekday", description: "9 Holes with Cart (Mon-Thu)", price: 47, sortOrder: 3 },
      { category: "regular_weekday", description: "9 Holes Walking (Mon-Thu)", price: 37, sortOrder: 4 },
      { category: "regular_weekend", description: "18 Holes with Cart (Weekends & Holidays)", price: 74, notes: "Tuscaloosa County resident discount available", sortOrder: 5 },
      { category: "regular_weekend", description: "18 Holes Walking (Weekends, after 1PM)", price: 57, sortOrder: 6 },
      { category: "regular_weekend", description: "9 Holes with Cart (Weekends & Holidays)", price: 57, sortOrder: 7 },
      { category: "regular_weekend", description: "9 Holes Walking (Weekends, after 1PM)", price: 47, sortOrder: 8 },
      { category: "junior", description: "18 Holes with Cart (17 & Under)", price: 45, notes: "Must be 16+ with valid license to drive cart", sortOrder: 9 },
      { category: "junior", description: "18 Holes Walking (17 & Under)", price: 30, sortOrder: 10 },
      { category: "junior", description: "9 Holes with Cart (17 & Under)", price: 30, sortOrder: 11 },
      { category: "junior", description: "9 Holes Walking (17 & Under)", price: 20, sortOrder: 12 },
      { category: "tjga", description: "18 Holes with Cart (TJGA Member)", price: 25, notes: "Must present key fob", sortOrder: 13 },
      { category: "tjga", description: "18 Holes Walking (TJGA Member)", price: 10, sortOrder: 14 },
      { category: "tjga", description: "9 Holes with Cart (TJGA Member)", price: 20, sortOrder: 15 },
      { category: "tjga", description: "9 Holes Walking (TJGA Member)", price: 10, sortOrder: 16 },
    ],
  });

  // --- Real Driving Range Fees from golf.tcpara.org/membership ---
  await prisma.rangeFee.createMany({
    data: [
      { size: "Small", balls: 30, price: 7, memberPrice: 7 },
      { size: "Medium", balls: 60, price: 13, memberPrice: 13 },
      { size: "Large", balls: 100, price: 19, memberPrice: 16 },
    ],
  });

  // --- Bounce Back Grille Menu from golf.tcpara.org/bounce-back-grille ---
  await prisma.menuItem.createMany({
    data: [
      { name: "Breakfast Plate", description: "Eggs, bacon or sausage, grits, and toast", price: 8.99, category: "breakfast", available: true, popular: true, sortOrder: 1 },
      { name: "Biscuit & Gravy", description: "Homemade biscuit with sausage gravy", price: 5.99, category: "breakfast", available: true, sortOrder: 2 },
      { name: "Breakfast Sandwich", description: "Egg, cheese, and choice of meat on toast", price: 6.99, category: "breakfast", available: true, sortOrder: 3 },
      { name: "Bounce Back Burger", description: "Angus patty with lettuce, tomato, onion, and pickles", price: 9.99, category: "entree", available: true, popular: true, sortOrder: 4 },
      { name: "Grilled Chicken Sandwich", description: "Grilled chicken breast with lettuce, tomato, and honey mustard", price: 9.99, category: "sandwich", available: true, popular: true, sortOrder: 5 },
      { name: "Club Sandwich", description: "Turkey, ham, bacon, lettuce, tomato on toasted bread", price: 10.99, category: "sandwich", available: true, sortOrder: 6 },
      { name: "BLT", description: "Crispy bacon, lettuce, and tomato on toasted bread", price: 7.99, category: "sandwich", available: true, sortOrder: 7 },
      { name: "Hot Dog", description: "All-beef hot dog with your choice of toppings", price: 4.99, category: "entree", available: true, sortOrder: 8 },
      { name: "Chicken Tenders", description: "Hand-breaded chicken tenders with fries", price: 8.99, category: "entree", available: true, sortOrder: 9 },
      { name: "French Fries", description: "Golden crispy french fries", price: 3.99, category: "snack", available: true, sortOrder: 10 },
      { name: "Onion Rings", description: "Beer-battered onion rings", price: 4.99, category: "snack", available: true, sortOrder: 11 },
      { name: "Golden Flake Chips", description: "Assorted chip flavors", price: 1.99, category: "snack", available: true, sortOrder: 12 },
      { name: "Crackers", description: "Assorted crackers", price: 1.50, category: "snack", available: true, sortOrder: 13 },
      { name: "Candy Bar", description: "Assorted candy bars", price: 2.00, category: "snack", available: true, sortOrder: 14 },
      { name: "Blue Bell Ice Cream", description: "Assorted Blue Bell ice cream products", price: 3.50, category: "snack", available: true, sortOrder: 15 },
      { name: "Beer (Domestic)", description: "Single domestic beer", price: 4.00, category: "beer", available: true, sortOrder: 16 },
      { name: "Beer 6-Pack (Domestic)", description: "6-pack domestic beer", price: 20.00, category: "beer", available: true, sortOrder: 17 },
      { name: "Craft Beer", description: "Single craft beer selection", price: 4.50, category: "beer", available: true, sortOrder: 18 },
      { name: "Craft Beer 6-Pack", description: "6-pack craft beer", price: 22.00, category: "beer", available: true, sortOrder: 19 },
      { name: "Seltzer", description: "Hard seltzer", price: 4.50, category: "beer", available: true, sortOrder: 20 },
      { name: "Seltzer 6-Pack", description: "6-pack hard seltzer", price: 22.00, category: "beer", available: true, sortOrder: 21 },
      { name: "Premium Liquor", description: "Jack, Crown, or Tito's", price: 8.00, category: "liquor", available: true, sortOrder: 22 },
      { name: "Well Liquor", description: "Fireball, Seagram's, Bacardi, Smirnoff, Dewar's, Jim Beam, Cuervo", price: 6.00, category: "liquor", available: true, sortOrder: 23 },
      { name: "Mixed Drink Add-On", description: "Add mixer to any liquor", price: 1.00, category: "liquor", available: true, sortOrder: 24 },
      { name: "Energy Drink", description: "Assorted energy drinks", price: 3.50, category: "beverage", available: true, sortOrder: 25 },
      { name: "Gold Leaf Bottled Tea", description: "Bottled tea selection", price: 2.50, category: "beverage", available: true, sortOrder: 26 },
      { name: "Fountain Drink", description: "Soft drink, sweet tea, or water", price: 2.00, category: "beverage", available: true, sortOrder: 27 },
    ],
  });

  // --- Tee Times for upcoming days ---
  const teeTimesData = [];
  const dates = ["2026-03-02", "2026-03-03", "2026-03-04"];
  const times = ["7:00 AM", "7:12 AM", "7:24 AM", "7:36 AM", "7:48 AM", "8:00 AM", "8:12 AM", "8:24 AM", "8:36 AM", "8:48 AM", "9:00 AM", "9:12 AM", "9:24 AM", "9:36 AM", "9:48 AM", "10:00 AM"];

  for (const date of dates) {
    for (const time of times) {
      const rand = Math.random();
      const status = rand < 0.4 ? "booked" : rand < 0.05 ? "blocked" : "available";
      teeTimesData.push({
        date,
        time,
        players: status === "booked" ? Math.floor(Math.random() * 3) + 2 : 0,
        maxPlayers: 4,
        status,
        bookedBy: status === "booked" ? ["Johnson Party", "Smith/Chen", "Williams Group", "Corporate Outing", "Walk-in"][Math.floor(Math.random() * 5)] : null,
      });
    }
  }
  await prisma.teeTime.createMany({ data: teeTimesData });

  // --- Inventory ---
  await prisma.inventoryItem.createMany({
    data: [
      { name: "Titleist Pro V1 (Dozen)", category: "Golf Balls", quantity: 45, reorderLevel: 20, price: 54.99, division: "pro_shop" },
      { name: "Callaway Chrome Soft (Dozen)", category: "Golf Balls", quantity: 30, reorderLevel: 15, price: 47.99, division: "pro_shop" },
      { name: "Ol' Colony Logo Polo", category: "Apparel", quantity: 32, reorderLevel: 10, price: 45.00, division: "pro_shop" },
      { name: "Ol' Colony Logo Hat", category: "Apparel", quantity: 28, reorderLevel: 10, price: 28.00, division: "pro_shop" },
      { name: "Golf Gloves (Medium)", category: "Accessories", quantity: 15, reorderLevel: 8, price: 18.99, division: "pro_shop" },
      { name: "Golf Gloves (Large)", category: "Accessories", quantity: 12, reorderLevel: 8, price: 18.99, division: "pro_shop" },
      { name: "Range Ball Basket (Large)", category: "Range Supplies", quantity: 180, reorderLevel: 50, price: 19.00, division: "driving_range" },
      { name: "Range Ball Basket (Medium)", category: "Range Supplies", quantity: 200, reorderLevel: 50, price: 13.00, division: "driving_range" },
      { name: "Angus Patties (Case)", category: "Food", quantity: 12, reorderLevel: 5, price: 89.00, division: "grill" },
      { name: "Chicken Breast (Case)", category: "Food", quantity: 8, reorderLevel: 4, price: 64.00, division: "grill" },
      { name: "Domestic Beer (Case)", category: "Beverage", quantity: 10, reorderLevel: 4, price: 28.00, division: "grill" },
      { name: "Craft Beer (Case)", category: "Beverage", quantity: 6, reorderLevel: 3, price: 36.00, division: "grill" },
    ],
  });

  // --- Course Conditions ---
  await prisma.courseCondition.createMany({
    data: [
      { area: "Greens (Bermuda)", condition: "Excellent", speed: "10.5 Stimp", details: "Cut at 0.125 inches, rolled daily" },
      { area: "Fairways (Bermuda)", condition: "Good", speed: null, details: "Cut at 0.5 inches, well maintained" },
      { area: "Tee Boxes", condition: "Good", speed: null, details: "Divot repair in progress" },
      { area: "Bunkers", condition: "Excellent", speed: null, details: "All raked and edged" },
      { area: "Rough", condition: "Good", speed: null, details: "Cut at 1.5 inches" },
      { area: "Lakes (25 acres)", condition: "Good", speed: null, details: "Water features in play on several holes" },
    ],
  });

  // --- Maintenance Tasks ---
  await prisma.maintenanceTask.createMany({
    data: [
      { task: "Mow Fairways (Holes 1-9)", assignee: "Gib Fox", status: "completed", priority: "high" },
      { task: "Mow Fairways (Holes 10-18)", assignee: "Grounds Crew", status: "in_progress", priority: "high" },
      { task: "Aerate Greens (Front 9)", assignee: "Gib Fox", status: "scheduled", priority: "medium" },
      { task: "Bunker Raking - All Bunkers", assignee: "Grounds Crew", status: "completed", priority: "high" },
      { task: "Irrigation System Check - Zone B", assignee: "Gib Fox", status: "scheduled", priority: "medium" },
      { task: "Divot Repair - Tee Boxes", assignee: "Grounds Crew", status: "in_progress", priority: "low" },
      { task: "Lake Edge Maintenance", assignee: "Grounds Crew", status: "scheduled", priority: "low" },
      { task: "Chemical Application - Fungicide", assignee: "Gib Fox", status: "completed", priority: "high" },
    ],
  });

  // --- Sample Transactions ---
  await prisma.transaction.createMany({
    data: [
      { date: "2026-03-01", description: "ParaPro Membership - Johnson Family", amount: 199.00, type: "payment", status: "completed", division: "operations" },
      { date: "2026-03-01", description: "Private Lesson - Michael Shivetts", amount: 95.00, type: "payment", status: "completed", division: "academy" },
      { date: "2026-03-01", description: "Commission - Michael Shivetts (15%)", amount: -14.25, type: "commission", status: "completed", division: "academy" },
      { date: "2026-02-28", description: "Pro V1 Golf Balls (2 Dozen)", amount: 109.98, type: "payment", status: "completed", division: "pro_shop" },
      { date: "2026-02-28", description: "Bounce Back Grille - Daily Total", amount: 487.50, type: "payment", status: "completed", division: "grill" },
      { date: "2026-02-28", description: "TJGA Spring Registration (x5)", amount: 645.00, type: "payment", status: "completed", division: "academy" },
      { date: "2026-02-27", description: "Range Baskets (25 Large)", amount: 475.00, type: "payment", status: "completed", division: "driving_range" },
      { date: "2026-02-27", description: "Refund - Cancelled Lesson", amount: -95.00, type: "refund", status: "completed", division: "academy" },
      { date: "2026-02-26", description: "Unlimited Annual Pass - New Member", amount: 1800.00, type: "payment", status: "completed", division: "operations" },
      { date: "2026-02-26", description: "18 Holes w/ Cart (Weekend x4)", amount: 296.00, type: "payment", status: "completed", division: "operations" },
    ],
  });

  // --- Notifications ---
  const notif1 = await prisma.notification.create({
    data: { title: "Tee Time Reminder", message: "Your tee time is tomorrow at 8:30 AM. Check in at the Pro Shop 15 minutes early. Call 205-562-3201 with questions.", type: "info", global: false },
  });
  const notif2 = await prisma.notification.create({
    data: { title: "Payment Successful", message: "Your monthly ParaPro membership payment of $199.00 has been processed successfully.", type: "success", global: false },
  });
  const notif3 = await prisma.notification.create({
    data: { title: "TJGA Spring Schedule Updated", message: "The Spring 2026 Class Schedule has been posted. Visit the Junior Golf page for details and registration.", type: "info", global: true },
  });
  const notif4 = await prisma.notification.create({
    data: { title: "Tuscaloosa Toyota Classic", message: "Registration for the Tuscaloosa Toyota Classic Golf Tournament is now open. Play the same course as Epson Tour professionals!", type: "info", global: true },
  });
  const notif5 = await prisma.notification.create({
    data: { title: "Bounce Back Grille - New Menu", message: "The Bounce Back Grille has updated its menu with new breakfast and lunch options. Breakfast 7-10:30AM, Lunch 10:30AM-3PM.", type: "info", global: true },
  });

  // --- Demo Users ---
  const memberUser = await prisma.user.create({
    data: {
      email: "alex@example.com",
      name: "Alex Thompson",
      phone: "(205) 555-0142",
      role: "member",
      passwordHash: "demo",
      experience: "intermediate",
    },
  });

  await prisma.userNotification.createMany({
    data: [
      { userId: memberUser.id, notificationId: notif1.id, read: false },
      { userId: memberUser.id, notificationId: notif2.id, read: false },
      { userId: memberUser.id, notificationId: notif3.id, read: true },
      { userId: memberUser.id, notificationId: notif4.id, read: true },
      { userId: memberUser.id, notificationId: notif5.id, read: false },
    ],
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
