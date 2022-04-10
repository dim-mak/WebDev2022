// Dates

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

// start & end vars for accesing html
const tripStart = document.querySelector('#trip-start');
const tripEnd = document.querySelector('#trip-end');

// *init* default start & end trip dates
const defTripStart = new Date(); //today
let defTripEnd = new Date();

defTripEnd.setDate(defTripStart.getDate() + 7); //7 days after

tripStart.valueAsDate = defTripStart;
tripEnd.valueAsDate = defTripEnd;


// today is min trip start date
let today1 = new Date();
today1 = translateDate(today1)
tripStart.setAttribute("min", today1);


// *init* today + 1 is the default min trip end date
const today2 = new Date();
let tomorrow = new Date();
tomorrow.setDate(today2.getDate() + 1);
tomorrow = translateDate(tomorrow);
tripEnd.setAttribute("min", tomorrow);


// tripStart + 1 day is min trip end date
tripStart.addEventListener('change', (event) => {
    let minTripEnd = new Date();
    const tripStartVal = tripStart.valueAsDate;
    minTripEnd.setDate(tripStartVal.getDate() + 1);
    minTripEnd = translateDate(minTripEnd);
    tripEnd.setAttribute("min", minTripEnd);
});


// tripStart + 7 days is default trip end date 
tripStart.addEventListener('change', (event) => {
    let tempTripEnd = new Date();
    let tripStartVal = tripStart.valueAsDate;
    tempTripEnd.setDate(tripStartVal.getDate() + 7);
    tripEnd.valueAsDate = tempTripEnd;
});


// checkBox 
const checkBox = document.querySelector("#trip-type");
const tripStartCol = document.querySelector("#depart-col");
const tripEndCol = document.querySelector("#return-col");

checkBox.addEventListener('change', (event) => {
    if (checkBox.checked == true) {
        tripEnd.disabled = true;
        tripEndCol.classList.add('hide');
        tripStartCol.classList.remove('col-lg-2');
        tripStartCol.classList.add('col-lg-4');

    } else {
        tripEnd.disabled = false;
        tripEndCol.classList.remove('hide');
        tripStartCol.classList.add('col-lg-2');
        tripStartCol.classList.remove('col-lg-4');
    }
});


// Slideshow
let i = 0;
const images = [];
const slideTime = 6000;

const slideShow = document.querySelector('#slideshow');

images[0] = 'assets/img/slideshow1.jpg';
images[1] = 'assets/img/slideshow2.jpg';
images[2] = 'assets/img/slideshow3.jpg';
images[3] = 'assets/img/slideshow4.jpg';
images[4] = 'assets/img/slideshow5.jpg';

function changePicture(i) {
    slideShow.src = images[i];
    i++;
    setTimeout(() => { changePicture(i % 5) }, 6000);
}
changePicture(0);