import {Router} from 'express'
import {createMeal} from "../controllers/meal";

const router = Router();

// @ts-ignore
router.post('/add', createMeal)

export default Router;