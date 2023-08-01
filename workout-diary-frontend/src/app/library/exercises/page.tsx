'use client'
import React from "react";
import $api from "@component/service/api/api";
import {Exercise} from "@component/types/workoutTypes";
import styles from './styles.module.css'


export default async function ExercisesTable() {

   // const {data: exercises} = await $api.get<Exercise[]>('/exercises')
    const exercises : Exercise[] = await fetch(`http://localhost:3001/exercises`, { cache: 'force-cache'}).then(res => res.json())
    console.log(exercises)



    return (
        <section className={styles.container}>
            <h3 className={styles.title}>Exercises list</h3>
            <ul className={styles.table}>
                {exercises.map((exercise, index) => {
                        return (
                            <li key={exercise.name}>
                                <p className={styles.exerciseName}>{exercise.name}</p>
                                <p className={styles.exerciseGroup}>{exercise.group}</p>
                                <p className={styles.exerciseMuscle}>{exercise.muscle}</p>
                            </li>
                        )
                    }
                )
                }
            </ul>
        </section>
    )
}

