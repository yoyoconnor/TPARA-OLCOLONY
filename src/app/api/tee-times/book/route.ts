import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export type BookTeeTimeBody = {
  teeTimeId: string;
  userId: string;
  bookerName: string;
  playerCount?: number; // default 1
};

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as BookTeeTimeBody;
    const { teeTimeId, userId, bookerName, playerCount = 1 } = body;

    if (!teeTimeId || !userId || !bookerName || playerCount < 1 || playerCount > 4) {
      return NextResponse.json(
        { error: "Invalid request: teeTimeId, userId, bookerName required; playerCount 1–4" },
        { status: 400 }
      );
    }

    const teeTime = await prisma.teeTime.findUnique({
      where: { id: teeTimeId },
    });

    if (!teeTime) {
      return NextResponse.json({ error: "Tee time not found" }, { status: 404 });
    }

    if (teeTime.status === "blocked") {
      return NextResponse.json({ error: "This slot is not available for booking" }, { status: 400 });
    }

    const spotsLeft = teeTime.maxPlayers - teeTime.players;
    if (spotsLeft < playerCount) {
      return NextResponse.json(
        { error: `Only ${spotsLeft} spot(s) left. Requested ${playerCount}.` },
        { status: 400 }
      );
    }

    const newPlayers = teeTime.players + playerCount;
    const newBookedBy =
      teeTime.bookedBy && teeTime.bookedBy.trim() !== ""
        ? `${teeTime.bookedBy} + ${bookerName} (${playerCount})`
        : playerCount > 1
        ? `${bookerName} (party of ${playerCount})`
        : bookerName;

    await prisma.$transaction([
      prisma.booking.create({
        data: {
          userId,
          teeTimeId,
          type: "tee_time",
          status: "confirmed",
          details: JSON.stringify({ playerCount, bookerName }),
        },
      }),
      prisma.teeTime.update({
        where: { id: teeTimeId },
        data: {
          players: newPlayers,
          bookedBy: newBookedBy,
          status: newPlayers >= teeTime.maxPlayers ? "booked" : "booked",
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      message: `Booked ${teeTime.time} on ${teeTime.date} for ${playerCount} player(s).`,
    });
  } catch (err) {
    console.error("tee-times/book error:", err);
    return NextResponse.json(
      { error: "Failed to book tee time" },
      { status: 500 }
    );
  }
}
