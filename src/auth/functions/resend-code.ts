import { Request, Response } from "express";
import { generateCode,getTimeOut  } from "../../shared/utils/generateCode";
import { findUserByemail, sendEmail, createVerification } from "../service/exportAll.service";
import { VERIFICATION_TIMEOUT } from "../config";
import { ResendDto } from "../model/resend";
import { Verification } from "../model/verification";

export default async (req: Request, res: Response) => {
    try {
        const resendDto: ResendDto = req.body
        
        const user = await findUserByemail(resendDto.email)

        if (user == null) {
            // 404 - Not Found (topilmadi)
            return res.status(404).json({
                message: 'User not found'
            })
        }

        if (user.role != 'none') {
            //400 - Bad Request (noto'g'ri so'rov)
            return res.status(400).json({
                message: 'Account alredy verified'
            })
        }

        const code: string = generateCode()

        const verification = await createVerification(code, user.email)

        if (verification == null) {
            //500 - Internal Server Error (serverdagi ichki xatolik)
            return res.status(500).json({
                message: 'Cannot save verification'
            })
        }

        res.status(200).json({
            message: "Verification code sended to email",
            email: user.email,
            verificationid: verification.id,
            timeOut: getTimeOut(verification.createdAt, VERIFICATION_TIMEOUT)
        })

    } catch (err: any) {
        console.log('auth: resend', err)
    
        res.status(500).json({
            message: "Internal server error"
        })
    }
}