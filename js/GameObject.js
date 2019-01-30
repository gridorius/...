class GameOjbect{
  constructor(name, mover){
    this.name = name;
    this.mover = mover;

    this.health = new Regen();
    this.mana = new Regen();
    this.aniamtion = null;
    this.action = new Action().end();
    this.health.onover = this.ondeath;
    this.ondeath = function(){};

    this.element = document.createElement('div');
    this.element.className = 'entity';
  }

  setContext(context){
    context.appendChild(this.element);
  }

  update(keys, object){
    this.mover.update();
    this.health.update();
    this.mana.update();
  }

  draw(){
    if(this.animation){
      this.animation.nextFrame();
      this.animation.draw();
    }
  }
}
