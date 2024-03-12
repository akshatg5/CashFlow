const express = require("express");
const appRouter = require("./Routes/index")
const cors = require("cors")
const app = express()

app.use(cors())
app.use(express.json())

// main route to handle the APIs
app.use("/cfapi/v1",appRouter)

app.listen(3000, () => console.log("Server running"))


