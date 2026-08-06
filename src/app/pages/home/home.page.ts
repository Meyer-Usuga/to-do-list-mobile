import { Component, signal } from '@angular/core';
import { TaskListComponent } from '@features/';
import { addIcons } from 'ionicons';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
  IonButtons,
} from '@ionic/angular/standalone';
import { TaskItemViewModel } from '@shared//view-models';
import { pricetags } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonButton,
    IonIcon,
    TaskListComponent,
  ],
})
export class HomePage {

  constructor(){
    addIcons({
      "pricetags-outline": pricetags
    })
  }

  readonly taskItemsMock: TaskItemViewModel[] = [
    {
      id: '1',
      title: 'Task 1',
      description: 'Description 1',
      completed: false,
      categoryId: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      title: 'Task 2',
      description: 'Description 2',
      completed: true,
      categoryId: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '3',
      title: 'Task 3',
      description: 'Description 3',
      completed: false,
      categoryId: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  readonly tasks = signal<TaskItemViewModel[]>(this.taskItemsMock);
}
