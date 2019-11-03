let menuSelect = document.getElementById("selectMenuPage");
let menuSelectOption = menuSelect.getElementsByTagName("option");
let currentPage = document.location.href.split("/");
currentPage = currentPage[currentPage.length - 1];

selectCurrentPage();

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

menuSelect.addEventListener("change",function(e){
	let selectedValue = menuSelectOption[e.target.selectedIndex].value;
	console.log(selectedValue);

	document.location = selectedValue;
});