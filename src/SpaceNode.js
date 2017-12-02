import React, { Component } from 'react'

export default class SpaceNode extends Component {
  constructor () {
    super()

    this.state = {
      context: null
    }
  }

  componentDidMount () {
    let context = this.refs.canvas.getContext('2d')

    this.setState({ context: context })

    let lastTime = null

    this._frameCallback = (ms) => {
      if (lastTime !== null) {
        const diff = ms - lastTime
        this.update(diff / 1000)
      }
      lastTime = ms
      requestAnimationFrame(this._frameCallback)
    }
    requestAnimationFrame(this._frameCallback)
  }

  update (dt) {
    this.clear()

    this.draw()
  }

  draw () {
    let w = 2
    let h = 4

    let x = 320
    let y = 240

    this.state.context.strokeStyle = '#FFFFFF'
    this.state.context.lineWidth = 1

    this.state.context.beginPath()
    this.state.context.moveTo(x, y - (h / 2))
    this.state.context.lineTo(x - (w / 2), y + (h / 2))
    this.state.context.lineTo(x + (w / 2), y + (h / 2))
    this.state.context.lineTo(x, y - (h / 2))
    this.state.context.closePath()
    this.state.context.stroke()
    this.state.context.restore()

    this.state.context.fillStyle = '#FF0000'
    this.state.context.fillRect(x, y, 1, 1)
  }

  clear () {
    this.state.context.fillStyle = '#000000'
    this.state.context.fillRect(0, 0, 640, 480)
  }

  render () {
    return (
      <div>
        <canvas width='640' height='480' ref='canvas' />
      </div>
    )
  }
}
