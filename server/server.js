import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

import authRoutes from './routes/authroutes.js'
import messageRoutes from './routes/message.routes.js'
import userRoutes from './routes/user.routes.js'

import {connectToMongoDB} from './db/conntectToMongoDB.js'

const app = express();
app.use(express.json()); // to parse the incoming requrests with JSON payloads (from req.body)
app.use(cookieParser())

const PORT = process.env.PORT || 5000;

dotenv.config();

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/user', userRoutes);

app.listen(5000, ()=>{
    connectToMongoDB();
    console.log(`Server is running on PORT ${PORT}`)
})