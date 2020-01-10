const { ipcMain } = require('electron');
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

app.on('ready', function () {

    //Creating windows (Control Panel and Score Board)
    const scoreBoard = new BrowserWindow({width: 500, height: 500});
    scoreBoard.loadURL('file://' + __dirname + '/windows/controlPanel.html');
    const controlPanel = new BrowserWindow({width: 500, height: 500});
    controlPanel.loadURL('file://' + __dirname + '/windows/scoreBoard.html');

    //Open ipc chanels
    //score between control panel and main
    ipcMain.on('score0', (event, scoreUpdateVal) => {
      console.log('score update value revieved ['+scoreUpdateVal+']')
      event.sender.send('score0-reply', 'score update value revieved ['+scoreUpdateVal+']')
      scoreBoard.webContents.on('did-finish-load', () => {
        console.log('reached')
        scoreBoard.webContents.send('score1', scoreUpdateVal)
      })
      scoreBoard.webContents.on('did-fail-load', (event, errorCode, errorDescription, validatedURL, isMainFrame) => {

      })
    })

    //score between score board and main
    ipcMain.on ('score1-reply', (event, score) => {
      console.log(score) //logs response
    })

});
