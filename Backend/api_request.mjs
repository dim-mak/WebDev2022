import request from 'request';
import fs from 'fs'
import readline from 'readline';
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


const airlines = ['Olympic Airways', 'Aegean Airlines', 'Air Canada',
    'United Airlines', 'British Airways', 'Alitalia', 'Lufthansa German Airlines',
    'Malaysia Airlines', 'KLM Royal Dutch Airlines', 'Turkish Airlines',
    'American Airlines', 'Middle East Airlines', 'Emirates', 'Swissair',
    'Virgin Australia', 'Jetstar', 'Pacific Air Express', 'Ryanair'];


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

// function dates --> strings
function translateDate(date) {
    let dd = date.getDate();
    let mm = date.getMonth() + 1; //January is 0 so need to add 1 to make it 1
    let yyyy = date.getFullYear() + 4;
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }

    let transDate = yyyy + '-' + mm + '-' + dd;

    return transDate
}


function csvAPI() {

    const stream = fs.createReadStream("./results_airports.csv");
    const rl = readline.createInterface({ input: stream });
    let csvRows = [];

    rl.on("line", (row) => {
        csvRows.push(row.split(","));
    });

    rl.on("close", () => {
        const startForLoop = new Date(2018, 0, 1, 12, 0, 0, 0)
        const stopForloop = new Date(2018, 0, 2, 12, 0, 0, 0)

        for (let d = startForLoop; d <= stopForloop; d.setDate(d.getDate() + 1)) {
            let startDate = Math.round((new Date(d)).getTime() / 1000)
            d.setUTCHours(12, 0, 0)
            let endDate = Math.round((new Date(d)).getTime() / 1000)
            d.setUTCHours(10, 0, 0)

            request('https://opensky-network.org/api/flights/all?begin=' + startDate + '&end=' + endDate, { json: true }, (err, res, body) => {
                if (err) { return console.log(err); }

                for (let i of body) {

                    let resObj = {}
                    if (i.firstSeen == null || i.lastSeen == null || i.estDepartureAirport == null || i.estArrivalAirport == null) {
                        continue
                    }
                    else {

                        let unixTimeDept = i.firstSeen
                        let dateDept = new Date(unixTimeDept * 1000);
                        let dateDeptFinal = translateDate(dateDept)

                        let timeDeptFinal = dateDept.toLocaleTimeString("en-US", { hour12: false })

                        let unixTimeArr = i.lastSeen
                        let dateArr = new Date(unixTimeArr * 1000);
                        let dateArrFinal = translateDate(dateArr)

                        let timeArrFinal = dateArr.toLocaleTimeString("en-US", { hour12: false })


                        let departAirport;
                        let arrAirport;


                        for (let row of csvRows) {
                            if (row[1] == i.estDepartureAirport) {
                                departAirport = row[5]
                            }
                            else {
                                continue
                            }
                            if (row[1] == i.estArrivalAirport) {
                                arrAirport = row[5]
                            }
                            else {
                                continue
                            }
                            resObj.departDate = dateDeptFinal
                            resObj.departTime = timeDeptFinal
                            resObj.arrDate = dateArrFinal
                            resObj.arrTime = timeArrFinal
                            resObj.departAirport = departAirport
                            resObj.arrAirport = arrAirport
                            resObj.airline = airlines[Math.floor(Math.random() * airlines.length)];

                            resObj.goldPrice = getPrice(1000, 2000)
                            resObj.bussPrice = getPrice(500, 800)
                            resObj.ecoPrice = getPrice(100, 400)

                            resObj.seats = getSeats()
                            fullSeatsNo = resObj.seats.length;

                        }

                        if (Object.keys(resObj).length > 0) {

                            // let id = addFlightData(resObj);
                            addFlightData(resObj);
                            // addSeatData(resObj);


                        }
                    };

                };
            });
        }
    });
}





function addFlightData(resObj) {

    db.serialize(() => {
        db.run('INSERT INTO FLIGHT(depart_airport, depart_date, depart_time, arrival_time, arrival_date, dest_airport, airline) VALUES(?,?,?,?,?,?,?)',
            [resObj.departAirport, resObj.departDate, resObj.departTime, resObj.arrTime, resObj.arrDate, resObj.arrAirport, resObj.airline], function (err) {
                if (err) {
                    return console.log(err.message);
                }
                console.log("Flight inserted with success");
            });
    });

    // let flightId;
    // db.get("SELECT MAX(flight_id) AS max FROM FLIGHT", function (err, rows) {
    //     // console.log(rows.max);
    //     flightId = rows.max;

    //     return flightId;
    // });

}


function addSeatData(resObj) {

    for (let i of resObj.seats) {
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

            db.run('INSERT INTO SEAT(occupied, code, seat_type, price, flight_id) VALUES(1,?,?,?,?)', [i, seat_type, price, flightId], function (err) {
                if (err) {
                    return console.log(err.message);
                }
                // console.log("Seat inserted with success");
            });
        });
    }

    // let emptySeatsNo = seats.length - resObj.seats.length;

    let emptySeatsCodes = [...seats];


    for (let i of resObj.seats) {
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
            db.run('INSERT INTO SEAT(occupied, code, seat_type, price, flight_id) VALUES(0,?,?,?,?)', [i, seat_type, price, flightId], function (err) {
                if (err) {
                    return console.log(err.message);
                }
                // console.log("Empty seat inserted with success");
            });
        });
    }
}



csvAPI()