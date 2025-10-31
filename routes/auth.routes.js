import { Router } from "express";

const authRouter = Router();

authRouter.post("/sign-up", (req, res) => {
  // Handle user sign-up
  res.send("Sign-up endpoint");
});

authRouter.post("/login", (req, res) => {
  // Handle user login
  res.send("Login endpoint");
});

authRouter.post("/logout", (req, res) => {
  // Handle user logout
  res.send("Logout endpoint");
});

export default authRouter;
