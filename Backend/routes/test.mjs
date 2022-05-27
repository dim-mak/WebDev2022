let start = new Date(2019, 0, 1, 12, 0, 0, 0)
let stop = new Date(2019, 12, 1, 12, 0, 0, 0)

for (let d = start; d <= stop; d.setDate(d.getDate() + 1)) {
    let startDate = Math.round((new Date(d)).getTime() / 1000)
    d.setUTCHours(12, 0, 0)
    let endDate = Math.round((new Date(d)).getTime() / 1000)
    d.setUTCHours(10, 0, 0)

    console.log(startDate)
    console.log(endDate)
}
