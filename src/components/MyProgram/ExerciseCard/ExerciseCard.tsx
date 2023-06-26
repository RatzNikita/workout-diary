import {Box} from "@mui/material";
import {BuiltExerciseType, Workout} from "@component/components/MyProgram/ProgramConstructor/ProgramConstructor";
import styles from './ExerciseCard.module.scss'
import React from "react";
import {useAppDispatch} from "@component/hooks/hooks";
import {setWorkout} from "@component/store/reducers/mainSlice";
import {CardRow} from "@component/components/MyProgram/ExerciseCard/CardRow/CardRow";

export const ExerciseCard = ({exercises, day}: Workout) => {

    const dispatch = useAppDispatch();

    const handleChangeWeight = (weight: number, ex: BuiltExerciseType) => {
        const newExercises = exercises.map(exe => {
            if (exe.exercise === ex.exercise) {
                return {...exe,weight: weight}
            }
            return exe;
        })
        dispatch(setWorkout({exercises: newExercises, day: day}))
    }

    return (
        <Box className={styles.card}>
            <div className={styles.cardTitle}>
                {day}
            </div>
            <div className={styles.cardContent}>
                {exercises.map(ex => {
                    return (
                        <CardRow key={ex.exercise.name}
                                 exercise={ex}
                                 submitWeight={handleChangeWeight}/>
                    )
                })}
            </div>
        </Box>
    )
}