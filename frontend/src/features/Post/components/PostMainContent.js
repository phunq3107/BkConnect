import React from 'react';
import PropTypes from 'prop-types';
import constants, {
    app_colors,
    app_fonts,
    daysOfWeek,
    lessonTime,
    studentLocation,
    subjectLevels,
    tutorLocation
} from "../../../constants";
import PostHeader from "./PostHeader";
import {Button, Divider, Grid, Typography} from "@mui/material";
import PostDescription from "./PostDescription";
import {
    AccessTime,
    CheckCircle,
    DateRange,
    EventAvailable,
    Flag,
    LocationOn,
    Man,
    MenuBook,
    People,
    School,
    Update,
    Wc,
    Woman
} from "@mui/icons-material";
import dayjs from "dayjs";
import convertAddress from "../../../utils/addressUtils";
import listAddresses from "../../../assets/vietnam_province.json";
import {useSelector} from "react-redux";
import {getAllAvailableTimes} from "../../../utils/availableTimeUtils";

PostMainContent.propTypes = {
    post: PropTypes.object
};

function PostMainContent(props) {
    const post = props.post

    const currentUser = useSelector(state => state.session.currentUser)

    const getGender = (gender) => {
        if (gender === null){
            return "Nam/nữ"
        }
        return gender.toLowerCase() === 'male' ? 'Nam' : gender.toLowerCase() === 'female' ? 'Nữ' : 'Nam/nữ'
    }

    const getLessonTime = (time) => {
        return lessonTime.find(t => t.value === time).title
    }

    const getLevel = (level) => {
        if (level === null || level.toLowerCase() === 'all')
            return "Tất cả trình độ"
        return subjectLevels.find(l => l.value === post.level).title
    }

    const getAgeRange = (age) => {
        if (age == null || age === 'all')
            return "Tất cả"
        const arr = age.split(',')

        if (arr.length === 1 || arr[0] === arr[1]){
            return arr[0] + " tuổi"
        }
        return arr[0] + " đến " + arr[1] + " tuổi"
    }

    const getNoStudents = (noStudents) =>{
        if (noStudents === null){
            return 'Chưa cập nhật'
        }
        const arr = noStudents.split(',')
        if (arr.length === 1 || arr[0] === arr[1]){
            return arr[0] + " học viên"
        }
        return arr[0] + " đến " + arr[1] + " học viên"
    }

    const renderEnrollButton = () => {
        if (currentUser == null || currentUser.role.toUpperCase() !== constants.ROLE_TUTOR){
            return(<></>)
        }
            return(
                <Grid item>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: app_colors._primaryPurple,
                            '&:hover': {backgroundColor:app_colors._hoverPurple,},
                            fontFamily: app_fonts._primaryFont,
                            fontWeight: "bold"
                        }}
                        onClick = {props.handleEnroll}
                    >
                        Nhận lớp
                    </Button>
                </Grid>
            )
    }

    const renderLocation = (locations) => {
        if (locations === null || locations.length === 0){
            return (
                <Grid item container width="100%" px="1%">
                    <Grid item container flexDirection="row" width="100%">
                        <Typography fontSize="small"> Chưa cập nhật</Typography>
                    </Grid>
                </Grid>
            )
        }
        return(
            <Grid item container width="100%" px="1%">
                {
                    locations.map((location, idx) => {
                        if (JSON.stringify(location) === JSON.stringify(tutorLocation)) {
                            return (
                                <Grid key={idx} item container flexDirection="row" width="100%">
                                    <CheckCircle fontSize="small"/>
                                    <Typography fontSize="small"> Địa chỉ gia sư</Typography>
                                </Grid>
                            )
                        }
                        if (JSON.stringify(location) === JSON.stringify(studentLocation)) {
                            return (
                                <Grid key={idx} item container flexDirection="row" width="100%">
                                    <CheckCircle fontSize="small"/>
                                    <Typography fontSize="small">Địa chỉ học viên</Typography>
                                </Grid>
                            )
                        }
                        return (<React.Fragment key={idx}></React.Fragment>)
                    })
                }
                {   locations.map((location,idx) => {
                        if (JSON.stringify(location) === JSON.stringify(studentLocation)
                            || JSON.stringify(location) === JSON.stringify(tutorLocation)){
                            return (<React.Fragment key={idx}></React.Fragment>)
                        }
                        return (
                            <Grid key={idx} item container flexDirection="row" width="100%">
                                <CheckCircle fontSize="small"/>
                                <Typography fontSize="small">{convertAddress(listAddresses,location)}</Typography>
                            </Grid>
                        )
                    })
                }
            </Grid>
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


    const renderAvailableTime = (availableTimeStr) => {
        const res = getAllAvailableTimes(availableTimeStr)
        return(
            <Grid item container width="100%" px="1%">
                {
                    res.map((day,idx) => {
                        if (day.length > 0){
                            return (
                                <Grid  key={idx} item container flexDirection="row" width="100%" columnGap="3%">
                                    <Grid item container flexDirection="row" width="13%">
                                        <CheckCircle sx={{color:"#22C45D"}} fontSize="small"/>
                                        <Typography  fontSize="small">
                                            {daysOfWeek.find(d => d.value === idx.toString()).title}
                                        </Typography>
                                    </Grid>

                                            {getTimeSlots(day).map((timeSlot,idx) => {
                                                return (
                                                    <Grid item key={idx}
                                                          sx={{bgcolor:"#f0faf7", borderColor:"#dcede8", p:0.5}}
                                                          border={1}
                                                          borderRadius={1}
                                                          width="10%"
                                                          textAlign="center"
                                                    >
                                                        <Typography fontSize="small" sx={{color:"#2c7b63"}}>{timeSlot}</Typography>
                                                    </Grid>
                                                )
                                            })}
                                </Grid>
                            )
                        }
                        return (<React.Fragment key={idx}></React.Fragment>)
                    })
                }
            </Grid>
        )
    }
    return (
        <Grid
            item
            xs={12}
            sm={4}
            md={7.5}
            sx={{py:2,bgcolor: app_colors._whiteText, px:2}}
            boxShadow={3}
            borderRadius={1}
            container
            rowGap="2%"
            mb="5%"
            height="max-content"
            minHeight="90vh"
        >
            <PostHeader author={post.createBy}/>
            <Grid item width="100%" mt="2%"><Divider sx={{mx:-2}}/></Grid>
            <PostDescription content={post.description ? post.description : ""} title={post.title ? post.title : ""}/>

            <Grid item container flexDirection="row" width="100%" columnGap="3%" mt="2%">
                <Grid item container flexDirection="row" width="30%" alignItems="center">
                    <MenuBook/>
                    <Typography variant="subtitle2">
                        <strong>Môn học: </strong>{post.subject.name}
                    </Typography>
                </Grid>
                <Grid container flexDirection="row" item width="30%" alignItems="center">
                    <DateRange/>
                    <Typography variant="subtitle2" >
                        <strong>Số buổi học: </strong>{post.timesPerWeek} buổi/tuần
                    </Typography>
                </Grid>
                <Grid item container flexDirection="row" width="30%" alignItems="center">
                    <AccessTime/>
                    <Typography variant="subtitle2">
                        <strong>Thời lượng: </strong>{getLessonTime(post.hoursPerLesson)}
                    </Typography>
                </Grid>
            </Grid>

            <Grid item container flexDirection="row" width="100%" columnGap="3%" mt="2%">
                <Grid item container flexDirection="row" width="30%" alignItems="center">
                    {post.gender === 'male' ? <Man/> : post.gender ==='female' ? <Woman/> : <Wc/>}
                    <Typography variant="subtitle2">
                        <strong>Gia sư: </strong>{getGender(post.gender)}
                    </Typography>
                </Grid>
                <Grid container flexDirection="row" item width="30%" alignItems="center">
                    <School/>
                    <Typography variant="subtitle2" >
                        <strong>Trình độ: </strong>{getLevel(post.level)}
                    </Typography>
                </Grid>
                <Grid item container flexDirection="row" width="30%" alignItems="center">
                    <Flag/>
                    <Typography variant="subtitle2">
                        <strong>Độ tuổi: </strong>{getAgeRange(post.age)}
                    </Typography>
                </Grid>
            </Grid>

            <Grid item container flexDirection="row" width="100%" columnGap="3%" mt="2%">
                <Grid item container flexDirection="row" width="30%" alignItems="center">
                    <People/>
                    <Typography variant="subtitle2">
                        <strong>Số học viên: </strong>{getNoStudents(post.noStudents)}
                    </Typography>
                </Grid>
                {post.isGroup &&
                    <Grid item container flexDirection="row" width="30%" alignItems="center">
                        <CheckCircle/>
                        <Typography variant="subtitle2">
                            Tìm nhóm
                        </Typography>
                    </Grid>}
                <Grid item container flexDirection="row" width="max-content" alignItems="center">
                    <Update/>
                    <Typography variant="subtitle2">
                        <strong>Cập nhật lần cuối: </strong>
                        {post.lastUpdate ? dayjs(post.lastUpdate).format('HH:MM DD/MM/YYYY') : "Không xác định"}
                    </Typography>
                </Grid>
            </Grid>

            <Grid item container width="100%" mt="2%">
                <LocationOn/>
                <Typography variant="subtitle2">
                    <strong>Địa điểm: </strong>
                </Typography>
                {renderLocation(post.location)}
            </Grid>

            <Grid item container width="100%" mt="2%">
                <EventAvailable/>
                <Typography variant="subtitle2">
                    <strong>Thời gian có thể học: </strong>
                </Typography>
                {renderAvailableTime(post.availableTime)}
            </Grid>

            <Grid width="100%" item container flexDirection="row" columnGap="5%" justifyContent="end" marginTop="auto">
                {renderEnrollButton()}
            </Grid>
        </Grid>
    );
}

export default PostMainContent;