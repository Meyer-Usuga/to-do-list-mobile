import { Component, input, output } from '@angular/core';
import {
  IonButton,
  IonCheckbox,
  IonIcon,
  IonItem,
  IonLabel,
  IonNote,
} from '@ionic/angular/standalone';
import { TaskItemViewModel } from '@shared//view-models';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  imports: [IonItem, IonButton, IonIcon, IonCheckbox, IonLabel, IonNote],
  standalone: true,
})
export class TaskItemComponent {
  readonly task = input.required<TaskItemViewModel>();
  readonly toggle = output<TaskItemViewModel>();
  readonly redit = output<TaskItemViewModel>();
  readonly delete = output<TaskItemViewModel>();
}
