class Game{
  constructor(){
    this.frame = 0;
    this.objects = [];
    this.keys = [];
    this.ended = false;
    this.paused = false;

    window.addEventListener('keydown', e=>this.keys[e.keyCode] = true);
    window.addEventListener('keyup', e=>this.keys[e.keyCode] = false);
  }

  addObject(object){
    this.objects.push(object);
  }

  start(){
    this.frame = 0;
    this.render();
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
