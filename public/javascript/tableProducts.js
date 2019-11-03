function setUpTableEvents()
{
	
}


let currentlyHover = ""; 

function itemHover(element){
	let wrapperInfos = document.getElementsByClassName("wrapper-info");
	let wrapperRows = element.parentNode.getElementsByClassName("wrapper-row");
	let elementIndex = $(wrapperRows).index(element);

	if(currentlyHover !== elementIndex) //If this is not the same element
	{
		console.log("OVER THE LINE")
		for(let i = 0;i < wrapperInfos.length;i++)
		{
			wrapperInfos[i].getElementsByClassName("wrapper-row")[elementIndex].classList.add("hovered");
		}

		currentlyHover = elementIndex;
	}
} 


function itemOut(element){
	
	let wrapperInfos = document.getElementsByClassName("wrapper-info");
	let wrapperRows = element.parentNode.getElementsByClassName("wrapper-row");
	let elementIndex = $(wrapperRows).index(element);
	console.log(elementIndex)
	if(currentlyHover !== elementIndex) //If its not hover the same element anymore
	{
		console.log("NOT OVER ANYMORE")
		for(let i = 0;i < wrapperInfos.length;i++)
		{
			wrapperInfos[i].getElementsByClassName("wrapper-row")[elementIndex].classList.remove("hovered");
		}

		currentlyHover = "";	
	}

} 