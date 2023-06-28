import {
    CircularProgress,
    FormControl,
    IconButton,
    InputLabel,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField
} from "@mui/material";
import React from "react";
import CheckIcon from '@mui/icons-material/Check';
import styles from './ExercisesList.module.css'
import {useAppDispatch, useAppSelector} from "@component/hooks/hooks";
import {Exercise, GroupExercise} from "@component/types/workoutTypes";
import {ExerciseGroup} from "@component/components/MyProgram/ExerciseGroup/ExerciseGroup";
import {getExercises} from "@component/store/reducers/exercises/exercisesThunks";


export const exerciseGroups: GroupExercise[] = [
    {name: 'chest', title: 'Грудь'},
    {name: 'back', title: 'Спина'},
    {name: 'legs', title: 'Ноги'},
    {name: 'arms', title: 'Руки'},
]

interface ExercisesListProps {
    handleChoiceExercise: (e: Exercise, s: number, r: number) => void
}

const setsDefault = '4'
const repsDefault = '8'

export const ExercisesList = ({handleChoiceExercise}: ExercisesListProps) => {

    const exercises = useAppSelector(state => state.exercises.exercises)
    const [expandedExercise, setExpandedExercise] = React.useState<Exercise>()
    const [sets, setSets] = React.useState(setsDefault)
    const [reps, setReps] = React.useState(repsDefault)
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        dispatch(getExercises())
    },[])

    const handleSetExercise = (ex: Exercise) => {
        setSets(setsDefault)
        setReps(repsDefault)
        setExpandedExercise(ex)
    }

    const handleSetSets = (e: SelectChangeEvent) => {
        setSets(e.target.value)
    }

    const handleSetReps = (e: React.ChangeEvent<HTMLInputElement>) => {
        setReps(e.target.value)
    }

    const choiceExercise = () => {
        if (expandedExercise !== undefined) {
            handleChoiceExercise(expandedExercise, +sets, +reps)
        }
    }


    if (exercises) {
        return (<div>
                {exerciseGroups.map((group) => {
                    return (
                        <ExerciseGroup key={group.name} value={group.title}>
                            <List component="div" disablePadding>
                                {exercises.filter(ex => ex.group === group.name).map(ex => {
                                        return expandedExercise?.name === ex.name
                                            ? <ListItem key={ex.name} className={styles.listItem}>
                                                <ListItemText className={styles.extendedListText} primary={ex.name}
                                                              secondary={ex.muscle}/>

                                                <FormControl className={styles.selectForm} variant='standard'>
                                                    <InputLabel id="select-label">Sets</InputLabel>
                                                    <Select
                                                        labelId="select-label"
                                                        value={sets}
                                                        label="Sets"
                                                        onChange={handleSetSets}>
                                                        <MenuItem value={3}>3</MenuItem>
                                                        <MenuItem value={4}>4</MenuItem>
                                                        <MenuItem value={5}>5</MenuItem>
                                                    </Select>
                                                </FormControl>
                                                <TextField
                                                    className={styles.repsInput}
                                                    id="standard-number"
                                                    label="Reps"
                                                    type="Reps"
                                                    value={reps}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    onChange={handleSetReps}
                                                    variant="standard"
                                                />
                                                <IconButton onClick={choiceExercise}>
                                                    <CheckIcon/>
                                                </IconButton>
                                            </ListItem>

                                            : <ListItemButton className={styles.listItem} key={ex.name}
                                                              onClick={() => handleSetExercise(ex)}>
                                                <ListItemText primary={ex.name} secondary={ex.muscle}/>
                                            </ListItemButton>
                                    }
                                )
                                }
                            </List>
                        </ExerciseGroup>
                    )
                })}

            </div>
        )
    } else {
        return (
            <CircularProgress/>
        )
    }
}