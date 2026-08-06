import { Component, input, output } from '@angular/core';
import { IonSegment, IonSegmentButton, IonLabel, SegmentCustomEvent } from '@ionic/angular/standalone';
import { CategoryFilterViewModel } from '@shared//view-models';

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.scss'],
  imports: [IonSegment, IonSegmentButton, IonLabel],
  standalone: true,
})
export class CategoryFilterComponent {
  readonly categories = input.required<CategoryFilterViewModel[]>();
  readonly selectedCategoryId = input<string | null>("all");
  readonly categorySelected = output<string>();

  onCategoryChange(event: SegmentCustomEvent) {
    this.categorySelected.emit(event.detail.value as string);
  }
}
