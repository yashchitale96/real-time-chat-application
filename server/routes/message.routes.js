import express from 'express';
const router = express.Router();
import { sendMessage, getMessage } from '../controllers/message.controller.js';
import proetectRoute from '../middleware/protectRoute.js';

router.get('/:id', proetectRoute, getMessage)
router.post('/send/:id', proetectRoute, sendMessage)

export default router;