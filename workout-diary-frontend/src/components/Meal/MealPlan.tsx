import React from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import styles from './Meal.module.css'
import {Button} from "@component/components/UI/Button/Button";
import {PieChartData, PieChartWithPercents} from "@component/components/UI/PieChartWithPercents/PieChartWithPercents";


type Inputs = {
    energyValue: number
    proteins: number
    fats: number
    carbs: number
}

export const MealPlan = () => {

    const [energyValue, setEnergyValue] = React.useState(0)

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
            <h4 className={styles.title}>
                Meal Plan
            </h4>
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
        </div>
    )
}
