import { Component, computed, effect, inject, input } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonAccordion,
  IonAccordionGroup,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonTitle,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';
import {
  Category,
  CategoryFilterViewModel,
  CategoryService,
  CATEGORY_COLORS,
} from '@shared/';

@Component({
  selector: 'app-category-form-modal',
  templateUrl: './category-form-modal.component.html',
  styleUrls: ['./category-form-modal.component.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonContent,
    IonInput,
    IonLabel,
    IonItem,
    IonAccordionGroup,
    IonAccordion,
    FormsModule,
    ReactiveFormsModule,
  ],
  standalone: true,
})
export class CategoryFormModalComponent {
  readonly category = input<CategoryFilterViewModel | null>(null);
  readonly isEdit = computed(() => this.category() !== null);

  readonly #modalController = inject(ModalController);
  readonly #categoryService = inject(CategoryService);
  readonly #formBuilder = inject(FormBuilder);

  readonly form = this.#formBuilder.group({
    id: [crypto.randomUUID() as string],
    name: ['', [Validators.required, Validators.minLength(5)]],
    color: ['', [Validators.maxLength(50)]],
  });

  constructor() {
    effect(() => {
      const category = this.category();
      if (category) {
        this.form.patchValue({
          id: category.id as string,
          name: category.name,
          color: category.color,
        });
      }
    });
  }

  readonly categoryColors = CATEGORY_COLORS;

  async saveForm() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.isEdit()) {
      await this.#categoryService.editCategory(
        this.form.getRawValue() as Category,
      );
    } else {
      await this.#categoryService.addCategory(
        this.form.getRawValue() as Category,
      );
    }

    this.#modalController.dismiss();
  }

  async closeModal() {
    this.#modalController.dismiss();
  }
}
