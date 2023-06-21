import {Box, CircularProgress, IconButton, List, ListItem, ListItemText} from "@mui/material";
import styles from './Library.module.css'
import {useAppSelector} from "@component/hooks/hooks";
import React from "react";
import {exerciseGroups} from "@component/components/MyProgram/ExercisesList/ExercisesList";
import {ExerciseGroup} from "@component/components/MyProgram/ExerciseGroup/ExerciseGroup";
import AddIcon from "@mui/icons-material/Add";

export const Library = () => {

    const exercises = useAppSelector(state => state.main.exercises)


    if (exercises) {
        return (
            <Box className={styles.container}>
                {exerciseGroups.map(group => {
                    return (
                        <ExerciseGroup value={group.title} key={group.name}>
                            <List>
                                <ListItem className={styles.item}
                                secondaryAction={
                                    <IconButton><AddIcon/></IconButton>
                                }>
                                    <ListItemText primary={'Добавить'}/>
                                </ListItem>
                                {exercises.map(ex => {
                                    return (
                                        <ListItem className={styles.item} key={ex.name}>
                                            <ListItemText primary={ex.name}
                                                          secondary={ex.muscle}/>
                                        </ListItem>
                                    )
                                })}
                            </List>
                        </ExerciseGroup>
                    )
                })}
            </Box>
        )
    } else {
        return (
            <CircularProgress/>
        )
    }
}