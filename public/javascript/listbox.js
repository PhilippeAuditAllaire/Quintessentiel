		let availableListbox = document.getElementById("available-listbox");
		let attributedListbox = document.getElementById("attributed-listbox");
		let btnRight = document.getElementById("btnRight");
		let btnLeft = document.getElementById("btnLeft");


		let selectedListItem = "";

		//Listbox item switch
		$(btnRight).on("click",function(e){
			switchSide(e,"right")
		})

		$(btnLeft).on("click",function(e){
			switchSide(e,"left");
		})


		function switchSide(e,side)
		{
			e.preventDefault();

			if(selectedListItem	!= "")
			{
				if(side == "left"){
					availableListbox.appendChild(selectedListItem);
				}
				else{
					attributedListbox.appendChild(selectedListItem);
				}
			}
		}




		//Listbox item selection

		$(document).on("click",function(e){

			if(!e.target.classList.contains("list-group-item"))
			{
				unselectItem();
			}
			
		});

		$(".list-group-item").on("click",function(e){
			e.preventDefault();
			unselectItem();
			let listbox = e.target.parentNode;
			let itemIndex = $(listbox.getElementsByClassName("list-group-item")).index(e.target);
			selectedListItem = e.target;
			selectItem();
		});

		function selectItem()
		{
			selectedListItem.classList.add("active");
		}


		function unselectItem()
		{
			if(selectedListItem	 != "")
			{
					selectedListItem.classList.remove("active");
					selectedListItem = ""
			}
		}


		function getAttributedListboxId()
		{
			let attributedIds = [];

			for(let i = 0;i < attributedListbox.getElementsByClassName("list-group-item").length;i++)
			{
				attributedIds.push(attributedListbox.getElementsByClassName("list-group-item")[i].getAttribute("data-id"));	
			}

			return attributedIds;
		}