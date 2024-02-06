import connect from "@/dbConfig/dbConfig";
import Chat from "@/models/chatModel"
import { NextResponse,NextRequest } from "next/server";

connect()

export async function POST(request:NextRequest) {
    const {userOne,userTwo} = await request.json()

    console.log("userOne - ",userOne,"userTwo - ",userTwo)

    const chatRoom = await Chat.findOne({userOne,userTwo})

    if(chatRoom)
    return NextResponse.json({message:"chat room exist",data:chatRoom})

    const newChatRoom = new Chat({
        userOne,
        userTwo
    })

    const data = await newChatRoom.save()

    return NextResponse.json({message:"chat room created",data})
}