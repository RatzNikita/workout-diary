import {Router} from 'express'
import {createExercise, getExerciseById, getExercises} from '../controllers/exercise'
const router = Router();


router.get('',getExercises)
router.get('/:id',getExerciseById)
router.post('',createExercise)

export default router;