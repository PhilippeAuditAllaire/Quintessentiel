const { app, BrowserWindow, ipcMain, Menu, shell } = require('electron');

let mainWindow;
let demoWindow;

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
    'minWidth': 550,
    show: false
  });
	
	//Show the window when ready
  mainWindow.once('ready-to-show',() => mainWindow.show());

  //Redirect to the URL
  mainWindow.loadURL('http://localhost:5000/');

  createDemoWindow();
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



//Demo


//Create the menu template
const menuTemplate = [
  {
    label: 'Options',
    submenu: [
      {
        label: 'Close',
        accelerator: 'Ctrl+Q',
        click: () => demoWindow.close()
      },
      {
        label: 'Minimize'
      }
    ]
  },
  {
    label: 'Other',
    click: () => shell.openExternal("https://google.com")
  }
];


//Build menu from template
const menu = Menu.buildFromTemplate(menuTemplate);

//Creating a window for the toolbar demo
function createDemoWindow(){

  //Create the new window
  demoWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show:false
  });

  //Set the menu
  Menu.setApplicationMenu(menu);

  //Redirect to the URL
  demoWindow.loadURL('http://localhost:5000/');

  //When ready show the window and minimize it
  demoWindow.once('ready-to-show',function(){
    demoWindow.show();
    demoWindow.minimize();
  });



}