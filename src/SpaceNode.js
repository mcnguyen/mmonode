import React, { Component } from 'react'
import Ship from './objects/Ship'

export default class SpaceNode extends Component {
  constructor () {
    super()

    this.state = {
      ships: [],
      context: null,
      destination: { x: 320, y: 240, angle: 0 },
      cam: { x: 0, y: 0 },
      playerShip: null      
    }
  }

  componentDidMount () {
    let context = this.refs.canvas.getContext('2d')

    window.addEventListener('click',  this.handleClick.bind(this))

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

    let sh = new Ship(320,240) 
    let sh1 = new Ship(500,400)

    let newShips = Object.assign([], this.state.ships)
    newShips.push(sh)
    newShips.push(sh1)

    this.setState({ships: newShips, playerShip: sh})
  }

  handleClick(e){

    let angle = Math.round( Math.atan2(e.clientY - 240, e.clientX - 320) * 180 / Math.PI )

    if(angle > -90) {
      angle += 90
    } else {
      angle = 360 + 90 + angle
    }    

    this.setState({destination: { x: this.state.cam.x+(e.clientX), y: this.state.cam.y+(e.clientY), angle: angle }})
  }

  update (dt) {
    this.clear()

    this.draw()
  }

  draw () {
    //Pin the camera to the player ship
    this.setState({cam: { x: this.state.ships[0].x - 320, y: this.state.ships[0].y  - 240}})

  	for (let ship of this.state.ships) {
      ship.draw(this.state)
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
