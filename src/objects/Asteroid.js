import SpaceObject from './SpaceObject'

export default class Asteroid extends SpaceObject {

  constructor ( x, y, width, height, objectTitle) {
    super(x, y, width, height, objectTitle)
    
    this.vertices = []

    let size = Math.round(20 + Math.random() * this.width)   
    let numVertices = Math.round(5 + Math.random() * 4)   
    
    let range = 360 / numVertices 

    for(let v = 0; v < numVertices; v++ ){
      let randomAngle = (range*v) + Math.round(Math.random() * range)
      let randomDistance = 10 + Math.round(Math.random() * size)
      
      let vX = Math.cos(randomAngle * Math.PI/180) * randomDistance
      let vY = Math.sin(randomAngle * Math.PI/180) * randomDistance     

      this.vertices.push({ x: vX, y: vY })
    }

    this.velocityX = Math.round(Math.random() * 0.1)
    this.velocityY = Math.round(Math.random() * 0.1)

    this.rotationSpeed = Math.random() * 0.06
    
  }
  
  update (state) {

      this.rotation += this.rotationSpeed

      if(this.rotation > 360) this.rotation -= 360
      if(this.rotation < 0) this.rotation += 360

      this.x += Math.cos(this.velocityX * Math.PI/180) * 0.1
      this.y += Math.sin(this.velocityY * Math.PI/180) * 0.1
  }

  draw (state) {

    state.context.save()

    state.context.strokeStyle = '#FFFFFF'
    state.context.lineWidth = 1

    state.context.translate((this.x - state.cam.x), (this.y - state.cam.y))
    state.context.rotate(this.rotation * Math.PI / 180)

    state.context.beginPath()

    state.context.moveTo(this.vertices[0].x, this.vertices[0].y)    
    
    for (let vertex of this.vertices) {
       state.context.lineTo(vertex.x, vertex.y)    
    }

    state.context.closePath()
    state.context.stroke()
    state.context.restore()
  }
}