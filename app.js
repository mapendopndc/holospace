const express = require('express')
const app = express()
const port = 3000

app.use(express.static('models'))

app.get('/', (req, res) => res.send('Holospace web interface in development.'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))