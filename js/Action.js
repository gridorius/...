class Action{
  constructor(cd){
    this.cd = cd;
    this.framesAfterCast = cd;
    this.ended = false;
  }

  setAction(action){
    this.action = action;
    return this;
  }

  nextFrame(){
    this.framesAfterCast++;
  }

  frameStay(){
    return this.cd - this.framesAfterCast;
  }

  start(){
    if(this.framesAfterCast < this.cd) return false;
    this.ended = false;
    return true;
  }

  end(){
    this.ended = true;
    return this;
  }
}
