import { Workout } from "../add-workout/add-workout.model";

export interface User {
    id: number;
    name: string;
    workouts: Workout[];
    totalWorkouts: number;
    totalMinutes: number;
}