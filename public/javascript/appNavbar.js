let menuSelect = document.getElementById("selectMenuPage");
let menuSelectOption;
let currentPage;
	

if(menuSelect != undefined){ //If the menu exists on this bar
	menuSelectOption = menuSelect.getElementsByTagName("option");
	currentPage = document.location.href.split("/");
	currentPage = currentPage[currentPage.length - 1];
	selectCurrentPage();

	menuSelect.addEventListener("change",function(e){
		let selectedValue = menuSelectOption[e.target.selectedIndex].value;
		document.location = selectedValue;
	});


}

//Selects the current page on the select HTML element 
//of the header
function selectCurrentPage()
{
	for(let i = 0;i < menuSelectOption.length;i++)
	{
		if(menuSelectOption[i].value == currentPage)
		{
			menuSelectOption[i].selected = "true";
		}
	}
}