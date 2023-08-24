'use client'
import React from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import styles from "@component/app/meal/Meal.module.css";
import {TodayMeal} from "@component/components/Meal/TodayMeal/TodayMeal";
import {CreateMealPopup} from "@component/components/Meal/CreateMealPopup/CreateMealPopup";
import {PieChartData, PieChartWithPercents} from "@component/components/PieChartWithPercents/PieChartWithPercents";
import Button from "@component/components/Button/Button";

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


    return (
        <div className={styles.container}>
            <div className={styles.mealTablet}>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.mealForm} autoComplete="off">
                    <h5 className={styles.mealTabletTitle}>MEAL PLAN</h5>
                    <div className={styles.formField}>
                        <p>PROTEINS:</p>
                        <input type="number" {...register('proteins')}  className={styles.formInput}></input>
                        <div className={`${styles.colorCircle} ${styles.greenCircle}`}></div>
                    </div>
                    <div className={styles.formField}>
                        <p>CARBS:</p>
                        <input type="number" {...register('carbs')}  className={styles.formInput}></input>
                        <div className={`${styles.colorCircle} ${styles.orangeCircle}`}></div>
                    </div>
                    <div className={styles.formField}>
                        <p>FATS:</p>
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