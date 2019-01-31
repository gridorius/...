class Mover{
  constructor(location, velocity = new Vector(), acceleration = new Vector()){
    this.location = location;
    this.velocity = velocity;
    this.acceleration = acceleration;
    this.speedLimit = null;
  }

  setSpeedLimit(limit){
    this.speedLimit = limit;
  }

  appendForce(force){
    this.acceleration.add(force);
    return this;
  }

  update(){
    if(this.speedLimit && Math.abs(this.velocity.x) >= this.speedLimit);
    else this.velocity.add(this.acceleration);
    this.location.add(this.velocity);

    if(!this.acceleration.x){
      this.velocity.x *= 0.8;
      if(Math.abs(this.velocity.x) < 2) this.velocity.x = 0;
    }
    
    this.acceleration.zero();
    return this;
  }
}
