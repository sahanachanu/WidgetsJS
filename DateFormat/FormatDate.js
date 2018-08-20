
var FRONTEND_DATE = 1;
var DATABASE_DATE = 2;
/**
* Formats a date string
* @param {string|Date} date The date string or a Date object
* @param {int} format The format (see variables above)
* @return {string} The formatted date string
* @todo Add more formats, probably front-end formats like month/day/year and hours:minutes AM/PM
*/

function GoToFunction(format){
    var givenDate = document.getElementById("Dateval").value;
    var ObtainedDate = formatDate(givenDate,format);
    document.getElementById("FinalDate").value = ObtainedDate;
}
function formatDate(date, format)
{
    // If a string was passed, cast to a date object
    if (typeof(date) == "string")
        date = new Date(date);
   
    // Then do the formatting
    var month = date.getMonth() + 1;
        if (month < 10) month = "0" + month.toString();
        var day = date.getDate() + 1;
        if (day < 10) day = "0" + day.toString();

    if (format == FRONTEND_DATE)
    {
        return month + "/" + day + "/" + date.getFullYear();
    }

    else  if (format == DATABASE_DATE)
    {
        return date.getFullYear() + "-" + month + "-" + day;
    }
}

