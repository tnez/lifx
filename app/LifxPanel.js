const { BrowserWindow } = require('electron')
const { merge } = require('ramda')

const LIFX_PANEL_DEFAULT_OPTS = {
  height: 500,
  width: 300,
  frame: false,
  resizable: false,
  show: false,
}

class LifxPanel extends BrowserWindow {
  constructor(url, opts = {}) {
    const computedOpts = merge(LIFX_PANEL_DEFAULT_OPTS, opts)
    super(computedOpts)
    this.loadURL(url)

    this.on('blur', this.onBlur.bind(this))
    this.toggleVisibility = this.toggleVisibility.bind(this)
  }

  onBlur() {
    this.hide()
  }

  toggleVisibility(x, y) {
    if (this.isVisible()) {
      this.hide()
    } else {
      const { height, width } = this.getBounds()
      this.setBounds({
        x: x - width / 2,
        y: process.platform === 'darwin' ? y : y - height,
        height,
        width,
      })
      this.show()
    }
  }
}

module.exports = LifxPanel
