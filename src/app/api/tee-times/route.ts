import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { generateTimeSlots, timeInRange } from "@/lib/tee-time-utils";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");
  if (!date) {
    return NextResponse.json(
      { error: "Query param 'date' (YYYY-MM-DD) required" },
      { status: 400 }
    );
  }

  let settings = await prisma.scheduleSettings.findUnique({
    where: { id: "default" },
  });
  if (!settings) {
    settings = await prisma.scheduleSettings.create({
      data: { id: "default", firstTeeTime: "7:00 AM", lastTeeTime: "5:00 PM" },
    });
  }

  const timeSlots = generateTimeSlots(settings.firstTeeTime, settings.lastTeeTime);
  const existing = await prisma.teeTime.findMany({
    where: { date },
    orderBy: [{ time: "asc" }],
  });
  const existingByTime = new Map(existing.map((t) => [t.time, t]));

  const privateEvents = await prisma.privateEvent.findMany({
    where: { date },
  });

  const toCreate = timeSlots.filter((time) => !existingByTime.has(time));
  if (toCreate.length > 0) {
    await prisma.teeTime.createMany({
      data: toCreate.map((time) => ({
        date,
        time,
        players: 0,
        maxPlayers: 4,
        status: "available",
        bookedBy: null,
      })),
    });
  }

  let teeTimes = await prisma.teeTime.findMany({
    where: { date },
    orderBy: [{ time: "asc" }],
  });

  const slotSet = new Set(timeSlots);
  teeTimes = teeTimes.filter((tt) => slotSet.has(tt.time));

  return NextResponse.json({
    teeTimes: teeTimes.map((tt) => {
      const event = privateEvents.find((e) =>
        timeInRange(tt.time, e.startTime, e.endTime)
      );
      const status = event ? "blocked" : tt.status;
      const eventTitle = event?.title ?? null;
      return {
        id: tt.id,
        date: tt.date,
        time: tt.time,
        players: tt.players,
        maxPlayers: tt.maxPlayers,
        status,
        bookedBy: event ? null : tt.bookedBy,
        eventTitle,
      };
    }),
    schedule: {
      firstTeeTime: settings.firstTeeTime,
      lastTeeTime: settings.lastTeeTime,
    },
  });
}
