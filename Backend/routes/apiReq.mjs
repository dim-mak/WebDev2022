import request from 'request';
import fs from 'fs'
import { parse } from 'csv-parse'
import readline from 'readline';

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

function CSVstring_to_Array(data, delimiter = ',') {

    /* This variable will collect all the titles
       from the data variable
       ["Name", "Roll Number"] */

    const titles = data.slice(0, data
        .indexOf('\n')).split(delimiter);

    /* This variable will store the values
       from the data
       [ 'Rohan,01', 'Aryan,02' ] */
    const titleValues = data.slice(data
        .indexOf('\n') + 1).split('\n');

    /* Map function will iterate over all
       values of title values array and
       append each object at the end of
       the array */
    const ansArray = titleValues.map(function (v) {

        /* Values variable will store individual
           title values        
           [ 'Rohan', '01' ] */
        const values = v.split(delimiter);

        /* storeKeyValue variable will store
           object containing each title
           with their respective values i.e
           { Name: 'Rohan', 'Roll Number': '01' } */
        const storeKeyValue = titles.reduce(
            function (obj, title, index) {
                obj[title] = values[index];
                return obj;
            }, {});

        return storeKeyValue;
    });

    return ansArray;
};

let csvRows = []

// fs.createReadStream("./results_airports.csv")
//     .pipe(parse({ delimiter: ",", from_line: 2 }))
//     .on("data", function (csvRows, row) {
//         // console.log(row)
//     })
//     .on("end", function () {
//         csvRows = CSVstring_to_Array(data)
//     })
//     .on("error", function (error) {
//         console.log(error.message);
//     });


const stream = fs.createReadStream("./results_airports.csv");
const rl = readline.createInterface({ input: stream });
let data = [];

rl.on("line", (row) => {
    data.push(row.split(","));
});

rl.on("close", () => {
    console.log(data);
});

console.log(data)

// request('https://opensky-network.org/api/flights/all?begin=1517227200&end=1517230800', { json: true }, (err, res, body) => {
//     if (err) { return console.log(err); }
//     for (let i of body) {
//         if (i.firstSeen == null || i.lastSeen == null || i.estDepartureAirport == null || i.estArrivalAirport == null) {
//             continue
//         }
//         else {
//             let unixTimeDept = i.firstSeen
//             let dateDept = new Date(unixTimeDept * 1000);
//             let dateDeptFinal = translateDate(dateDept)
//             let timeDeptFinal = dateDept.toLocaleTimeString("en-US", { hour12: false })

//             let unixTimeArr = i.lastSeen
//             let dateArr = new Date(unixTimeArr * 1000);
//             let dateArrFinal = translateDate(dateArr)
//             let timeArrFinal = dateArr.toLocaleTimeString("en-US", { hour12: false })

//             let airportDept = i.estDepartureAirport
//             let airportArr = i.estArrivalAirport

//             let airportDeptFinal = airportDept
//             let airportArrFinal = airportArr

//             console.log(dateDeptFinal);
//             console.log(timeDeptFinal);
//             console.log(dateArrFinal);
//             console.log(timeArrFinal);
//             console.log(airportDeptFinal)
//             console.log(airportArrFinal)
//         }
//     };
// });
