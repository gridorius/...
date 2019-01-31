class Key{
  constructor(code, type){
    this.code = code;
    this.type = type;
  }

  is(code){
    return new Promise((resolve, reject)=>{
      if(code == this.code)resolve(this.type);
    });
  }
}
