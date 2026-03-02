import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { generateTimeSlots } from "@/lib/tee-time-utils";

const DEFAULT_ID = "default";

/** GET — return first/last tee time (for admins and for slot generation) */
export async function GET() {
  let settings = await prisma.scheduleSettings.findUnique({
    where: { id: DEFAULT_ID },
  });
  if (!settings) {
    settings = await prisma.scheduleSettings.create({
      data: { id: DEFAULT_ID, firstTeeTime: "7:00 AM", lastTeeTime: "5:00 PM" },
    });
  }
  return NextResponse.json({
    firstTeeTime: settings.firstTeeTime,
    lastTeeTime: settings.lastTeeTime,
    timeSlots: generateTimeSlots(settings.firstTeeTime, settings.lastTeeTime),
  });
}

/** PATCH — admin: set operating hours */
export async function PATCH(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const { firstTeeTime, lastTeeTime } = body as { firstTeeTime?: string; lastTeeTime?: string };

  if (!firstTeeTime || !lastTeeTime) {
    return NextResponse.json(
      { error: "firstTeeTime and lastTeeTime required (e.g. '7:00 AM', '5:00 PM')" },
      { status: 400 }
    );
  }

  const updated = await prisma.scheduleSettings.upsert({
    where: { id: DEFAULT_ID },
    create: { id: DEFAULT_ID, firstTeeTime, lastTeeTime },
    update: { firstTeeTime, lastTeeTime },
  });

  return NextResponse.json({
    firstTeeTime: updated.firstTeeTime,
    lastTeeTime: updated.lastTeeTime,
    timeSlots: generateTimeSlots(updated.firstTeeTime, updated.lastTeeTime),
  });
}
