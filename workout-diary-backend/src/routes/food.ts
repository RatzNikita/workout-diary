import {Router} from 'express'
import {addFood, removeFood} from "../controllers/food";

const router = Router();

router.post('/add', addFood)
router.delete('/{id}', removeFood)

export default router;