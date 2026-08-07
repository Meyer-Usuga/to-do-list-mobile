import { inject, Injectable, signal } from '@angular/core';
import { StorageService } from './storage.service';
import { Category } from '../models';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  readonly #storageKey = 'categories';
  readonly #storageService = inject(StorageService);
  readonly categories = signal<Category[]>([]);

  constructor() {
    this.getCategories();
  }

  async getCategories() {
    const categories = await this.#storageService.get(this.#storageKey);
    if (categories) {
      this.categories.set(categories);
    }
  }

  async addCategory(category: Category) {
    const updatedCategories = [...this.categories(), category];
    this.categories.set(updatedCategories);
    await this.#storageService.set(this.#storageKey, updatedCategories);
  }

  async editCategory(categoryToEdit: Category) {
    const updatedCategories = this.categories().map((category) =>
      category.id === categoryToEdit.id ? categoryToEdit : category,
    );

    this.categories.set(updatedCategories);
    await this.#storageService.set(this.#storageKey, updatedCategories);
  }

  async deleteCategory(categoryId: string) {
    const updatedCategories = this.categories().filter(
      (category) => category.id !== categoryId,
    );

    this.categories.set(updatedCategories);
    await this.#storageService.set(this.#storageKey, updatedCategories);
  }
}
