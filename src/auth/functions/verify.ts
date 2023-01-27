import { SECRET_KEY, VERIFICATION_TIMEOUT } from "../config";
import { VerificationDto } from "../model/allModel-exports";
import { findUserByemail, verifiedUser, findVerificationById } from "../service/exportAll.service";
import { getTimeOut } from "../../shared/utils/generateCode";
import { Request, Response } from "express";
import md5 from "md5";


export default async (req: Request, res: Response) => {
    try {
        const verificationDto: VerificationDto = req.body

        const verification = await findVerificationById(verificationDto.verificationId)

        if (verification == null) {
            return res.status(400).json({
                message: "verification id " + verificationDto.verificationId + " not found"
            })
        }
        
        const timeOut = getTimeOut(verification.createdAt, VERIFICATION_TIMEOUT)

        if (timeOut <= 0) {
            return res.status(400).json({
                message: "Verification code is expired, please resend code",
                verificationId: verification.id
            })
        }

        if (verification.code != verificationDto.code) {
            return res.status(400).json({
                message: 'Wrong verification code'
            })
        }

        const user = await findUserByemail(verification.email)

        if (user == null) {
            return res.status(400).json({
                message: "User not found"
            })
        }

        const token = md5(user.email + "." + user.password + "." + SECRET_KEY)

        const updateUser = await verifiedUser(user.id, token, 'user')

        res.status(200).json({
            message: 'Succesfuly registered ',
            user: {
                id:         user.id,
                email:      updateUser.email,
                name:       updateUser.name,
                surname:    updateUser.surname,
                birthday:   updateUser.birthday,
                phone:      updateUser.phone,
                role:       updateUser.role
            }
        })

    } catch (err: any) {

        console.log('auth: verify', err)

        res.status(500).json({
            message: "Internal server error"
        })
        
    }
}