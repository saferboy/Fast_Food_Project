import { Verification } from "../model/verification";
import  { client} from "../database/database";
import {v4 as uuid} from "uuid"
import { getTimeOut } from "../utils/generateCode";

export const createVerification = async ( code: string, email: string): Promise<Verification | null> => {
    
    const sql = `
        INSERT INTO verification (id, code, email) 
        VALUES ($1, $2, $3) RETURNING *;
    `

    const id = uuid()
    
    const result = await client.query(sql, [id, code, email])

    if (result.rowCount == 0) {
        return null
    }

    const createdAt: Date = new Date(result.rows[0].created_at)

    return new Verification(id, code, email, createdAt)
}

export const findVerificationById = async (id: string): Promise<Verification | null> => {
    const sql = `SELECT * FROM verification WHERE id = $1`

    const result = await client.query(sql, [id])

    if (result.rowCount == 0) {
        return null
    }

    const { code, email, created_at} = result.rows[0]

    return new Verification(id, code, email, new Date(created_at))
}

export const findVerificationByEmail = async (email: string): Promise<Verification | null> => {
    const sql = `SELECT * FROM verification WHERE id = $1`

    const result = await client.query(sql, [email])

    if (result.rowCount == 0) {
        return null
    }

    const {id, code, created_at} = result.rows[0]

    return new Verification(id, code, email, new Date(created_at))
}

export const cleanVerification = async (timeOut: number): Promise<number> => {
    const time = new Date().getTime() - timeOut * 1000

    const sql = `DELETE FROM verification WHERE created_at < $1;`
    const result = await client.query(sql, [new Date(time)])

    return result.rowCount
}