import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        
        subtitle: {
            type: String,
            required: true
        },
        
        priority: {
            type: String, //low, medium, high
            required: true
        },
        
        due: {
            type: Date,
            required: true
        },
         
        completed: {
            type: Boolean,
            required: true,
        },
        
        type: {
            type: String, // once, week, month
            required: true,
        },
        
        timestamps: true
    }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;