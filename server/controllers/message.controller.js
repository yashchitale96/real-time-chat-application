import Converstion from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async(req,res)=>{
    try{
        const {messages} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user._id;

        let conversation = await Converstion.findOne({
            participants:{
                $all:[senderId, receiverId]
            }
        })

       

        if(!conversation){
            conversation = await Converstion.create({
                participants: [senderId, receiverId]
            })
        }
        console.log(messages)
        const newMessage = new Message({
            senderId,
            receiverId,
            messages
        })

        if(newMessage){
            conversation.messages.push(newMessage._id);
        }

        // This will run in parallel
        await Promise.all([conversation.save(), newMessage.save()])

        console.log(newMessage);

        res.status(201).json({newMessage})
    }
    catch(err){
        console.log("Error in sendMessage controller", err.message)
        res.status(500).json({error: "Internal server error"})
    }
}

export const getMessage = async(req,res)=>{
    try{
        const {id:userToChatId} = req.params;
        const senderId = req.user._id;

        const conversation = await Converstion.findOne({
            participants: {$all:[senderId, userToChatId]}
        }).populate("messages");

        if(!conversation) return res.status(200).json([])
        
        const messages = conversation.messages;

        res.status(200).json(messages)
    }
    catch(err){
        console.log("Error in getMessageController" + err.message);
        res.status(500).json({err: "Internal Server Error"})
    }
}