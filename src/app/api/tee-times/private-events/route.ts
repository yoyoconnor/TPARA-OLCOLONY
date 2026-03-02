import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

/** GET ?date=YYYY-MM-DD — list private events for a date */
export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get("date");
  if (!date) {
    return NextResponse.json({ error: "Query param date (YYYY-MM-DD) required" }, { status: 400 });
  }
  const events = await prisma.privateEvent.findMany({
    where: { date },
    orderBy: { startTime: "asc" },
  });
  return NextResponse.json({ events });
}

/** POST — create private event (admin) */
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const { date, startTime, endTime, title, notes } = body as {
    date?: string;
    startTime?: string;
    endTime?: string;
    title?: string;
    notes?: string;
  };
  if (!date || !startTime || !endTime || !title) {
    return NextResponse.json(
      { error: "date, startTime, endTime, title required" },
      { status: 400 }
    );
  }
  const event = await prisma.privateEvent.create({
    data: { date, startTime, endTime, title, notes: notes ?? null },
  });
  return NextResponse.json({ event });
}
