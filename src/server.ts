import express from "express"
import cors from "cors"
import { router } from "./routes"

const app = express()
const port = 3333

app.use(cors())
app.use(express.json())
app.use(router)


app.listen(port, () => {
    console.log("HTTP server running in port 3333")
    console.log("http://localhost:" + port)
})