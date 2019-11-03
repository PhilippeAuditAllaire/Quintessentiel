(function() {
	
	var remote = require('electron').remote;  //Permet d'accéder au main process de Electron

	let btn_min = document.getElementById("minimize");
	let btn_max = document.getElementById("maximize");
	let btn_close = document.getElementById("close");

	btn_min.addEventListener("click",function(){
		let main_window = remote.getCurrentWindow();
		main_window.minimize();
	},false);

	btn_max.addEventListener("click",function(){
		let main_window = remote.getCurrentWindow();
		main_window.isMaximized() ? main_window.unmaximize() : main_window.maximize();
	},false);

	btn_close.addEventListener("click",function(){
		let main_window = remote.getCurrentWindow();
		main_window.close();
	},false);

})();

