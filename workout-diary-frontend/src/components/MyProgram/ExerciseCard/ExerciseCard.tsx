import {Box, IconButton} from "@mui/material";
import styles from './ExerciseCard.module.scss'
import React from "react";
import {useAppDispatch} from "@component/hooks/hooks";
import {CardRow} from "@component/components/MyProgram/ExerciseCard/CardRow/CardRow";
import {ArrowLeft, QueryStats} from "@mui/icons-material";
import {BuiltExercise, Workout} from "@component/types/workoutTypes";

interface ExerciseCardProps {
    workout: Workout,
    handleExpandStats: (workout: Workout | null) => void,
    statsShown?: boolean
}

export const ExerciseCard = ({statsShown = false,workout, handleExpandStats}: ExerciseCardProps) => {

    const dispatch = useAppDispatch();
    const [expanded, setExpanded] = React.useState(false)

    const handleChangeWeight = (weight: number, ex: BuiltExercise) => {
        const newExercises = workout.exercises.map(exe => {
            if (exe.exercise === ex.exercise) {
                return {...exe, weight: weight}
            }
            return exe;
        })
        //  dispatch(setWorkout({exercises: newExercises, day: workout.day}))
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