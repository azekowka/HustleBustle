import { supabase } from '@/lib/supabase';
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { userId } = getAuth(req);
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  const { name, endDate, type } = await req.json();

  const { error } = await supabase
    .from('timers')
    .insert({
      id: Date.now().toString(),
      user_id: userId,
      name,
      end_date: endDate,
      type
    });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
