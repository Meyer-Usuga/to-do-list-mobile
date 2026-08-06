import { Component, input, output } from '@angular/core';
import { IonList } from '@ionic/angular/standalone';
import { TaskItemViewModel } from '@shared//view-models';
import { TaskItemComponent } from '../task-item';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  imports: [IonList, TaskItemComponent],
  standalone: true,
})
export class TaskListComponent {
  readonly tasks = input.required<TaskItemViewModel[]>();
  readonly toggle = output<TaskItemViewModel>();
  readonly edit = output<TaskItemViewModel>();
  readonly delete = output<TaskItemViewModel>();
}
