import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb/connection";
import Interview from "@/lib/mongodb/models/Interview"; // make sure this exists

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const data = await request.json();

    const newInterview = await Interview.create(data);

    return NextResponse.json(newInterview, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();

    const interviews = await Interview.find();

    return NextResponse.json(interviews);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

