const express = require("express")
const zod = require("zod")
const router = express.Router()
const {authMiddleware} = require("../middleware")
const { User, Account} = requrie("../db")
require('dotenv').config()

const API_KEY = process.env.API_KEY

router.get("/stockDetails",authMiddleware, async (req,res) => {
    try {
        const stocks = ["INFY","MSFT","GOOG","AAPL","V","TSLA"]

        const stockDetails = []

        for (const stock in stocks) {
            const apiUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock}&apikey=${API_KEY}`;

        }

        // stock = [a list of 50 famous stocks from US and INDIA ]
        // apiEndpoint = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol={stock}&interval=5min&apikey=XJMPCO104DPLR4GP`
        // Have to create a google finance like UI in the frontend that shows multiple cards with each card showing the stock data
    } catch {

    }
})

// {
//     "Global Quote": {
//         "01. symbol": "INFY",
//         "02. open": "17.7900",
//         "03. high": "17.9900",
//         "04. low": "17.7900",
//         "05. price": "17.9300",
//         "06. volume": "7019628",
//         "07. latest trading day": "2024-03-28",
//         "08. previous close": "17.7900",
//         "09. change": "0.1400",
//         "10. change percent": "0.7870%"
//     }
// }