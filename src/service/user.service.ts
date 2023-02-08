// import database from "../database/database"
import { RegisterDto, Users, Role, updateUserInfo } from "../model/allModel-exports"
import md5 from "md5"
import { client } from "../database/database"
import { Request, Response, NextFunction } from "express"

export const createUser = async (user: RegisterDto): Promise<Users> => {

    const sql =
        'INSERT INTO users (email, password, name, surname, birthday, phone, token, role) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;'

    const role: Role = 'none'

    const token: string = md5(user.email + user.password)

    const result = await client.query(sql, [user.email, user.password, user.name, user.surname, user.birthday, user.phone, role, token])

    if (result.rowCount == 0) {
        throw Error('Error while create user: rowsCount = 0')
    }

    const createdUser: Users = result.rows[0]

    return createdUser
}

export const findUserByemail = async (email: string): Promise<Users | null> => {
    const sql = 'Select * from users WHERE email = $1'

    const result = await client.query(sql, [email])

    if (result.rowCount > 0) {
        return result.rows[0] as Users
    }

    // const user: Users = result.rows[0]
    return null
}

export const findUserByToken = async (token: string): Promise<Users | null> => {
    const sql = 'SELECT * from users WHERE token = $1'

    const result = await client.query(sql, [token])

    if (result.rowCount > 0) {
        return result.rows[0] as Users
    }

    return null
}

export const excistUser = async (email: string): Promise<boolean> => {
    const sql = 'SELECT id, token from users WHERE email = $1'

    const result = await client.query(sql, [email])

    console.log(result.rows)

    return result.rowCount !== 0
}

export const verifiedUser = async (userId: number, token: string, role: Role): Promise<Users> => {

    const sql = 'UPDATE users SET token = $1, role = $2 WHERE id = $3 RETURNING *'

    const result = await client.query(sql, [token, role, userId])

    return result.rows[0]
}


export const updateUser = async (userInfo: updateUserInfo) => {
    const sql = 'UPDATE users SET name = $1, geo = $2, address = $3, phone = $4 WHERE token = $5 RETURNING *'
    const { name, address, geo, phone, token } = userInfo

    const result = await client.query(sql, [name, address, geo, phone, token])

    return result.rows[0]
}

//get all users function "/"
export const allUser = async () => {
    const sql = 'SELECT * from users'

    const result = await client.query(sql)

    return result.rows

}


// export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {

//     const { userId } = req.params

//     const sql = 'DELETE from users WHERE id = $1'

//     const result = await client.query(sql, [userId]);



// }