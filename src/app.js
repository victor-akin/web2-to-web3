const express = require('express')
const app = express()
require('dotenv').config()

require('./models/db')()

app.use(express.json())

app.use('/api/v1', require('./routes/user-routes'))
app.use('/api/v1', require('./routes/secret-routes'))

app.listen(5000)
