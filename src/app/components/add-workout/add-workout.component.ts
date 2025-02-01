import { ChangeDetectionStrategy, Component, EventEmitter, Output, TemplateRef, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions, MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { AddUserService } from '../../services/add-user/add-user.service';
import { Workout, workoutOptions } from './add-workout.model';

export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
  showDelay: 200,
  hideDelay: 500,
  touchendHideDelay: 800,
};

@Component({
  selector: 'app-add-workout',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogTitle,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatTooltipModule,
    CommonModule,
    FormsModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './add-workout.component.html',
  providers: [
    { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults },
  ],
  styleUrl: './add-workout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddWorkoutComponent {
  @Output() userAdded = new EventEmitter<void>();
  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;

  constructor(
    private addUserService: AddUserService, public dialog: MatDialog
  ) {}

  name: string | null = null;
  workoutMinutes: number | null = null;
  workoutType: string | null = null;
  workoutOptions = workoutOptions;

  onSubmit(form: NgForm) {
    const success = this.addUserService.addUser(
      this.name,
      this.workoutType,
      this.workoutMinutes
    );
    if (success) {
      form.resetForm();
      this.userAdded.emit();
      this.dialog.closeAll();
    }
  }
  onCancel() {
    this.dialog.closeAll();
  }

  openDialog() {
    const dialogRef = this.dialog.open(this.dialogTemplate, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if(result) {
        this.userAdded.emit();
      }
    });
  }
}

export { Workout, workoutOptions };
