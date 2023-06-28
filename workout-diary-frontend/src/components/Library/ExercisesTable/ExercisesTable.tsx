import {
    Box,
    CircularProgress,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Table, TableBody,
    TableCell,
    TableHead
} from "@mui/material";
import styles from '../Library.module.css'
import {useAppDispatch, useAppSelector} from "@component/hooks/hooks";
import React from "react";
import {exerciseGroups} from "@component/components/MyProgram/ExercisesList/ExercisesList";
import {ExerciseGroup} from "@component/components/MyProgram/ExerciseGroup/ExerciseGroup";
import AddIcon from "@mui/icons-material/Add";
import {Row} from "@component/components/Library/ExercisesTable/TableRow/TableRow";
import {getExercises} from "@component/store/reducers/exercises/exercisesThunks";

export const ExercisesTable = () => {

    const exercises = useAppSelector(state => state.exercises.exercises)
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        console.log('kefteme')
       dispatch(getExercises());
    },[])

    if (exercises) {
        return (
            <Box className={styles.container}>

                <Table>
                    <TableHead>
                        <TableCell/>
                        <TableCell>Name</TableCell>
                        <TableCell>Muscle group</TableCell>
                    </TableHead>
                    <TableBody>
                        {exercises.map((ex) => {
                            return (
                                <Row key={ex.name} exercise={ex}/>
                            )
                        })}
                    </TableBody>
                </Table>

            </Box>
        )
    } else {
        return (
            <CircularProgress/>
        )
    }
}