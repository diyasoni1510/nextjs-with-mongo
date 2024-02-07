import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    userOne : String,
    userTwo : String,
    messages:[{message:String,sender:String}],
    craeaedAt : { type: Date, default: Date.now }
}) 

const Chat = mongoose.models.chat || mongoose.model("chat",chatSchema)

export default Chat