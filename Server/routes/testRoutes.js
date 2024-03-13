import { Router } from "express";
import { testController } from "../controllers/testController.js";

const testRouter = Router()

//routes
testRouter.get('/',testController)

export default testRouter