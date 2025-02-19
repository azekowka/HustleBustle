import { db } from "@/../db";
import { tasks } from "@/../db/schema";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { userId } = getAuth(req);
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  const { title, dueDate } = await req.json();

  await db.insert(tasks).values({
    userId,
    title,
    dueDate: dueDate ? new Date(dueDate) : null,
  });

  return NextResponse.json({ success: true });
}
