// Dates

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

// start & end vars for accesing html
var tripStart = document.getElementById("trip-start-date");
var tripEnd = document.getElementById("trip-end-date");

// *init* default start & end trip dates
var defTripStart = new Date(); //today
var defTripEnd = new Date();

document.querySelector('[id="trip-start-date"]').valueAsDate = defTripStart;
document.querySelector('[id="trip-end-date"]').valueAsDate = defTripEnd;

// today is min trip start date
var today = new Date();
today = translateDate(today)
document.getElementById("trip-start-date").setAttribute("min", today);

// *init* today is the default min trip end date
var today = new Date();
var tomorrow = new Date();
tomorrow.setDate(today.getDate());
tomorrow = translateDate(tomorrow);
document.getElementById("trip-end-date").setAttribute("min", tomorrow);

// tripStart is min trip end date
tripStart.addEventListener('change', (event) => {
    var minTripEnd = new Date();
    var tripStartVal = tripStart.valueAsDate;
    minTripEnd = translateDate(tripStartVal);
    document.getElementById("trip-end-date").setAttribute("min", minTripEnd);
});

// tripStart is default trip end date 
tripStart.addEventListener('change', (event) => {
    var tripStartVal = tripStart.valueAsDate;
    document.querySelector('[id="trip-end-date"]').valueAsDate = tripStartVal;
});