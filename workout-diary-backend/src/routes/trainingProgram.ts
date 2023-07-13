import {Router} from 'express'
import {createProgram, getAllPrograms, setWeight} from '../controllers/trainingPrograms'
const router = Router();

router.post('',createProgram)
router.get('',getAllPrograms)
router.patch('/setWeight',setWeight)


export default router;