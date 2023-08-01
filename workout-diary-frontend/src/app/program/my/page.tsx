'use client'
import {useAppSelector} from "@component/hooks/hooks";
import React from "react";
import {Workout} from "@component/types/workoutTypes";
import styles from "@component/app/program/style.module.css";
import {Button} from "@mui/material";
import {ExerciseCard} from "@component/components/UI/ExerciseCard/ExerciseCard";
import {WeightProgress} from "@component/components/Statistics/WeightProgress";
import {useRouter} from "next/navigation";

export default function CurrentProgram() {

    const router = useRouter()

    const currentProgram = useAppSelector(state => state.trainingPrograms.currentProgram)
    const [expandedWorkout, setExpandedWorkout] = React.useState<Workout | null>(null)

    const onExpandStats = (workout: Workout | null) => {
        setExpandedWorkout(workout)
    }

    if (currentProgram) {
        return (
            <div>
                <div className={styles.programTitle}>{`Название программы: ${currentProgram.name}`}</div>
                <div className={styles.cardsContainer}>
                    {!expandedWorkout ?
                        currentProgram.workouts.map(workout => {
                            return (<ExerciseCard handleExpandStats={onExpandStats} workout={workout}
                                                  key={workout.day}/>)
                        })
                        :
                        <>
                            <ExerciseCard workout={expandedWorkout} handleExpandStats={onExpandStats} statsShown/>
                            <WeightProgress exercises={expandedWorkout.exercises}/>
                        </>
                    }

                </div>
            </div>
        )
    } else {
        return (
            <div>
                <div>У вас пока нет активной программы</div>
                <Button variant="contained" onClick={() => router.push('/program/list')}>Выбрать программу</Button>
            </div>
        )
    }
}