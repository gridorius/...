class Animation{
  constructor(url, speed){
    this.speed = speed;
    this.url = url;
    this.sprite = `/SpriteGenerator.php?path=${url}&action=sprite`;
    this.onload = fetch(`/SpriteGenerator.php?path=${url}&action=info`).then(r=>r.json()).then(info=>this.info = info);
    this.img = new Image();
    this.img.src = this.sprite;
    this.x = 0;
    this.y = 0;
    this.origin = 'center';
  }

  setOffset(x, y){
    this.x = x;
    this.y = y;
    return this;
  }

  setOrigin(origin){
    this.origin = origin;
    return this;
  }

  nextFrame(object){
    if(this.frame | 0 < this.frame + this.speed | 0)
      object.onFrame(this.frame | 0);
    object.frame += this.speed();
    if(object.frame>=this.info.sprites){
      object.animationEnd();
      object.frame %= this.info.sprites;
    }

    return this;
  }

  draw(object){
    if(object.element)
      object.element.style.transform = `scale(${object.inverse ? -1 : 1}, 1) translate(${object.inverse ? this.info.newwidth + this.x: this.x}px, ${this.y}px)`;
      object.element.style.backgroundPosition = (-object.frame | 0)*this.info.newwidth + 'px';
  }

  update(){
    fetch(`/SpriteGenerator.php?path=${this.url}&action=update`);
  }

  setFor(object){
    object.element.style.transformOrigin = this.origin;
    object.element.style.backgroundImage = `url(${this.sprite})`;
    object.element.style.width = this.info.newwidth + 'px';
    object.element.style.height = this.info.newheight + 'px';
  }
}
