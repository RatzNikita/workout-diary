'use client'
import React from "react";
import {useAppSelector} from "@component/hooks/hooks";
import styles from "@component/app/styles.module.css";
import ExercisesTable from "@component/app/library/exercises/page";
import {MealPlan} from "@component/app/meal/page";


export default function Home() {

    const activeMenu = useAppSelector(state => state.main.activeMenu)


    return (
        <div className={styles.container}>
            Hello
        </div>
    )
}
