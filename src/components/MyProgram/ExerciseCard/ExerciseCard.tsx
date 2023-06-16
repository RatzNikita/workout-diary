import {Box, Button, List, ListItem, ListItemText, TextField, Typography} from "@mui/material";
import {BuiltExerciseType, Workout} from "@component/components/MyProgram/ProgramConstructor/ProgramConstructor";
import styles from './ExerciseCard.module.scss'
import React from "react";


enum Mode {
    change = 'change',
    view = 'view'
}

export const ExerciseCard = ({exercises, day}: Workout) => {


    const [mode, setMode] = React.useState(Mode.view)

    const handleChangeMode = () => {
        setMode(Mode.change)
    }

    const handleChangeWeight = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, ex: BuiltExerciseType) => {
        if (e.target.value) {

        }
    }

    return (
        <Box className={styles.card}>
            <div className={styles.cardTitle}>
                {day}
            </div>
            <div className={styles.cardContent}>
                {exercises.map(ex => {
                    return (
                        <List key={ex.exercise.name}>
                            <ListItem className={styles.cardItem}
                                      secondaryAction={
                                          mode !== Mode.change
                                              ? <Typography variant='h6'>{`${ex.weight}кг`}</Typography>
                                              : <TextField className={styles.cardInput}
                                                           variant="standard" value={ex.weight}
                                                           onChange={e => handleChangeWeight(e, ex)}></TextField>}
                            >
                                <ListItemText className={styles.cardItemText}
                                              primary={ex.exercise.name}
                                              secondary={`${ex.sets}x${ex.reps}`}/>
                            </ListItem>
                        </List>

                    )
                })}
            </div>
            <Button onClick={handleChangeMode}>Изменить</Button>
        </Box>
    )
}