'use client'
import React from "react";
import styles from './styles.module.css'
import MUIDataTable, {MUIDataTableOptions} from "mui-datatables";
import {useAppDispatch, useAppSelector} from "@component/hooks/hooks";
import {getExercises} from "@component/store/reducers/exercises/exercisesThunks";
import {CircularProgress} from "@mui/material";
import {Exercise} from "@component/types/workoutTypes";
import Link from "next/link";
import {useRouter} from "next/navigation";


export default function ExercisesTable() {

    const exercises: Exercise[] = useAppSelector(state => state.exercises.exercises)
    const dispatch = useAppDispatch();
    React.useEffect(() => {
        dispatch(getExercises())
    }, [])
    const router = useRouter();

    const options: MUIDataTableOptions = {
        filterType: 'checkbox',
        pagination: false,
        download: false,
        print: false,
        filter: false,
        viewColumns: false,
        selectToolbarPlacement: "none",
        onRowClick: (rowData, rowMeta) => {
              router.push('/library/exercises/' + rowData[0])

        }
    };

    const columns = [
        {
            name: "_id",
            label: "ID",
            options: {
                display: false,
            }
        }
        ,
        {
            name: "name",
            label: "Name",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "muscle",
            label: "Muscle",
            options: {
                filter: true,
                sort: false,
                searchable: false,
            }
        },
        {
            name: "group",
            label: "Group",
            options: {
                filter: true,
                sort: false,
                searchable: false,
            }
        },
    ];

    if (!exercises) {
        return (
            <CircularProgress/>
        )
    } else {
        return (
            <section className={styles.container}>
                <MUIDataTable
                    title={"Exercises list"}
                    data={exercises}
                    columns={columns}
                    options={options}
                />
            </section>
        )
    }
}

