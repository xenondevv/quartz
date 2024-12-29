import express from "express";
import { createGroup, deleteGroup, joinGroup, leaveGroup, viewAllGroups, viewUserGroups } from "../controllers/groupController.js";
import protect from "../middlewares/authMiddleware.js";

const groupRoute = express.Router();

groupRoute.post("/create", protect, createGroup);
groupRoute.post("/join",   protect, joinGroup);
groupRoute.post("/leave",  protect, leaveGroup);
groupRoute.post("/delete", protect, deleteGroup);
groupRoute.post("/viewgroups", protect, viewUserGroups);
groupRoute.post("/all", protect, viewAllGroups);

export default groupRoute;