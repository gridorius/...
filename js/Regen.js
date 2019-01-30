class Regen{
  constructor(current = 0, speed = 0, max = 0){
    this.current = current;
    this.speed = speed;
    this.max = max;
    this.onover = function(){};
  }

  add(val){
    this.current += val;
    return this;
  }

  sub(val){
    this.current -= val;
    return this;
  }

  update(){
    if(this.current <= 0) this.onover();
    this.current += this.speed;
    if(this.current > this.max) this.current = this.max;
    return this;
  }
}
