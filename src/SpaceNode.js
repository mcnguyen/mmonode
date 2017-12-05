import React, { Component } from 'react'
import Ship from './objects/Ship'
import Asteroid from './objects/Asteroid'
import Base from './objects/Base'

export default class SpaceNode extends Component {
  constructor () {
    super()

    this.state = {	
      world: { width: 2000, height: 2000},
	  cam: { x: 0, y: 0, width: window.innerWidth, height: window.innerHeight },
      context: null,
      worldObjects: [],
      destination: { x: 320, y: 240, angle: 0 },
      player: null      
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

    let sh2 = new Ship(1700,1700)
    let sh3 = new Ship(1700,400)

    let as1 = new Asteroid(1000,500)
    let as2 = new Asteroid(900,450)
    let as3 = new Asteroid(850,460)
    let as4 = new Asteroid(800,490)

    let base1 = new Base(100,100)

    let newShips = Object.assign([], this.state.worldObjects)
    newShips.push(sh)
    newShips.push(sh1)
    newShips.push(sh2)
    newShips.push(sh3)

    newShips.push(as1)
    newShips.push(as2)
    newShips.push(as3)
    newShips.push(as4)

    newShips.push(base1)
    
    this.setState({worldObjects: newShips, player: sh})
  }

  handleClick(e){

    let angle = Math.round( Math.atan2(e.clientY - (this.state.cam.height/2), e.clientX - (this.state.cam.width/2)) * 180 / Math.PI )

    if(angle > -90) {
      angle += 90
    } else {
      angle = 360 + 90 + angle
    }    

    this.setState({destination: { x: this.state.cam.x+(e.clientX), y: this.state.cam.y+(e.clientY), angle: angle }})
  }

  update (dt) {
    this.clear()

    this.updateObjects();

	this.updateCamera();

    this.draw()
  }

  updateCamera () {
  	if(this.state.cam.x !== this.state.player.x || this.state.cam.y !== this.state.player.y) {
      let newCamPosition = Object.assign(this.state.cam, {})
      newCamPosition.x = this.state.player.x - (this.state.cam.width/2)
      newCamPosition.y = this.state.player.y - (this.state.cam.height/2)

      //Keep it within bounds
      if(newCamPosition.x < 0 ) newCamPosition.x = 0
      if(newCamPosition.x > (this.state.world.width - this.state.cam.width) ) newCamPosition.x = (this.state.world.width - this.state.cam.width)
      if(newCamPosition.y < 0 ) newCamPosition.y = 0
      if(newCamPosition.y > (this.state.world.height - this.state.cam.height) ) newCamPosition.y = (this.state.world.height - this.state.cam.height)

      this.setState({cam: newCamPosition})
    }
  } 

  updateObjects () {
  	for (let ship of this.state.worldObjects) {
      ship.update(this.state)
  	}
  }

  draw () {
  	for (let ship of this.state.worldObjects) {
      ship.draw(this.state)
  	}
  }

  clear () {
    this.state.context.fillStyle = '#000000'
    this.state.context.fillRect(0, 0, this.state.cam.width, this.state.cam.height)
  }

  render () {
    return (
      <div>
        <canvas width={this.state.cam.width} height={this.state.cam.height} ref='canvas' />
      </div>
    )
  }
}
