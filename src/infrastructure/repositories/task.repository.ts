import { ITask } from "../../domain/entities/task.entity"
import { ITaskRepository } from "../../domain/interfaces/task.repository.interface"
import mongoose, { Schema, Document, model } from "mongoose"

export interface IMongoTask extends Document, ITask {}

const TaskSchema: Schema = new Schema({
  description: { type: String, required: true },
  createdAt: { type: Number },
  status: {
    type: String,
    enum: {
      values: ["pending", "in-progress", "finished"],
      message: "{VALUE} no es un estado permitido",
    },
    default: "pending",
  },
})

const Task = model<IMongoTask>("Task", TaskSchema)

export class TaskRepository implements ITaskRepository {
  async getAll(): Promise<ITask[]> {
    return await Task.find()
  }

  async get(id: string): Promise<ITask | null> {
    return await Task.findById(id)
  }

  async create(task: ITask): Promise<ITask> {
    return await Task.create(task)
  }

  async update(id: string, task: ITask): Promise<ITask | null> {
    return await Task.findByIdAndUpdate(id, task, { new: true })
  }

  async delete(id: string): Promise<ITask | null> {
    return await Task.findByIdAndDelete(id)
  }
}
