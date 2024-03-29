import { getWeatherChangesFromThirdParty, changes, weathers } from './controller.js';
import express from 'express';

const app = new express();
// const app = require('express');


app.get('/weather', (req, res) => {
    res.json({
        weathers
    })
});

setInterval(getWeatherChangesFromThirdParty, 10 * 1000)

app.get('/weather/update', (req, res) => {
    res.json({
        changes
    })
})
const port = 3000;
app.listen(port, () => {
    console.log(`server Running on: http://localhost:${port}`);
  });