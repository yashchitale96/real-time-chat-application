import express from 'express';
import proetectRoute from '../middleware/protectRoute.js';
import { getUsersForSideBar } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', proetectRoute, getUsersForSideBar)

export default router;