class Game{
  constructor(context){
    this.context = context;
    this.frame = 0;
    this.objects = [];
    this.keys = [];
    this.ended = false;
    this.paused = false;
    this.animations = {};

    window.addEventListener('keydown', e=>this.keyevent(e.ceyKode, true));
    window.addEventListener('keyup', e=>this.keyevent(e.ceyKode, false));
  }

  keyevent(code, type){
    this.keys[code] = type;
    for(let object of this.objects)
      object.keyevent(type, code, this.keys);
  }

  addObject(object){
    object.setGame(this);
    this.objects.push(object);
  }

  start(){
    this.frame = 0;
    let player = new Player();
    let panim = this.animations.player = {};

    panim.sprint = new Animation('knight/sprint/', ()=>Math.abs(player.mover.velocity.x / 25));
    panim.idle = new Animation('knight/idle/', ()=>0.3);

    this.addObject(player);
    panim.idle.onload.then(()=>{
      player.setAnimation(panim.idle);
      this.render();
    });
  }

  render(){
    if(this.ended)return;
    for(let object of this.objects){
      object.update(this.keys, this.objects);
      object.draw();
    }

    this.frame++;
    if(!this.paused)
      requestAnimationFrame(()=>this.render());
  }
}
