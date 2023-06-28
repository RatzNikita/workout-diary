import {Router} from 'express'
import {createProgram} from '../controllers/trainingPrograms'
const router = Router();

router.post('',createProgram)


export default router;