const { ipcMain } = require('electron');
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
let eventCD;


app.on('ready', function () {
    //Creating windows (Control Panel and Score Board)
    const scoreBoard = new BrowserWindow({width: 500, height: 500});
    scoreBoard.loadURL('file://' + __dirname + '/logo.html'); //logo.html
    const controlBoard = new BrowserWindow({width: 500, height: 600});
    controlBoard.loadURL('file://' + __dirname + '/controlBoard.html');

    //Sends data between controlBoard.js and main.js
    //window display
    ipcMain.on('window', (event, url) => {
      console.log('window address [' + url + ']');
      event.sender.send('window-reply', 'loaded [' + url + ']');
      scoreBoard.loadURL(url);
    })

    //Countdown
    ipcMain.on('startCB', (event, status) => {
      console.log('status [' + status + ']');
      event.sender.send('startCB-reply', 'countdown status recieved [' + status + ']');
      if (status){
        scoreBoard.webContents.send('startCD', status);
      }else{
        scoreBoard.loadURL('file://' + __dirname + '/countDown.html');
      }
    })
})
