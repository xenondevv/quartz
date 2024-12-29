import express from "express";
import { createGroup, deleteGroup, joinGroup, leaveGroup } from "../controllers/groupController.js";
import protect from "../middlewares/authMiddleware.js";

const groupRoute = express.Router();

groupRoute.post("/create", protect, createGroup);
groupRoute.post("/join",   protect, joinGroup);
groupRoute.post("/leave",  protect, leaveGroup);
groupRoute.post("/delete", protect, deleteGroup);

export default groupRoute;