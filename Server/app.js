import express from 'express'
import testRouter from './routes/testRoutes.js';
import cors from 'cors'
import morgan from 'morgan';
import userRouter from './routes/authRoutes.js';
import inventoryRouter from './routes/inventoryRoutes.js';

const app = express()

// middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// auth route
app.use('/api/v1/auth',userRouter)

//inventory route
app.use('/api/v1/inventory',inventoryRouter)

// test route
app.use('/api/v1/test',testRouter)

export default app;