import {
    Collapse,
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
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import React from "react";
import CheckIcon from '@mui/icons-material/Check';
import styles from './ExercisesList.module.css'

export interface ExerciseType {
    name: string,
    muscle: string,
    group: string,
}


const exercises: Array<ExerciseType> = [
    {
        name: 'Жим ногами',
        muscle: 'Квадрицепс',
        group: 'legs'
    },
    {
        name: 'Приседания со штангой',
        muscle: 'Квадрицепс',
        group: 'legs'
    },
    {
        name: 'Мёртвая тяга',
        muscle: 'Бицепс бедра',
        group: 'legs'
    },
    {
        name: 'Жим лёжа',
        muscle: 'Грудные',
        group: 'chest'
    },
    {
        name: 'Разводка гантелей лёжа на скамье',
        muscle: 'Грудные',
        group: 'chest'
    },
    {
        name: 'Сгибания рук в тренажёре "Бабочка"',
        muscle: 'Грудные',
        group: 'chest'
    },
    {
        name: 'Тяга штанги в наклоне',
        muscle: 'Широчайшие',
        group: 'back'
    },
    {
        name: 'Подтягивания широким хватом',
        muscle: 'Трапецевидная',
        group: 'back'
    },
]

interface ExercisesListProps {
    handleChoiceExercise: (e: ExerciseType, s: number, r: number) => void
}

const setsDefault = '4'
const repsDefault = '8'

export const ExercisesList = ({handleChoiceExercise}: ExercisesListProps) => {

    const [openChest, setOpenChest] = React.useState(false)
    const [openBack, setOpenBack] = React.useState(false)
    const [openLegs, setOpenLegs] = React.useState(false)
    const [expandedExercise, setExpandedExercise] = React.useState<ExerciseType>()
    const [sets, setSets] = React.useState(setsDefault)
    const [reps, setReps] = React.useState(repsDefault)


    const handleOpenLegs = () => {
        setOpenLegs(!openLegs);
    };
    const handleOpenBack = () => {
        setOpenBack(!openBack);
    };
    const handleOpenChest = () => {
        setOpenChest(!openChest);
    };

    const handleSetExercise = (ex: ExerciseType) => {
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


    return (
        <div>
            <ListItemButton onClick={handleOpenChest} className={styles.listItem}>
                <ListItemText primary="Грудь"/>
                {openChest ? <ExpandLess/> : <ExpandMore/>}
            </ListItemButton>
            <Collapse in={openChest} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {exercises.filter(ex => ex.group === 'chest').map(ex => {
                            return expandedExercise?.name === ex.name
                                ? <ListItem className={styles.listItem}>
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
            </Collapse>
        </div>
    )
}