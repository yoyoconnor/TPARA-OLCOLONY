export type UserRole =
  | "member"
  | "coach"
  | "staff"
  | "division_manager"
  | "executive_manager";

export type Division =
  | "academy"
  | "pro_shop"
  | "grill"
  | "driving_range"
  | "greens"
  | "operations";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  division?: Division;
  avatar?: string;
  phone?: string;
  memberSince: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  interval: "monthly" | "annual";
  features: string[];
}

export interface AcademyClass {
  id: string;
  name: string;
  description: string;
  coach: string;
  coachId: string;
  ageGroup: string;
  skillLevel: string;
  schedule: string;
  spotsTotal: number;
  spotsFilled: number;
  price: number;
  location: string;
}

export interface Coach {
  id: string;
  name: string;
  bio: string;
  specialties: string[];
  certifications: string[];
  rating: number;
  lessonsGiven: number;
  hourlyRate: number;
  availability: string[];
  avatar?: string;
}

export interface TeeTime {
  id: string;
  date: string;
  time: string;
  players: number;
  maxPlayers: number;
  status: "available" | "booked" | "blocked";
  bookedBy?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "appetizer" | "entree" | "sandwich" | "beverage" | "dessert";
  available: boolean;
  popular?: boolean;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "success" | "billing";
  read: boolean;
  createdAt: string;
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  division: Division;
  shift: string;
  status: "active" | "off-duty" | "on-leave";
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  reorderLevel: number;
  price: number;
  division: Division;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: "payment" | "refund" | "commission";
  status: "completed" | "pending" | "failed";
  division: Division;
}
