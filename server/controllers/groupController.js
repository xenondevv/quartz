import Group from "../models/Group.js";
import User from "../models/User.js";
import crypto from "crypto";

async function createGroup(req, res) {
    const name = req.body.name;
    const username = req.user.username;

    try {
        const group = {
            name: name,
            groupid: crypto.randomInt(100000,999999).toString(),
            members: [username,]
        };
        
        const user = await User.findOneAndUpdate(
            { username }, 
            { $push: { groups:  group.groupid} }, 
            { new: true, runValidators: true }  
        );

        if (!user) {
            return res.status(404).json({
                message: "Cannot find the user!"
            });
        }
        
        const g = await Group.create(group);
        
        if(g){
            return res.status(200).json({
                message: "Group created successfully"
            });
        }else{
            return res.status(500).json({
                message: "You fucked up somewhere"
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "We fucked up"
        });
    }
}

async function deleteGroup(req, res) {
    const groupid = req.body.groupid;
    const username = req.user.username;

    try {
        const group = await Group.findOne({ groupid });

        if (!group) {
            return res.status(404).json({
                message: "Group not found!"
            });
        }

        if (!group.members.includes(username)) {
            return res.status(403).json({
                message: "You are not authorized to delete this group!"
            });
        }

        await Group.deleteOne({ groupid });

        await User.updateMany(
            { groups: groupid },
            { $pull: { groups: groupid } }
        );

        return res.status(200).json({
            message: "Group deleted successfully!"
        });
    } catch (error) {
        return res.status(500).json({
            message: "An error occurred while deleting the group."
        });
    }
}

async function joinGroup(req, res) {
    const groupid = req.body.groupid;
    const username = req.user.username;

    try {
        const group = await Group.findOne({ groupid });

        if (!group) {
            return res.status(404).json({
                message: "Group not found!"
            });
        }

        if (group.members.includes(username)) {
            return res.status(400).json({
                message: "You are already a member of this group!"
            });
        }

        group.members.push(username);
        await group.save();

        await User.findOneAndUpdate(
            { username },
            { $push: { groups: groupid } },
            { new: true, runValidators: true }
        );

        return res.status(200).json({
            message: "Successfully joined the group!"
        });
    } catch (error) {
        return res.status(500).json({
            message: "An error occurred while joining the group."
        });
    }
}

async function leaveGroup(req, res) {
    const groupid = req.body.groupid;
    const username = req.user.username;

    try {
        const group = await Group.findOne({ groupid });

        if (!group) {
            return res.status(404).json({
                message: "Group not found!"
            });
        }

        if (!group.members.includes(username)) {
            return res.status(400).json({
                message: "You are not a member of this group!"
            });
        }

        group.members = group.members.filter(member => member !== username);
        await group.save();

        await User.findOneAndUpdate(
            { username },
            { $pull: { groups: groupid } },
            { new: true, runValidators: true }
        );

        return res.status(200).json({
            message: "Successfully left the group!"
        });
    } catch (error) {
        return res.status(500).json({
            message: "An error occurred while leaving the group."
        });
    }
}

async function viewUserGroups(req, res) {
    const username = req.body.username;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({
                message: "Cannot find the user!"
            });
        }

        const groups = await Group.find({ groupid: { $in: user.groups } });

        return res.status(200).json({
            message: "Groups fetched successfully!",
            groups,
        });
    } catch (error) {
        return res.status(500).json({
            message: "An error occurred while fetching the groups."
        });
    }
}

async function viewAllGroups(req, res) {
    try {
        const groups = await Group.find({});

        return res.status(200).json({
            message: "All groups fetched successfully!",
            groups,
        });
    } catch (error) {
        return res.status(500).json({
            message: "An error occurred while fetching all groups."
        });
    }
}

export { createGroup, deleteGroup, joinGroup, leaveGroup, viewUserGroups, viewAllGroups };
