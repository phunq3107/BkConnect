import constants, {daysOfWeek} from "../constants";

export const changeAvailableTimeOfADayInWeek = (day,availableTime,value,fromHour,toHour) => {
    let rs = ""
    const startDay = (+day.value) * 24
    for(let i = 0 ; i<availableTime.length ; i++){
        rs += (i >= startDay + fromHour && i < startDay + toHour) ? value.toString() : availableTime[i]
    }
    return rs
}

export const isAvailableAt = (day, timeSlot, availableTime) => {
    const availableTimeDividedByDays = availableTime.match(/(.{1,24})/g)
    const checkedDay = availableTimeDividedByDays[parseInt(day.value)].split('')
    const [fromHour,toHour] = timeSlot.value.split('-').map(e=>parseInt(e))
    return checkedDay.every((value,idx) => (idx < fromHour || idx >= toHour || value===constants.AVAILABLE_TIME_VALUE))
}

export const getAllDaysHaveAvailableTimeSlot = (timeSlots, availableTime) => {
    const res = []
    daysOfWeek.forEach(day =>  {
        if(!timeSlots.every(timeSlot => !isAvailableAt(day, timeSlot, availableTime)))
            res.push(day)
    })
    return res
}