import { Request, Response } from "express";
import { findVerificationById } from "../../service/exportAll.service";
import { getTimeOut } from "../../utils/generateCode";
import { VERIFICATION_TIMEOUT } from "../../config";

export default async ( req: Request, res: Response) => {

    try {
        
        const verificationId: string = String(req.query.id)

        const verification = await findVerificationById(verificationId)

        if (verification == null) {
            return res.status(400).json({
                message: "Cannot find verification"
            })
        }

        const timeOut = getTimeOut(verification.createdAt, VERIFICATION_TIMEOUT)

        if (timeOut > 0) {
            res.status(200).json({
                message: "Verification code sended to email",
                email: verification.email,
                timeOut
            })
        } 
        else { 
            //400 - Bad Request (noto'g'ri so'rov)
            res.status(400).json({
                message: "verification code is expired, please resend code",
                verificationId: verification.id
            })
        } 

    } catch (err: any) {
        console.log('auth: err', err)

        res.status(500).json({
            message: 'Internal server error'
        })
    }
}