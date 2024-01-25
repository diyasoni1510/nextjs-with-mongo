import mongoose from "mongoose";
import connect from "@/dbConfig/dbConfig";
import Post from "@/models/postModel";
import { NextResponse,NextRequest } from "next/server";

connect()

export async function GET(request:NextRequest) {
    try {
        const allPosts = await Post.find({}).sort({ 'createdAt': -1 })
        return NextResponse.json({message:"all posts",data:allPosts})
    } catch (error :any) {
        return NextResponse.json({error:error.message},{status:500})
    }
} 