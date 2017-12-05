import SpaceObject from './SpaceObject'

export default class Base extends SpaceObject {

  constructor ( x, y) {
    super(x, y)

    this.beaconLast = Date.now()
    this.beaconState = 0
    this.beaconInterval = 25
    this.beaconFade = 255;
    this.beaconRange = 50
  }
  
  update (state) {
    if(this.beaconLast+this.beaconInterval < Date.now() ){
      this.beaconState++   
      this.beaconLast = Date.now()
      this.beaconFade-=10;

      if(this.beaconState>this.beaconRange){
      	this.beaconState = 0
      	this.beaconFade = 255
      }
    }
  }

  draw (state) {
    let w = 100
    let h = 100
    let bevel = 10 

    state.context.save();

    state.context.strokeStyle = '#FFFFFF'
    state.context.lineWidth = 1

    state.context.translate((this.x - state.cam.x), (this.y - state.cam.y));

    state.context.beginPath()
    state.context.moveTo(0-w/2, (bevel-h/2) )
    state.context.lineTo(0-w/2, (h/2)-bevel )
    state.context.lineTo(bevel-w/2, (h/2) )
    state.context.lineTo(w/2-bevel, (h/2) )
    state.context.lineTo(w/2, (h/2)-bevel )
    state.context.lineTo(w/2, bevel-(h/2) )
    state.context.lineTo(w/2-bevel, 0-(h/2) )
    state.context.lineTo(bevel-w/2, 0-(h/2) )
    state.context.closePath()
    state.context.stroke()

    w = 90
    h = 90
    bevel = 9 

    state.context.beginPath()
    state.context.moveTo(0-w/2, (bevel-h/2) )
    state.context.lineTo(0-w/2, (h/2)-bevel )
    state.context.lineTo(bevel-w/2, (h/2) )
    state.context.lineTo(w/2-bevel, (h/2) )
    state.context.lineTo(w/2, (h/2)-bevel )
    state.context.lineTo(w/2, bevel-(h/2) )
    state.context.lineTo(w/2-bevel, 0-(h/2) )
    state.context.lineTo(bevel-w/2, 0-(h/2) )
    state.context.closePath()
    state.context.stroke()

    state.context.beginPath()
    state.context.moveTo(0, (h/2) )
    state.context.lineTo(0-w/2, 0 )
    state.context.lineTo(0, 0-(h/2) )
    state.context.lineTo(w/2, 0 )
    state.context.closePath()
    state.context.stroke()

    state.context.fillStyle = '#FF0000'
    state.context.fillRect(0, 0, 1, 1)    

    if(this.beaconFade > 0){
      state.context.lineWidth = 2
      state.context.strokeStyle =  '#'+("00000"+(0<<16|0<<8|this.beaconFade).toString(16)).slice(-6);
      state.context.beginPath();
      state.context.arc(0,0,this.beaconState,0,2*Math.PI);
      state.context.stroke();
    }

    state.context.restore()
  }
}