
export interface Workout {
    day: string,
    exercises: BuiltExercise[],
}
export interface BuiltExercise {
    exercise: Exercise,
    sets: number,
    reps: number,
    weight: number,
}

export interface Exercise {
    name: string,
    muscle: string,
    group: string,
}

export interface GroupExercise {
    name: string,
    title: string
}

export interface TrainingProgram {
    name: string,
    workouts: Workout[]
}
