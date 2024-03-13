import express from 'express'
import { currentUser, login, register } from '../controllers/authController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const userRouter = express.Router()

//routes
userRouter.post('/register',register)
userRouter.post('/login',login)

//get current user
userRouter.get('/currentUser',authMiddleware,currentUser)

export default userRouter