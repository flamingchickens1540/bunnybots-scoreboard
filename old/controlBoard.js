//controlBoard.js
console.log('controlBoard.js')

const fs = require('fs');
let form = document.getElementById('form');
const { ipcRenderer } = require('electron');
let clicked = false;

document.getElementById("taDa");
document.getElementById("fieldFault");

//play taDa
function showScores(){
  changeWindow(scores);
  taDa.play();
}

//window URLs
const logo = 'file://' + __dirname + '/logo.html';
const countDown = 'file://' + __dirname + '/countDown.html';
const scores = 'file://' + __dirname + '/scores.html';
const ranks = 'file://' + __dirname + '/rank.html';
let currentWindow = logo;

//inputs scores writing to file
function input() {
  fs.writeFile('scores.js', ('redScore = "' + form.elements[0].value + '";' + '\n' + 'blueScore = "' + form.elements[1].value + '";'), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
};

//IPC
//sends window data
function changeWindow(url) {
  ipcRenderer.send('window', url);
  currentWindow = url;
};

//recieves window data
ipcRenderer.on('window-reply', (event, url) => {
  console.log(url)
});

//sends count down data
function  startCountdown (){
  ipcRenderer.send('startCB', true);

  if (clicked){
    fieldFault.play();
    clicked = false;
    document.getElementById("startButton").classList.remove('btn-danger');
    document.getElementById("startButton").classList.add('btn-primary');
    document.getElementById("startButton").innerHTML = "Start";
    ipcRenderer.send('startCB', false);

  }else{
    clicked = true;
    document.getElementById("startButton").classList.remove('btn-primary');
    document.getElementById("startButton").classList.add('btn-danger');
    document.getElementById("startButton").innerHTML = "Reset";
  }

  let done = false;
  // Set the date we're counting down to
  var countDownDate = new Date().getTime() + 150000; //150000

  // Update the count down every 1 second
  var update = setInterval(function() {
    if (!clicked){
      document.getElementById("countDown").innerHTML = "2m 30s";
      clearInterval(update);
      return;
    }

    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in an element with id="countDown"
    if (!done) {
      document.getElementById("countDown").innerHTML = minutes + "m " + seconds + "s ";
    }

    // If the count down is over, write some text
    if (distance < 0) {
      clearInterval(update);
      document.getElementById("countDown").innerHTML = "EXPIRED";
      done = true;
    }
  }, 1000);
}

//recieves count down data
ipcRenderer.on('startCB-reply', (event, reply) => {
  console.log(reply)
});
