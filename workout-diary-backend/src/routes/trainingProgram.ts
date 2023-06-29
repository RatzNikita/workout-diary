import {Router} from 'express'
import {createProgram, getAllPrograms} from '../controllers/trainingPrograms'
const router = Router();

router.post('',createProgram)
router.get('',getAllPrograms)


export default router;