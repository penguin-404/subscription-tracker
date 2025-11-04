import { Router } from "express";
import { getAllUsers, getUserById } from "../controllers/user.controller.js";
import { authorize } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get("/", getAllUsers);

userRouter.get("/:id", authorize, getUserById);

userRouter.post("/", (req, res) => {
  // Handle creating a new user
  res.send("Create new user endpoint");
});

userRouter.put("/:id", (req, res) => {
  // Handle updating a user by ID
  res.send(`Update user with ID: ${req.params.id}`);
});

userRouter.delete("/:id", (req, res) => {
  // Handle deleting a user by ID
  res.send(`Delete user with ID: ${req.params.id}`);
});

export default userRouter;