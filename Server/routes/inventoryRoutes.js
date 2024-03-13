import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js'
import { createInventory, getInventory } from '../controllers/inventoryController.js'

const inventoryRouter = express.Router()

inventoryRouter.post('/createInventory',authMiddleware,createInventory)
inventoryRouter.get('/getInventory',authMiddleware,getInventory)


export default inventoryRouter