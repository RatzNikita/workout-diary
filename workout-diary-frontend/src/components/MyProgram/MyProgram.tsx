import {Button, Divider, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "@component/hooks/hooks";
import {setCurrentProgram, setMyProgramState, TrainingProgram} from "@component/store/reducers/mainSlice";
import {
    BuiltExerciseType,
    ProgramConstructor, Workout
} from "@component/components/MyProgram/ProgramConstructor/ProgramConstructor";
import styles from './MyProgram.module.css'
import AddIcon from '@mui/icons-material/Add';
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import {ExerciseCard} from "@component/components/MyProgram/ExerciseCard/ExerciseCard";
import {AvailablePrograms} from "@component/components/MyProgram/AvailablePrograms/AvailablePrograms";
import {WeightProgress} from "@component/components/Statistics/WeightProgress";
import {CurrentProgram} from "@component/components/MyProgram/CurrentProgram/CurrentProgram";

export const MyProgram = () => {

    const currentProgram = useAppSelector(state => state.main.currentProgram)
    const [myProgramState, setMyProgramState] = React.useState('view')

    const handleChangeState = (state: string) => {
        setMyProgramState(state)
    }

    return (
        <div className={styles.programsBar}>
            <div className={styles.actionBar}>
                <Button className={myProgramState === 'viewMain' ? styles.buttonActive : undefined}
                        onClick={() => handleChangeState('viewMain')}>Текущая программа</Button>
                <Button className={myProgramState === 'viewAll' ? styles.buttonActive : undefined}
                        onClick={() => handleChangeState('viewAll')}>Доступные программы</Button>
                <Button onClick={() => handleChangeState('create')} endIcon={<AddIcon/>}>Добавить</Button>

            </div>
            <div className={styles.programsContent}>
                {myProgramState === 'viewAll' && <AvailablePrograms/>}
                {myProgramState === 'viewMain' && <CurrentProgram handleChangeMenuState={handleChangeState} currentProgram={currentProgram}/>}
                {myProgramState === 'create' && <ProgramConstructor handleSetMyProgramState={handleChangeState}/>}
            </div>
        </div>

    )


}