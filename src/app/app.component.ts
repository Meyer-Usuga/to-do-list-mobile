import { Component, inject } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { FeatureFlagService, StorageService } from './shared';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  readonly #storageService = inject(StorageService);
  readonly #featureFlagService = inject(FeatureFlagService);

  constructor() {
    this.#storageService.init();
    this.#featureFlagService.init();
  }
}
