import { Component, computed, effect, inject, input } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  IonInput,
  ModalController,
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  Task,
  CategoryService,
  TaskItemViewModel,
  TaskService,
} from '@shared/';

@Component({
  selector: 'app-task-form-modal',
  templateUrl: './task-form-modal.component.html',
  styleUrls: ['./task-form-modal.component.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonContent,
    IonInput,
    IonSelect,
    IonSelectOption,
    FormsModule,
    ReactiveFormsModule,
  ],
  standalone: true,
})
export class TaskFormModalComponent {
  readonly task = input<TaskItemViewModel | null>(null);
  readonly isEdit = computed(() => this.task() !== null);

  readonly #modalController = inject(ModalController);
  readonly #taskService = inject(TaskService);
  readonly #categoryService = inject(CategoryService);
  readonly #formBuilder = inject(FormBuilder);

  readonly form = this.#formBuilder.group({
    id: [crypto.randomUUID() as string],
    title: ['', [Validators.required]],
    description: ['', [Validators.maxLength(50)]],
    completed: [false],
    categoryId: [''],
    categoryColor: [''],
    createdAt: [new Date()],
    updatedAt: [new Date()],
  });

  readonly categories = this.#categoryService.categories;

  constructor() {
    effect(() => {
      const task = this.task();
      if (task) {
        this.form.patchValue({
          id: task.id as string,
          title: task.title,
          description: task.description,
          completed: task.completed,
          categoryId: task.categoryId,
          categoryColor: task.categoryColor,
          createdAt: task.createdAt,
          updatedAt: task.updatedAt,
        });
      }
    });
  }

  async saveForm() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.isEdit()) {
      await this.#taskService.editTask(this.form.getRawValue() as Task);
    } else {
      await this.#taskService.addTask(this.form.getRawValue() as Task);
    }

    this.#modalController.dismiss();
  }

  async closeModal() {
    this.#modalController.dismiss();
  }
}
