import React, { Component } from 'react'
import Ship from './objects/Ship'
import Asteroid from './objects/Asteroid'
import Base from './objects/Base'

const ACTION_SELECT = "select"
const ACTION_MOVE = "move"

export default class SpaceNode extends Component {
  constructor () {
    super()

    this.state = {	
      world: { width: 2000, height: 2000},
	  cam: { x: 0, y: 0, width: window.innerWidth, height: window.innerHeight },
      context: null,
      worldObjects: [],
      destination: { x: 320, y: 240, angle: 0 },
      player: null,
      action: ACTION_SELECT,
      selectedObject: null   
    }
  }

  componentDidMount () {
    let context = this.refs.canvas.getContext('2d')

    this.refs.canvas.addEventListener('click',  this.handleCanvasClick.bind(this))

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

    let sh = new Ship(320,240,2,4,'Ship 1') 
    let sh1 = new Ship(500,400,2,4,'Ship 2')

    let as1 = new Asteroid(1000,500,20,20, 'Asteroid 1')
    let as2 = new Asteroid(900,450,20,20, 'Asteroid 2')


    let base1 = new Base(100,100,100,100, 'Space Station')

    let newShips = Object.assign([], this.state.worldObjects)
    newShips.push(sh)
    newShips.push(sh1)

    newShips.push(as1)
    newShips.push(as2)

    newShips.push(base1)

    this.setState({worldObjects: newShips, player: sh})
  }

  handleCanvasClick(e){

    if(this.state.action == ACTION_MOVE ){
    	// Move
      let angle = Math.round( Math.atan2(e.clientY - (this.state.cam.height/2), e.clientX - (this.state.cam.width/2)) * 180 / Math.PI )

      if(angle > -90) {
        angle += 90
      } else {
        angle = 360 + 90 + angle
      }    

      this.setState({destination: { x: this.state.cam.x+(e.clientX), y: this.state.cam.y+(e.clientY), angle: angle }})
    } else if(this.state.action == ACTION_SELECT){
      // Target
      this.setState({selectedObject: this.determineClickedObject(e.clientX, e.clientY)})   

      console.log(this.state.selectedObject)
    }
  }

  handleSelectButtonClick(e) {
    this.setState({action: ACTION_SELECT})   
  }

  handleMoveButtonClick(e) {
    this.setState({action: ACTION_MOVE})   
  }

  determineClickedObject (clickX, clickY) {
  	let selectedItem = null

  	for (let object of this.state.worldObjects) {
      let objectScreenX = (object.x-this.state.cam.x)
      if(clickX > ( (object.x-this.state.cam.x) - object.width/2) && clickX < ( (object.x-this.state.cam.x) + object.width/2) && clickY > ( (object.y-this.state.cam.y) - object.height/2) && clickY < ( (object.y-this.state.cam.y) + object.height/2) ){
        if(selectedItem !== null){
          if( Math.sqrt(Math.pow(((object.x-this.state.cam.x)-clickX), 2) + Math.pow(((object.y-this.state.cam.y)-clickY), 2) ) < Math.sqrt( Math.pow(((selectedItem.x-this.state.cam.x)-clickX), 2) + Math.pow(((selectedItem.y-this.state.cam.y)-clickY), 2) ) ){
            selectedItem = object	
          }
        }else{
          selectedItem = object
        }
      }
  	}

  	return selectedItem
  }

  update (dt) {
    this.clear()

    this.updateObjects()

	this.updateCamera()

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
  	for (let object of this.state.worldObjects) {
      object.update(this.state)
  	}
  }

  draw () {
  	for (let object of this.state.worldObjects) {
      object.draw(this.state)
  	}

  	this.drawInterface()
  }

  drawInterface () {
    this.drawTarget()
  }

  drawTarget () {
    if(this.state.selectedObject!==null){
      let targetX = this.state.selectedObject.x - this.state.cam.x
      let targetY = this.state.selectedObject.y - this.state.cam.y

      let targetWidth = this.state.selectedObject.width
      let targetHeight = this.state.selectedObject.height
      
      targetWidth+=5
      targetHeight+=5

      if(targetWidth < 20) targetWidth = 20
      if(targetHeight < 20) targetHeight = 20

      //Draw left top corner
      this.state.context.save()

      this.state.context.strokeStyle = '#FFFF00'
      this.state.context.lineWidth = 2

      this.state.context.beginPath()
      this.state.context.moveTo(targetX - (targetWidth/2) , targetY - (targetHeight/2))
      this.state.context.lineTo(targetX - (targetWidth/2) , targetY - (targetHeight/2) + 5 )
      this.state.context.moveTo(targetX - (targetWidth/2) , targetY - (targetHeight/2))
      this.state.context.lineTo(targetX - (targetWidth/2) +5 , targetY - (targetHeight/2))

      this.state.context.moveTo(targetX + (targetWidth/2) , targetY - (targetHeight/2))
      this.state.context.lineTo(targetX + (targetWidth/2) , targetY - (targetHeight/2) + 5 )
      this.state.context.moveTo(targetX + (targetWidth/2) , targetY - (targetHeight/2))
      this.state.context.lineTo(targetX + (targetWidth/2) -5 , targetY - (targetHeight/2))

      this.state.context.moveTo(targetX + (targetWidth/2) , targetY + (targetHeight/2))
      this.state.context.lineTo(targetX + (targetWidth/2) , targetY + (targetHeight/2) - 5 )
      this.state.context.moveTo(targetX + (targetWidth/2) , targetY + (targetHeight/2))
      this.state.context.lineTo(targetX + (targetWidth/2) -5 , targetY + (targetHeight/2))

      this.state.context.moveTo(targetX - (targetWidth/2) , targetY + (targetHeight/2))
      this.state.context.lineTo(targetX - (targetWidth/2) , targetY + (targetHeight/2) - 5 )
      this.state.context.moveTo(targetX - (targetWidth/2) , targetY + (targetHeight/2))
      this.state.context.lineTo(targetX - (targetWidth/2) +5 , targetY + (targetHeight/2))

      this.state.context.closePath()
      this.state.context.stroke()

      this.state.context.restore()
        
    }
  }

  clear () {
    this.state.context.fillStyle = '#000000'
    this.state.context.fillRect(0, 0, this.state.cam.width, this.state.cam.height)
  }

  render () {
    const selectedText = (this.state.selectedObject !== null) ? this.state.selectedObject.title : 'None'

    return (
      <div>
        <canvas style={{zIndex: 1}} width={this.state.cam.width} height={this.state.cam.height} ref='canvas' />
        <input type="button" onClick={this.handleSelectButtonClick.bind(this)} style={{zIndex:2 , position: 'absolute', top:10, left:5}} value="Select"/>
        <input type="button" onClick={this.handleMoveButtonClick.bind(this)} style={{zIndex:2 , position: 'absolute', top:40, left:5}} value="Move"/>
        <span style={{zIndex:2 , position: 'absolute', top:70, left:5}}>Selected: {selectedText}</span>
      </div>
    )
  }
}
