import { Component, computed, effect, inject, signal } from '@angular/core';
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
  IonNote,
  IonFab,
  IonFabButton,
  ModalController,
} from '@ionic/angular/standalone';
import {
  CategoryFilterViewModel,
  TaskItemViewModel,
  TaskService,
  CreateTaskFormComponent
} from '@shared/';
import { add, pricetags } from 'ionicons/icons';

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
    IonNote,
    IonFab,
    IonFabButton,
    TaskListComponent,
    CreateTaskFormComponent,
    CategoryFilterComponent,
  ],
})
export class HomePage {
  readonly #taskService = inject(TaskService); 
  readonly #modalController = inject(ModalController); 
  readonly tasks = this.#taskService.tasks; 

  constructor() {
    addIcons({
      'pricetags-outline': pricetags,
      'add-outline': add,
    });
  }

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

  readonly categories = signal<CategoryFilterViewModel[]>(
    this.categoriesItemsMock,
  );
  readonly selectedCategoryId = signal('all');

  readonly tasksSelected = computed(() => {
    if (this.selectedCategoryId() === 'all') {
      return this.tasks();
    }

    return this.tasks().filter(
      (task) => task.categoryId === this.selectedCategoryId(),
    );
  });

  onSelectedCategory(categoryId: string) {
    this.selectedCategoryId.set(categoryId);
  }

  onEditTask(task: TaskItemViewModel){
     this.openEditTaskForm(task);
  }

  onDeleteTask(task: TaskItemViewModel){
    this.#taskService.deleteTask(task.id);
  }

  onToggleTask(task: TaskItemViewModel){
    this.#taskService.toggleTask(task.id);
  }

  async openEditTaskForm(task: TaskItemViewModel){
    const modal = await this.#modalController.create({
      component: CreateTaskFormComponent,
      componentProps: {
        task,
      },
    });

    await modal.present(); 
  }

  async openCreateTaskForm(){
    const modal = await this.#modalController.create({
      component: CreateTaskFormComponent,
      componentProps: {},
    });

    await modal.present();
  }
}
