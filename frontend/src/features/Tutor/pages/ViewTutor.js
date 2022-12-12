import React, {useEffect, useState} from 'react';
import {Box, Button, CssBaseline, Divider, Grid, Typography} from "@mui/material";
import Header from "../../../commons/Header";
import {studentLocation, tutorLocation} from "../../../constants/value";
import UserAvatar from "../../../commons/UserAvatar/UserAvatar";
import {CheckCircle, FavoriteBorder, LocationOn, Man, Paid, School, Woman} from "@mui/icons-material";
import convertAddress from "../../../utils/addressUtils";
import {getAllAvailableTimes} from "../../../utils/availableTimeUtils";
import tutorApi from "../../../apis/tutorApi";
import {useParams} from "react-router-dom";
import {HandleResponse} from "../../../utils/ResponseHandler";
import {setSessionError} from "../../Auth/sessionSlice";
import {daysOfWeek, subjectLevels} from "../../../constants/userOptions";
import {app_colors, app_fonts} from "../../../constants/styles";

ViewTutor.propTypes = {

};

function ViewTutor(props) {

    const [tutor,setTutor] = useState(null)
    const {id} = useParams()

    useEffect(()=>{
        tutorApi.getById(id).then(
            res =>{
                const data=HandleResponse(res, setSessionError)
                setTutor(data)
            }
        ).catch(err=>console.log(err))
    },[])

    const getGender = (g) => {
        if (g.toUpperCase() === 'MALE'){
            return (
                <>
                    <Grid item>
                        <Man/>
                    </Grid>
                    <Grid item>
                        <Typography>Nam</Typography>
                    </Grid>
                </>

            )
        }
        if (g.toUpperCase() === 'FEMALE'){
            return (
                <>
                    <Grid item>
                        <Woman/>
                    </Grid>
                    <Grid item>
                        <Typography>Nữ</Typography>
                    </Grid>
                </>
            )
        }
        return (
            <Typography>Chưa cập nhật giới tính</Typography>
        )
    }

    const getTimeSlots = (day) =>{
        let res=[]
        for (let i = 0; i< day.length; i++){
            const times = day[i].split(",")
            res.push(times[0] + "h đến " + (+times[1]+1) + "h")
        }
        return res
    }

    if (!tutor) return(
        <>
        </>
    )

    const renderLocation = (locations) => {
        return (
            <Grid item container width="100%" px="1%">
                {
                    locations.map((location, idx) => {
                        if (JSON.stringify(location) === JSON.stringify(tutorLocation)) {
                            return (
                                <Grid item width="100%" key={idx}>
                                    <Typography style={{overflowWrap:'break-word'}} variant="subtitle2">
                                        <LocationOn sx={{color:"#FA9D3E"}}/>
                                        Địa chỉ gia sư
                                    </Typography>
                                </Grid>
                            )
                        }
                        if (JSON.stringify(location) === JSON.stringify(studentLocation)) {
                            return (
                                <Grid item width="100%" key={idx}>
                                    <Typography style={{overflowWrap:'break-word'}} variant="subtitle2">
                                        <LocationOn sx={{color:"#FA9D3E"}}/>
                                        Địa chỉ học viên
                                    </Typography>
                                </Grid>
                            )
                        }
                        return (<></>)
                    })
                }
                {locations.map((location, idx) => {
                    if (JSON.stringify(location) === JSON.stringify(studentLocation)
                        || JSON.stringify(location) === JSON.stringify(tutorLocation)) {
                        return (<></>)
                    }
                    return (
                        <Grid item width="100%" key={idx}>
                            <Typography style={{overflowWrap:'break-word'}} variant="subtitle2">
                                <LocationOn sx={{color:"#FA9D3E"}}/>
                                {convertAddress(null, {...location,detail:null})}
                            </Typography>
                        </Grid>
                    )
                })
                }
            </Grid>
        )
    }
    const renderAvailableTime = (availableTimeStr) => {
        const res = getAllAvailableTimes(availableTimeStr)
        return(
            <Grid width="100%" item container height="fit-content" mx="2%" p="1%">
                {
                    res.map((day,idx) => {
                        if (day.length > 0){
                            return (
                                <Grid  key={idx} item container flexDirection="row" width="100%" p="0.5%" columnGap="3%">
                                    <Grid item container flexDirection="row" width="13%">
                                        <CheckCircle sx={{color:"#22C45D"}} fontSize="small"/>
                                        <Typography  fontSize="small">
                                            {daysOfWeek.find(d => d.value === idx.toString()).title}
                                        </Typography>
                                    </Grid>
                                    {
                                        getTimeSlots(day).map((timeSlot,idx) => {
                                            return (
                                                <Grid item key={idx}
                                                      sx={{bgcolor:"#f0faf7", borderColor:"#dcede8", p:0.5}}
                                                      border={1}
                                                      borderRadius={1}
                                                      width="11%"
                                                      textAlign="center"
                                                >
                                                    <Typography fontSize="small" sx={{color:"#2c7b63"}}>{timeSlot}</Typography>
                                                </Grid>
                                            )
                                        })
                                    }
                                </Grid>
                            )
                        }
                        return (<></>)
                    })
                }
            </Grid>
        )
    }

    return (
        <Box>
            <CssBaseline/>
            <Header/>

            <Grid container component="main" sx={{bgcolor: app_colors._primaryBackground, minHeight:'90vh' }} pt={6}>

                <Grid item md={1}/>

                <Grid
                    item
                    xs={12}
                    sm={4}
                    md={7.5}
                    container
                >
                    <Grid item width="100%"
                          sx={{py:2,bgcolor: app_colors._whiteText, px:"2%", maxHeight:"31.5vh"}}
                          boxShadow={3}
                          borderRadius={1}
                          height="35%"
                          mb="5%"
                    >
                        <Grid container item width="100%" flexDirection="row" height="75%" columnGap="2%">
                            <Grid item width="18%" height="100%">
                                <UserAvatar user={{fullname:tutor.fullname, avatar:tutor.avatar}} width="100%" height="100%"/>
                            </Grid>
                            <Grid width="80%" item container alignItems="space-between">
                                <Grid item width="100%">
                                    <Typography fontWeight="bold" variant="h6">{
                                        tutor.fullname}
                                    </Typography>
                                </Grid>
                                <Grid item width="100%">
                                    <Typography variant="subtitle2" sx={{color:app_colors._primaryGrey}}>
                                        {tutor.username}
                                    </Typography>
                                </Grid>
                                <Grid item container width="100%" flexDirection="row">
                                    <Grid item container flexDirection="row" width="20%">
                                        {getGender(tutor.gender)}
                                    </Grid>
                                    <Grid item container flexDirection="row" width="auto">
                                        <Grid item>
                                            <LocationOn sx={{color:"#FA9D3E"}}/>
                                        </Grid>
                                        <Grid item>
                                            <Typography>
                                                {convertAddress(null, {...tutor.address,detail:null})}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item width="100%">
                                    <Typography variant="subtitle2" sx={{color:app_colors._primaryGrey}}>
                                        Môn học giảng dạy
                                    </Typography>
                                </Grid>
                                <Grid item width="100%" container flexDirection="row" columnGap="1%">
                                    {
                                        tutor.subjects.map(subject =>
                                            <Box component="span" mr={1} key={subject.id}
                                                 sx={{
                                                     py:0,
                                                     px:1.5,
                                                     display: "inline-block",
                                                     textAlign: "center",
                                                     fontWeight:"600",
                                                     height: "24px",
                                                     lineHeight: "24px",
                                                     fontSize: "14px",
                                                     border:  '1px solid #EEEEEE',
                                                     borderRadius: "2px",
                                                     bgcolor:"#F7F7F7",
                                                     color:  "#9D9D9D",
                                                 }}>{subject.name}</Box>)
                                    }
                                </Grid>
                            </Grid>
                        </Grid>
                        <Divider sx={{mx:-2, mt:"1.5%", borderStyle:'dashed'}} />
                        <Grid container item width="100%" flexDirection="row" height="25%" columnGap="3%"
                              justifyContent="end" alignItems="center">
                            <Grid item>
                                <Button> <FavoriteBorder/>Lưu</Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: app_colors._primaryPurple,
                                        '&:hover': {backgroundColor:app_colors._hoverPurple,},
                                        fontFamily: app_fonts._primaryFont,
                                        fontWeight: "bold"
                                    }}
                                >
                                   Gửi yêu cầu
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item width="100%"
                          sx={{py:2,bgcolor: app_colors._whiteText, px:"3%"}}
                          boxShadow={3}
                          borderRadius={1}
                          container
                          alignContent="baseline"
                          rowGap="2%"
                          mb="10%"
                    >
                        <Grid item width="100%" container alignItems="center">
                            <Typography>Thông tin</Typography>
                        </Grid>
                        <Grid item width="100%">
                            <Divider sx={{mx:"-3%"}}/>
                        </Grid>
                        <Grid container item width="100%" mt="2%">
                            <Grid item>
                                <Typography fontWeight="bold" variant="h6">Giới thiệu</Typography>
                            </Grid>
                            <Grid width="100%" item>
                                <Typography
                                    dangerouslySetInnerHTML={{__html:tutor.selfDescription ? tutor.selfDescription : ""}}
                                    style={{overflowWrap:'break-word'}}
                                />
                            </Grid>
                            <Grid item width="100%" mt="5%">
                                <Divider/>
                            </Grid>
                        </Grid>

                        <Grid container item width="100%" mt="2%">
                            <Grid item>
                                <Typography fontWeight="bold" variant="h6">Giảng dạy</Typography>
                            </Grid>
                            <Grid width="100%" item container height="fit-content" mx="2%" p="1%">
                                {
                                    tutor.subjects.map((subject,idx) =>{
                                        return(
                                            <Grid key={idx} item container flexDirection="row" width="100%">
                                                <Grid item width="30%">
                                                    <Box component="span" mr={1} key={subject.id}
                                                         sx={{
                                                             py:0,
                                                             px:1.5,
                                                             display: "inline-block",
                                                             textAlign: "center",
                                                             fontWeight:"600",
                                                             height: "24px",
                                                             lineHeight: "24px",
                                                             fontSize: "14px",
                                                             border:  '1px solid #EEEEEE',
                                                             borderRadius: "2px",
                                                             bgcolor:"#F7F7F7",
                                                             color:  "#9D9D9D",
                                                         }}>{subject.name}</Box>
                                                </Grid>
                                                <Grid item width="40%" container flexDirection="row">
                                                    <Grid item width="fit-content">
                                                        <School sx={{color:"#999999"}}/>
                                                    </Grid>
                                                    <Grid item width="22%">
                                                        <Typography sx={{color:"#999999"}}>
                                                            <strong>Trình độ:</strong>
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography>
                                                            {subjectLevels.find(l=> l.value === subject.level).title}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid item width="30%" container flexDirection="row">
                                                    <Grid item width="fit-content">
                                                        <Paid fontSize="small" sx={{color:"#999999"}}/>
                                                    </Grid>
                                                    <Grid item width="27%">
                                                        <Typography sx={{color:"#999999"}}>
                                                            <strong>Học phí:</strong>
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item width="fit-content">
                                                        <Typography>
                                                            {subject.expectedFee && subject.expectedFee > 0 ?
                                                                subject.expectedFee + " VNĐ/buổi" :
                                                                "Thỏa thuận"}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        )
                                    })
                                }
                            </Grid>
                            <Grid item width="100%" mt="5%">
                                <Divider/>
                            </Grid>
                        </Grid>

                        <Grid container item width="100%" mt="2%">
                            <Grid item>
                                <Typography fontWeight="bold" variant="h6">Thời gian có thể dạy</Typography>
                            </Grid>
                            <Grid width="100%" item container mx="2%">
                                {renderAvailableTime(tutor.availableTimes)}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item md={0.2}/>

                <Grid
                    container
                    item
                    xs={false}
                    sm={8} md={2.3}
                    sx={{bgcolor: app_colors._whiteText}}
                    height="fit-content"
                    borderRadius={1}
                    flexDirection="column"
                    alignItems="center"
                    boxShadow={3}
                    py={2}
                    px="1%"
                    rowGap={2}
                >
                    <Grid item>
                        <Typography>Gửi yêu cầu để liên lạc với gia sư!</Typography>
                    </Grid>
                    {
                       renderLocation(tutor.teachingLocations)
                    }
                </Grid>
            </Grid>
        </Box>
    );
}

export default ViewTutor;