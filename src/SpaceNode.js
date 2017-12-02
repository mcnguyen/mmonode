import React, { Component } from 'react'
import Ship from './objects/Ship'

export default class SpaceNode extends Component {
  constructor () {
    super()

    this.state = {
      ships: [],
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

    let sh = new Ship(320,240);  

    let newShips = Object.assign([], this.state.ships)
    
    newShips.push(sh)

    this.setState({ships: newShips})
  }

  update (dt) {
    this.clear()

    this.draw()
  }

  draw () {
  	for (let ship of this.state.ships) {
      ship.draw(this.state.context)
  	}
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
