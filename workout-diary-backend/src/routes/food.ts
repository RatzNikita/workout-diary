import {Router} from 'express'
import {addFood, getAllFood, removeFood} from "../controllers/food";

const router = Router();

router.post('/add', addFood)
router.get('',getAllFood)
router.delete('/:id', removeFood)

export default router;