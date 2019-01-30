class GameObject{
  constructor(name, mover){
    this.name = name;
    this.mover = mover;
    this.inverse = false;
    this.speed = 1;
    this.frame = 0;

    this.health = new Regen();
    this.mana = new Regen();
    this.animations = new Map();
    this.aniamtion = null;
    this.action = new Action().end();
    this.health.onover = this.ondeath;
    this.ondeath = function(){};

    this.element = document.createElement('div');
    this.element.className = 'entity';
  }

  setAnimation(animation){
    this.animation = animation;
    animation.setFor(this);
  }

  setContext(context){
    context.appendChild(this.element);
  }

  update(key, objects){
    this.element.style.left = this.mover.location.x + 'px';
    console.clear()
    console.log(this.mover.location.x)
    console.log(this.mover.acceleration)
    this.mover.update();
    this.health.update();
    this.mana.update();
  }

  draw(){
    if(this.animation){
      console.log(this.frame);
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
  }

  update(key, objects){
    if(key[65]) this.mover.appendForce(new Vector(-this.speed, 0));
    if(key[68]) this.mover.appendForce(new Vector(this.speed, 0));
    this.inverse = key[65] && key[68] ? this.inverse : (!key[65] && !key[68] ? this.inverse : (key[65]));
    key[65] && key[68] ? this.setAnimation(this.animations.get('idle')) : (!key[65] && !key[68] ? this.setAnimation(this.animations.get('idle')) : this.setAnimation(this.animations.get('sprint')));
    super.update(key, objects);
  }
}
