import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';

export const authorize = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            const error = new Error('Authorization header missing or malformed');
            error.statusCode = 401;
            throw error;
        }

        const token = authHeader.split(' ')[1];

        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                const error = new Error('Invalid or expired token');
                error.statusCode = 401;
                throw error;
            }

            req.userId = decoded.userId;
            next();
        });
    } catch (error) {
        next(error);
    }
};