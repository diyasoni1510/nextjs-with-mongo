import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbConfig/dbConfig";
import Post from "@/models/postModel";


connect();

export async function POST(request: NextRequest) {
  try {
    const { user } = await request.json();
    const userPost = await Post.find({ user });
    if (userPost) return NextResponse.json({ message: "post found", data: userPost });
    else
      return NextResponse.json(
        { message: "post does not exist" },
        { status: 400 }
      );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
