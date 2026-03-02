import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export type BookLessonBody = {
  userId: string;
  coachId: string;
  coachName: string;
  requestedDate: string; // YYYY-MM-DD
  requestedTime: string;  // e.g. "10:00 AM"
  note?: string;
};

/** POST /api/bookings/lesson — create a lesson booking request */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as BookLessonBody;
    const { userId, coachId, coachName, requestedDate, requestedTime, note } = body;

    if (!userId || !coachId || !coachName || !requestedDate || !requestedTime) {
      return NextResponse.json(
        { error: "userId, coachId, coachName, requestedDate, requestedTime required" },
        { status: 400 }
      );
    }

    await prisma.booking.create({
      data: {
        userId,
        type: "lesson",
        status: "confirmed",
        details: JSON.stringify({
          coachId,
          coachName,
          requestedDate,
          requestedTime,
          note: note ?? "",
        }),
      },
    });

    return NextResponse.json({
      success: true,
      message: `Lesson request with ${coachName} for ${requestedDate} at ${requestedTime} has been submitted. The pro shop will confirm availability.`,
    });
  } catch (err) {
    console.error("bookings/lesson error:", err);
    return NextResponse.json(
      { error: "Failed to submit lesson request" },
      { status: 500 }
    );
  }
}
