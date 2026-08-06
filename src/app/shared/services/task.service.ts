import { inject, Injectable, signal } from '@angular/core';
import { StorageService } from './storage.service';
import { Task } from '../models';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  readonly #storageKey = 'tasks';
  readonly #storageService = inject(StorageService);
  readonly tasks = signal<Task[]>([]);

  async getTasks() {
    const tasks = await this.#storageService.get(this.#storageKey);
    if (tasks) {
      this.tasks.set(tasks);
    }
  }

  async addTask(task: Task) {
    const updatedTasks = [...this.tasks(), task];
    this.tasks.set(updatedTasks);
    await this.#storageService.set(this.#storageKey, updatedTasks);
  }

  async editTask(taskToEdit: Task) {
    const updatedTasks = this.tasks().map(task => 
      task.id === taskToEdit.id ? taskToEdit : task
    ); 

    this.tasks.set(updatedTasks);
    await this.#storageService.set(this.#storageKey, updatedTasks);
  }

  async completeTask(taskId: string) {
    const updatedTasks = this.tasks().map(
      task => task.id === taskId ? {
        ...task,
        completed: !task.completed
      } : task
    );

    this.tasks.set(updatedTasks);
    await this.#storageService.set(this.#storageKey, updatedTasks); 
  }

  async deleteTask(taskId: string) {
    const updatedTasks = this.tasks().filter(
      task => task.id !== taskId
    ); 

    this.tasks.set(updatedTasks);
    await this.#storageService.set(this.#storageKey, updatedTasks); 
  }
}
