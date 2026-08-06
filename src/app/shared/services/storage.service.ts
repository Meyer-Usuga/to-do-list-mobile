import { inject, Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  readonly #ionicStorage = inject(Storage);
  #storage!: Storage;

  async init() {
    this.#storage = await this.#ionicStorage.create();
  }

  async set(key: string, value: any): Promise<void> {
    await this.#storage.set(key, value);
  }

  async get(key: string): Promise<any | null> {
    return await this.#storage.get(key);
  }

  async remove(key: string): Promise<void> {
    await this.#storage.remove(key);
  }

  async clear(): Promise<void> {
    await this.#storage.clear();
  }
}
