import {Button, Divider, IconButton, Typography} from "@mui/material";
import React from "react";
import {useAppDispatch, useAppSelector} from "@component/hooks/hooks";
import styles from './AvailablePrograms.module.css'
import {setCurrentProgram, TrainingProgram} from "@component/store/reducers/mainSlice";
import CheckIcon from "@mui/icons-material/Check";


export const AvailablePrograms = () => {

    const myPrograms = useAppSelector(state => state.main.myPrograms)
    const currentProgram = useAppSelector(state => state.main.currentProgram)
    const dispatch = useAppDispatch();
    const [expandedProgram, setExpandedProgram] = React.useState(currentProgram)

    const handleSetCurrentProgram = (program: TrainingProgram) => {
        dispatch(setCurrentProgram(program))
    }

    const handleExpandProgram = (program: TrainingProgram) => {
        setExpandedProgram(program)
    }

    return (
        <div className={styles.container}>
            <div className={styles.programsList}>
                {myPrograms?.map((program) => {
                    return (
                        <div key={program.name}>
                            <IconButton disabled={program.name === currentProgram?.name}
                                        onClick={() => handleSetCurrentProgram(program)}><CheckIcon/></IconButton>
                            <Button className={`${styles.programsListButton} ${program.name === currentProgram?.name
                            && styles.programListButtonActive}`}
                                    onClick={() => handleExpandProgram(program)}>
                                {program.name}</Button>

                        </div>
                    )
                })}
            </div>
            {expandedProgram &&
                <div className={styles.programContent}>
                    <Typography align='center' variant='h4'>{expandedProgram.name}</Typography>
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