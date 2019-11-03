const { app, shell, BrowserWindow,ipcMain } = require('electron');
const nativeImage = require('electron').nativeImage;

require('electron-reload')(__dirname);

  function createWindow () {

  	var image = nativeImage.createFromPath(__dirname + '/public/images/logoApp2.png'); 
    // Creating the window
    win = new BrowserWindow({webPreferences: {nodeIntegration: true},  icon:image,width: 800, height: 600, frame:false,'minHeight': 500,'minWidth': 550})
  	
  	


    //Load the file
    win.loadURL('http://localhost:5000/')

    win.on("new-window", function(event, url) {
      event.preventDefault();
      shell.openExternal(url);
    });

    ipcMain.on('resize-window', (event, size) => {
      win.setSize(size.width,size.height)
    });

  }
  
  app.on('ready', createWindow)