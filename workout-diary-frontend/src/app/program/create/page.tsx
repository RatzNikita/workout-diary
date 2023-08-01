"use client"
import React from "react";
import {useAppDispatch} from "@component/hooks/hooks";
import {Workout} from "@component/types/workoutTypes";
import {createProgram} from "@component/store/reducers/trainingPrograms/trainingProgramsThunks";
import styles from "@component/app/program/create/style.module.css";
import {Box, Button, Checkbox, FormControlLabel, TextField} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {WorkoutBuilder} from "@component/components/WorkoutBuilder/WorkoutBuilder";
import {useRouter} from "next/navigation";



enum BuildSteps {
    programName,
    weekDays,
    buildWorkout,
    finish,
}


export default function ProgramConstructor() {

     const daysOfWeek: WeekDaysType[] = [
        {dayName: 'mon', fullDayName: 'Monday'},
        {dayName: 'tue', fullDayName: 'Tuesday'},
        {dayName: 'wed', fullDayName: 'Wednesday'},
        {dayName: 'thu', fullDayName: 'Thursday'},
        {dayName: 'fri', fullDayName: 'Friday'},
        {dayName: 'sat', fullDayName: 'Saturday'},
        {dayName: 'sun', fullDayName: 'Sunday'}
    ]

    interface WeekDaysType {
        dayName: string | never,
        fullDayName: string | never,
    }

    const router = useRouter();

    const [buildStep, setBuildStep] = React.useState(BuildSteps.programName)
    const [weekDays, setWeekDays] = React.useState<string[]>([])
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

    const handleSetProgramName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProgramName(event.target.value)
    }

    const handleNextStep = () => {
        setBuildStep(prevState => prevState + 1)
    }

    const handleSaveProgram = (workoutProgram: Workout[]) => {
        dispatch(createProgram({name: programName, workouts: workoutProgram}))
        router.push('/program/my')
    }

    return (
        <div className={styles.stepContainer}>
            <form>
                <Box className={buildStep > 0 ? styles.hidden : ''}>
                    <TextField placeholder={'Название программы'}
                               variant='standard'
                               onChange={handleSetProgramName}
                               className='ml-2'/>
                    <Button disabled={!programName} onClick={handleNextStep} endIcon={<CheckCircleIcon/>}>Далее</Button>
                </Box>
                {buildStep > 0 &&
                    <Box className={buildStep > 1 ? styles.hidden : ''}>
                        <div className='flex flex-row justify-start'>
                            {daysOfWeek.map(({dayName, fullDayName}) => {
                                return (
                                    <FormControlLabel
                                        className={styles.checkboxLabel}
                                        key={dayName}
                                        value={dayName}
                                        control={<Checkbox className={styles.dayCheckbox}
                                                           onChange={(e) => handleWeekDayClick(e)}/>}
                                        label={fullDayName}
                                        labelPlacement="top"
                                    />)
                            })}
                            <Button disabled={!(weekDays.length > 0)}
                                    onClick={handleNextStep}
                                    endIcon={<CheckCircleIcon/>}>
                                Далее
                            </Button>
                        </div>
                    </Box>}
                {buildStep > 1 &&
                    <WorkoutBuilder handleSaveProgram={handleSaveProgram} weekDays={weekDays}/>
                }
            </form>
        </div>
    )
}