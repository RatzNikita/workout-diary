import {Box, IconButton} from "@mui/material";
import styles from './ExerciseCard.module.scss'
import React from "react";
import {useAppDispatch, useAppSelector} from "@component/hooks/hooks";
import {CardRow} from "@component/components/MyProgram/ExerciseCard/CardRow/CardRow";
import {ArrowLeft, QueryStats} from "@mui/icons-material";
import {BuiltExercise, Workout} from "@component/types/workoutTypes";
import {setWeight} from "@component/store/reducers/trainingPrograms/trainingProgramsThunks";

interface ExerciseCardProps {
    workout: Workout,
    handleExpandStats: (workout: Workout | null) => void,
    statsShown?: boolean
}

export const ExerciseCard = ({statsShown = false, workout, handleExpandStats}: ExerciseCardProps) => {

    const dispatch = useAppDispatch();
    const [expanded, setExpanded] = React.useState(false)
    const currentProgram = useAppSelector(state => state.trainingPrograms.currentProgram)

    const handleChangeWeight = (weight: number, ex: BuiltExercise) => {
        if (currentProgram) {
            dispatch(setWeight({
                programID: currentProgram._id,
                workoutDay: workout.day,
                exerciseID: ex.exercise._id,
                weight: weight
            }))
        }
    }

    const handleExpandExercise = (workout: Workout | null, state: boolean) => {
        handleExpandStats(workout)
    }

    return (
        <Box className={styles.card}>
            <div className={styles.cardContent}>
                <div className={styles.cardTitle}>
                    {workout.day}
                </div>
                <div className={styles.cardItems}>
                    {workout.exercises.map(ex => {
                        return (
                            <CardRow key={ex.exercise.name}
                                     exercise={ex}
                                     submitWeight={handleChangeWeight}/>
                        )
                    })}
                </div>
            </div>
            <div className={styles.actionButtons}>
                {statsShown
                    ? <>
                        <IconButton onClick={() => handleExpandExercise(null, false)}
                        ><ArrowLeft/></IconButton>
                    </>
                    : <>
                        <IconButton onClick={() => handleExpandExercise(workout, true)}
                        ><QueryStats/></IconButton>
                    </>
                }
            </div>
        </Box>
    )
}