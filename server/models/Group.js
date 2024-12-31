import mongoose from "mongoose";

const groupSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    
    groupid: {
        type: String,
        required: true,
        unique: true
    },

    members: {
        type: [String],
    }
});

const Group = mongoose.model("Group", groupSchema);

export default Group;