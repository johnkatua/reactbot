const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());

app.use(cors());

require('./routes/dialogFlow')(app);

const PORT = process.env.PORT || 4000;
app.listen(PORT);