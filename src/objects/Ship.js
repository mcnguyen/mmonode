import SpaceObject from './SpaceObject'

export default class Ship extends SpaceObject {
  constructor ( x, y) {
    super(x, y)
  }

  draw (context) {
    let w = 2
    let h = 4

    context.strokeStyle = '#FFFFFF'
    context.lineWidth = 1

    context.beginPath()
    context.moveTo(this.x, this.y - (h / 2))
    context.lineTo(this.x - (w / 2), this.y + (h / 2))
    context.lineTo(this.x + (w / 2), this.y + (h / 2))
    context.lineTo(this.x, this.y - (h / 2))
    context.closePath()
    context.stroke()
    context.restore()

    context.fillStyle = '#FF0000'
    context.fillRect(this.x, this.y, 1, 1)    
  }
}