import { NextResponse,NextRequest } from "next/server"
import Chat from "@/models/chatModel"
import connect from "@/dbConfig/dbConfig"


connect()

export async function POST(request : NextRequest){
    try {
        const reqBody = await request.json()
        const {userOne,userTwo,message,sender} = reqBody

        const newMessage = {
            message,
            sender
        };
       
        var sentMessage = await Chat.findOneAndUpdate({ userOne,userTwo },{ $addToSet: { messages: newMessage }})
        return NextResponse.json({message:"message sent",success:true,data:sentMessage})
        
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}