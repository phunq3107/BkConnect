import constants, {daysOfWeek} from "../constants";

export const changeAvailableTimeOfADayInWeek = (day,availableTime,value,fromHour,toHour) => {

    const availableTimeInWeek =
        (availableTime && availableTime.length === constants.hoursOfWeek) ?
            availableTime :
            (new Array(constants.hoursOfWeek + 1).join(constants.NON_AVAILABLE_TIME_VALUE))

    const availableTimeInWeekDividedByDays = availableTimeInWeek.match(/(.{1,24})/g)
    const availableTimeOfDayToChange = availableTimeInWeekDividedByDays[parseInt(day.value)].split('')

    const updatedAvailableTimeOfDay = availableTimeOfDayToChange.map((hour,idx) => {
        if(idx >= fromHour && idx < toHour)
            return value
        else return hour
    }).join('')

    return(
        [
            ...availableTimeInWeekDividedByDays.slice(0,day.value),
            updatedAvailableTimeOfDay,
            ...availableTimeInWeekDividedByDays.slice(day.value+1)
        ].join(''))
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