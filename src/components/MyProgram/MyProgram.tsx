import {Button, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "@component/hooks/hooks";
import {setCurrentProgram, setMyProgramState, TrainingProgram} from "@component/store/reducers/mainSlice";
import {ProgramConstructor} from "@component/components/MyProgram/ProgramConstructor/ProgramConstructor";
import styles from './MyProgram.module.css'
import AddIcon from '@mui/icons-material/Add';
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import {ExerciseCard} from "@component/components/MyProgram/ExerciseCard/ExerciseCard";


export const MyProgram = () => {

    const dispatch = useAppDispatch();
    const myProgramState = useAppSelector(state => state.main.myProgramState)
    const myPrograms = useAppSelector(state => state.main.myPrograms)
    const currentProgram = useAppSelector(state => state.main.currentProgram)


    const handleChangeState = (state: string) => {
        dispatch(setMyProgramState(state))
    }

    React.useEffect(() => {
        return () => {
            dispatch(setMyProgramState(''))
        }
    }, [])

    const handleSetCurrentProgram = (programName: TrainingProgram) => {
        dispatch(setCurrentProgram(programName))
    }

    return (
        <>
            <div className={styles.programsBar}>
                <Typography variant='h5' m={1}>Программы</Typography>
                {myProgramState === 'create'
                    ? <Button className={styles.createProgramButton} endIcon={<CloseIcon/>}
                              onClick={() => handleChangeState('view')}>Отмена</Button>
                    : <Button className={styles.createProgramButton} endIcon={<AddIcon/>}
                              onClick={() => handleChangeState('create')}>Добавить</Button>
                }
                {myPrograms?.map((program) => {
                    return (
                        <Button key={program.name} onClick={() => handleSetCurrentProgram(program)}>{program.name}</Button>
                    )
                })}

            </div>
            {myProgramState === 'create' &&
                <ProgramConstructor/>}
            {currentProgram &&
                <div>
                    <div className={styles.programTitle}>{currentProgram.name}</div>
                    <div className={styles.cardsContainer}>
                    {currentProgram.workouts.map(workout => {
                        return (<ExerciseCard day={workout.day} exercises={workout.exercises} key={workout.day}/>)
                    })}
                    </div>
                </div>}
        </>
    )
}