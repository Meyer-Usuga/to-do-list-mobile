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
  IonSearchbar,
} from '@ionic/angular/standalone';
import {
  CategoryService,
  FeatureFlagService,
  TaskItemViewModel,
  TaskService,
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
    IonFab,
    IonFabButton,
    IonSearchbar,
    TaskListComponent,
    CategoryFilterComponent,
    TaskFormModalComponent,
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

  constructor() {
    addIcons({
      'pricetags-outline': pricetags,
      'add-outline': add,
    });
  }

  readonly searchTask = signal<string>('');
  readonly selectedCategoryId = signal<string>('all');

  readonly tasksSelected = computed<TaskItemViewModel[]>(() => {
    const tasks = this.tasks();
    const categories = this.categories();
    const selectedCategoryId = this.selectedCategoryId();
    const searchTask = this.searchTask().trim().toLowerCase();

    const mapTasksWithCategory = tasks.map((task: TaskItemViewModel) => {
      const category = categories.find((cat) => cat.id === task.categoryId);
      return {
        ...task,
        categoryColor: category?.color,
      };
    });

    return mapTasksWithCategory.filter((task: TaskItemViewModel) => {
      const matchesCategory =
        selectedCategoryId === 'all' ||
        task.categoryId === selectedCategoryId;

      const matchesSearch =
        !searchTask ||
        task.title.toLowerCase().includes(searchTask) ||
        task.description?.toLowerCase().includes(searchTask);

      return matchesCategory && matchesSearch;
    });
  });

  onSearchTask(event: Event) {
    this.searchTask.set((event.target as HTMLIonSearchbarElement).value || '');
  }

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
