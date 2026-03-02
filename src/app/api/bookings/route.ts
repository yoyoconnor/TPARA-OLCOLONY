import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

/** GET /api/bookings?userId= — list bookings for a user (tee times + lessons) */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  if (!userId) {
    return NextResponse.json(
      { error: "Query param 'userId' required" },
      { status: 400 }
    );
  }

  const bookings = await prisma.booking.findMany({
    where: { userId, status: "confirmed" },
    orderBy: { createdAt: "desc" },
    include: {
      teeTime: true,
    },
  });

  const list = bookings.map((b) => {
    if (b.type === "tee_time" && b.teeTime) {
      return {
        id: b.id,
        type: "tee_time" as const,
        status: b.status,
        date: b.teeTime.date,
        time: b.teeTime.time,
        details: b.details ? JSON.parse(b.details) : null,
        teeTimeId: b.teeTimeId,
      };
    }
    if (b.type === "lesson") {
      const details = b.details ? (JSON.parse(b.details) as Record<string, unknown>) : {};
      return {
        id: b.id,
        type: "lesson" as const,
        status: b.status,
        date: (details.requestedDate as string) ?? "",
        time: (details.requestedTime as string) ?? "",
        details: { coachName: details.coachName, note: details.note },
      };
    }
    return {
      id: b.id,
      type: b.type,
      status: b.status,
      date: "",
      time: "",
      details: b.details ? JSON.parse(b.details) : null,
    };
  });

  return NextResponse.json({ bookings: list });
}
