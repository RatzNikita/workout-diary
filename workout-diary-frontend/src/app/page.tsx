'use client'
import React from "react";
import {useAppSelector} from "@component/hooks/hooks";
import styles from "@component/app/Home.module.css";
import {ExercisesTable} from "@component/app/library/exercises/page";
import {MealPlan} from "@component/app/meal/page";


export default function Home() {

    const activeMenu = useAppSelector(state => state.main.activeMenu)

    function contentSelect() {
        switch (activeMenu) {

            case 'exercises' :
                return (<ExercisesTable/>)
            case 'meal' :
                return(<MealPlan/>)
            default:
                return (
                    <div>пока ничего</div>
                )
        }
    }

    return (
        <div className={styles.container}>
            {contentSelect()}
        </div>
    )
}
