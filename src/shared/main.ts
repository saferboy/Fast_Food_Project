import { Router } from "express";
import auth from "../auth/routes/routes"

const router = Router()


router.use('/auth', auth)

export default router