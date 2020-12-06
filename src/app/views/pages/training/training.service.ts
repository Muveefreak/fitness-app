import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Exercise } from './exercise.model';

@Injectable()
export class TrainingService {
    private availableExercises: Exercise[] = [];

    private runningExercise: Exercise;
    private finishedExercises: Exercise[] = [];
    private fbSubs: Subscription[] = [];
    exerciseChanged = new Subject<Exercise>();
    exercisesChanged = new Subject<Exercise[]>();
    finishedExercisesChanged = new Subject<Exercise[]>();
    completedOrCancelledExercises = new Subject<Exercise[]>();

    constructor(private db: AngularFirestore) {}

    fetchAvailableExercises() {
        this.fbSubs.push(this.db.collection('availableExercises').snapshotChanges().pipe(map(docArray => {
            return docArray.map(doc => {
                return {
                    id: doc.payload.doc.id,
                    name: doc.payload.doc.data()['name'],
                    calories: doc.payload.doc.data()['calories'],
                    duration: doc.payload.doc.data()['duration'],
                };
            });
        })).subscribe((exercises: Exercise[]) => {
            this.availableExercises = exercises;
            this.exercisesChanged.next([...this.availableExercises]);
        }));
    }

    startExercise(selectedId: string) {
        this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
        this.exerciseChanged.next({...this.runningExercise});
    }

    completeExercise() {
        this.addDataToDatabase({
            ...this.runningExercise,
            date: new Date(),
            state: 'completed'});
        this.completedOrCancelledExercises.next(this.finishedExercises);
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    cancelExercise(progress: number) {
        this.addDataToDatabase({
            ...this.runningExercise,
            duration: this.runningExercise.duration * (progress  / 100),
            calories: this.runningExercise.calories * (progress  / 100),
            date: new Date(),
            state: 'cancelled'});
        this.completedOrCancelledExercises.next(this.finishedExercises);
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }
    getRunningExercise() {
        return { ...this.runningExercise };
    }

    fetchCompletedOrCancelledExercises() {
        this.fbSubs.push(this.db.collection('finishedExercises').valueChanges().subscribe((exercises: Exercise[]) => {
            console.log(exercises);
            this.finishedExercisesChanged.next(exercises);
        }));
        // return this.exercises.slice();
        // return this.completedOrCancelledExercises.next( {...this.exercises} );
    }

    private addDataToDatabase(exercise: Exercise) {
        this.db.collection('finishedExercises').add(exercise);
    }

    cancelSubscriptions() {
        this.fbSubs.forEach(sub => sub.unsubscribe());
    }
}
