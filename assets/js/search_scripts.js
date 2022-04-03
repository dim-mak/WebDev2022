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
var tripStart = document.getElementById("trip-start");
var tripEnd = document.getElementById("trip-end");


// *init* default start & end trip dates
var defTripStart = new Date(); //today
var defTripEnd = new Date();

defTripEnd.setDate(defTripStart.getDate() + 7); //7 days after

document.querySelector('[id="trip-start"]').valueAsDate = defTripStart;
document.querySelector('[id="trip-end"]').valueAsDate = defTripEnd;


// today is min trip start date
var today = new Date();
today = translateDate(today)
document.getElementById("trip-start").setAttribute("min", today);


// *init* today + 1 is the default min trip end date
var today = new Date();
var tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);
tomorrow = translateDate(tomorrow);
document.getElementById("trip-end").setAttribute("min", tomorrow);


// tripStart + 1 day is min trip end date
tripStart.addEventListener('change', (event) => {
    var minTripEnd = new Date();
    var tripStartVal = tripStart.valueAsDate;
    minTripEnd.setDate(tripStartVal.getDate() + 1);
    minTripEnd = translateDate(minTripEnd);
    document.getElementById("trip-end").setAttribute("min", minTripEnd);
});


// tripStart + 7 days is default trip end date 
tripStart.addEventListener('change', (event) => {
    var tempTripEnd = new Date();
    var tripStartVal = tripStart.valueAsDate;
    tempTripEnd.setDate(tripStartVal.getDate() + 7);
    document.querySelector('[id="trip-end"]').valueAsDate = tempTripEnd;
});


// checkBox 
var checkBox = document.getElementById("trip-type");
var tripStartCol = document.getElementById("depart-col");
var tripEndCol = document.getElementById("return-col");


checkBox.addEventListener('change', (event) => {
    if (checkBox.checked == true) {
        tripEnd.disabled = true;
        tripEndCol.classList.add('hide');
        tripStartCol.classList.remove('col-lg-2');
        tripStartCol.classList.add('col-lg-4');

        /* FIXME: when disabled dissapear (fix columns ...) or placeholder (bad idea)
        or clear (bad idea for check/uncheck and appearence) */
    } else {
        tripEnd.disabled = false;
        tripEndCol.classList.remove('hide');
        tripStartCol.classList.add('col-lg-2');
        tripStartCol.classList.remove('col-lg-4');
    }
});


// Slideshow
var i = 0;
var images = [];
const slideTime = 6000;

images[0] = 'assets/img/slideshow1.jpg';
images[1] = 'assets/img/slideshow2.jpg';
images[2] = 'assets/img/slideshow3.jpg';
images[3] = 'assets/img/slideshow4.jpg';
images[4] = 'assets/img/slideshow5.jpg';

var sectionElement = document.getElementById('search-section');

function changePicture(i) {
    document.getElementById("img12").src = images[i];
    i++;
    setTimeout(() => { changePicture(i % 5) }, 6000);
}
changePicture(0);