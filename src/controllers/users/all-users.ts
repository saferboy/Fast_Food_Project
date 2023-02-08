import { allUser } from "../../service/exportAll.service";
import { Request, Response, NextFunction } from "express";

export default async (req: Request, res: Response, next: NextFunction) => {

    try {
        const users = await allUser()

        const mapped = users.map(user => {
            const { id, email, name, surname, birthday, phone, role } = user
            return {
                id,
                email,
                name,
                surname,
                birthday,
                phone,
                role
            }
        })
        res.json({
            message: "Retrive all users",
            users: mapped
        })

    } catch (error) {
        next()
    }

}