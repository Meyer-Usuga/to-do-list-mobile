import { Component, inject } from '@angular/core';
import { CategoryFormModalComponent } from '@features/';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon, IonNote, IonFab, IonFabButton, ModalController, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { Category, CategoryService } from '@shared/';
import { addIcons } from 'ionicons';
import { add, cartOutline, create, trash, trashOutline } from 'ionicons/icons';

@Component({
  selector: 'app-category-managment-modal',
  templateUrl: './category-managment-modal.component.html',
  styleUrls: ['./category-managment-modal.component.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonButton,
    IonIcon,
    IonList,
    IonItem,
    IonLabel,
    CategoryFormModalComponent
  ],
  standalone: true,
})
export class CategoryManagmentModalComponent {  
  readonly #modalController = inject(ModalController); 
  readonly #categoryService = inject(CategoryService); 
  readonly categories = this.#categoryService.categories; 


  constructor(){
    addIcons({
      'add-outline': add,
      'create-outline': cartOutline,
      "trash-outline": trashOutline
    }); 
  }

  async openCreateCategory() {
    const modal = await this.#modalController.create({
      component: CategoryFormModalComponent,
      componentProps: {}
    }); 
    await modal.present(); 
  }

  async openEditCategory(category: Category) {
    const modal = await this.#modalController.create({
      component: CategoryFormModalComponent,
      componentProps: {
        category,
      }
    }); 
    await modal.present(); 
  }

  async deleteCategory(categoryId: string) {
    await this.#categoryService.deleteCategory(categoryId);
  }

  async closeModal() {
    this.#modalController.dismiss();
  }

  
}
