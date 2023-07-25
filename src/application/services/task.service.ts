import mongoose from 'mongoose'
import { ITask } from '../../domain/entities/task.entity'
import { NotFoundError } from '../../domain/errors/NotFoundError'
import { ITaskRepository } from './../../domain/interfaces/task.repository.interface'
import { ValidationError } from '../../domain/errors/ValidationError'

export class TaskService {
  constructor(private taskRepository: ITaskRepository) {}

  async getAllTasks() {
    return await this.taskRepository.getAll()
  }

  async getTask(id: string) {
    const task = await this.taskRepository.get(id)
    if (!task) {
      throw new NotFoundError(`Task with ID ${id} not found`)
    }
    return task
  }

  async createTask(task: ITask) {
    try {
      return await this.taskRepository.create(task);
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        const errorMessage = error.errors.status.message;
        throw new ValidationError(errorMessage);
      }
      throw error; // Si no es un error de validación, lo lanzamos tal cual
    }
  }

  async updateTask(id: string, task: ITask) {
    return await this.taskRepository.update(id, task)
  }

  async deleteTask(id: string) {
    return await this.taskRepository.delete(id)
  }
}
