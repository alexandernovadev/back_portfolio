import { Router } from "express"
import * as TaskController from "../controllers/task.controller"
import { validateObjectId } from "../middlewares/validateObjectId"
import { validateTask } from "../middlewares/dataValidate/TaskValidate"

const router = Router()

router.get("/", TaskController.getAllTasks)
router.post("/", validateTask, TaskController.createTask)
router.get("/:id", validateObjectId, TaskController.getTask)
router.put("/:id", validateTask, validateObjectId, TaskController.updateTask)
router.delete("/:id", validateObjectId, TaskController.deleteTask)




export default router
