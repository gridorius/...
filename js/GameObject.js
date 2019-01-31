class GameObject{
  constructor(name, mover){
    this.name = name;
    this.mover = mover;
    mover.setSpeedLimit(15);
    this.inverse = false;
    this.speed = 1;
    this.frame = 0;
    this.actions = {};
    this.animationEnd = function(){};
    this.onFrame = function(){};

    this.health = new Regen();
    this.mana = new Regen();
    this.aniamtion = null;
    this.action = new Action(0).end();
    this.health.onover = this.ondeath;
    this.ondeath = function(){};

    this.element = document.createElement('div');
    this.element.className = 'entity';
  }

  frameZero(){
    this.frame = 0;
  }

  keyevent(key, keys){

  }

  setAction(action){
    this.action = action;
  }

  setAnimation(animation){
    this.animation = animation;
    animation.setFor(this);
  }

  setGame(game){
    this.game = game;
    game.context.appendChild(this.element);
  }

  update(key, objects){
    this.element.style.left = this.mover.location.x + 'px';
    this.mover.update();
    this.health.update();
    this.mana.update();
    this.action.nextFrame();
  }

  draw(){
    if(this.animation){
      this.animation.nextFrame(this);
      this.animation.draw(this);
    }
  }
}

class Player extends GameObject{
  constructor(mover){
    super('player', mover);
    this.health = new Regen(100, 1, 100);
    this.mana = new Regen(100, 3, 100);
    this.actions.attack = new Action(sec(1));
  }

  setAnimationByName(name){
    super.setAnimation(this.game.animations.player[name]);
  }

  attack(){
    this.setAction(this.actions.attack);
    if(this.action.start())
      {
        this.frameZero();
        this.setAnimationByName('attack');
        this.onFrame = frame=>frame == 13 && console.log(1)
        this.animationEnd = this.action.end;
        setTimeout(()=>this.action.end(), 1000)
      }
  }

  keyevent(key, keys){
    key.is(49, true).then(f=>this.attack());
  }

  update(key, objects){
    if(this.action.ended){
      if(key[65]) this.mover.appendForce(new Vector(-this.speed, 0));
      if(key[68]) this.mover.appendForce(new Vector(this.speed, 0));
      this.inverse = key[65] && key[68] ? this.inverse : (!key[65] && !key[68] ? this.inverse : (key[65]));
      if(this.mover.velocity.x == 0) this.setAnimationByName('idle');
      else this.setAnimationByName('sprint');
    }
    super.update(key, objects);
  }
}
