import React from 'react';
import PropTypes from 'prop-types';
import {Checkbox, Chip, FormControlLabel, Grid, MenuItem, Select, Stack, Typography} from "@mui/material";
import {daysOfWeek, timeSlots} from "../../../constants";

TimeSelect.propTypes = {
    selectedDays: PropTypes.arrayOf(PropTypes.object),
    setSelectedDays: PropTypes.func
};

function TimeSelect(props) {

    const selectedDays = props.selectedDays
    const setSelectedDays = props.setSelectedDays


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
                                    onChange={(e) => handleChangeTeachingTime(e,day)} name={timeSlot.value}/>
                            }
                            label={timeSlot.title}
                        />
                    )
                })}
            </>
        )
    }

    const handleChangeDays = (e) => {
        const idx = selectedDays.findIndex(day => day.value === e.target.value)
        if (idx < 0){
            const selectedDay = daysOfWeek.find(day => day.value === e.target.value)
            setSelectedDays(prev => [...prev,selectedDay])
        }
    }

    const handleDeleteDays = (deletedDay) => {
        setSelectedDays(prev => prev.filter(day => day.value !== deletedDay.value))
    }

    const handleChangeTeachingTime = (e,day) => {
        //TODO
    }


    return (
        <>
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

            {selectedDays.length > 0 &&
                <>
                    <Stack direction="row" spacing={1} mt={1}>
                        {selectedDays.map((day, idx) => {
                            return <Chip size="small" key={idx} label={day.title} onDelete={() => handleDeleteDays(day)}/>
                        })}
                    </Stack>

                    <Stack direction="column" spacing={1} mt={2}>
                        {selectedDays.map((day,idx) => {
                            return(
                                <Stack key={idx} direction="row" spacing={1} justifyContent="space-between">
                                    <Grid item>
                                        <Typography variant="h8" fontWeight="bold">{day.title}</Typography>
                                    </Grid>
                                    <Grid item>
                                        {renderTimeCheckboxes(day)}
                                    </Grid>
                                </Stack>
                            )
                        })}
                    </Stack>
                </>
            }
        </>
    );
}

export default TimeSelect;