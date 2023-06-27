import styles from "@component/components/MyProgram/MyProgram.module.css";
import {Button, Divider} from "@mui/material";
import {ExerciseCard} from "@component/components/MyProgram/ExerciseCard/ExerciseCard";
import React from "react";
import {TrainingProgram} from "@component/store/reducers/mainSlice";
import {Workout} from "@component/components/MyProgram/ProgramConstructor/ProgramConstructor";
import {WeightProgress} from "@component/components/Statistics/WeightProgress";

interface CurrentProgramProps {
    currentProgram: TrainingProgram | null,
    handleChangeMenuState: (state: string) => void,
}


export const CurrentProgram = ({currentProgram, handleChangeMenuState}: CurrentProgramProps) => {
    const [expandedWorkout, setExpandedWorkout] = React.useState<Workout | null>(null)

    const onExpandStats = (workout: Workout) => {
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
                        <div>
                            <ExerciseCard workout={expandedWorkout} handleExpandStats={onExpandStats}/>
                            <WeightProgress exercises={expandedWorkout.exercises}/>
                        </div>
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