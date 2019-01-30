class Mover{
  constructor(location, velocity = new Vector(), acceleration = new Vector()){
    this.location = location;
    this.velocity = velocity;
    this.acceleration = acceleration;
  }

  appendForce(force){
    this.acceleration.add(force);
    return this;
  }

  update(){
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.velocity.x -= this.velocity.x*5/100;
    this.acceleration.zero();
    return this;
  }
}
