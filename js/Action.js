class Action{
  constructor(){
    this.ended = false;
  }

  start(){
    this.ended = false;
    return this;
  }

  end(){
    this.ended = true;
    return this;
  }
}
