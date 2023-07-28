'use client'
import {useAppDispatch, useAppSelector} from "@component/hooks/hooks";
import React from "react";
import {getExercises} from "@component/store/reducers/exercises/exercisesThunks";
import {Box, CircularProgress, Table, TableBody, TableCell, TableHead} from "@mui/material";
import styles from "@component/app/library/Library.module.css";
import {Row} from "@component/components/TableRow/TableRow";

export default function ExercisesTable() {

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