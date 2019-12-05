//Loads all the countries and provinces
//for these countries
function loadAllCountries()
{
	$.ajax({
		url: "http://localhost:8000/ajaxRequest/getAllCountries",
		method: "POST",
		success: function(countryList){
			allCountriesList = countryList;
			displayCountrySelect();
			displayProvinces(JSON.parse(allCountriesList[0].provinces));
		}
	});		
}

//Displays the given list of 
//provinces in the select
//@provincesList is the list of provinces to display
function displayProvinces(provincesList)
{
	$("#idProvince").html("");

	for(let i = 0;i < provincesList.length;i++)
	{
		$("#idProvince").html($("#idProvince").html() + "<option value='"+provincesList[i].id+"'>"+provincesList[i].provinceName+"</option>");
	}	
}

//When the user changes the country
$("#idCountry").on("change",(e) => {
	let indexInArray = findCountryIndexinArray(e.target.value);
	let provincesList = JSON.parse(allCountriesList[indexInArray].provinces);

	displayProvinces(provincesList);
});


//Finds the country index in the array
//by searching for its id
//@countryId is the countryId to find in the array
//@Returns the index to which the country is
function findCountryIndexinArray(countryId)
{
	for(let i = 0;i < allCountriesList.length;i++) //For each countries in the list
	{
		if(allCountriesList[i].countryId == countryId) //If we found the match
		{
			return i;
		}
	}
}



/*
	Displays all the countries
*/
function displayCountrySelect()
{
	for(let i = 0;i < allCountriesList.length;i++)
	{
		$("#idCountry").html($("#idCountry").html() + "<option value='"+allCountriesList[i].countryId+"'>"+allCountriesList[i].countryName+"</option>");
	}
}