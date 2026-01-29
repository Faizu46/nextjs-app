import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb/connection";
import Resume from "@/lib/mongodb/models/Resume";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const data = await request.json();

    const newResume = await Resume.create(data);

    return NextResponse.json(newResume, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

