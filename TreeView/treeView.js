/**
 * A tree widget that can be used for navigating through pages
 * @param {array of objects}  Elements The parent and child elements with child being an array to corresponding parent
 
 Ex:[{parent:"name1", child:["a","b"]},
	 {parent:"name2", child:["1","2","3","4"]}
	];
	
 * @param {img} expandIcon The src of icon showing expansion for treeview ex: "plus.png"
  * @param {img} collapseIcon The src icon showing collapse for treeview ex: "minus.png"
 * @param {Element} putHere The element to put the UI into
 */
 
function TreeView(Elements, expandIcon, collapseIcon, puthere)
{
	// Create the container DIV to hold the TreeView widget
	this.container = document.createElement("div");
	this.container.className = "TreeViewContainer";
	
	//append the container div
	puthere.appendChild(this.container);
	
	this.childIndexs = [];
	
	//Looping through the Elements array to place the parent elements 
	for(i=0; i<Elements.length; i++)
	{
		this.elementDivs = [];
		// Create a div to hold each set of parent-child elements
		this.elementDivs[i] = document.createElement("div");
		this.elementDivs[i].className = "ElementDiv";
		this.container.appendChild(this.elementDivs[i]);
		
		
		//Create the parent-element 
		this.parentElements = [];
		this.parentElements[i] = document.createElement("span"); 
		this.parentElements[i].className = "ParentElementName";
		
		
		//Create the icon that shows expand-collapse for tree view next to parent element, initially will be set to expand icon
		this.parentElements[i].innerHTML = '<img src = '+expandIcon+' class="MaxMinIcon">'+Elements[i].parent;
		this.elementDivs[i].appendChild(this.parentElements[i]);
		
		//Create the child-element
		this.childElements = [];
		this.childElements[i] = document.createElement("div"); 
		this.childElements[i].className = "ChildElementName";
		this.childElements[i].style.display ="none";
		
		var childArray = Elements[i].child;
		this.childLists=[];
		//Looping through the Elements array to place the child elements in corresponding parent-child elements div
		for(j=0; j<childArray.length; j++)
		{
			this.childLists[j] = document.createElement("li"); 
			this.childLists[j].className = "ChildElement";
			this.childLists[j].innerHTML = childArray[j];
			this.childElements[i].appendChild(this.childLists[j]);
			this.childIndexs.push(this.childLists[j]);
			
		}
		
		
		this.elementDivs[i].appendChild(this.childElements[i]);	
	}
	
	//Get all parent elements which are in a span 
	var allSpan = document.getElementsByTagName('SPAN');
	for(var i = 0; i < allSpan.length; i++)
	{
		//onclick parent element get the child elements to show and hide them with corresponding icons
		allSpan[i].onclick=function()
		{
			if(this.parentNode)
			{
				var childList = this.parentNode.getElementsByTagName('div');
        	
				for(var j = 0; j< childList.length;j++)
				{
					var ChildId = childList[j].id;
					var currentState = childList[j].style.display;
					if(currentState=="none")
                	{
                    	childList[j].style.display="block";
                		this.childNodes[0].src= collapseIcon;
                		this.childNodes[0].alt='Collapse';	    
          			}
					else 
                	{
                        childList[j].style.display="none";
                   		this.childNodes[0].src= expandIcon;
                		this.childNodes[0].alt='Expand';
                    }
            	}
			}
		}
	}

	/** Call this event to direct each child element onClick/keydown to a different page
	* @param(n) Index value of the child element starting from 0,1,2,3......(includes index in an order for all child elements in entire tree view not based on each parent, 
		probably one can just loop through child elements alone to get this value)
	*@param(callback) Location to where the redirect should happen    Ex:function(){ window.location = "http://www.google.com"; }
	**/
	
	this.addEvent = function(n, callback)
	{
		tt.childIndexs[n].addEventListener("click", function(e) {callback(e); });
		tt.childIndexs[n].addEventListener("keydown", function(e) {
			if (e.which == 13 || e.which == 32) // Space or Enter
				callback(e);
		});
	};
}