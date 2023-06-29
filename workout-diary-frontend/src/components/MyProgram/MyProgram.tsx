import {Button} from "@mui/material";
import {useAppSelector} from "@component/hooks/hooks";
import {ProgramConstructor} from "@component/components/MyProgram/ProgramConstructor/ProgramConstructor";
import styles from './MyProgram.module.css'
import AddIcon from '@mui/icons-material/Add';
import React from "react";
import {AvailablePrograms} from "@component/components/MyProgram/AvailablePrograms/AvailablePrograms";
import {CurrentProgram} from "@component/components/MyProgram/CurrentProgram/CurrentProgram";

export const MyProgram = () => {

    const currentProgram = useAppSelector(state => state.trainingPrograms.currentProgram)
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