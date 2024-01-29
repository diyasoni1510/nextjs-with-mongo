import mongoose from "mongoose";
import connect from "@/dbConfig/dbConfig";
import Post from "@/models/postModel";
import { NextResponse,NextRequest } from "next/server";

connect()

export async function GET(request:NextRequest) {
    try {
        // const allPosts = await Post.find({}).sort({ 'createdAt': -1 })
        const allPosts = await Post.aggregate([
            {
              $lookup: {
                from: "users",       // 'users' collection se join karega
                localField: "username",  // 'posts' mein jo 'username' field hai
                foreignField: "username", // 'users' mein jo 'username' field hai
                as: "userDetails"    // Isme joined data store hoga
              }
            },
            {
                $sort: { "createdAt": -1 }  // Newest posts first based on 'createdAt'
            }
          ]);
        return NextResponse.json({message:"all posts",data:allPosts})
    } catch (error :any) {
        return NextResponse.json({error:error.message},{status:500})
    }
} 