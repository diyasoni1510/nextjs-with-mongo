import {  NextResponse } from "next/server";

export async function GET() {
    try {
        const response = NextResponse.json({
            message:"Logout successfull",
            success:true
        })
        response.cookies.set("userToken","",{httpOnly:true})
        return response
    } catch (error:any) {
        return NextResponse.json({error:error.messae},{status:500})
    }
}