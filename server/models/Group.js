import mongoose from "mongoose";
import { userSchema } from "./User.js";

const groupSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    
    groupid: {
        type: String,
        required: true,
    },

    members: {
        type: [String],
    }
});

const Group = mongoose.model("Group", groupSchema);

export default Group;