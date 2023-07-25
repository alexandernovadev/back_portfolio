import { ITask } from "../entities/task.entity"

export interface ITaskRepository {
  getAll(): Promise<ITask[]>
  get(id: string): Promise<ITask | null>
  create(task: ITask): Promise<ITask>
  update(id: string, task: ITask): Promise<ITask | null>
  delete(id: string): Promise<ITask | null>
}
