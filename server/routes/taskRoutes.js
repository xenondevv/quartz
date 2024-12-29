import express from "express";
import { createTask, deleteTask } from "../controllers/taskController.js";
import protect from "../middlewares/authMiddleware.js";

const route = express.Router();

route.post("/create", protect,createTask); 
route.post("/delete", protect,deleteTask); 

export default route;