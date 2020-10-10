const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const data = require('./exercice-exactcure.json')
const jsonFile = JSON.parse(JSON.stringify(data))

// Export express app
module.exports = app

app.use(bodyParser.json())
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

// Get Json File
let obj = []
const listHepatic = []
for (let i = 0; i < jsonFile.length; i++) {
  obj = jsonFile[i]
  const sentence = obj.renal_status.replace(/_/g, ' ')
  listHepatic.push(sentence.charAt(0).toUpperCase() + sentence.slice(1))
}

let graphLabel = []
let graphDate = []
let graphValue = []
let isSelected = false

// Update array value for Front-End
app.post('/updateSelected', function (req, res) {
  graphDate = []
  graphLabel = []
  graphValue = []
  let selected = req.body.selectedHepatic.replace(/ /g, '_')
  selected = selected.charAt(0).toLowerCase() + selected.slice(1)
  for (let i = 0; i < jsonFile.length; i++) {
    obj = jsonFile[i]
    if (selected === obj.renal_status) {
      for (const y in obj.concentrations) {
        graphDate.push(y)
        graphValue.push(obj.concentrations[y])
      }
      graphLabel.push(obj)
    }
  }
  isSelected = !isSelected
  res.json(200)
})

// Get data by hepatic
app.get('/getData', (req, res) => {
  res.json(graphValue)
})

// Get list Labels by Hepatic
app.get('/getLabels', (req, res) => {
  res.json(graphDate)
})

// Get list Hepatic status
app.get('/init', (req, res) => {
  res.json(listHepatic)
})

// Start standalone server if directly running
if (require.main === module) {
  const port = process.env.PORT || 3001
  app.listen(port, () => {
    console.log(`API server listening on port ${port}`)
  })
}
