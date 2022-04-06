// function dates --> strings
function translateDate(date) {
    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0 so need to add 1 to make it 1
    var yyyy = date.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }

    var transDate = yyyy + '-' + mm + '-' + dd;

    return transDate
}

// Dates for admin_update
var upTripStart = document.getElementById("up-trip-start-date");
var upTripEnd = document.getElementById("up-trip-end-date");

// tripStart is min trip end date
upTripStart.addEventListener('change', (event) => {
    var minUpTripEnd = new Date();
    var upTripStartVal = upTripStart.valueAsDate;
    minUpTripEnd = translateDate(upTripStartVal);
    document.getElementById("up-trip-end-date").setAttribute("min", minUpTripEnd);
});