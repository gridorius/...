class Vector{
  constructor(x = 0, y = 0){
    this.x = x;
    this.y = y;
  }

  zero(){
    this.x = this.y = 0;
    return this;
  }

  mag(){
    return Math.sqrt(this.x**2 + this.y**2);
  }

  add(v){
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  sub(v){
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }

  mult(s){
    this.x*= s;
    this.y*= s;
    return this;
  }

  norm(){
    let mag = this.mag();
    this.x/= mag;
    this.y/= mag;
    return this;
  }

  setMag(mag){
    this.norm();
    this.mult(mag);
  }
}
