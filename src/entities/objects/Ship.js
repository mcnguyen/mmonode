import SpaceObject from './SpaceObject'

export default class Ship extends SpaceObject {
  constructor ( x, y, width, height, objectTitle) {
    super(x, y, width, height, objectTitle)
  }
  
  update (state) {
    if(this == state.player) {

      let angle = Math.atan2((state.destination.y - this.y), (state.destination.x - this.x) ) * 180 / Math.PI

      this.x += Math.cos(angle * Math.PI/180) * 1
      this.y += Math.sin(angle * Math.PI/180) * 1

      if(state.destination.angle !== this.rotation){

      	if( (this.rotation-state.destination.angle+360)%360>180 ) {
	      this.rotation++
 	      if(this.rotation > 359 ) this.rotation = 0
      	} else {
	      this.rotation--
 	      if(this.rotation < 0 ) this.rotation = 359
      	}

      }
    }    
  }

  draw (state) {
    let w = this.width
    let h = this.height

    state.context.save()

    state.context.strokeStyle = '#FFFFFF'
    state.context.lineWidth = 1

    state.context.translate((this.x - state.cam.x), (this.y - state.cam.y))
    state.context.rotate(this.rotation * Math.PI / 180)

    state.context.beginPath()
    state.context.moveTo(0, - (h / 2))
    state.context.lineTo(0 - (w / 2), (h / 2))
    state.context.lineTo((w / 2), (h / 2))
    state.context.lineTo(0, 0 - (h / 2))
    state.context.closePath()
    state.context.stroke()

    state.context.fillStyle = '#FF0000'
    state.context.fillRect(0, 0, 1, 1)    

    state.context.restore()
  }
}