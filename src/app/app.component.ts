import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialog } from '@angular/material/dialog';
import { AddWorkoutComponent } from './components/add-workout/add-workout.component';
import { WorkoutListComponent } from './components/workout-list/workout-list.component';
import { CommonModule } from '@angular/common';
import { WorkoutProgressComponent } from './components/workout-progress/workout-progress.component';
import { initialData } from './app.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    MatTabsModule,
    AddWorkoutComponent,
    WorkoutListComponent,
    WorkoutProgressComponent,
    // isPlatformBrowser,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Health_Challenge_Tracker';

  @ViewChild('workoutListComponent') workoutListComponent!: WorkoutListComponent;
  @ViewChild('workoutProgressComponent') workoutProgressComponent!: WorkoutProgressComponent;

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.initializeLocalStorage();
  }

  initializeLocalStorage() {
    if(!localStorage.getItem('workoutData')) {
      localStorage.setItem('workoutData', JSON.stringify(initialData));
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddWorkoutComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        if (this.workoutListComponent) this.workoutListComponent.loadUsers();
        if (this.workoutProgressComponent) this.workoutProgressComponent.loadUsers();
      }
    });
  }

  onUserAdded() {
    if (this.workoutProgressComponent) {
      this.workoutProgressComponent.onUserAdded();
    }
  }
}
