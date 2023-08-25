'use client'
import React from "react";
import styles from './styles.module.css'
import MUIDataTable, {MUIDataTableOptions} from "mui-datatables";
import {useAppDispatch, useAppSelector} from "@component/hooks/hooks";
import {getExercises} from "@component/store/reducers/exercises/exercisesThunks";
import {Button, CircularProgress} from "@mui/material";
import {Exercise} from "@component/types/workoutTypes";
import {useRouter} from "next/navigation";
import AddIcon from "@mui/icons-material/Add";
import PopupWithForm from "@component/components/PopupWithForm/PopupWithForm";
import {SubmitHandler, useForm} from "react-hook-form";


export default function ExercisesTable() {

    const exercises: Exercise[] = useAppSelector(state => state.exercises.exercises)
    const [addExercisePopupOpened,setAddExercisePopupOpened] = React.useState(false);
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
        },
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

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        resetField,
        formState: {errors},
    } = useForm<Exercise>()

    const onAddExercise: SubmitHandler<Exercise> = (data)  => {
        console.log(data)
        resetField("name")
        resetField("muscle")
        resetField("group")
    }

    const closePopup = () => {
        setAddExercisePopupOpened(false)
    }

    if (!exercises) {
        return (
            <CircularProgress/>
        )
    } else {
        return (
            <section className={styles.container}>
                <Button variant='contained' endIcon={<AddIcon/>} onClick={() => setAddExercisePopupOpened(true)}>Add exercise</Button>
                <MUIDataTable
                    title={"Exercises list"}
                    data={exercises}
                    columns={columns}
                    options={options}
                />
                <PopupWithForm title={'Add exercise'} name={'addExercise'} isOpen={addExercisePopupOpened} onSubmit={handleSubmit(onAddExercise)} onClose={closePopup}>
                    <input placeholder='Name' className={styles.popupInput} {...register('name')}></input>
                    <input placeholder='Group' className={styles.popupInput} {...register('group')}></input>
                    <input placeholder='Muscle' className={styles.popupInput} {...register('muscle')}></input>
                </PopupWithForm>
            </section>
        )
    }
}

