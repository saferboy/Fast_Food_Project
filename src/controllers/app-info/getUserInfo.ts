import { Request, Response } from "express";
import { findUserByToken } from "../../service/exportAll.service"

export default async (req: Request, res: Response) => {
    try {
    
        const token = req.header('authorization')?.split(' ')[1]

        let getUserData = await findUserByToken(String(token))

        if(!getUserData) {
            return res.status(404).json({
                message: `user not found!`
            })
        }

        return res.status(200).json({
            message: `Application info retrived`,
            info: {
                name: getUserData.name,
                location: {
                    geo: null,
                    address: null
                },
                phone: getUserData.phone
            }
        })

    } catch (err: any) {
        console.log('appinfo:getUserInform', err)
        res.status(500).json({
            message: "Internal server error",err
        })
    }
}
