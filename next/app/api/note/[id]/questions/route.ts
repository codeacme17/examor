import { NextRequest, NextResponse } from "next/server";

export const GET = (req: NextRequest) => {
  console.log("[Examor GET] req: ", req);
  return new NextResponse(JSON.stringify({ data: "Hello World" }));
};
