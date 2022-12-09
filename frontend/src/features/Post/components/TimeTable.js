import React, {useState} from 'react';
import {Container, Grid, Typography} from "@mui/material";
import {daysOfWeek} from "../../../constants/userOptions";


TimeTable.propTypes = {

};

const hours = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]

const buttonStyles ={
    border:"solid 1px #ccc",
    cursor:"pointer",
    userSelect:"none",
    '&:hover':{
        bgcolor:"#333333",
        color:"#ffffff",
    }
}

function TimeTable(props) {

    const {times, setTimes} = props

    const [drag,setDrag] = useState(false)

    const handleToggle = (day,hour) =>{
        const idx = day.value*24 + hour
        setTimes(prev => {
            const value = prev[idx] === "0" ? "1" : "0"
            return [...prev.slice(0, idx), value , ...prev.slice(idx + 1)]
        })
    }

    const handleMouseOver = (day,hour) =>{
        if (drag){
            handleToggle(day,hour)
        }
    }

    const renderButtons = (day) =>{
        return (
            hours.map(hour =>{
                return (
                    <Grid key={hour} item width="4.166%"
                          sx={{
                                ...buttonStyles,
                              bgcolor:times[day.value*24 + hour] === "0" ? "#efefef" : "#43B14B",
                              color: times[day.value*24 + hour] === "0" ? "#bfbfbf" : "#ffffff",
                          }}
                          textAlign="center"
                          onMouseDown={(e) => handleToggle(day,hour)}
                          onMouseOver={(e) => handleMouseOver(day,hour)}
                    >
                        {hour.toString()}
                    </Grid>
                )
            })
        )
    }

    return (
        <Container onMouseDown={()=> setDrag(true)}
              onMouseUp={()=> setDrag(false)}
              onMouseLeave={()=> setDrag(false)} >
            {daysOfWeek.map (day=>{
                return(
                    <Grid item width="100%" container flexDirection="row" key={day.value}>
                        <Grid item width="15%">
                            <Typography>{day.title}</Typography>
                        </Grid>
                        <Grid container width="85%" item flexDirection="row">
                            {renderButtons(day)}
                        </Grid>
                    </Grid>
                )
            })}
        </Container>
    );
}

export default TimeTable;