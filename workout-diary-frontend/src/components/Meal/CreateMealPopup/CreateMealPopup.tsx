import styles from './CreateMealPopup.module.css'
import {IconButton} from "@mui/material";
import MUIDataTable, {MUIDataTableOptions} from "mui-datatables";
import CloseIcon from "@mui/icons-material/Close";
import {useForm} from "react-hook-form";
import {Food} from "@component/types/mealTypes";
import React from "react";


interface Props {
    opened: boolean,
}

type Inputs = {
    energyValue: number
    proteins: number
    fats: number
    carbs: number
}

export const CreateMealPopup = ({opened}: Props) => {


    const originalFoods: Food[] = [
        {
            name: 'Boiled chicken breast ',
            carbs: 0.5,
            fats: 1.8,
            proteins: 29.8,
            energy: 137,
        },
        {
            name: 'Boiled buckwheat ',
            carbs: 21,
            fats: 1,
            proteins: 4,
            energy: 110,

        },
        {
            name: 'Cottage cheese 5%',
            carbs: 3,
            fats: 5,
            proteins: 21,
            energy: 110,

        },
    ]

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: {errors},
    } = useForm<Inputs>()

    const options: MUIDataTableOptions = {
        filterType: 'checkbox',
        pagination: false,
        download: false,
        print: false,
        filter: false,
        viewColumns: false,
        selectToolbarPlacement: "none",
    };

    const columns = [
        {
            name: "name",
            label: "Name",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "energy",
            label: "Energy",
            options: {
                filter: true,
                sort: false,
                searchable: false,
            }
        },
        {
            name: "fats",
            label: "Fats",
            options: {
                filter: true,
                sort: false,
                searchable: false,
            }
        },
        {
            name: "carbs",
            label: "Carbs",
            options: {
                filter: false,
                sort: true,
                searchable: false,
            }
        },
        {
            name: "proteins",
            label: "Proteins",
            options: {
                filter: false,
                sort: true,
                searchable: false,
            }
        },
    ];

    return (
        <div className={`${styles.popup} ${opened && styles.popupOpened}`}>
            <div className={styles.popupContainer}>
                <div className={styles.popupTitle}>Choose food</div>
                <IconButton className={styles.popupCloseButton}><CloseIcon/></IconButton>
                <div>
                    <MUIDataTable
                        title={"Foods, 100g"}
                        data={originalFoods}
                        columns={columns}
                        options={options}
                    />
                </div>
            </div>
        </div>
    )
}