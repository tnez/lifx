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

  toggleVisibility() {
    if (this.isVisible()) {
      this.hide()
    } else {
      this.show()
    }
  }
}

module.exports = LifxPanel
