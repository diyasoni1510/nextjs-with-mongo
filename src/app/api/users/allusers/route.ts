import mongoose from "mongoose";
import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModal";
import { NextResponse,NextRequest } from "next/server";

connect()

export async function GET(request:NextRequest) {
    try {
        const allUsers = await User.find({})
        return NextResponse.json({message:"all users",data:allUsers})
    } catch (error :any) {
        return NextResponse.json({error:error.message},{status:500})
    }
} 