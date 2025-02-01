import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddWorkoutComponent } from '../../components/add-workout/add-workout.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openAddUserDialog() {
    const dialogRef = this.dialog.open(AddWorkoutComponent, {
      width: '500px',
    });

    return dialogRef.afterClosed();
  }
}
