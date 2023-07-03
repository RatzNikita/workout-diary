import styles from "@component/components/MyProgram/MyProgram.module.css";
import {Button, Divider} from "@mui/material";
import {ExerciseCard} from "@component/components/MyProgram/ExerciseCard/ExerciseCard";
import React from "react";
import {WeightProgress} from "@component/components/MyProgram/CurrentProgram/Statistics/WeightProgress";
import {Workout} from "@component/types/workoutTypes";
import {useAppSelector} from "@component/hooks/hooks";

interface CurrentProgramProps {
    handleChangeMenuState: (state: string) => void,
}


export const CurrentProgram = ({handleChangeMenuState}: CurrentProgramProps) => {
    const currentProgram = useAppSelector(state => state.trainingPrograms.currentProgram)
    const [expandedWorkout, setExpandedWorkout] = React.useState<Workout | null>(null)

    const onExpandStats = (workout: Workout | null) => {
        setExpandedWorkout(workout)
    }

    if (currentProgram) {
        return (
            <div>
                <div className={styles.programTitle}>{`Название программы: ${currentProgram.name}`}</div>
                <Divider/>
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
                <Button variant="contained" onClick={() => handleChangeMenuState('viewAll')}>Выбрать программу</Button>
            </div>
        )
    }
}