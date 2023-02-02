import { Router } from "express";
import { authCheck } from "../../middleware/auth-check";

// v1 imports
import auth from "./auth"
import appInfo from "./app-info"
 
const router = Router()

router.use('/auth', auth)
router.use('/info', authCheck(false), appInfo)

export default router