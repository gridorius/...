class Action{
  constructor(cd){
    this.cd = cd;
    this.framesAfterCast = cd;
    this.ended = false;
  }

  nextFrame(){
    this.framesAfterCast++;
  }

  frameStay(){
    return this.cd - this.framesAfterCast;
  }

  start(){
    if(this.framesAfterCast < this.cd) return false;
    this.framesAfterCast = 0;
    this.ended = false;
    return true;
  }

  end(){
    this.ended = true;
    return this;
  }
}
