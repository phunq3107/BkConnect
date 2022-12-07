import React from 'react';
import {Box, Grid, Link, Typography} from "@mui/material";
import constants, {app_colors, tutorLocation} from "../../../constants";
import {randomImage} from "../../../utils/randomUtils";
import {dynamicPath} from "../../../constants/router";
import UserAvatar from "../../../commons/Header/UserAvatar";
import {getAvailableDay} from "../../../utils/availableTimeUtils";
import {limitString} from "../../../utils/syntax";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";


const renderPostItem = (post) => {
    const user = useSelector(state => state.session.currentUser)
    let canJoin = (user && user.role === constants.ROLE_TUTOR) || post.isGroup
    const navigate = useNavigate()
    const dayInWeek = getAvailableDay(post.availableTime) || []
    const locations = post.location.map(i => ({
        label: i.detail === tutorLocation.detail ? "Gia sư" : "Học viên",
        ...i
    }))
    if (locations.length === 0) {
        locations.push({
            label: "Học viên",
            province: "",
            district: "",
            ward: "",
            detail: ""
        })
    }

    const onClickShowDetailPost = (e) => {
        navigate(dynamicPath.postDetail(post.id))
    }

    return (
        <Grid item container md={12} key={post.id} mb={3} p={2} bgcolor={app_colors._whiteText}>
            <Grid item container md={3} alignContent="baseline">
                <Grid item md={12}>
                    <img src={randomImage(post.id)} alt="" width="100%"/>
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
                        onClick={onClickShowDetailPost}
                        sx={{
                            backgroundColor: app_colors._primaryPurple,
                            cursor: "pointer",
                            '&:hover': {backgroundColor: app_colors._hoverPurple},
                        }}
                    >
                        Xem thêm
                    </Link>
                </Grid>
                {canJoin && <Grid item md={12}>
                    <Link
                        underline="none"
                        color="#999999"
                        fontWeight="medium"
                        fontFamily="Roboto"
                        // href={dynamicPath.postDetail(post.id)}
                        border="1px solid  #EEEEEE"
                        variant="contained"
                        width="100%"
                        display="block"
                        height="32px"
                        textAlign="center"
                        lineHeight="32px"
                        borderRadius="2px"
                        mt={1}
                        sx={{
                            backgroundColor: "#F7F8FC",
                            cursor: "pointer",
                            '&:hover': {backgroundColor: app_colors._hoverPurple, color: app_colors._whiteText},
                        }}
                    >
                        Tham gia
                    </Link>
                </Grid>}
            </Grid>
            <Grid item container md={9} pl={3} pr={2} alignContent="baseline">
                <Grid item container md={12}>
                    <Grid item md={1} mt={0.5}>
                        <UserAvatar user={{avatar: post.createBy.avatar, fullname: post.createBy.fullname}}/>
                    </Grid>
                    <Grid item md={8.5} pl={2.5}>
                        <Typography variant="h7"
                                    fontWeight="bold">{limitString(post.title, "Tìm gia sư", 50)}</Typography>
                        <br/>
                        <span color={app_colors._primaryGrey}
                              style={{fontSize: "14px"}}>
                            Người đăng: <Link href={dynamicPath.userDetail(post.createBy.id)}
                                              underline="hover">{post.createBy.fullname || post.createBy.username}</Link>
                        </span>
                    </Grid>
                    <Grid item md={2.5}>
                            <span color={app_colors._primaryGrey}
                                  style={{fontSize: "16px", display: "inline-block", float: "right"}}>Học phí</span>
                        <br/>
                        <Typography variant="h7" fontWeight="bold" color={app_colors._blueText}
                                    style={{float: "right"}}>{post.fee}₫/hr</Typography>
                    </Grid>
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
                        <span style={{fontWeight: "bold", fontSize: "14px", display: "inline-block", width: "80px"}}>Vị trí</span>
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
                    <Grid item md={6} mt={2}>
                        <span style={{fontWeight: "bold", fontSize: "14px", display: "inline-block", width: "80px"}}>Môn học</span>
                        <Typography variant="h7" fontWeight="bold">{post.subject.name}</Typography>
                    </Grid>
                    <Grid item md={6} mt={2}>
                        <span style={{fontWeight: "bold", fontSize: "14px", display: "inline-block", width: "80px"}}>Học viên</span>
                        <Typography variant="h7">{post.noStudents || 1}</Typography>
                    </Grid>
                    <Grid item md={12} mt={2}>
                        {/*<span style={{fontWeight: "bold", fontSize: "14px"}}>Mô tả</span>*/}
                        {/*<br/>*/}
                        <div style={{textAlign: "justify", color: "#756E67"}}>
                            {limitString(post.description, "Bài viết này không có mô tả", 200)}
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

function GetAllPostResult(props) {
    let posts = props.posts
    return <React.Fragment>
        <Grid container>
            {posts && posts.map(post => renderPostItem(post))}
        </Grid>
    </React.Fragment>
}

export default GetAllPostResult;