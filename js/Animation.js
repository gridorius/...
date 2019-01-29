class Animation{
  constructor(url){
    this.frame = 0;
    this.url = url;
    this.sprite = `/SpriteGenerator.php?path=${url}&action=sprite`;
    fetch(`/SpriteGenerator.php?path=${url}&action=info`).then(r=>r.json()).then(info=>{
      this.info = info
      this.onload();
    });
    this.showInfoMode = false;
    this.onload = function(){};
    this.onend = function(){};
    this.onframe = function(){};
  }

  start(){
    this.frame = 0;
    return this;
  }

  showInfo(){
    if(this.element){
      this.element.innerHTML = `
      width: ${this.info.newwidth}<br>
      height: ${this.info.newheight}<br>
      frame: ${this.frame}
      `
    }
  }

  nextFrame(){
    this.frame++;
    this.onframe(this.frame);
    if(this.frame%this.info.sprites == 0){
      this.frame = 0;
      this.onend();
    }
    if(this.showInfoMode)this.showInfo();
    return this;
  }

  draw(){
    if(this.element)
      this.element.style.backgroundPosition = -this.frame*this.info.newwidth + 'px';
  }

  update(){
    fetch(`/SpriteGenerator.php?path=${this.url}&action=update`);
  }

  setFor(element){
    this.element = element;
    element.style.backgroundImage = `url(${this.sprite})`;
    element.style.width = this.info.newwidth + 'px';
    element.style.height = this.info.newheight + 'px';
  }
}
