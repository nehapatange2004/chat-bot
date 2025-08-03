import mongoose from "mongoose";

const MessageSchema = mongoose.Schema({
    // roles: model/user
    senderRole: {
        type:String,
        required:true
    },
    receiverRole: {
        type:String,
        required:true
    },
    userId: {
        type: mongoose.Schema.ObjectId | null,
        required: true
    },
    text: {
        type: String,
        required:true
    },

}, {timestamps: true});

export const Message = mongoose.model('Message', MessageSchema);