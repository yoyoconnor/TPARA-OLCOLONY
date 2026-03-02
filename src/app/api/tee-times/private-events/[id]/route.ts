import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

/** DELETE — remove private event (admin) */
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await prisma.privateEvent.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
