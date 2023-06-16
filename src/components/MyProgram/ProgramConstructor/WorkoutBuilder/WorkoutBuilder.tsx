import styles from "@component/components/MyProgram/ProgramConstructor/ProgramConstructor.module.css";
import {Box, Button, Divider, IconButton, List, ListItem, ListItemText, Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import DoneIcon from "@mui/icons-material/Done";
import {ExercisesList, ExerciseType} from "@component/components/MyProgram/ExercisesList/ExercisesList";
import React from "react";
import {
    BuiltExerciseType,
    daysOfWeek,
    Workout
} from "@component/components/MyProgram/ProgramConstructor/ProgramConstructor";

interface WorkoutBuilderProps {
    weekDays: string[],
    handleSaveProgram: (workoutProgram: Workout[]) => void;
}

export const WorkoutBuilder = ({weekDays, handleSaveProgram}: WorkoutBuilderProps) => {

    const [currentDay, setCurrentDay] = React.useState(0)
    const [exercisesOpen, setExercisesOpen] = React.useState(false)
    const [chosenExercises, setChosenExercises] = React.useState<BuiltExerciseType[]>([])
    const [workoutProgram, setWorkoutProgram] = React.useState<Workout[]>([])


    React.useEffect(() => {
        if (workoutProgram.length > 0) {
            if (weekDays.length - 1 > currentDay) {
                setCurrentDay(currentDay + 1)
            } else {
                handleSaveProgram(workoutProgram)
            }
        }
    }, [workoutProgram])

    function handleAddExercise() {
        setExercisesOpen(!exercisesOpen)
    }

    const handleChoiceExercise = (exercise: ExerciseType, sets: number, reps: number) => {
        if (!chosenExercises.find(ex => ex.exercise === exercise)) {
            setChosenExercises(prevState => [...prevState, {exercise, sets, reps, weight: 0}])
        }
    }

    const handleDeleteExercise = (exercise: BuiltExerciseType) => {
        setChosenExercises(prevState => prevState.filter(ex => ex !== exercise))
    }

    function handleSubmitDay() {
        setWorkoutProgram(prevState =>
            [...prevState, {day: weekDays[currentDay], exercises: chosenExercises}])
        setChosenExercises([])
    }

    return (
        <Box>
            <div className={styles.workoutContainer}>
                <div className={styles.card}>
                    <h3 className={styles.cardTitle}>{daysOfWeek.find(day => day.dayName === weekDays[currentDay])?.fullDayName}</h3>
                    <Divider/>
                    <div className={styles.cardSubtitle}>
                        <Typography variant='h6' align='center'>Упражнения</Typography>
                        {exercisesOpen
                            ? <IconButton className={styles.actionButton}
                                          color='primary'
                                          onClick={handleAddExercise}><CloseIcon/></IconButton>
                            : <IconButton className={styles.actionButton}
                                          color='primary'
                                          onClick={handleAddExercise}><ChevronRightIcon/></IconButton>}
                    </div>
                    <List dense={true} className={styles.cardContent}>
                        {chosenExercises.length > 0
                            && chosenExercises.map((ex) => {
                                return (
                                    <ListItem key={ex.exercise.name} className={styles.cardItem}
                                              secondaryAction={
                                                  <IconButton edge="end"
                                                              onClick={() => handleDeleteExercise(ex)}>
                                                      <DeleteIcon/>
                                                  </IconButton>
                                              }>
                                        <ListItemText className={styles.cardItemText}
                                                      primary={ex.exercise.name}
                                                      secondary={`${ex.sets}x${ex.reps}`}/>
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                    {weekDays.length - 1 > currentDay
                        ?
                        <Button variant="contained" endIcon={<SendIcon/>}
                                onClick={handleSubmitDay}
                                className={styles.confirmButton}>
                            Далее
                        </Button>
                        : <Button variant="contained" endIcon={<DoneIcon/>}
                                  onClick={handleSubmitDay}
                                  className={styles.confirmButton}>
                            Завершить
                        </Button>
                    }
                </div>
                {exercisesOpen && <ExercisesList
                    handleChoiceExercise={handleChoiceExercise}/>}
            </div>
        </Box>
    )
}