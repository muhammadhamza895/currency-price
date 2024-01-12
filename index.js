import express from 'express'
import axios from 'axios';
import bodyParser from 'body-parser'

const app = express();
const port = 3000;
const API_URL = "https://api.coingecko.com/api/v3"

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))

app.get("/", (req, res) => {
    res.render("index.ejs")
})

app.post("/get-price", async (req, res) => {
    try {
        const response = await axios.get(`${API_URL}/simple/price?`, {
            params: {
                ids: req.body.coins,
                vs_currencies: req.body.currency
            }
        })
        const result = response.data
        res.render("index.ejs", {
            data: result,
            coin: req.body.coins,
            price: req.body.currency,
            currency: Object.getOwnPropertyNames(result[req.body.coins])[0]
        })
    }
    
    catch(error) {
        res.render("index.ejs", {
            error : error
        })
    }

})


app.listen(port, () => {
    console.log(`Port running at port ${port}`)
})

