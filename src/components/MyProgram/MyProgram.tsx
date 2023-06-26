import {Button, Divider, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "@component/hooks/hooks";
import {setCurrentProgram, setMyProgramState, TrainingProgram} from "@component/store/reducers/mainSlice";
import {ProgramConstructor} from "@component/components/MyProgram/ProgramConstructor/ProgramConstructor";
import styles from './MyProgram.module.css'
import AddIcon from '@mui/icons-material/Add';
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import {ExerciseCard} from "@component/components/MyProgram/ExerciseCard/ExerciseCard";
import {AvailablePrograms} from "@component/components/MyProgram/AvailablePrograms/AvailablePrograms";

export const MyProgram = () => {

    const currentProgram = useAppSelector(state => state.main.currentProgram)
    const [myProgramState,setMyProgramState] = React.useState('view')

    const handleChangeState = (state: string) => {
        setMyProgramState(state)
    }

    return (
        <div className={styles.programsBar}>
            <div className={styles.actionBar}>
                <Button className={myProgramState === 'viewMain' ? styles.buttonActive : undefined} onClick={() => handleChangeState('viewMain')} >Текущая программа</Button>
                <Button className={myProgramState === 'viewAll' ? styles.buttonActive : undefined} onClick={() => handleChangeState('viewAll')}>Доступные программы</Button>
                <Button  onClick={() => handleChangeState('create')} endIcon={<AddIcon/>}>Добавить</Button>

            </div>
            <div className={styles.programsContent}>
            {myProgramState === 'viewAll' && <AvailablePrograms/>}
            {(currentProgram && myProgramState === 'viewMain') &&
                <div>
                    <div className={styles.programTitle}>{`Название программы: ${currentProgram.name}`}</div>
                    <Divider />
                    <div className={styles.cardsContainer}>
                        {currentProgram.workouts.map(workout => {
                            return (<ExerciseCard day={workout.day} exercises={workout.exercises} key={workout.day}/>)
                        })}
                    </div>
                </div>}
            {
                myProgramState === 'create' &&
                <ProgramConstructor handleSetMyProgramState={handleChangeState}/>
            }
            </div>
        </div>

    )


}