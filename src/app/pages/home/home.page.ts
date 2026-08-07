import { Component, computed, inject, signal } from '@angular/core';
import {
  TaskListComponent,
  CategoryFilterComponent,
  TaskFormModalComponent,
  CategoryManagmentModalComponent,
} from '@features/';
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
import { CategoryService, TaskItemViewModel, TaskService } from '@shared/';
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
    IonFab,
    IonFabButton,
    TaskListComponent,
    CategoryFilterComponent,
    TaskFormModalComponent,
  ],
})
export class HomePage {
  readonly #taskService = inject(TaskService);
  readonly #categoryService = inject(CategoryService);
  readonly #modalController = inject(ModalController);
  readonly tasks = this.#taskService.tasks;
  readonly categories = this.#categoryService.categories;

  constructor() {
    addIcons({
      'pricetags-outline': pricetags,
      'add-outline': add,
    });
  }

  readonly selectedCategoryId = signal('all');

  readonly tasksSelected = computed(() => {
    const tasks = this.tasks();
    const categories = this.categories();

    const mappedTasks = tasks.map((task) => {
      const category = categories.find((cat) => cat.id === task.categoryId);
      return {
        ...task,
        categoryColor: category?.color,
      };
    });

    if (this.selectedCategoryId() === 'all') {
      return mappedTasks;
    }

    return mappedTasks.filter(
      (task) => task.categoryId === this.selectedCategoryId(),
    );
  });

  onSelectedCategory(categoryId: string) {
    this.selectedCategoryId.set(categoryId);
  }

  onEditTask(task: TaskItemViewModel) {
    this.openEditTaskForm(task);
  }

  onDeleteTask(task: TaskItemViewModel) {
    this.#taskService.deleteTask(task.id);
  }

  onToggleTask(task: TaskItemViewModel) {
    this.#taskService.toggleTask(task.id);
  }

  async openEditTaskForm(task: TaskItemViewModel) {
    const modal = await this.#modalController.create({
      component: TaskFormModalComponent,
      componentProps: {
        task,
      },
    });

    await modal.present();
  }

  async openCreateTaskForm() {
    const modal = await this.#modalController.create({
      component: TaskFormModalComponent,
      componentProps: {},
    });

    await modal.present();
  }

  async openCategoryManagmentModal() {
    const modal = await this.#modalController.create({
      component: CategoryManagmentModalComponent,
      componentProps: {},
    });

    await modal.present();
  }
}
