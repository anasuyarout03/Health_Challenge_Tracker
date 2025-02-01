import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { Chart } from 'chart.js/auto';
import { ChartService } from '../../services/chart/chart.service';
import { User } from '../workout-list/workout-list.model';
import { CategoryScale } from 'chart.js';

Chart.register(CategoryScale);

@Component({
  selector: 'app-workout-progress',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
  ],
  templateUrl: './workout-progress.component.html',
  styleUrl: './workout-progress.component.scss'
})
export class WorkoutProgressComponent implements OnInit, AfterViewInit {
  [x: string]: any;
  @ViewChild('myChart') chartRef!: ElementRef<HTMLCanvasElement>;

  users: User[] = [];
  selectedUser: User | null = null;
  chart: Chart | null = null;

  constructor (
    private chartService: ChartService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
      this.loadUsers();
  }

  ngAfterViewInit() {
      if (this.users.length > 0) {
        this.selectedUser = this.users[0];
        this.initializeChart();
        this.cdr.detectChanges();
      }
  }

  initializeChart() {
    if (this.users.length > 0 && this.chartRef) {
      this.selectedUser = this.users[0];
      this.chartService.createChart(
        this.chartRef.nativeElement,
        this.selectedUser
      );
      this.cdr.detectChanges();
    }
  }

  loadUsers() {
    const workoutDataString = localStorage.getItem('workoutData');
    if (workoutDataString) {
      this.users = JSON.parse(workoutDataString);
      if (!this.selectedUser && this.users.length > 0) {
        this.selectedUser = this.users[0];
        this.initializeChart();
      }
    }
  }

  onSelectUser(user: User) {
    this.selectedUser = user;
    this.chartService.updateChart(user);
  }

  onUserAdded() {
    this.loadUsers();
      if (this.selectedUser) {
        this.chartService.updateChart(this.selectedUser);
      }
  }
}
