import { Router } from "express";
import { getUserInfo }  from "../../controllers/app-info"

const router = Router()

router.get('/', getUserInfo)


export default router