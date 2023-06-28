import {Router} from 'express'
import {createExercise,getExercises} from '../controllers/exercise'
const router = Router();


router.get('',getExercises)
router.post('',createExercise)

export default router;