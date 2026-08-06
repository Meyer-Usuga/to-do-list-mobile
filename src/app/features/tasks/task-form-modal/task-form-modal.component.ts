import {
  Component,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';
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
import { TaskService } from '../../../shared/services';
import { Task } from '../../../shared/models';
import { TaskItemViewModel } from '../../../shared/view-models';

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
  readonly #formBuilder = inject(FormBuilder);

  readonly form = this.#formBuilder.group({
    id: [crypto.randomUUID() as string],
    title: ['', [Validators.required, Validators.minLength(5)]],
    description: ['', [Validators.maxLength(50)]],
    completed: [false],
    categoryId: [''],
    createdAt: [new Date()],
    updatedAt: [new Date()],
  });

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
