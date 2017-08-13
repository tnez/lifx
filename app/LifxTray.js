const { app, Menu, Tray } = require('electron')
const { merge } = require('ramda')

const LIFX_TRAY_DEFAULT_OPTS = {}

class LifxTray extends Tray {
  constructor(opts = {}) {
    super(`${__dirname}/../assets/iconTemplate.png`)

    const computedOpts = merge(LIFX_TRAY_DEFAULT_OPTS, opts)
    this.panel = computedOpts.panel
    this.contextMenu = this.buildContextMenu()
    this.setToolTip('LIFX Controller')
    this.on('click', this.onClick.bind(this))
    this.on('right-click', this.onRightClick.bind(this))
  }

  buildContextMenu() {
    return Menu.buildFromTemplate([
      {
        label: 'Quit',
        click: app.quit,
      },
    ])
  }

  onClick(_, bounds) {
    const { x, y } = bounds
    this.panel.toggleVisibility(x, y)
  }

  onRightClick() {
    this.popUpContextMenu(this.contextMenu)
  }
}

module.exports = LifxTray
