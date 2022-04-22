// function dates --> strings
function translateDate(date) {
    let dd = date.getDate();
    let mm = date.getMonth() + 1; //January is 0 so need to add 1 to make it 1
    let yyyy = date.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }

    let transDate = yyyy + '-' + mm + '-' + dd;

    return transDate
}

// Dates for admin_update
const upTripStart = document.querySelector('#up-trip-start-date');
const upTripEnd = document.querySelector('#up-trip-end-date');


// tripStart is min trip end date
upTripStart.addEventListener('change', (event) => {
    let minUpTripEnd = new Date();
    const upTripStartVal = upTripStart.valueAsDate;
    minUpTripEnd = translateDate(upTripStartVal);
    document.getElementById("up-trip-end-date").setAttribute("min", minUpTripEnd);
});