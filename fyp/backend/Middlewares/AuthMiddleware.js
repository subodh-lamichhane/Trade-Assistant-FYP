import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler'; // Added import for express-async-handler

const authenticate = asyncHandler((req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: 'Access denied, no token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
});

export default authenticate;
export const protect = authenticate; // Added named export for 'protect'
