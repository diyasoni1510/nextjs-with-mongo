import connect from "@/dbConfig/dbConfig";
import Chat from "@/models/chatModel";
import { NextResponse,NextRequest } from "next/server";

connect()

export async function GET(){
    try {
        const allMessages = await Chat.find()
        return NextResponse.json({message: "all chats", data: allMessages});
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
        
    }
}