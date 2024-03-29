const app = require('express')()
const Event = require('events')


const weatherChange = new Event()
weatherChange.addListener('new_change', (data) => {
    console.log(data)
})
// weatherChange.emit('new_change', 'some data')

const weathers = {
    "Berlin": 15,
    "Vienna": 17,
    "Paris": 14,
    "Madrid": 25
}

const changes = {}
function getWeatherChangesFromThirdParty() {

  const berlinChanges = Math.ceil(Math.random()*3 - 2)
  if (berlinChanges !== 0) {
    changes["Berlin"] = weathers["Berlin"] + berlinChanges
    weathers["Berlin"] = changes["Berlin"]
  } else {
    delete changes["Berlin"]
  }

  const viennaChanges = Math.ceil(Math.random()*3 - 2)
  if (viennaChanges !== 0) {
    changes["Vienna"] = weathers["Vienna"] + viennaChanges
    weathers["Vienna"] = changes["Vienna"]
  } else {
    delete changes["Vienna"]
  }

  const parisChanges = Math.ceil(Math.random()*3 - 2)
  if (parisChanges !== 0) {
    changes["Paris"] = weathers["Paris"] + parisChanges
    weathers["Paris"] = changes["Paris"]
  } else {
    delete changes["Paris"]
  }

  const madridChanges = Math.ceil(Math.random()*3 - 2)
  if (madridChanges !== 0) {
    changes["Madrid"] = weathers["Madrid"] + madridChanges
    weathers["Madrid"] = changes["Madrid"]
  } else {
    delete changes["Madrid"]
  }

//   Object.isEmp

  if (!isEmpty(changes)) {
    weatherChange.emit('new_change', changes)
  }

}

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

setInterval(getWeatherChangesFromThirdParty, 10*1000) // update temperature every 10 seconds

app.get('/weather', (req, res) => {
    res.json({
        weathers
    })
})

app.get('/weather/update', (req, res) => {
    const responseHandler = (changes) => {
        res.json(changes);
        weatherChange.removeListener('new_change', responseHandler);
    }
    const listener = weatherChange.on('new_change', responseHandler);
})

app.listen(3000)