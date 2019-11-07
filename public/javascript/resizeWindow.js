/*

	Script that resizes the electron window
*/
const {ipcRenderer} = require('electron');
const dialog = require('electron').remote.dialog 

function resizeWindow(width,height)
{
	ipcRenderer.send('resize-window',{width: width,height:height});
}

function showDialog(type,buttons,title,message,detail,_callback)
{
	const options = {
		type: type,
		buttons: buttons,
		title: title,
		message: message,
		detail: detail,
		noLink: true
	};

	dialog.showMessageBox(options,(response, checkboxChecked) => {
		_callback(response,checkboxChecked)
  	});
}