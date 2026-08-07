import { Component, input, output } from '@angular/core';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCheckbox,
  IonIcon,
} from '@ionic/angular/standalone';
import { TaskItemViewModel } from '@shared/';
import { addIcons } from 'ionicons';
import { createOutline, trashOutline } from 'ionicons/icons';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  imports: [IonButton, IonIcon, IonCheckbox, IonCard, IonCardContent],
  standalone: true,
})
export class TaskItemComponent {

  constructor(){
    addIcons({
      "trash-outline": trashOutline,
      "create-outline": createOutline,
    })
  }

  readonly task = input.required<TaskItemViewModel>();
  readonly toggle = output<TaskItemViewModel>();
  readonly edit = output<TaskItemViewModel>();
  readonly delete = output<TaskItemViewModel>();
}
