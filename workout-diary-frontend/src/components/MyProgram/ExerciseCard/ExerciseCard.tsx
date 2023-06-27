import {Box, IconButton} from "@mui/material";
import {BuiltExerciseType, Workout} from "@component/components/MyProgram/ProgramConstructor/ProgramConstructor";
import styles from './ExerciseCard.module.scss'
import React from "react";
import {useAppDispatch} from "@component/hooks/hooks";
import {setWorkout} from "@component/store/reducers/mainSlice";
import {CardRow} from "@component/components/MyProgram/ExerciseCard/CardRow/CardRow";
import {QueryStats} from "@mui/icons-material";

interface ExerciseCardProps {
    workout: Workout,
    handleExpandStats: (workout: Workout) => void,
}

export const ExerciseCard = ({workout,handleExpandStats}: ExerciseCardProps) => {

    const dispatch = useAppDispatch();

    const handleChangeWeight = (weight: number, ex: BuiltExerciseType) => {
        const newExercises = workout.exercises.map(exe => {
            if (exe.exercise === ex.exercise) {
                return {...exe, weight: weight}
            }
            return exe;
        })
        dispatch(setWorkout({exercises: newExercises, day: workout.day}))
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
                <IconButton onClick={() => handleExpandStats(workout)}
                ><QueryStats/></IconButton>
            </div>
        </Box>
    )
}