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
  IonFab,
  IonFabButton,
  ModalController,
  AlertController,
} from '@ionic/angular/standalone';
import {
  CategoryService,
  FeatureFlagService,
  TaskItemViewModel,
  TaskService,
} from '@shared/';
import { add, pricetags } from 'ionicons/icons';
import { DatePipe } from '@angular/common';

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
    DatePipe,
  ],
})
export class HomePage {
  readonly #taskService = inject(TaskService);
  readonly #categoryService = inject(CategoryService);
  readonly #featureFlagService = inject(FeatureFlagService);
  readonly #modalController = inject(ModalController);
  readonly #alertController = inject(AlertController);
  readonly tasks = this.#taskService.tasks;
  readonly categories = this.#categoryService.categories;
  readonly showCategoryManagment =
    this.#featureFlagService.showCategoryManagment;
  readonly today = new Date();

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

  onToggleTask(task: TaskItemViewModel) {
    this.#taskService.toggleTask(task.id);
  }

  onDeleteTask(task: TaskItemViewModel) {
    this.openAlertDelete(task.id);
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

  async openAlertDelete(taskId: string){
    const alert = await this.#alertController.create({
      header: "Eliminar tarea",
      message: "¿Estás seguro de que quieres eliminar esta tarea?",
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
        },
        {
          text: "Eliminar",
          handler: async () => {
            await this.#taskService.deleteTask(taskId);
          },
        },
      ],
    });
    await alert.present();
  }
}
