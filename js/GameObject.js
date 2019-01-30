class GameObject{
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

  setAnimation(animation){
    this.animation = animation;
    animation.setFor(this.element);
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

class Player extends GameObject{
  constructor(){
    super('player', new Mover(new Vector(100, 100)));
    this.health = new Regen(100, 1, 100);
    this.mana = new Regen(100, 3, 100);
  }
}
