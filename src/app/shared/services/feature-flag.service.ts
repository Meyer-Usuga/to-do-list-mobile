import { inject, Injectable, signal } from '@angular/core';
import { RemoteConfig } from '@angular/fire/remote-config';
import { fetchAndActivate, getBoolean } from 'firebase/remote-config';

@Injectable({
  providedIn: 'root',
})
export class FeatureFlagService {
  readonly #remoteConfig = inject(RemoteConfig);
  readonly showCategoryManagment = signal<boolean>(true);

  async init() {
    this.#remoteConfig.settings = {
      minimumFetchIntervalMillis: 0,
      fetchTimeoutMillis: 10000,
    };

    this.#remoteConfig.defaultConfig = {
      show_category_managment: true,
    };

    await fetchAndActivate(this.#remoteConfig);

    const value = getBoolean(
      this.#remoteConfig,
      'show_category_managment',
    );

    console.log('Feature Flag:', value);

    this.showCategoryManagment.set(value);
  }
}
