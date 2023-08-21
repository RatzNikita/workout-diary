import {Router} from 'express'
import {addMeal} from "../controllers/meal";
const router = Router();


router.post('/add',addMeal)

export default Router;