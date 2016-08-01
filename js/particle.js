var Particle = function (lifeTime, posX, posY) {
  this.pos = {x:posX, y:posY};
  this.vel = {x:0,y:0};
  this.lifeTime = lifeTime;
  this.color = "rgba(142,101,22,1.0)";
  this.size = 1;
  this.circle = false;
  this.red = 150;
  this.blue = 150;
  this.green = 150;
}

Particle.prototype.update = function (forces) {

  var _forces = [];
  _forces = forces;
  for (var i=0; i<_forces.length; i++) {
    this.vel.x += _forces[i].x;
    this.vel.y += _forces[i].y;

    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }
  this.lifeTime -= 1;
}

Particle.prototype.setColor = function (r,g,b){
  if(this.circle == true){
    this.blue = b;
    this.red = r;
    this.green = g;
  }else
  this.color = "rgba("+r+","+g+","+b+",1.0)";
}

Particle.prototype.setCircle = function(activateCircle){
  this.circle = activateCircle;
}

Particle.prototype.setSize = function(size){
  this.size = Math.floor(size);
}

Particle.prototype.draw = function (context) {
  context.fillStyle =  this.color;
  if(this.circle == true){
    context.beginPath();
    context.strokeStyle = context.fillStyle = "rgba("+this.red+","+this.green+","+this.blue+",1.0)";
    context.arc(this.pos.x, this.pos.y, this.size, 0, 2*Math.PI, true);
    context.stroke();
    context.fill();
  }else
  context.fillRect(this.pos.x, this.pos.y, this.size, this.size);
}
