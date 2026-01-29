import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb/connection";
import Resume from "@/lib/mongodb/models/Resume";

export async function GET() {
  try {
    await connectDB();

    const resumes = await Resume.find();

    return NextResponse.json(resumes);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

