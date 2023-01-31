import { NextFunction, Request, Response } from "express";

export default (error: Error, next: NextFunction, req: Request, res: Response) => {
    console.log(`[ERROR] ${req.method} ${req.originalUrl} -> ${error.message}`)
    res.status(500).json({
        message: 'Internal server error' + error.message
    })
}