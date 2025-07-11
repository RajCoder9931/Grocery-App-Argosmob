import express from 'express';
import { registerUser, loginUser, getUsers } from '../Controllers/user.controller.js';
import { verifyToken } from '../Middleware/auth.middleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', verifyToken, getUsers);

export default router;
