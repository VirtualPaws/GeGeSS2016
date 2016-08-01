
var myo;
var rotationMyo = new THREE.Euler().setFromVector3(new THREE.Vector3(0,0,0),'XYZ');
var quaternionMyo = new THREE.Quaternion(0, 0, 0, 0);
var rotationFromQuaternion = new THREE.Euler().setFromVector3(new THREE.Vector3(0,0,0),'XYZ');

//Start talking with Myo Connect
Myo.connect('');


Myo.onError = function () {
  console.log("Woah, couldn't connect to Myo Connect");
}

//connect myo to start application
Myo.on('connected', function(){
  myo = this;
  console.log("Myo connected, la,pe nach oben(zu dir)für optimalen einsatz");
//  myo.setLockingPolicy('none');
  myo.streamEMG(true);
  //start render process
  init();
  animate();
});

//set orientation back to zero
Myo.on('double_tap', function(){
  console.log('Zero Orientation');
  this.vibrate();
  this.zeroOrientation();
})

//store orientation in euler angle cariable
Myo.on('gyroscope', function(_rotationMyo){
  rotationMyo = new THREE.Euler().setFromVector3(_rotationMyo,'XYZ');
})

//store orientation, convert to euler
Myo.on('orientation', function(orientation){
  var scale = 1;
  quaternionMyo = new THREE.Quaternion(orientation.x, orientation.y, orientation.z, orientation.W);
  quaternionMyo.normalize();
  rotationFromQuaternion = new THREE.Euler().setFromQuaternion(quaternionMyo,'XYZ');

/*
  var roll = Math.atan2(2 * (quaternionMyo.w * quaternionMyo.x + quaternionMyo.y * quaternionMyo.z), 1 - 2*(quaternionMyo.x * quaternionMyo.x + quaternionMyo.y * quaternionMyo.y));
  var pitch = Math.asin(2 * (quaternionMyo.w * quaternionMyo.y - quaternionMyo.z * quaternionMyo.x));
  var yaw =  Math.atan2(2 * (quaternionMyo.w * quaternionMyo.z + quaternionMyo.x * quaternionMyo.y), 1 - 2*(quaternionMyo.y * quaternionMyo.y + quaternionMyo.z * quaternionMyo.z));

  rollW = ((roll + Math.PI) / (Math.PI * 2) * scale);
  pitchW = ((pitch + Math.PI / 2) / Math.PI * scale);
  yawW = ((yaw + Math.PI) / (Math.PI * 2) * scale);

  rollG = (360 / (Math.PI * 2) * roll);
  pitchG = (360 / (Math.PI * 2) * pitch);
  yawG = (360 / (Math.PI * 2) * yaw);

  //geometries[0].rotateOnAxis(new THREE.Vector3(1,0,0),yaw); //yaw pitch roll
  //geometries[0].rotateOnAxis(new THREE.Vector3(0,1,0),roll);
  */
})

//register event, punch in this case
var punchTime = 0;
Myo.on('imu', function(data) {
       var time = (new Date()).getTime();
       if (punchTime < time - 1000 && data.accelerometer.x < -1.0) {
              console.log("PUNCH!");
              punchTime = time;
              changeColor();
       }
})
