class Listbox{

	constructor(listboxWrapper,availListbox,attributedListbox,btnRight,btnLeft){

		this._listboxWrapper = listboxWrapper;
		this._availableListbox = availListbox;
		this._attributedListbox = attributedListbox;
		this._btnRight = btnRight;
		this._btnLeft = btnLeft;
		this._selectedListItem = "";


		this.setupListener()
	}

	//Sets up the listeners for the buttons
	setupListener(){
		let ctx = this;
		$(this._btnRight).on("click",function(e){
			ctx.switchSide(e,"right")
		})

		$(this._btnLeft).on("click",function(e){
			ctx.switchSide(e,"left");
		})
		
		$(document).on("click",function(e){
			if(!e.target.classList.contains("list-group-item"))
			{
				ctx.unselectItem();
			}
		});


		$(this._listboxWrapper,".list-group-item").on("click",function(e){
			e.preventDefault();
			ctx.unselectItem();
			let listbox = e.target.parentNode;
			let itemIndex = $(listbox.getElementsByClassName("list-group-item")).index(e.target);
			ctx._selectedListItem = e.target;
			ctx.selectItem();
		});
	 
	}

	//Switches an item from one list to another
	switchSide(e,side)
	{
		e.preventDefault();

		if(this._selectedListItem	!= "")
		{
			if(side == "left"){
				this._availableListbox.appendChild(this._selectedListItem);
			}
			else{
				this._attributedListbox.appendChild(this._selectedListItem);
			}
		}
	}

	selectItem()
	{
		this._selectedListItem.classList.add("active");
	}


	unselectItem()
	{
		if(this._selectedListItem != "")
		{
				this._selectedListItem.classList.remove("active");
				this._selectedListItem = ""
		}
	}

	getAttributedListboxId()
	{
		let attributedIds = [];

		for(let i = 0;i < this._attributedListbox.getElementsByClassName("list-group-item").length;i++)
		{
			attributedIds.push(this._attributedListbox.getElementsByClassName("list-group-item")[i].getAttribute("data-id"));	
		}

		return attributedIds;
	}


	get attributedListbox(){
		return this.getAttributedListboxId()
	}

}
