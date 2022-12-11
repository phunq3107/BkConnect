import React, {useEffect, useState} from 'react';
import {Box, CssBaseline, Divider, Grid, IconButton, Select, Typography} from "@mui/material";
import Header from "../../../commons/Header";
import {requestStates} from "../../../constants/value";
import AvatarCard from "../../User/components/AvatarCard";
import {useSelector} from "react-redux";

import {HandleResponse} from "../../../utils/ResponseHandler";
import UserAvatar from "../../../commons/UserAvatar/UserAvatar";
import {Check, Clear} from "@mui/icons-material";
import postApi from "../../../apis/postApi";
import {setSessionError} from "../../Auth/sessionSlice";
import dayjs from "dayjs";
import {getAllAvailableTimes} from "../../../utils/availableTimeUtils";
import tutorApi from "../../../apis/tutorApi";
import {setUserError} from "../../User/userSlice";
import {daysOfWeek, lessonTime} from "../../../constants/userOptions";
import {app_colors} from "../../../constants/styles";
import ResponseMessageModal from "../../../commons/Modal/ResponseMessageModal";


function TutorBookings(props) {
    const currentUser = useSelector(state => state.session.currentUser)
    const [bookings,setBookings] = useState(null)
    const [reload,setReload] = useState(false)
    const [responseMessage, setResponseMessage] = useState(null)

    useEffect(()=>{
        if(currentUser){
            tutorApi.getBookings(currentUser.id).then(
                response => {
                    const data = HandleResponse(response, setUserError)
                    setBookings(data)
                })
        }
    },[currentUser, reload])


    const renderListFields = (booking) => {

        const getNoStudentsValue = (noStudents) => {
            if (!noStudents){
                return ""
            }
            const [from,to] = noStudents.split(',')
            if (from === to)
                return from + " học viên"
            return from + " - " + to +  " học viên"
        }

        const  listFields = [
                {title: "Ngày tạo yêu cầu:", value:dayjs(booking.createTime).format('DD/MM/YYYY, HH:mm') },
                {title: "Môn học:", value: booking.post.subject.name},
                {title: "Số buổi học:", value: booking.post.timesPerWeek + " buổi/tuần"},
                {title: "Thời lượng buổi học:", value: lessonTime.find(l => l.value === booking.post.hoursPerLesson).title},
                {title: "Thời gian có thể học:", value: booking.post.availableTime},
                {title: "Số học viên:", value: getNoStudentsValue(booking.post.noStudents)},
                {title: "Mô tả thêm:", value: booking.post.description}
            ]
        return(
            <>
                {
                    listFields.map((field, idx) => {
                        return (
                            <Grid key={idx} item container flexDirection="row" width="100%" mt="2%">
                                <Grid item width="25%">
                                    <Typography sx={{color: "#575757"}} variant="subtitle2">{field.title}</Typography>
                                </Grid>
                                <Grid item width="75%" container flexDirection="row">
                                    {renderFieldContent(field)}
                                </Grid>
                            </Grid>
                        )
                    })
                }
            </>
        )
    }

    const renderFieldContent = (field) =>{
        if (field.title === "Mô tả thêm:"){
            return <Typography
                variant="subtitle2"
                style={{overflowWrap:'break-word'}}
                dangerouslySetInnerHTML={{__html:field.value ? field.value : ""}}
            />
        }
        if (field.title === "Thời gian có thể học:"){
            const timeSlots = getAllAvailableTimes(field.value)
            return(
                <>
                    {
                        timeSlots.map((timeSlot,idx)=>{
                            if(timeSlot.length > 0){
                                return(
                                    <Grid  key={idx} item container flexDirection="row" width="100%" columnGap="3%">
                                        <Grid item container flexDirection="row" width="13%">
                                            <Typography  fontSize="small">
                                                {daysOfWeek.find(d => d.value === idx.toString()).title}
                                            </Typography>
                                        </Grid>
                                        {timeSlot.map((hours,idx) => {
                                            return (
                                                <Grid item key={idx}
                                                      sx={{bgcolor:"#f0faf7", borderColor:"#dcede8", p:0.5}}
                                                      border={1}
                                                      borderRadius={1}
                                                      width="15%"
                                                      textAlign="center"
                                                >
                                                    <Typography fontSize="small" sx={{color:"#2c7b63"}}>
                                                        {hours.split(',')[0] + "h - " + (+hours.split(',')[1]+1) + "h"}
                                                    </Typography>
                                                </Grid>
                                            )
                                        })}
                                    </Grid>
                                )
                            }
                        })
                    }
                </>
            )
        }
        return (
            <Typography variant="subtitle2">{field.value ? field.value : "Chưa cập nhật"}</Typography>
        )
    }

    const handleApproveBooking = (post) => {
        postApi.approveRequest(post.id,null).then(
            res => {
                const data = HandleResponse(res,setSessionError)
                if (data) {
                    setResponseMessage(data)
                    setReload(prev => !prev)
                }
            }
        ).catch(err => console.log(err))
    }

    const handleRejectBooking = (post) => {
        postApi.rejectRequest(post.id,null).then(
            res => {
                const data = HandleResponse(res,setSessionError)
                if (data) {
                    setResponseMessage(data)
                    setReload(prev => !prev)
                }
            }
        ).catch(err => console.log(err))
    }

    const renderRequestState = (state,requester) =>{
        if (!state || !requester){
            return (<></>)
        }
        let title = ""
        let borderColor = ""
        if (state === requestStates.APPROVE){
            borderColor="#86DFA6"
            title="Đã chấp thuận"
        }
        if (state === requestStates.CREATE){
            borderColor="#1488db"
            title="Đang chờ"
        }
        if (state === requestStates.REJECT){
            borderColor="#F63F3F"
            title="Đã từ chối"
        }
        const res ={
            sx:{
                px:1,
                py:0.5,
                borderColor: borderColor
            },
            title:title
        }
        return (
            <Grid item
                  alignSelf="center"
                  width="max-content"
                  ml="4%"
                  sx={{...res.sx}}
                  border={1}
                  borderRadius={4}
            >
                <Typography fontSize="small">{res.title}</Typography>
            </Grid>
        )
    }

    const renderBookings = (bookings) => {
        if (!bookings){
            return
        }
        if (bookings.length === 0){
            return(
                <Grid item width="100%" mt="3%">
                    <Typography>Hiện tại chưa có yêu cầu nhận lớp nào</Typography>
                </Grid>
            )
        }
        return (
            <>

                {
                    bookings.map((booking,idx) =>{
                        return(
                            <>
                                <Grid item key={idx} width="100%" mt="3%" container mb="1%">
                                    <Grid item container flexDirection="row" width="100%" minHeight="20%">
                                        <Grid item container width="10%" height="100%">
                                            {booking.post.createBy && <UserAvatar user={booking.post.createBy} height="100%" width="100%"/>}
                                        </Grid>
                                        <Grid item container width="87%" ml="3%" flexDirection="row" height="100%">
                                            <Grid item alignSelf="center" width="max-content">
                                                <Typography variant="h8" fontWeight="bold">
                                                    {booking.post.createBy.fullname || booking.post.createBy.username}
                                                </Typography>
                                            </Grid>
                                            {renderRequestState(booking.state,booking.requester)}
                                            <Grid item marginLeft="auto" alignSelf="center">
                                                <Typography variant="h8" fontWeight="bold">
                                                    {booking.post.fee} VNĐ/buổi
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid item container width="100%">
                                        <Grid item container flexDirection="row" width="100%" mt="2%">
                                            {renderListFields(booking)}
                                        </Grid>
                                        <Grid item container flexDirection="row" width="100%" mt="2%" justifyContent="end">
                                            {booking.state === requestStates.CREATE &&
                                                <>
                                                    <Grid item>
                                                        <IconButton onClick={() => handleApproveBooking(booking.post)}>
                                                            <Check sx={{color: "#86DFA6"}}/>
                                                            <Typography color="black">Chấp thuận</Typography>
                                                        </IconButton>
                                                    </Grid>
                                                    <Grid item>
                                                        <IconButton onClick={()=>handleRejectBooking(booking.post)}>
                                                        <Clear sx={{color:"#F63F3F"}}/>
                                                        <Typography color="black">Từ chối</Typography>
                                                        </IconButton>
                                                    </Grid>
                                                </>
                                            }
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item width="100%" mt="3%">
                                    <Divider sx={{mx:"-4%"}}/>
                                </Grid>
                            </>
                        )
                    })
                }
            </>
        )
    }

    const handleCloseDialog = () => {
        setResponseMessage(null)
    }

    if (!bookings){
        return(
            <>
            </>
        )
    }
    return (
        <Box>
            <CssBaseline/>
            <Header/>
            <Grid container component="main" sx={{bgcolor: app_colors._primaryBackground, minHeight:'90vh' }} pt={6}>
                <Grid item md={1.5}/>

                {currentUser && <AvatarCard user={currentUser}/>}

                <Grid item md={0.5}/>

                <Grid
                    item
                    xs={12}
                    sm={4}
                    md={6.5}
                    sx={{py:"2%",bgcolor: app_colors._whiteText, px:"2%"}}
                    boxShadow={3}
                    borderRadius={1}
                    container
                    alignContent="baseline"
                    mb="10%"
                >
                    <Grid item width="100%" container flexDirection="row" justifyContent="center" height="max-content">
                        <Grid item width="50%" alignSelf="center">
                            <Typography variant="h7" fontWeight="bold">Yêu cầu nhận lớp</Typography>
                        </Grid>

                        <Grid item  alignSelf="center">
                            <Typography variant="h7" fontWeight="bold">Sắp xếp theo:</Typography>
                        </Grid>
                        <Grid item width="30%" ml="2%" height="max-content" alignSelf="center">
                            <Select fullWidth size="small" ></Select>
                        </Grid>
                    </Grid>

                    <Grid item width="100%" mt="3%">
                        <Divider sx={{mx:"-4%"}}/>
                    </Grid>

                    {renderBookings(bookings)}

                </Grid>
            </Grid>
            <ResponseMessageModal
                closeDialog={handleCloseDialog}
                responseMessage={responseMessage}
                open={responseMessage !== null}
            />
        </Box>
    );
}

export default TutorBookings;