class Game{
  constructor(context){
    this.context = context;
    this.frame = 0;
    this.objects = [];
    this.keys = [];
    this.ended = false;
    this.paused = false;
    this.animations = {};

    window.addEventListener('keydown', e=>this.keyevent(e.keyCode, true));
    window.addEventListener('keyup', e=>this.keyevent(e.keyCode, false));
  }

  keyevent(code, type){
    if(this.keys[code] == type)return;
    this.keys[code] = type;
    for(let object of this.objects)
      object.keyevent(new Key(code, type), this.keys);
  }

  addObject(object){
    object.setGame(this);
    this.objects.push(object);
  }

  start(){
    this.frame = 0;
    let player = new Player(new Mover(new Vector(500)));
    let panim = this.animations.player = {};
    let start = -80;
    panim.sprint = new Animation('knight/sprint/', ()=>Math.abs(player.mover.velocity.x / 25)).setOffset(start - 50, 0);
    panim.idle = new Animation('knight/idle/', ()=>0.3).setOffset(start, 0);
    panim.attack = new Animation('knight/attack1/', ()=>0.3).setOffset(start - 40, 0);

    this.addObject(player);
    Promise.all([panim.sprint.onload, panim.idle.onload, panim.attack.onload]).then(()=>this.render())


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
