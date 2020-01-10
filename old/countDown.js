const { ipcRenderer } = require('electron');

let clicked = false;

document.getElementById("charge");
document.getElementById("threeBells");
document.getElementById("flintstoneRun");
document.getElementById("buzzer");

function playSound(sound, timeMilis, distance){
  if (distance <= timeMilis + 1000 && distance >= timeMilis - 1000){
    sound.play();
  }
}

function start (){
  if (clicked){
    window.location.reload(false);
  }else{
    clicked = true;
    charge.play();
  }

  let done = false;
  // Set the date we're counting down to
  var countDownDate = new Date().getTime() + 150000; //150000

  // Update the count down every 1 second
  var update = setInterval(function() {

    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    //Play Sounds
    playSound(threeBells, 135000, distance);
    playSound(flintstoneRun, 30000, distance)

    // Output the result in an element with id="countDown"
    if (!done) {
      document.getElementById("countDown").innerHTML = minutes + "m " + seconds + "s ";
    }

    // If the count down is over, write some text
    if (distance < 0) {
      buzzer.play();
      clearInterval(update);
      document.getElementById("countDown").innerHTML = "Match Over";
      done = true;
    }
  }, 1000);
}

ipcRenderer.send('startCD-reply', 'chanel opened')


//communication with main.js
ipcRenderer.once('startCD', function (event, status){
  console.log(status);
  start();
})
