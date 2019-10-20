const { app, BrowserWindow } = require('electron')
const nativeImage = require('electron').nativeImage;
  function createWindow () {

  	var image = nativeImage.createFromPath(__dirname + '/public/images/logoApp2.png'); 
    // Creating the window
    win = new BrowserWindow({webPreferences: {nodeIntegration: true},  icon:image,width: 800, height: 600, frame:false,'minHeight': 500,'minWidth': 550})
  	
  	


    //Load the file
    win.loadURL('http://localhost:5000/')

  }
  
  app.on('ready', createWindow)