import { StorageConfig } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage';

export const storageConfig: StorageConfig = {
   name: 'todo-list-storage',
   driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage],
};