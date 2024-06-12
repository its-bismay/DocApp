import express from "express"
import {config} from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import fileUpload from "express-fileupload"
import { dbConnection } from "./database/dbConnection.js"
import messageRouter from "./routers/messageRouter.js"
import { error } from "./middlewares/error.js"

const app = express()
config({path: "./config/config.env"})

app.use(cors({
    origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
    methods:["GET", "POST", "PUT", "DELETE"],
    credentials:true,
}))

app.use(cookieParser());

app.use(express.json());

app.use(express.urlencoded({ extended: true}))

app.use(fileUpload({
    useTempFiles:true,
    tempFileDir: "/tmp/",
}))

app.use("/api/v1/message", messageRouter)

dbConnection()
app.use(error)
export default app;