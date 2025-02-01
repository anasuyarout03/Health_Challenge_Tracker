import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutListComponent } from './workout-list.component';
import { User } from './workout-list.model';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

describe('WorkoutListComponent', () => {
  let component: WorkoutListComponent;
  let fixture: ComponentFixture<WorkoutListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        WorkoutListComponent,
        MatPaginatorModule,
        NoopAnimationsModule,
        MatInputModule,
        MatSelectModule,
        FormsModule,
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkoutListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update dataSource when loadUsers is called', () => {
    const mockUsers: User[] = [
      {
        id: 1,
        name: 'John Doe',
        workouts: [{ type: 'Running', minutes: 50 }],
        totalWorkouts: 1,
        totalMinutes: 50,
      },
      {
        id: 2,
        name: 'Jane Doe',
        workouts: [{ type: 'Yoga', minutes: 50 }],
        totalWorkouts: 1,
        totalMinutes: 50,
      },
    ];
    component.dataSource.data = mockUsers;
    component.loadUsers();
    expect(component.dataSource.data.length).toBeGreaterThan(0);
  });

  it('should have paginator after view init', () => {
    component.ngAfterViewInit();
    expect(component.paginator).toBeTruthy();
    expect(component.dataSource.paginator).toBe(component.paginator);
  });
});
