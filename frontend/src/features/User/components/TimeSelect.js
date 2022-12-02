import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Checkbox, Chip, FormControlLabel, Grid, MenuItem, Select, Stack, Typography} from "@mui/material";
import constants, {daysOfWeek, timeSlots} from "../../../constants";
import {
    changeAvailableTimeOfADayInWeek,
    getAllDaysHaveAvailableTimeSlot,
    isAvailableAt
} from "../../../utils/availableTimeUtils";

TimeSelect.propTypes = {
    availableTime: PropTypes.string,
    onChangeAvailableTime: PropTypes.func
};

function TimeSelect(props) {

    const [selectedDays, setSelectedDays] = useState(() =>
        getAllDaysHaveAvailableTimeSlot(timeSlots,props.availableTime))

    const renderDaysOfWeekSelector = () => {
        return (
            <Select
                fullWidth
                margin="dense"
                id="teachingTime"
                name="teachingTime"
                autoComplete="off"
                size="small"
                onChange={(e) => handleChangeDays(e)}
                defaultValue=""
                value={selectedDays.length > 0 ? selectedDays[selectedDays.length-1].value : ""}
            >
                {daysOfWeek.map((day,idx) => {
                    return <MenuItem key={idx} value={day.value}>{day.title}</MenuItem>
                })}
                <MenuItem value="" sx={{display:"none"}}></MenuItem>
            </Select>
        )
    }


    const renderTimeCheckboxes = (day) => {
        return(
            <>
                {timeSlots.map((timeSlot, idx) => {
                    return (
                        <FormControlLabel
                            key={idx}
                            control={
                                <Checkbox
                                    size="small"
                                    key={idx}
                                    onChange={(e) => handleChangeAvailableTime(e,day)} name={timeSlot.value}
                                    checked={isAvailableAt(day,timeSlot,props.availableTime)}
                                />
                            }
                            label={timeSlot.title}
                        />
                    )
                })}
            </>
        )
    }

    const renderTimeSelector = (selectedDays) => {
        return (
            <Stack direction="column" spacing={1} mt={2}>
                {selectedDays.map((day,idx) => {
                    return(
                        <Stack key={idx} direction="row" spacing={1}>
                            <Grid item alignSelf="center" width="15%">
                                <Typography variant="h8" fontWeight="bold">{day.title}</Typography>
                            </Grid>
                            <Grid item>
                                {renderTimeCheckboxes(day)}
                            </Grid>
                        </Stack>
                    )
                })}
            </Stack>
        )
    }

    const renderButtonsDeleteDay = (days) => {
        return (
            <Stack direction="row" spacing={1} mt={1}>
                {days.map((day, idx) => {
                    return <Chip size="small" key={idx} label={day.title} onDelete={() => handleDeleteDays(day)}/>
                })}
            </Stack>
        )
    }

    const handleChangeDays = (e) => {
        const idx = selectedDays.findIndex(day => day.value === e.target.value)
        if (idx < 0){
            const selectedDay = daysOfWeek.find(day => day.value === e.target.value)
            setSelectedDays(prev => ([...prev,selectedDay].sort((x,y)=>x.value-y.value)))
        }
    }

    const handleDeleteDays = (deletedDay) => {
        setSelectedDays(prev => prev.filter(day => day.value !== deletedDay.value))
    }


    const handleChangeAvailableTime = (e,day) => {
        const currentAvailableTime = props.availableTime
        const [fromHour,toHour] = e.target.name.split('-').map(e=>parseInt(e))
        console.log(fromHour + "-" + toHour)
        const value = e.target.checked ? constants.AVAILABLE_TIME_VALUE : constants.NON_AVAILABLE_TIME_VALUE
        const updatedAvailableTime = changeAvailableTimeOfADayInWeek(day,currentAvailableTime,value,fromHour,toHour)
        props.onChangeAvailableTime(updatedAvailableTime)
    }

    return (
        <React.Fragment>
            {daysOfWeek && renderDaysOfWeekSelector()}
            {selectedDays.length > 0 &&
                <React.Fragment>
                    {renderButtonsDeleteDay(selectedDays)}
                    {renderTimeSelector(selectedDays)}
                </React.Fragment>
            }
        </React.Fragment>
    );
}

export default TimeSelect;