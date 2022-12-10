import React from 'react';
import {Box, Grid, Link, Typography} from "@mui/material";
import {tutorLocation} from "../../../constants/value";
import {randomImage} from "../../../utils/randomUtils";
import {useNavigate} from "react-router-dom";
import {dynamicPath} from "../../../constants/router";
import UserAvatar from "../../../commons/UserAvatar/UserAvatar";
import {limitString} from "../../../utils/syntax";
import {getAvailableDay} from "../../../utils/availableTimeUtils";
import {convertProvinceCode} from "../../../utils/addressUtils";
import {app_colors} from "../../../constants/styles";


const AllTutorResult = (props) => {
    const navigate = useNavigate()

    const renderTutorItem = (tutor) => {
        console.log(tutor)
        const dayInWeek = getAvailableDay(tutor.availableTimes) || []
        const locations = (tutor.teachingLocations && tutor.teachingLocations.map(i => ({
            label: i.detail === tutorLocation.detail ? "Gia sư" : "Học viên",
            ...i
        }))) || []
        if (locations.length === 0) {
            locations.push({
                label: "Gia sư",
                province: "",
                district: "",
                ward: "",
                detail: ""
            })
        }
        const onClickShowDetailTutor = (e) => {
            navigate(dynamicPath.tutorDetail(tutor.id))
        }
        return (
            <Grid item container md={12} key={tutor.id} mb={3} p={2} bgcolor={app_colors._whiteText}>
                <Grid item container md={3} alignContent="baseline">
                    <Grid item md={12}>
                        <img src={randomImage(tutor.id)} alt="" width="100%"/>
                    </Grid>
                    <Grid item md={12}>
                        <Link
                            underline="none"
                            color={app_colors._whiteText}
                            fontWeight="medium"
                            fontFamily="Roboto"
                            variant="contained"
                            width="100%"
                            display="block"
                            height="32px"
                            textAlign="center"
                            lineHeight="32px"
                            borderRadius="2px"
                            mt={1}
                            onClick={onClickShowDetailTutor}
                            sx={{
                                backgroundColor: app_colors._primaryPurple,
                                cursor: "pointer",
                                '&:hover': {backgroundColor: app_colors._hoverPurple},
                            }}
                        >
                            Xem thêm
                        </Link>
                    </Grid>
                </Grid>
                <Grid item container md={9} pl={3} pr={2} alignContent="baseline">
                    <Grid item container md={12}>
                        <Grid item md={1} mt={0.5}>
                            <UserAvatar user={{avatar: tutor.avatar, fullname: tutor.fullname}}/>
                        </Grid>
                        <Grid item md={8.5} pl={2.5}>
                            <Typography variant="h7"
                                        fontWeight="bold">{limitString(tutor.fullname, tutor.username, 50)}</Typography>
                            <br/>
                            <span color={app_colors._primaryGrey}
                                  style={{fontSize: "14px"}}>
                            {tutor.address?convertProvinceCode(tutor.address.province):"Chưa cập nhật" }
                        </span>
                        </Grid>
                        {/*<Grid item md={2.5}>*/}
                        {/*        <span color={app_colors._primaryGrey}*/}
                        {/*              style={{fontSize: "16px", display: "inline-block", float: "right"}}>Học phí</span>*/}
                        {/*    <br/>*/}
                        {/*    <Typography variant="h7" fontWeight="bold" color={app_colors._blueText}*/}
                        {/*                style={{float: "right"}}>{post.fee}₫/hr</Typography>*/}
                        {/*</Grid>*/}
                    </Grid>
                    <Grid item container md={12} alignContent="baseline">
                        <Grid item md={12} mt={2}>
                            <span style={{fontWeight: "bold", fontSize: "14px", display: "inline-block", width: "80px"}}>Thời gian </span>
                            {dayInWeek.map(day => {
                                return <Box component="span" mr={1} key={day.code}
                                            sx={{
                                                p: 0.25,
                                                display: "inline-block",
                                                textAlign: "center",
                                                width: "45px",
                                                height: "30px",
                                                lineHeight: "24px",
                                                fontSize: "14px",
                                                border: day.available ? '1px solid  #D3E7E1' : '1px solid  #EEEEEE',
                                                borderRadius: "2px",
                                                bgcolor: day.available ? "#F0FAF7" : "#F7F8FC",
                                                color: day.available ? "#2C7B71" : "#9495B8",
                                            }}>{day.code}</Box>
                            })}
                        </Grid>
                        <Grid item md={12} mt={2}>
                            <span style={{fontWeight: "bold", fontSize: "14px", display: "inline-block", width: "80px"}}>Địa điểm</span>
                            {locations.map((location, idx) => {
                                return <Box component="span" mr={1} key={idx} sx={{
                                    p: 0.25,
                                    display: "inline-block",
                                    textAlign: "center",
                                    width: "100px",
                                    height: "34px",
                                    lineHeight: "30px",
                                    bgcolor: "#F7F8FC",
                                    color: "#1C1C1C",
                                    border: "1px solid  #EEEEEE",
                                }}>
                                    {location.label}
                                </Box>
                            })}
                        </Grid>
                        {/*<Grid item md={6} mt={2}>*/}
                        {/*    <span style={{fontWeight: "bold", fontSize: "14px", display: "inline-block", width: "80px"}}>Môn học</span>*/}
                        {/*    <Typography variant="h7" fontWeight="bold">{post.subject.name}</Typography>*/}
                        {/*</Grid>*/}
                        {/*<Grid item md={6} mt={2}>*/}
                        {/*    <span style={{fontWeight: "bold", fontSize: "14px", display: "inline-block", width: "80px"}}>Học viên</span>*/}
                        {/*    <Typography variant="h7">{post.noStudents || 1}</Typography>*/}
                        {/*</Grid>*/}
                        <Grid item md={12} mt={2}>
                            {tutor.subjects && tutor.subjects.map(subject =>
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
                                     }}>{subject.name}</Box>)}
                        </Grid>
                        <Grid item md={12} mt={2}>
                            {/*<span style={{fontWeight: "bold", fontSize: "14px"}}>Mô tả</span>*/}
                            {/*<br/>*/}
                            <div style={{textAlign: "justify", color: "#756E67"}}>
                                {limitString(tutor.description, "Gia sư hiện chưa để lại mô tả", 200)}
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }

    const tutors = props.tutors
    console.log(tutors)
    return <Grid container>
        {tutors && tutors.map(tutor => renderTutorItem(tutor))}
    </Grid>
}
export default AllTutorResult;