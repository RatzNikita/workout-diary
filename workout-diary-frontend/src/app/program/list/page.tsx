'use client'
import {useAppDispatch, useAppSelector} from "@component/hooks/hooks";
import React from "react";
import {getPrograms} from "@component/store/reducers/trainingPrograms/trainingProgramsThunks";
import {TrainingProgram} from "@component/types/workoutTypes";
import {setCurrentProgram} from "@component/store/reducers/trainingPrograms/trainingProgramsSlice";
import styles from "@component/app/program/list/style.module.css";
import Button from "@component/components/Button/Button";
import {Divider, IconButton, Typography} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

export default function AvailablePrograms() {

    const availablePrograms = useAppSelector(state => state.trainingPrograms.trainingPrograms)
    const currentProgram = useAppSelector(state => state.trainingPrograms.currentProgram)
    const dispatch = useAppDispatch();
    const [expandedProgram, setExpandedProgram] = React.useState(currentProgram)

    React.useEffect(() => {
        dispatch(getPrograms())
    },[])

    const handleSetCurrentProgram = (program: TrainingProgram) => {
        dispatch(setCurrentProgram(program))
    }

    const handleExpandProgram = (program: TrainingProgram) => {
        setExpandedProgram(program)
    }

    return (
        <div className={styles.container}>
            <div className={styles.programsList}>
                {availablePrograms?.map((program) => {
                    return (
                        <div key={program.name}>
                            <Button active={program.name === expandedProgram?.name}
                                    size="l"
                                    onClick={() => handleExpandProgram(program)}>
                                {program.name}</Button>
                        </div>
                    )
                })}
            </div>
            {expandedProgram &&
                <div className={styles.programContent}>
                    <Typography align='center' variant='h4'>{expandedProgram.name}<IconButton disabled={expandedProgram.name === currentProgram?.name}
                                                                                              onClick={() => handleSetCurrentProgram(expandedProgram)}><CheckIcon/></IconButton></Typography>

                    <Divider/>
                    <div className={styles.programExercises}>
                        {expandedProgram.workouts.map((workout) => {
                            return (
                                <div key={workout.day}
                                     className={styles.cardContainer}>
                                    <Typography align="center" variant='h6'>{workout.day}</Typography>
                                    <Divider/>
                                    {workout.exercises.map(ex => {
                                        return (
                                            <div className={styles.cardItems} key={ex.exercise.name}>
                                                <p>{ex.exercise.name}</p>
                                                <p>{`${ex.sets}x${ex.reps}`}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        })
                        }
                    </div>
                </div>
            }
        </div>
    )
}