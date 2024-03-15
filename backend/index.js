const express = require("express");
const appRouter = require("./Routes/index")
const cors = require("cors")
const app = express()

app.use(cors())
app.use(express.json())

// main route to handle the APIs
app.use("/cfapi/v1",appRouter)
app.get('/', (req, res) => {
    res.send('Welcome to cashflow API!');
});


app.listen(3000, () => console.log("Server running"))


