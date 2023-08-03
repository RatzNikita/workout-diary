import {Exercise} from '@component/types/workoutTypes'
import styles from './styles.module.css'
import $api from "@component/service/api/api";

export async function generateStaticParams() {
   // const exercises: Exercise[] = await fetch('http://localhost:3001/exercises').then(res => res.json());
    const exercises: Exercise[] = await $api.get('/exercises')
    return exercises.map(ex => {
        return {id: ex._id}
    })
}

async function getExercises(id: string) {
   // const exercise: Exercise = await fetch('http://localhost:3001/exercises/' + id).then(res => res.json())
    const exercise: Exercise = await $api.get('/exercises/'+ id)
    return exercise;
}

export default async function Exercise({params}: { params: { id: string } }) {
    const exercise = await getExercises(params.id)

    return (
        <div className={styles.container}>
            <p>{exercise.name}</p>
            <p>{exercise.group}</p>
            <p>{exercise.muscle}</p>
        </div>
    )
}