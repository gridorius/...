class Mover{
  constructor(location, velocity = new Vector(), acceleration = new Vector()){
    this.location = location;
    this.velocity = velocity;
    this.acceleration = acceleration;
  }

  appendForce(force){
    this.accleration.add(force);
    return this;
  }

  update(){
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    return this;
  }
}
