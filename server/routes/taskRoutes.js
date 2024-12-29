import express from "express";
import { createTask, deleteTask, getAllTasks, updateCompletion } from "../controllers/taskController.js";
import protect from "../middlewares/authMiddleware.js";

const route = express.Router();

route.post("/create", protect, createTask); 
route.post("/delete", protect, deleteTask); 
route.post("/update", protect, updateCompletion); 
route.post("/gettasks", protect, getAllTasks);

export default route;