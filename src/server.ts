import dotenv from "dotenv"
dotenv.config()

import express from "express";
import cors from "cors"
import api from "../src/shared/main"


const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const port = process.env.PORT


app.use('/api/v1', api)


app.listen(port, () => {
    console.log(`Server is running is port ${port}`)
})

