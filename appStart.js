const { app, BrowserWindow, ipcMain } = require('electron');

let mainWindow;

require('electron-reload')(__dirname);

//Create the main window
function createWindow () {

  //Creating the main window
  mainWindow = new BrowserWindow({
    webPreferences: {nodeIntegration: true},
    icon:'./public/images/logoAppNav.png',
    frame:false,
    width: 800,
    height: 600,
    'minHeight': 500,
    'minWidth': 600,
    show: false
  });
	
	//Show the window when ready
  mainWindow.once('ready-to-show',() => mainWindow.show());

  //Redirect to the URL
  mainWindow.loadURL('http://localhost:5000/');
}


app.on('ready', createWindow);

//Check for the window-action event
ipcMain.on('window-action', function(e, action){

  if(action == "minimize"){
    mainWindow.minimize();
  }
  else if(action == "maximize")
  {
    mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize();
  }
  else if(action == "close"){
    mainWindow.close();
  }

});



