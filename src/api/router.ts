import { Router } from "express";
const router = Router()

// versions
import v1 from "./v1"

// routes
router.use('/v1', v1)

export default router