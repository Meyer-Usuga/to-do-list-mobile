import { Component, computed, inject, signal } from '@angular/core';
import { TaskListComponent, CategoryFilterComponent, TaskFormModalComponent, CategoryFormModalComponent } from '@features/';
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
  CategoryService,
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
    IonNote,
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
      component: TaskFormModalComponent,
      componentProps: {
        task,
      },
    });

    await modal.present(); 
  }

  async openCreateTaskForm(){
    const modal = await this.#modalController.create({
      component: TaskFormModalComponent,
      componentProps: {},
    });

    await modal.present();
  }

  async openCreateCategoryForm(){
    const modal = await this.#modalController.create({
      component: CategoryFormModalComponent,
      componentProps: {},
    });

    await modal.present();
  }

  async openEditCategoryForm(category: CategoryFilterViewModel){
    const modal = await this.#modalController.create({
      component: CategoryFormModalComponent,
      componentProps: {
        category,
      },
    });

    await modal.present();
  }
}
