import { LoginDto, Users } from "../model/allModel-exports";
import { findUserByemail } from "../service/user.service";
import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
    try {
        const loginDto: LoginDto = req.body

        const user: Users | null = await findUserByemail(loginDto.email)

        if (user == null) {
            return res.status(404).json({
                message: `User with email ${loginDto.email} not found`
            })
        }
        if (user.role == 'none') {
            return res.status(400).json({
                message: 'Account not verified, please verify account'
            })
        }
        if (user.password == loginDto.password) {
            return res.status(400).json({
                message: 'Email or password wrong'
            })
        }

        res.status(200).json({
            message: 'Successfuly registered',
            user: {
                id:         user.id,
                email:      user.email,
                name:       user.id,
                surname:    user.surname,
                birthday:   user.birthday,
                phone:      user.phone,
                role:       user.role
            },
            token:      user.token
        })

    } catch (err: any) {
        console.log('user:login: ', err)
        res.status(500).json({
            message: 'internal server error'
        })
    }
}