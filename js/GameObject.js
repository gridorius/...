class GameObject{
  constructor(name, mover){
    this.name = name;
    this.mover = mover;
    this.inverse = false;
    this.speed = 1;
    this.frame = 0;
    this.actions = {};

    this.health = new Regen();
    this.mana = new Regen();
    this.aniamtion = null;
    this.action = new Action(0).end();
    this.health.onover = this.ondeath;
    this.ondeath = function(){};

    this.element = document.createElement('div');
    this.element.className = 'entity';
  }

  keyevent(key, keys){

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
  }

  draw(){
    if(this.animation){
      this.animation.nextFrame(this);
      this.animation.draw(this);
    }
  }
}

class Player extends GameObject{
  constructor(){
    super('player', new Mover(new Vector(100, 100)));
    this.health = new Regen(100, 1, 100);
    this.mana = new Regen(100, 3, 100);

    this.actions.attack = new Action(0);
  }

  keyevent(key, keys){
    key.is(65).then(()=>this.setAnimation(this.game.animations.player.sprint));
  }

  update(key, objects){
    if(key[65]) this.mover.appendForce(new Vector(-this.speed, 0));
    if(key[68]) this.mover.appendForce(new Vector(this.speed, 0));
    this.inverse = key[65] && key[68] ? this.inverse : (!key[65] && !key[68] ? this.inverse : (key[65]));
    super.update(key, objects);
  }
}
