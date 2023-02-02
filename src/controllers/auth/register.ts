import { Request, Response } from "express";
import { getTimeOut, generateCode } from "../../utils/generateCode";

import { Users, RegisterDto} from "../../model/allModel-exports"
import { VERIFICATION_TIMEOUT } from "../../config";
import {
    cleanVerification,createUser,createVerification, sendEmail, excistUser
} from "../../service/exportAll.service";

export default async (req: Request, res: Response) => {
    try {
        const data: RegisterDto = req.body

        const isExcist:  boolean = await excistUser(data.email)
        console.log(isExcist);
        
        if (isExcist) {
            return res.status(403).json({
                message: "Email alredy busy"
            })
        }

        const user: Users = await createUser(data)

        const code: string = generateCode()

        await sendEmail(user.email, code)

        const verification = await createVerification(code, user.email)

        if ( verification ==null) {
            return res.status(500).json({
                message: "Can't save verification"
            })
        }

        const deleteCount: number = await cleanVerification(VERIFICATION_TIMEOUT)

        console.log('Deleted verification', deleteCount)

        res.status(200).json({
            message:        'Verification code sended to email',
            email:          user.email,
            verificationId: verification.id,
            timeOut:        getTimeOut(verification.createdAt, VERIFICATION_TIMEOUT)
        })

        //Internal Server Error (serverdagi ichki xatolik)
    } catch (err: any) {
        console.log('auth:register', err)
        res.status(500).json({
            message: "Internal server error",err
        })
    }
}