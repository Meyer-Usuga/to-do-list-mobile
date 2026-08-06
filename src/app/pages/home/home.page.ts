import { Component, computed, signal } from '@angular/core';
import { TaskListComponent, CategoryFilterComponent } from '@features/';
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
import {
  CategoryFilterViewModel,
  TaskItemViewModel,
} from '@shared//view-models';
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
    CategoryFilterComponent,
  ],
})
export class HomePage {
  constructor() {
    addIcons({
      'pricetags-outline': pricetags,
    });
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
      categoryId: '2',
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
    {
      id: '4',
      title: 'Task 4',
      description: 'Description 4',
      completed: false,
      categoryId: '3',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '5',
      title: 'Task 5',
      description: 'Description 5',
      completed: false,
      categoryId: '2',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  readonly categoriesItemsMock: CategoryFilterViewModel[] = [
    {
      id: '1',
      name: 'Trabajo',
      color: 'red',
    },
    {
      id: '2',
      name: 'Personal',
      color: 'blue',
    },
    {
      id: '3',
      name: 'Compras',
      color: 'green',
    },
    {
      id: '4',
      name: 'Estudios',
      color: 'orange',
    },
    {
      id: '5',
      name: 'Otros',
      color: 'yellow',
    },
  ];

  readonly tasks = signal<TaskItemViewModel[]>(
    this.taskItemsMock
  );
  readonly categories = signal<CategoryFilterViewModel[]>(
    this.categoriesItemsMock,
  );
  readonly selectedCategoryId = signal('all');

  onSelectedCategory(categoryId: string) {
    this.selectedCategoryId.set(categoryId);
  }

  readonly tasksSelected = computed(() => {
    if (this.selectedCategoryId() === 'all') {
      return this.tasks();
    }
    return this.tasks().filter(
      (task) => task.categoryId === this.selectedCategoryId(),
    );
  });
}
