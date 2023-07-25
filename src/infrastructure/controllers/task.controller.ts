import { NextFunction, Request, Response } from "express"
import { TaskService } from "../../application/services/task.service"
import { TaskRepository } from "../repositories/task.repository"
import { NotFoundError } from "../../domain/errors/NotFoundError"

const taskService = new TaskService(new TaskRepository())

export const getAllTasks = async (_req: Request, res: Response) => {
  const tasks = await taskService.getAllTasks()
  res.json(tasks)
}

export const createTask = async (req: Request, res: Response) => {
  const newTask = await taskService.createTask(req.body)
  res.json(newTask)
}

export async function getTask(req: Request, res: Response, next: NextFunction) {
  try {
    const task = await taskService.getTask(req.params.id)
    res.json(task)
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ message: error.message })
    } else {
      next(error)
    }
  }
}

export const updateTask = async (req: Request, res: Response) => {
  const updatedTask = await taskService.updateTask(req.params.id, req.body)
  res.json(updatedTask)
}

export const deleteTask = async (req: Request, res: Response) => {
  const deletedTask = await taskService.deleteTask(req.params.id)
  res.json(deletedTask)
}
