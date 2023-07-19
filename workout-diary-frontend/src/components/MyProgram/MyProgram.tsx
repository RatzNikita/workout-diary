import {Button} from "@mui/material";
import {ProgramConstructor} from "@component/components/MyProgram/ProgramConstructor/ProgramConstructor";
import styles from './MyProgram.module.css'
import AddIcon from '@mui/icons-material/Add';
import React from "react";
import {AvailablePrograms} from "@component/components/MyProgram/AvailablePrograms/AvailablePrograms";
import {CurrentProgram} from "@component/components/MyProgram/CurrentProgram/CurrentProgram";

export const MyProgram = () => {

    const [myProgramState, setMyProgramState] = React.useState('view')

    const handleChangeState = (state: string) => {
        setMyProgramState(state)
    }

    return (
        <div className={styles.programsBar}>
            <div className={styles.actionBar}>
                <button className={myProgramState === 'viewMain' ? styles.buttonActive : styles.navButton}
                        onClick={() => handleChangeState('viewMain')}>ТЕКУЩАЯ ПРОГРАММА</button>
                <button className={myProgramState === 'viewAll' ? styles.buttonActive : styles.navButton}
                        onClick={() => handleChangeState('viewAll')}>ДОСТУПНЫЕ ПРОГРАММЫ</button>
                <button className={myProgramState === 'create' ? styles.buttonActive : styles.navButton}
                    onClick={() => handleChangeState('create')}>ДОБАВИТЬ</button>
            </div>
            <div className={styles.programsContent}>
                {myProgramState === 'viewAll' && <AvailablePrograms/>}
                {myProgramState === 'viewMain' && <CurrentProgram handleChangeMenuState={handleChangeState}/>}
                {myProgramState === 'create' && <ProgramConstructor handleSetMyProgramState={handleChangeState}/>}
            </div>
        </div>

    )


}