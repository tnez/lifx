/* eslint-disable no-unused-vars */

const { app } = require('electron')
const LifxPanel = require('./app/LifxPanel')
const LifxTray = require('./app/LifxTray')

let panel = undefined
let tray = undefined

app.on('ready', () => {
  panel = new LifxPanel(`file://${__dirname}/index.html`)

  tray = new LifxTray({ panel: panel })
})
