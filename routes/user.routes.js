import { Router } from "express";

const userRouter = Router();

userRouter.get("/", (req, res) => {
  // Handle fetching all users
  res.send("Get all users endpoint");
});

userRouter.get("/:id", (req, res) => {
  // Handle fetching a user by ID
  res.send(`Get user with ID: ${req.params.id}`);
});

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