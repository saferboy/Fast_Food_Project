import { Router } from "express";

import login from "../../controllers/auth/login"; 
import register from "../../controllers/auth/register";
import resendCode from "../../controllers/auth/resend-code";
import status from "../../controllers/auth/status";
import verify from "../../controllers/auth/verify";

const router = Router()

router.post('/login', login)
router.post('/register', register)
router.post('/resend', resendCode)
router.post('/status', status)
router.post('/verify', verify)


export default router