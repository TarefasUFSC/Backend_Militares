const express = require('express')
const cors = require('cors')
const app = express()
const routes = require('./routes')

// configura o .env
require('dotenv').config()

// configura o CORS
app.use(cors())

app.use(express.json())
app.use(routes);

app.listen(3333, () => {
    console.log('Server is running');
})