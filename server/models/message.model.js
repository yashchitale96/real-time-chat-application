import mongoose from "mongoose";

const messaegSchema = new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    messages:{
        type:String,
        required:true
    }
    // createdAt, updatedAt
},{timestamps:true})

const Message = mongoose.model("Message", messaegSchema);
export default Message;