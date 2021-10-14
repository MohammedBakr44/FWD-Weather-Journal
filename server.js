/* Dependencies*/
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

/* Data */
let projectData = {};
let temps = [];

/* Middleware/bodyparser */
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/* cors to prevent cross origin errors */
app.use(cors());
app.use(express.static('static'));

/* Initiating the server */

const listening = () => {
  console.log("Server Running...");
  console.log(`Running on localhost:${port}`);
}
/* Server info */
const port = 4200;
const server = app.listen(port, listening);

/* GET Routes */
app.get('/all', (req, res) => {
  res.send(projectData);
  })

/* POST Routes */

app.post('/weather', (req, res) => {
  projectData = {
    temp: req.body.temp,
    displayDate: req.body.displayDate,
    feelings: req.body.feelings
  }
  temps.push(weather);
  res.send(temps);
})

