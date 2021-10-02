// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api', (req, res) => {
  const date = new Date();
  const unix = date.valueOf();
  const utc = date.toUTCString();
  res.json({unix, utc});
});

app.get('/api/:date?', (req, res) => {
  const entry = req.params.date;
  const date = entry.includes('-') ? new Date(entry) : new Date(Number(entry));
  const unix = date.valueOf();
  const utc = date.toUTCString();
  if (!unix) {
    return res.json({'error': 'Invalid Date'});
  }
  res.json({unix, utc});
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
