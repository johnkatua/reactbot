const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const config = require('./config/keys');
const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, { useNewUrlParser: true,  useUnifiedTopology: true  });

require('./models/Registration');
require('./models/Demand');
require('./models/Coupons');

app.use(bodyParser.json());

app.use(cors());


require('./routes/dialogFlow')(app);
require('./routes/fulfillment')(app);

if(process.env.NODE_ENV === 'production') {
  //js and css file
  app.use(express.static('client/build'));

  //index.html for all page routes
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

const PORT = process.env.PORT || 4000;
app.listen(PORT);