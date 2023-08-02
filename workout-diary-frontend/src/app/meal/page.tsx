'use client'
import React from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import styles from "@component/app/meal/Meal.module.css";
import {Button} from "@component/components/UI/Button/Button";
import {TodayMeal} from "@component/components/Meal/TodayMeal/TodayMeal";
import {CreateMealPopup} from "@component/components/Meal/CreateMealPopup/CreateMealPopup";
import {PieChartData, PieChartWithPercents} from "@component/components/PieChartWithPercents/PieChartWithPercents";
import PopupWithForm from "@component/components/PopupWithForm/PopupWithForm";
import MUIDataTable, {MUIDataTableOptions} from "mui-datatables";
import {Food} from "@component/types/mealTypes";

type Inputs = {
    energyValue: number
    proteins: number
    fats: number
    carbs: number
}

export default function  MealPlan() {

    const [energyValue, setEnergyValue] = React.useState(0)
    const [mealPopupOpened,setMealPopupOpened] = React.useState(false)

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: {errors},
    } = useForm<Inputs>({
        defaultValues: {
            energyValue: 0,
            proteins: 0,
            fats: 0,
            carbs: 0,
        },
    })

    React.useEffect(() => {
        setValue('energyValue', Math.trunc(watch('fats') * 9.3 + watch('proteins') * 4.1 + watch('carbs') * 4.1))
    })

    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

    const getEnergyValue = () => {
        return `Energy, kcal: ${Math.trunc(watch('fats') * 9.3 + watch('proteins') * 4.1 + watch('carbs') * 4.1)} `;
    }

    const pieChartData: PieChartData[] = [
        {
            name: "Fats",
            value: +watch('fats')
        },
        {
            name: "Proteins",
            value: +watch('proteins')
        },
        {
            name: "Carbs",
            value: +watch("carbs")
        },
    ]

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
        <div className={styles.container}>
            <div className={styles.mealTablet}>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.mealForm} autoComplete="off">
                    <h5>Nutrients, g</h5>
                    <div className={styles.formField}>
                        <p>Proteins:</p>
                        <input type="number" {...register('proteins')}  className={styles.formInput}></input>
                        <div className={`${styles.colorCircle} ${styles.greenCircle}`}></div>
                    </div>
                    <div className={styles.formField}>
                        <p>Carbs:</p>
                        <input type="number" {...register('carbs')}  className={styles.formInput}></input>
                        <div className={`${styles.colorCircle} ${styles.orangeCircle}`}></div>
                    </div>
                    <div className={styles.formField}>
                        <p>Fats:</p>
                        <input type="number" {...register('fats')}  className={styles.formInput}></input>
                        <div className={`${styles.colorCircle} ${styles.blueCircle}`}></div>
                    </div>
                    <p  {...register('energyValue')} >{getEnergyValue()}</p>
                    <Button type='submit' size='l'>SAVE</Button>
                </form>
                <PieChartWithPercents data={pieChartData}/>
            </div>
            <TodayMeal onShowPopup={setMealPopupOpened}/>
            <CreateMealPopup isOpen={mealPopupOpened} onClose={() => setMealPopupOpened(false)}/>
        </div>
    )
}