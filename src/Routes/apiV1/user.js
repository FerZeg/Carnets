import { Router } from "express"
import { deleteUser } from "../../Controllers/apiV1/UserController.js"

const router = Router()
router.delete("/", deleteUser)
export default router