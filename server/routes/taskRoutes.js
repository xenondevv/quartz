import express from "express";
import { createTask, deleteTask, getAllTasks, getTaskOfOtherUser, updateCompletion, updateTaskTitle } from "../controllers/taskController.js";
import protect from "../middlewares/authMiddleware.js";

const route = express.Router();

route.post("/create", protect, createTask); 
route.post("/delete", protect, deleteTask); 
route.post("/completed", protect, updateCompletion); 
route.get("/gettasks", protect, getAllTasks);
route.post("/other", protect, getTaskOfOtherUser);
route.post("/updatetitle", protect, updateTaskTitle);

export default route;