import { Router } from "express";
import { authorize } from "../middlewares/auth.middleware.js";
import { createSubscription, getUserSubscriptions } from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) => {
  // Handle fetching all subscriptions
  res.send("Get all subscriptions endpoint");
}); 

subscriptionRouter.get("/:id", (req, res) => {
  // Handle fetching a subscription by ID
  res.send(`Get subscription with ID: ${req.params.id}`);
});

subscriptionRouter.post("/", authorize , createSubscription);

subscriptionRouter.put("/:id", (req, res) => {
  // Handle updating a subscription by ID
  res.send(`Update subscription with ID: ${req.params.id}`);
});

subscriptionRouter.delete("/:id", (req, res) => {
  // Handle deleting a subscription by ID
  res.send(`Delete subscription with ID: ${req.params.id}`);
});

subscriptionRouter.get("/user/:id", authorize, getUserSubscriptions);

subscriptionRouter.put('/:id/cancel', (req, res) => {
  // Handle canceling a subscription by ID
  res.send(`Cancel subscription with ID: ${req.params.id}`);
});

subscriptionRouter.get('/upcoming-renewals', (req, res) => {
  // Handle fetching subscriptions with upcoming renewals
  res.send("Get subscriptions with upcoming renewals endpoint");
});

export default subscriptionRouter;