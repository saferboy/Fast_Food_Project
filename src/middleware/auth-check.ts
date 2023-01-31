import { Request, Response, NextFunction } from "express";
import { findUserByToken } from "../auth/service/exportAll.service";


export const authCheck = (isAdmin: string) => {

    try {
        return async (req: Request, res: Response, next: NextFunction) => {

            const token = req.header('authorization')

            if (!token) {
                return res.status(401).json({
                    message: 'token not provided'
                })
            }

            const user = await findUserByToken(token)
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
    }
    catch (err) {
        console.log(err)
    }
    
}