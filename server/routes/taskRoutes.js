import express from "express";
import { createTask, deleteTask, updateCompletion } from "../controllers/taskController.js";
import protect from "../middlewares/authMiddleware.js";

const route = express.Router();

route.post("/create", protect,createTask); 
route.post("/delete", protect,deleteTask); 
route.post("/update", protect,updateCompletion); 

export default route;