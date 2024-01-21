import connect from "@/dbConfig/dbConfig"
import User from "@/models/userModal"
import { NextRequest,NextResponse } from "next/server" 
import bcryptjs from "bcryptjs" 

connect()

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const {username,email,password} = reqBody

        console.log(reqBody)

        const user = await User.findOne({email})

        if(user){
            return NextResponse.json({error: "user already exists"},{status:200})
        }
        
        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(password,salt)

        const newUser = new User({
            username,
            email,
            password:hashPassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser)

        return NextResponse.json({message:"User created successfully",status:201,savedUser})

    } catch (error:any) {
        return NextResponse.json({error : error.message},{status:500})
    }
}