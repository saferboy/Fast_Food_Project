import { Router } from "express";
import allUsers from "../controllers/users/all-users";


const router = Router()

router.get('/', allUsers)




export default router