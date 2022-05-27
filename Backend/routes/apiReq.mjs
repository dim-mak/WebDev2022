import request from 'request';
import fs from 'fs'
import readline from 'readline';

const seats = ['1A', '1B', '1C', '1D', '1E', '1F',
    '2A', '2B', '2C', '2D', '2E', '2F',
    '3A', '3B', '3C', '3D', '3E', '3F',
    '4A', '4B', '4C', '4D', '4E', '4F',
    '5A', '5B', '5C', '5D', '5E', '5F',
    '6A', '6B', '6C', '6D', '6E', '6F',
    '7A', '7B', '7C', '7D', '7E', '7F',
    '8A', '8B', '8C', '8D', '8E', '8F',
    '9A', '9B', '9C', '9D', '9E', '9F',
];

function shuffleArr(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let rand = Math.floor(Math.random() * (i + 1));
        [array[i], array[rand]] = [array[rand], array[i]]
    }
    return array;
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

function apiCsv() {

    const results = new Array();

    const stream = fs.createReadStream("./results_airports.csv");
    const rl = readline.createInterface({ input: stream });
    let csvRows = [];

    rl.on("line", (row) => {
        csvRows.push(row.split(","));
    });

    rl.on("close", () => {
        const startForLoop = new Date(2019, 0, 1, 12, 0, 0, 0)
        const stopForloop = new Date(2019, 12, 1, 12, 0, 0, 0)

        for (let d = startForLoop; d <= stopForloop; d.setDate(d.getDate() + 1)) {
            let startDate = Math.round((new Date(d)).getTime() / 1000)
            d.setUTCHours(12, 0, 0)
            let endDate = Math.round((new Date(d)).getTime() / 1000)
            d.setUTCHours(10, 0, 0)

            request('https://opensky-network.org/api/flights/all?begin=' + startDate.toString + '&end=' + endDate.toString, { json: true }, (err, res, body) => {
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

                            resObj.goldPrice = getPrice(1000, 2000)
                            resObj.bussPrice = getPrice(500, 800)
                            resObj.ecoPrice = getPrice(100, 400)

                            resObj.seats = getSeats()
                        }

                        if (Object.keys(resObj).length > 0) {



                        }
                    };
                };
            });


        }

    });
}


apiCsv();
