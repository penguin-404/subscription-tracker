import Subscription from '../models/subscription.model.js';

export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.userId,
        });

        res.status(201).json({
            success: true,
            data: subscription
        });
    } catch (error) {
        next(error);
    }
}

export const getUserSubscriptions = async (req, res, next) => {
    try {
        if (req.userId !== req.params.id ) {
            const error = new Error('Unauthorized access');
            error.status = 403;
            throw error;
        }

        const subscriptions = await Subscription.find({ user: req.userId });
        res.status(200).json({
            success: true,
            data: subscriptions
        });
    } catch (error) {
        next(error);
    }
}