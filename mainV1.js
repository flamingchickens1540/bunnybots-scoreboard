var electron = require('electron');
var fs = require('fs');

var app = electron.app;
var BrowserWindow = BrowserWindow = electron.BrowserWindow;

app.on('ready', function () {
  const scoreBoard = new BrowserWindow({width: 1200, height: 800});
  scoreBoard.loadURL('file://' + __dirname + '/scoreBoard.html').then(r => console.log(r));
  const controlPanel = new BrowserWindow({width: 1000, height: 800});
  controlPanel.loadURL('file://' + __dirname + '/controlPanel.html').then(r => console.log(r));
});

