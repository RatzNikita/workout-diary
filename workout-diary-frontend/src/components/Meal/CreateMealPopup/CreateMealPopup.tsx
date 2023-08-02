
import MUIDataTable, {MUIDataTableOptions} from "mui-datatables";
import {SubmitHandler, useForm} from "react-hook-form";
import {Food, Meal} from "@component/types/mealTypes";
import React from "react";
import PopupWithForm from "@component/components/PopupWithForm/PopupWithForm";
import {Exercise} from "@component/types/workoutTypes";


interface Props {
    isOpen: boolean,
    onClose: () => void,
}



export const CreateMealPopup = ({onClose,isOpen}: Props) => {


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
    } = useForm<Meal>()


    const onSubmit: SubmitHandler<Meal> = (data) => {
        console.log(data)
    }

    const options: MUIDataTableOptions = {
        filterType: 'checkbox',
        pagination: false,
        download: false,
        print: false,
        filter: false,
        viewColumns: false,
        selectToolbarPlacement: "none",
        selectableRowsHeader: false,
        selectableRowsOnClick: true,
        selectableRowsHideCheckboxes: true,
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
        <PopupWithForm title={'Create meal'}
                       name={'createMeal'}
                       isOpen={isOpen}
                       onSubmit={handleSubmit(onSubmit)}
                       onClose={onClose}>
            <MUIDataTable
                title={"Foods, 100g"}
                data={originalFoods}
                columns={columns}
                options={options}
            />
            <input {...register}></input>
        </PopupWithForm>
    )
}