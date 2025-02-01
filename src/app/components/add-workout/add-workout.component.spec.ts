import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWorkoutComponent } from './add-workout.component';
import { AddUserService } from '../../services/add-user/add-user.service';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormsModule, NgForm } from '@angular/forms';
import { of } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

describe('AddWorkoutComponent', () => {
  let component: AddWorkoutComponent;
  let fixture: ComponentFixture<AddWorkoutComponent>;
  let addUserServiceSpy: jasmine.SpyObj<AddUserService>;
  let dialog: MatDialog;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('AddUserService', ['addUser']);

    await TestBed.configureTestingModule({
      imports: [
        AddWorkoutComponent,
        FormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        NoopAnimationsModule,
        CommonModule,
      ],
      providers: [{ provide: AddUserService, useValue: spy }],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddWorkoutComponent);
    component = fixture.componentInstance;
    addUserServiceSpy = TestBed.inject(AddUserService) as jasmine.SpyObj<AddUserService>;
    dialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset form after submission', async () => {
    addUserServiceSpy.addUser.and.returnValue(true);

    component.name = 'Test User';
    component.workoutMinutes = 60;
    component.workoutType = 'Cycling';
    fixture.detectChanges();

    await fixture.whenStable();

    const form = {
      valid: true,
      resetForm: jasmine.createSpy('resetForm'),
    } as unknown as NgForm;
    component.onSubmit(form);

    expect(component.name).toBeNull();
    expect(component.workoutMinutes).toBeNull();
    expect(component.workoutType).toBeNull();
    expect(form.resetForm).toHaveBeenCalled();
  });

  it('should open dialog on openDialog call', () => {
    const dialogSpy = spyOn(dialog, 'open').and.returnValue({
      afterClosed: () => of(true),
    } as MatDialogRef<typeof component>);
    component.openDialog();
    expect(dialogSpy).toHaveBeenCalled();
  });
});
