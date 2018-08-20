/**
 * Shows a modal message box ("alertdialog" in ARIA terms)
 * @param {string} title The dialog's title
 * @param {string} The message text/body
 * @param {array|string} An array of strings, the button labels (optional, defaults to just "OK")
 * @param {Element} focusWasHere The element that had focus when the dialog appeared
 * @param {function} callback The code to run when the user presses a button or the Escape key
 * @remarks This function assumes you have one <main> tag on the page.  This tag should contain
 * everything that should be hidden from screen readers (so pretty much everything in the body).
 */

 function ShowMessageBox(){
     var TextMsg = document.getElementById("TextMsg").value;
     messageBox("Alert", TextMsg, "close","");
 }
function messageBox(title, text, buttons, focusWasHere, callback)
{
    // Save a references to this object for use in other places in the code
    // Unfortunate but necessary workaround due to JavaScript's weird way of doing OOP.
    let t = this;
   
    // Hide the one <main> tag so the dialog is modal to screen reader users
    document.querySelector("main").setAttribute("aria-hidden", "true");
   
    // Create the overlay to make the dialog modal for mouse users
    t.overlay = document.createElement("div");
    t.overlay.className = "dialog-overlay";
    t.overlay.setAttribute("tabindex", "0");
    document.body.appendChild(t.overlay);
   
    // Create the dialog container "window" (another div)
    t.dialog = document.createElement("div");
    t.dialog.setAttribute("role", "alertdialog");
    t.dialog.setAttribute("aria-labelledby", "alertHeading");
    t.dialog.setAttribute("aria-modal", "true");
    t.dialog.setAttribute("aria-describedby", "alertText");
    t.dialog.className = "dialog-content";
    document.body.appendChild(t.dialog);
   
    // Create the "first element" div
    t.first = document.createElement("div");
    t.first.setAttribute("tabindex", "0");
    t.dialog.appendChild(t.first);
   
    // Create the "alertHeading" heading
    t.title = document.createElement("h1");
    t.title.id = "alertHeading";    // Important because of aria-labelledby
    t.title.innerHTML = title;
    t.dialog.appendChild(t.title);
   
    // Create the "alertText" div
    t.text = document.createElement("div");
    t.text.id = "alertText";    // Again, important because of aria-labelledby
    t.text.innerHTML = text;
    t.dialog.appendChild(t.text);
   
    // If no buttons were passed, use just one ("OK").
    if (!buttons) buttons = ["OK"];
   
    // If a string was passed, rework it as an array
    else if (typeof(buttons) == "string") buttons = [buttons];
   
    // Now loop through the array and create the buttons
    t.buttons = [];
    for (i=0; i<buttons.length; i++)
    {
        var b = document.createElement("button");
        b.className = "AlertClose";
        b.innerHTML = buttons[i];
        b.addEventListener("click", function(e){
            document.querySelector("main").removeAttribute("aria-hidden");
            if (callback) callback(e.target.innerHTML);
            document.body.removeChild(t.overlay);
            document.body.removeChild(t.dialog);
            if (focusWasHere) focusWasHere.focus();
        });
        t.dialog.appendChild(b);
        t.buttons.push(b);
    }
   
    // Create the "last element" div
    t.last = document.createElement("div");
    t.last.setAttribute("tabindex", "0");
    t.dialog.appendChild(t.last);
   
    // Add focus events to the first and last elements
    // These help keep the focus inside the dialog at all times.
    t.first.addEventListener("focusin", function(e){
        t.buttons[t.buttons.length - 1].focus();
    });
    t.last.addEventListener("focusin", function(e){
        t.buttons[0].focus();
    });
   
    // Set up the Escape button as a way to exit the dialog
    document.body.addEventListener("keydown", function(e){
        if (e.which == 27)
        {
            document.querySelector("main").removeAttribute("aria-hidden");
            if (callback) callback("close");
            try
            {
                document.body.removeChild(t.overlay);
                document.body.removeChild(t.dialog);
            } catch(e){}
            if (focusWasHere) focusWasHere.focus();
        }
    });
   
    // And set the focus to the first button.
    t.buttons[0].focus();
};