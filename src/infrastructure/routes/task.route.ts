import { Router } from "express"
import * as TaskController from "../controllers/task.controller"
import { validateObjectId } from "../middlewares/validateObjectId"

const router = Router()

router.get("/", TaskController.getAllTasks)
router.post("/", TaskController.createTask)
router.get("/:id", validateObjectId, TaskController.getTask)
router.put("/:id", validateObjectId, TaskController.updateTask)
router.delete("/:id", validateObjectId, TaskController.deleteTask)

export default router
