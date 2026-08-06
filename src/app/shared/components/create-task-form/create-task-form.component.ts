import { Component, inject, signal } from '@angular/core';
import {
  IonHeader,
  IonModal,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  IonItem,
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
  readonly #modalController = inject(ModalController);
  readonly #taskService = inject(TaskService);
  readonly formBuilder = new FormBuilder();
  readonly form = this.formBuilder.group({
    id: [crypto.randomUUID()],
    title: ['', Validators.required, Validators.minLength(5)],
    description: ['', Validators.maxLength(50)],
    completed: [false],
    categoryId: [''],
    createdAt: [new Date()],
    updatedAt: [new Date()],
  });

  async saveForm() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    await this.#taskService.addTask(this.form.getRawValue() as Task);

    this.#modalController.dismiss();
  }

  async closeModal() {
    this.#modalController.dismiss();
  }
}
