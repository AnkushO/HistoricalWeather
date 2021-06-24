const express = require('express')
const app = express()
const port = 4000
const axios = require('axios')
var cors = require('cors')
var CircularJSON = require('circular-json');
const bodyParser = require('body-parser');

app.use(cors())
app.use(bodyParser.json());

app.get('/get_weather', async (req, res) => {
  console.log(req)
  let api = 'https://api.openweathermap.org/data/2.5/weather?q='+req.query.cityName+'&APPID=252251328f6829ec98f890de1f08cd7f&lang='+req.query.language;
  console.log(api)
  await axios
  .get(api)
  .then(resp => {
    str = CircularJSON.stringify(resp);
    res.send(str)
  })
  .catch(error => {
    //console.log(error)
    res.send(error)
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})