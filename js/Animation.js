class Animation{
  constructor(url, speed){
    this.speed = speed;
    this.url = url;
    this.sprite = `/SpriteGenerator.php?path=${url}&action=sprite`;
    this.onload = fetch(`/SpriteGenerator.php?path=${url}&action=info`).then(r=>r.json()).then(info=>this.info = info);
    this.img = new Image();
    this.img.src = this.sprite;
  }

  nextFrame(object){
    object.frame += this.speed();
    if(object.frame>=this.info.sprites)
      object.frame %= this.info.sprites;
    return this;
  }

  draw(object){
    if(object.element)
      object.element.style.transform = `scale(${object.inverse ? -1 : 1}, 1)`;
      object.element.style.backgroundPosition = (-object.frame | 0)*this.info.newwidth + 'px';
  }

  update(){
    fetch(`/SpriteGenerator.php?path=${this.url}&action=update`);
  }

  setFor(object){
    //object.frame = 0;
    object.element.style.backgroundImage = `url(${this.sprite})`;
    object.element.style.width = this.info.newwidth + 'px';
    object.element.style.height = this.info.newheight + 'px';
  }
}
