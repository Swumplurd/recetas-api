require('dotenv').config();
const cors = require('cors');
const express = require('express');
const dbConnection = require('./database/config');

const app = express();
dbConnection();
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'))

app.listen(process.env.PORT, () => {
    console.log(`app corriendo en http://localhost:${process.env.PORT}`);
});