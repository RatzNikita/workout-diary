import {Box, Button, Checkbox, FormControlLabel, TextField,} from "@mui/material";
import React from "react";
import styles from './ProgramConstructor.module.css'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {useAppDispatch} from "@component/hooks/hooks";
import {setProgram} from "@component/store/reducers/mainSlice";
import {WorkoutBuilder} from "@component/components/MyProgram/ProgramConstructor/WorkoutBuilder/WorkoutBuilder";
import {TrainingProgram, Workout} from "@component/types/workoutTypes";
import {createProgram} from "@component/store/reducers/trainingPrograms/trainingProgramsThunks";

export const daysOfWeek: WeekDaysType[] = [
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

interface ProgramConstructorProps {
    handleSetMyProgramState: (state: string) => void
}

export const ProgramConstructor = ({handleSetMyProgramState} : ProgramConstructorProps) => {

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
        handleSetMyProgramState('viewMain')
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
                            {daysOfWeek.map(({dayName, dayNameRu}) => {
                                return (
                                    <FormControlLabel
                                        className={styles.checkboxLabel}
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
                    </Box>}
                {buildStep > 1 &&
                    <WorkoutBuilder handleSaveProgram={handleSaveProgram} weekDays={weekDays}/>
                }
            </form>
        </div>

    )
}