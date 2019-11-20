const { app, shell, BrowserWindow,ipcMain } = require('electron');
const nativeImage = require('electron').nativeImage;

require('electron-reload')(__dirname);

//Create the main window
function createWindow () {

  //Creating the window object
  mainWindow = new BrowserWindow({
    webPreferences: {nodeIntegration: true},
    icon:'./public/images/logoAppNav.png',
    width: 800,
    height: 600,
    frame: false,
    'minHeight': 500,
    'minWidth': 550,
    show: false
  });
	
	//Show the window when ready
  mainWindow.once("ready-to-show",() => mainWindow.show());

  //Redirect to the URL
  mainWindow.loadURL('http://localhost:5000/')
}
  
  app.on('ready', createWindow)