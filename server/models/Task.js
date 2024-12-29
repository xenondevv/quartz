import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        
        taskid: {
            type: String,
            required: true,
            unique: true,
        },
        
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
            type: String,
            required: true
        },
         
        completed: {
            type: Boolean,
            required: true,
        },
        
        repeatition: {
            type: String, // once, week, month
            required: true,
        },
    }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
export {taskSchema};