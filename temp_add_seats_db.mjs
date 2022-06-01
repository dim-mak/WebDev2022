// WILL BE DELETED - SEATS FOR FLIGHT NO1 

import { db } from './db.mjs'



const seats = ['1A', '1B', '1C', '1D', '1E', '1F',
    '2A', '2B', '2C', '2D', '2E', '2F',
    '3A', '3B', '3C', '3D', '3E', '3F',
    '4A', '4B', '4C', '4D', '4E', '4F',
    '5A', '5B', '5C', '5D', '5E', '5F',
    '6A', '6B', '6C', '6D', '6E', '6F',
    '7A', '7B', '7C', '7D', '7E', '7F',
    '8A', '8B', '8C', '8D', '8E', '8F',
    '9A', '9B', '9C', '9D', '9E', '9F'
];

function shuffleArr(array) {

    let arrayTemp = [...array]

    for (let i = arrayTemp.length - 1; i > 0; i--) {
        let rand = Math.floor(Math.random() * (i + 1));
        [arrayTemp[i], arrayTemp[rand]] = [arrayTemp[rand], arrayTemp[i]]
    }
    return arrayTemp;
}

function getSeats() {

    const seatsReturn = new Array()

    let n = Math.floor(Math.random() * 5) + 1;

    let seatsTemp = shuffleArr(seats)

    for (let i = 0; i < n; i++) {
        seatsReturn.push(seatsTemp.pop())
    }

    return seatsReturn
}

function getPrice(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function addSeatData(resObj, j) {

    for (let i of resObj.fullSeats) {
        let seat_type, price;

        if (i == '1A' || i == '1B' || i == '1C' || i == '1D' || i == '1E' || i == '1F') {
            seat_type = 'gold';
            price = resObj.goldPrice;
        } else if (i == '2A' || i == '2B' || i == '2C' || i == '2D' || i == '2E' || i == '2F' ||
            i == '3A' || i == '3B' || i == '3C' || i == '3D' || i == '3E' || i == '3F') {
            seat_type = 'bussiness';
            price = resObj.bussPrice;
        } else {
            seat_type = 'economy';
            price = resObj.ecoPrice;
        }

        db.serialize(() => {

            db.run('INSERT INTO SEAT(occupied, code, seat_type, price, flight_id) VALUES(1,?,?,?,?)', [i, seat_type, price, j], function (err) {
                if (err) {
                    return console.log(err.message);
                }
                console.log("Seat inserted with success");
            });
        });
    }

    // let emptySeatsNo = seats.length - resObj.seats.length;

    let emptySeatsCodes = [...seats];


    for (let i of resObj.fullSeats) {
        const index = emptySeatsCodes.indexOf(i);
        if (index > -1) {
            emptySeatsCodes.splice(index, 1);
        }
    }

    for (let i of emptySeatsCodes) {
        let seat_type, price;

        if (i == '1A' || i == '1B' || i == '1C' || i == '1D' || i == '1E' || i == '1F') {
            seat_type = 'gold';
            price = resObj.goldPrice;
        } else if (i == '2A' || i == '2B' || i == '2C' || i == '2D' || i == '2E' || i == '2F' ||
            i == '3A' || i == '3B' || i == '3C' || i == '3D' || i == '3E' || i == '3F') {
            seat_type = 'bussiness';
            price = resObj.bussPrice;
        } else {
            seat_type = 'economy';
            price = resObj.ecoPrice;
        }


        db.serialize(() => {
            db.run('INSERT INTO SEAT(occupied, code, seat_type, price, flight_id) VALUES(0,?,?,?,?)', [i, seat_type, price, j], function (err) {
                if (err) {
                    return console.log(err.message);
                }
                console.log("Empty seat inserted with success");
            });
        });
    }
}




// console.log(resObj.goldPrice, resObj.bussPrice, resObj.ecoPrice, resObj.fullSeats);



for (let j = 10868; j < 19294; j++) {
    let goldPrice = getPrice(1000, 2000)
    let bussPrice = getPrice(500, 800)
    let ecoPrice = getPrice(100, 400)

    let fullSeats = getSeats();

    let resObj = { goldPrice: goldPrice, bussPrice: bussPrice, ecoPrice: ecoPrice, fullSeats: fullSeats }
    addSeatData(resObj, j)
    // console.log(j)
}










