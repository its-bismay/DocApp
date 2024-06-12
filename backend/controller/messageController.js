import {Message} from "../models/messageSchema.js"
import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import err

export const sendMessage = catchAsyncError(async(req,res,next) => {
    const {firstName, lastName, email, phone, message} = req.body

    if(!firstName || !lastName || !email || !phone || !message) {
        return res.status(400).json({
            success: false,
            message: "please fill all the details."
        });
    }
    await Message.create({firstName, lastName, email, phone, message});
    res.status(200).json({
        success: true,
        message: "Message send successfully!"
    })
})