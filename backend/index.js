const express = require("express");
const appRouter = require("./Routes/index")
const cors = require("cors")
const app = express()
const jwt = require('jsonwebtoken')

app.use(cors())
app.use(express.json())
app.use(jwt)

// main route to handle the APIs
app.use("/cfapi/v1",appRouter)

app.listen(3000, () => console.log("Server running"))


