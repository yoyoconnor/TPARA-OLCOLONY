import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const user = await prisma.user.findFirst({
    select: { id: true },
  });
  return NextResponse.json({ userId: user?.id ?? null });
}
