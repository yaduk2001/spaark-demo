import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");

    // Mock Database Logic
    const data = {
      message: "Success",
      receivedId: id || "No ID provided",
      timestamp: new Date().toISOString(),
    };

    // Return JSON response with status 200
    return NextResponse.json(data, { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { error: `Internal Server Error: ${error}` },
      { status: 500 }
    );
  }
}
