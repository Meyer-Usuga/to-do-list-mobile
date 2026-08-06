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
import { TaskService } from '../../services';
import { Task } from '../../models';
import { TaskItemViewModel } from '../../view-models';

@Component({
  selector: 'app-create-task-form',
  templateUrl: './create-task-form.component.html',
  styleUrls: ['./create-task-form.component.scss'],
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
export class CreateTaskFormComponent {
  readonly task = input<TaskItemViewModel | null>(null);
  readonly isEdit = computed(() => this.task() !== null);

  readonly #modalController = inject(ModalController);
  readonly #taskService = inject(TaskService);
  readonly formBuilder = new FormBuilder();
  readonly form = this.formBuilder.group({
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
