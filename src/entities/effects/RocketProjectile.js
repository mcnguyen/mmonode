import SpaceObject from './SpaceObject'

export default class RocketProjectile extends Effect {
  constructor ( x, y, velocity, targetX, targetY ) {
    super(x, y, 1, 1 )

    this.targetX = targetX
    this.targetY = targetY
  }
  
  update (dt, state) {

      this.x += this.velocity.deltaX
      this.y += this.velocity.deltaY

  }

  draw (state) {


    state.context.save()

    state.context.strokeStyle = '#FFFFFF'
    state.context.lineWidth = 1
```
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