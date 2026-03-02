/** Ol' Colony Golf Complex — 18 holes, Tuscaloosa AL. Approximate hole info for map display. */
export interface HoleInfo {
  number: number;
  par: number;
  yards: number;
  /** Optional: water (W), bunker (B), dogleg (L/R) for 3D hint */
  features?: string[];
}

export const OL_COLONY_HOLES: HoleInfo[] = [
  { number: 1, par: 4, yards: 385, features: ["B"] },
  { number: 2, par: 5, yards: 512, features: ["B", "W"] },
  { number: 3, par: 3, yards: 167, features: ["B"] },
  { number: 4, par: 4, yards: 428, features: ["B"] },
  { number: 5, par: 4, yards: 351, features: [] },
  { number: 6, par: 5, yards: 548, features: ["W"] },
  { number: 7, par: 3, yards: 142, features: ["B"] },
  { number: 8, par: 4, yards: 398, features: ["B", "L"] },
  { number: 9, par: 4, yards: 445, features: ["W", "B"] },
  { number: 10, par: 4, yards: 402, features: ["B"] },
  { number: 11, par: 3, yards: 185, features: ["W", "B"] },
  { number: 12, par: 5, yards: 535, features: ["B"] },
  { number: 13, par: 4, yards: 368, features: [] },
  { number: 14, par: 4, yards: 412, features: ["B", "R"] },
  { number: 15, par: 3, yards: 158, features: ["B"] },
  { number: 16, par: 5, yards: 522, features: ["W", "B"] },
  { number: 17, par: 4, yards: 391, features: ["B"] },
  { number: 18, par: 4, yards: 438, features: ["W", "B"] },
];

export const COURSE_LOCATION = {
  name: "Ol' Colony Golf Complex",
  address: "401 Old Colony Road, Tuscaloosa, AL 35406",
  /** Approximate center for map embed */
  lat: 33.213,
  lng: -87.568,
};
