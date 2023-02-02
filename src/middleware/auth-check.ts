import { Request, Response, NextFunction } from "express";
import { findUserByToken } from "../service/exportAll.service";

export const authCheck = (isAdmin: boolean) => {

    return async (req: Request, res: Response, next: NextFunction) => {
        try {

            const token = req.header('authorization')?.split(' ')[1]


            if (!token) {
                return res.status(401).json({
                    message: 'token not provided'
                })
            }

            const user = await findUserByToken(token!)

            if (!user) {
                return res.status(401).json({
                    message: 'Invalid token'
                })
            }

            if (isAdmin) {
                if (user.role != "admin") {
                    return res.status(401).json({
                        message: "Acces denied"
                    })
                }
            }

            res.locals.user = user
            next()

        }
        catch (err) {
            res.status(500).json({
                message: 'Invalid server error'
            })
            console.log(err)
        }
    }

}