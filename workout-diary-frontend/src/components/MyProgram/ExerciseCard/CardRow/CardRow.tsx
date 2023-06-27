import {IconButton, List, ListItem, ListItemText, TextField, Typography} from "@mui/material";
import styles from "./CardRow.module.css";
import React from "react";
import {BuiltExerciseType} from "@component/components/MyProgram/ProgramConstructor/ProgramConstructor";
import CreateIcon from '@mui/icons-material/Create';
import DoneIcon from "@mui/icons-material/Done";

interface CardRowProps {
    exercise: BuiltExerciseType,
    submitWeight: (weight: number, ex: BuiltExerciseType) => void,
}


enum Mode {
    change,
    view
}

export const CardRow = ({exercise, submitWeight}: CardRowProps) => {

    const [mode, setMode] = React.useState(Mode.view)
    const [weight, setWeight] = React.useState(exercise.weight.toString())

    const handleChangeMode = (mode: Mode) => {
        setMode(mode)
    }

    const handleChangeWeight = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWeight(e.target.value)
    }

    const handleSubmitChange = () => {
        submitWeight(+weight, exercise)
        setMode(Mode.view)
    }

    return (
        <List className={styles.row} key={exercise.exercise.name}>
            <ListItem className={styles.cardItem}
                      secondaryAction={
                          mode !== Mode.change
                              ? <div className={styles.rowAction}>
                                  <Typography variant='h6'>{`${exercise.weight}кг`}</Typography>
                                  <IconButton className={styles.actionButton}
                                              onClick={() => handleChangeMode(Mode.change)}><CreateIcon fontSize="small"/></IconButton>
                              </div>
                              : <div className={styles.rowAction}>
                                  <TextField inputProps={{maxLength: 4, className: styles.cardInput}}
                                             variant="standard"
                                             value={weight}
                                             onChange={handleChangeWeight}>
                                  </TextField>
                                  <IconButton className={styles.actionButton}
                                              onClick={handleSubmitChange}><DoneIcon fontSize="small"/></IconButton>
                              </div>
                      }
            >
                <ListItemText className={styles.cardItemText}
                              primary={exercise.exercise.name}
                              secondary={`${exercise.sets}x${exercise.reps}`}/>
            </ListItem>
        </List>
    )
}