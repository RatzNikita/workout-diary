import React from "react";
import {SubmitHandler, useForm} from "react-hook-form";

type Inputs = {
    energyValue: string
    proteins: string
    fats: string
    carbohydrates: string
}

export const MealPlan = () => {

    const [energyValue, setEnergyValue] = React.useState(0)

    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)


    return (
        <div>
            <h4>
                Meal Plan
            </h4>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <p>Energy value:</p>
                    <input {...register('energyValue')}></input>
                    <p>Proteins:</p>
                    <input {...register('proteins')}></input>
                    <p>Fats:</p>
                    <input {...register('fats')}></input>
                    <p>Carbohydrates:</p>
                    <input {...register('carbohydrates')}></input>
                </form>
            </div>
        </div>
    )
}
