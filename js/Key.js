class Key{
  constructor(code, type){
    this.code = code;
    this.type = type;
  }

  is(code, type){
    return new Promise((resolve, reject)=>{
      if(code == this.code && this.type == type)resolve(this.type);
    });
  }
}
