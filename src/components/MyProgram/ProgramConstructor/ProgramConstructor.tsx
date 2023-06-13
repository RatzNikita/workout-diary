import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControlLabel,
    IconButton,
    List,
    ListItem,
    ListItemText, TextField,
    Typography,
} from "@mui/material";
import React from "react";
import styles from './ProgramConstructor.module.css'
import SendIcon from '@mui/icons-material/Send';
import {ExercisesList, ExerciseType} from "@component/components/MyProgram/ExercisesList/ExercisesList";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {useAppDispatch} from "@component/hooks/hooks";
import {setProgram} from "@component/store/reducers/mainSlice";

const daysOfWeek: WeekDaysType[] = [
    {dayName: 'mon', dayNameRu: 'Пн', fullDayName: 'Понедельник'},
    {dayName: 'tue', dayNameRu: 'Вт', fullDayName: 'Вторник'},
    {dayName: 'wed', dayNameRu: 'Ср', fullDayName: 'Среда'},
    {dayName: 'thu', dayNameRu: 'Чт', fullDayName: 'Четверг'},
    {dayName: 'fri', dayNameRu: 'Пт', fullDayName: 'Пятница'},
    {dayName: 'sat', dayNameRu: 'Сб', fullDayName: 'Суббота'},
    {dayName: 'sun', dayNameRu: 'Вс', fullDayName: 'Воскресенье'}
]

interface WeekDaysType {
    dayName: string,
    dayNameRu: string,
    fullDayName: string,
}

enum BuildSteps {
    programName,
    weekDays,
    buildWorkout,
    finish,
}

export interface Workout {
    day: string,
    exercises: BuiltExerciseType[],
}

 interface BuiltExerciseType {
    exercise: ExerciseType,
    sets: number,
    reps: number
}



export const ProgramConstructor = () => {

    const [buildStep, setBuildStep] = React.useState(BuildSteps.programName)
    const [weekDays, setWeekDays] = React.useState<string[]>([])
    const [exercises, setExercises] = React.useState()
    const [currenDay, setCurrentDay] = React.useState(0)
    const [workoutProgram, setWorkoutProgram] = React.useState<Workout[]>([])
    const [exercisesOpen, setExercisesOpen] = React.useState(false)
    const [chosenExercises, setChosenExercises] = React.useState<BuiltExerciseType[]>([])
    const [programName, setProgramName] = React.useState('');

    const dispatch = useAppDispatch();


    function handleWeekDayClick(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.checked) {
            setWeekDays((prevState: string[]) => [...prevState, event.target.value])
        } else {
            setWeekDays((prevState) => {
                return [...prevState].filter((el) => el !== event.target.value)
            })
        }
    }

    function handleSubmitDay() {
        setWorkoutProgram(prevState =>
            [...prevState, {day: weekDays[currenDay], exercises: chosenExercises}])
        setCurrentDay(currenDay + 1)
        setChosenExercises([])
    }

    function handleAddExercise() {
        setExercisesOpen(!exercisesOpen)
    }

    const handleChoiceExercise = (exercise: ExerciseType, sets: number, reps: number) => {
        if (!chosenExercises.find(ex => ex.exercise === exercise)) {
            setChosenExercises(prevState => [...prevState, {exercise, sets, reps}])
        }
    }

    const handleDeleteExercise = (exercise: BuiltExerciseType) => {
        setChosenExercises(prevState => prevState.filter(ex => ex !== exercise))
    }

    const handleSetProgramName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProgramName(event.target.value)
    }

    const handleNextStep = () => {
        setBuildStep(prevState => prevState + 1)
    }

    const handleSaveProgram = () => {
        setWorkoutProgram(prevState =>
            [...prevState, {day: weekDays[currenDay], exercises: chosenExercises}])
        setChosenExercises([])
        dispatch(setProgram({name: programName,workouts: workoutProgram }))
    }

    function stepSelection() {
        switch (buildStep) {
            case BuildSteps.programName: {
                return (
                    <>
                        <Box>
                            <TextField placeholder={'Название программы'}
                                       variant='standard'
                                       onChange={handleSetProgramName}/>
                            <Button  disabled={!programName} onClick={handleNextStep} endIcon={<CheckCircleIcon/>}>Далее</Button>
                        </Box>
                    </>
                )
            }
            case BuildSteps.weekDays: {
                return (
                    <>
                        <p className={styles.stepTitle}>Выбор тренировочных дней</p>
                        <div className='flex flex-row justify-center'>
                            {daysOfWeek.map(({dayName, dayNameRu}) => {
                                return (
                                    <FormControlLabel
                                        key={dayName}
                                        value={dayName}
                                        control={<Checkbox className={styles.dayCheckbox}
                                                           onChange={(e) => handleWeekDayClick(e)}/>}
                                        label={dayNameRu}
                                        labelPlacement="top"
                                    />)
                            })}
                            <Button disabled={!(weekDays.length > 0)}
                                    onClick={handleNextStep}
                                    endIcon={<CheckCircleIcon/>}>
                                Далее
                            </Button>
                        </div>
                    </>
                )
            }
            case BuildSteps.buildWorkout: {
                return (
                    <>
                        <p className={styles.stepTitle}>Новая программа</p>
                        <div className={styles.workoutContainer}>
                            <div className={styles.card}>
                                <h3 className={styles.cardTitle}>{daysOfWeek.find(day => day.dayName === weekDays[currenDay])?.fullDayName}</h3>
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
                                {weekDays.length - 1 > currenDay
                                    ?
                                    <Button variant="contained" endIcon={<SendIcon/>}
                                            onClick={handleSubmitDay}
                                            className={styles.confirmButton}>
                                        Далее
                                    </Button>
                                    : <Button variant="contained" endIcon={<DoneIcon/>}
                                              onClick={handleSaveProgram}
                                              className={styles.confirmButton}>
                                        Завершить
                                    </Button>
                                }
                            </div>
                            {exercisesOpen && <ExercisesList
                                handleChoiceExercise={handleChoiceExercise}/>}
                        </div>
                    </>
                )
            }
        }
    }

    return (
        <div className={styles.stepContainer}>
            {stepSelection()}
        </div>
    )
}