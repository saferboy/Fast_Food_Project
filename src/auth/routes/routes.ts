import { Router } from "express";

import login from "../functions/login"; 
import register from "../functions/register";
import resendCode from "../functions/resend-code";
import status from "../functions/status";
import verify from "../functions/verify";

const router = Router()

router.post('/login', login)
router.post('/register', register)
router.post('/resend', resendCode)
router.post('/status', status)
router.post('/verify', verify)


export default router