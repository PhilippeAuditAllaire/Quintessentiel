(function() { 
	//Load the IpcRenderer (event emitter)
	const {ipcRenderer} = require('electron');

	//Load the elements
	let btn_min = document.getElementById('minimize');
	let btn_max = document.getElementById('maximize');
	let btn_close = document.getElementById('close');

	//On minimize button click
	btn_min.addEventListener('click',() => ipcRenderer.send('window-action','minimize'));

	//On maximize button click
	btn_max.addEventListener('click',() => ipcRenderer.send('window-action','maximize'));

	//On close button click
	btn_close.addEventListener('click',() => ipcRenderer.send('window-action','close'));

})();

