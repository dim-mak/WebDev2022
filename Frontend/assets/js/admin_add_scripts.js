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

// Dates for admin_add

// start & end vars for accesing html
const tripStart = document.querySelector('#trip-start-date');
const tripEnd = document.querySelector('#trip-end-date');

// *init* default start & end trip dates
const defTripStart = new Date(); //today
const defTripEnd = new Date();

tripStart.valueAsDate = defTripStart;
tripEnd.valueAsDate = defTripEnd;

// today is min trip start date
let today1 = new Date();
today1 = translateDate(today1)
tripStart.setAttribute("min", today1);

// *init* today is the default min trip end date
let today2 = new Date();
let tomorrow = new Date();
tomorrow.setDate(today2.getDate());
tomorrow = translateDate(tomorrow);
tripEnd.setAttribute("min", tomorrow);

// tripStart is min trip end date
tripStart.addEventListener('change', (event) => {
    let minTripEnd = new Date();
    const tripStartVal = tripStart.valueAsDate;
    minTripEnd = translateDate(tripStartVal);
    tripEnd.setAttribute("min", minTripEnd);
});

// tripStart is default trip end date 
tripStart.addEventListener('change', (event) => {
    let tripStartVal = tripStart.valueAsDate;
    tripEnd.valueAsDate = tripStartVal;
});

