var Particle = function (lifeTime, posX, posY) {
  this.pos = {x:posX, y:posY};
  this.vel = {x:0,y:0};
  this.lifeTime = lifeTime;
  this.color = "rgba(142,101,22,1.0)";
  this.size = 2;
  this.red = 100;
  this.blue = 120;
  this.green = 210;
}

Particle.prototype.update = function (forces) {
  var _forces = [];
  _forces = forces;

    this.vel.x += _forces[0].x;
  //  this.vel.y += _forces[0].y;

    this.pos.x += this.vel.x;
    //this.pos.y += this.vel.y;

}

Particle.prototype.setColor = function (r,g,b){
    this.blue = b;
    this.red = r;
    this.green = g;
    this.color = "rgba("+r+","+g+","+b+",1.0)";
}

Particle.prototype.setSize = function(size){
  this.size = Math.floor(size);
}

Particle.prototype.aging = function(count){
  this.lifeTime -= count;
}
/*
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
*/

//create particles

var particles = [];
var lifeCount = 400;
var numberParticles = 100;

function createParticles(){
  for (var i=0; i<numberParticles; i++) {
      particles[i] = new Particle(Math.round(lifeCount*Math.random()), 0,0);
  }
}
