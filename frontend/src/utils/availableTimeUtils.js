import constants, {daysOfWeek} from "../constants";

export const changeAvailableTimeOfADayInWeek = (day, availableTime, value, fromHour, toHour) => {
    let rs = ""
    const startDay = (+day.value) * 24
    for (let i = 0; i < availableTime.length; i++) {
        rs += (i >= startDay + fromHour && i < startDay + toHour) ? value.toString() : availableTime[i]
    }
    return rs
}

export const isAvailableAt = (day, timeSlot, availableTime) => {
    const availableTimeDividedByDays = availableTime.match(/(.{1,24})/g)
    const checkedDay = availableTimeDividedByDays[parseInt(day.value)].split('')
    const [fromHour, toHour] = timeSlot.value.split('-').map(e => parseInt(e))
    return checkedDay.every((value, idx) => (idx < fromHour || idx >= toHour || value === constants.AVAILABLE_TIME_VALUE))
}

export const getAllDaysHaveAvailableTimeSlot = (timeSlots, availableTime) => {
    const res = []
    daysOfWeek.forEach(day => {
        if (!timeSlots.every(timeSlot => !isAvailableAt(day, timeSlot, availableTime)))
            res.push(day)
    })
    return res
}

export const getAvailableDay = (time) => {
    const map = new Map()
    getAllDaysHaveAvailableTimeSlot([{title: "", value: "0-23"}], time).forEach(
        i => map.set(i.title, true)
    )
    const res = []
    daysOfWeek.forEach(i => {
        res.push({...i, "available": map.has(i.title)})
    })
    return res
}

export const getAllAvailableTimes = (availableTimeStr) => {
    const days = availableTimeStr.match(/(.{1,24})/g)
    const res = [[],[],[],[],[],[],[]]
    for (let i = 0 ; i < 7; i++){
        let start = -1
        for (let j = 0 ; j < 24; j++){
            if (j === 23){
                if (days[i][j] === "1"){
                    if (start === -1)
                        res[i].push(j + "," + j)
                    else
                        res[i].push(start + "," + j)
                }
            }
            else {
                if (days[i][j] === "1" && start === -1) {
                    start = j
                }
                if (days[i][j + 1] === "0" && start !== -1) {
                    res[i].push(start + "," + j)
                    start = -1
                }
            }
        }
    }
    return res
}