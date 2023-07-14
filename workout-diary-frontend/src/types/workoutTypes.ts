
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
    _id: string,
    name: string,
    muscle: string,
    group: string,
}

export interface GroupExercise {
    name: string,
    title: string
}

export interface TrainingProgram {
    _id: string,
    name: string,
    workouts: Workout[],
    createdAt: string,
}

export interface TrainingProgramRequest {
    name: string,
    workouts: Workout[],
}

export interface WeightChangeRequest {
    programID: string,
    workoutDay: string,
    exerciseID: string,
    weight: number,
}