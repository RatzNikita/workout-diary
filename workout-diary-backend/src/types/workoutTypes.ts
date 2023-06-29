export interface WorkoutType {
    day: string,
    exercises: BuiltExerciseType[],
}
export interface BuiltExerciseType {
    exercise: ExerciseType,
    sets: number,
    reps: number,
    weight: number,
}

export interface ExerciseType {
    _id: string,
    name: string,
    muscle: string,
    group: string,
}

export interface GroupExercise {
    name: string,
    title: string
}

export interface TrainingProgramType {
    _id: string,
    name: string,
    workouts: WorkoutType[]
}