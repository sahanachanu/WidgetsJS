/**
 * A dropdown widget that turns into a text box
 * @param {string} label The menu's label
 * @param {object} array An object with title and URL
 * @param {Element} putHere The element to put the UI into
 */
function Dropdown(label, array, puthere)
{
    // Create the container DIV
    this.container = document.createElement("div");
    this.container.className = "DropdownTextBox";
   
    //append the container div
    puthere.appendChild(this.container);
   
    // Create the label and a DIV to contain the label text
    this.label = document.createElement("label");
    this.labelText = document.createElement("div");
    this.labelText.innerHTML = label;
    this.container.appendChild(this.label);
    this.label.appendChild(this.labelText);
   
    //Create the dropdown box with options
    this.dropdown = document.createElement("select");
    this.dropdown.className = "Dropdown";
    this.label.appendChild(this.dropdown);
   
    //Create the textbox and set display as "none"
    this.textBox = document.createElement("input");
    this.textBox.value = "";
    this.textBox.type = "text";
    this.textBox.style = "display:none";
    this.textBox.id="textfield";
    this.container.appendChild(this.textBox);
    // Set up event handlers for the dropdown and text box
    var t = this;
    this.dropdown.addEventListener("change", function(){
        t._showTextBox();
    });
    this.textBox.addEventListener("blur", function(){
        t._showDropDown();
    });
   
    
    //The options taken from the widget user is populated in dropdown
    
        for(i=0; i<array.length; i++)
        {
            var options = document.createElement("option");
            options.value = array[i];
            options.innerHTML = array[i];
            this.dropdown.appendChild(options);
        }

        //CREATE new option added to dropdown
    var options = document.createElement("option");
    options.value = "CreateNew";
    options.innerHTML = "Create New";
    this.dropdown.appendChild(options);
    
    
   
   
    /**
     * Shows the text box and hdies the menu if the user chooses "Create New" (called in an onchange event)
     */
    this._showTextBox = function()
    {
        if(t.dropdown.value == "CreateNew")
        {
            t.dropdown.style.display = "none";
            t.textBox.style.display = "";
            t.textBox.focus();
        }
        else
        t.getValue();
    }

    /**
     * Hides the text box and shows the menu if the user moves focus off the widget (called in an onblur event)
     */
    this._showDropDown = function()
    {
        // If the user typed text, do nothing
        if (t.textBox.value != "") return;

        // Otherwise, hide the text box and show the dropdown
        t.dropdown.selectedIndex = 0;
        t.dropdown.style.display = "";
        t.textBox.style.display = "none";
        t.dropdown.focus();
    }

   
    /**
     * Gets the widget's value
     * @return Either the text box's value or the dropdown menu's value, depending on what's visible
     */
    this.getValue = function()
    {
        if (t.dropdown.style.display == "none")
        {
            array.push(t.textBox.value);
            var val = t.textBox.value; 
            t.textBox.value = "";
            t.textBox.focus();
            return val;
        }
        return t.dropdown.value;
    }

   /* this.addOptions = function()
    {
        for(i=0; i<array.length; i++)
        {
            var options = document.createElement("option");
            options.value = array[i];
            options.innerHTML = array[i];
            this.dropdown.appendChild(options);
        }

        //CREATE new option added to dropdown
    var options = document.createElement("option");
    options.value = "CreateNew";
    options.innerHTML = "Create New";
    this.dropdown.appendChild(options);
           
    }*/
}