import React, {useEffect, useState} from 'react';
import postApi from "../../../apis/postApi";
import {HandleResponse} from "../../../utils/ResponseHandler";
import {setSessionError} from "../../Auth/sessionSlice";
import {useNavigate, useParams} from "react-router-dom";
import {Box, Button, CssBaseline, Divider, Grid, IconButton, Popover, Typography} from "@mui/material";
import Header from "../../../commons/Header";
import constants, {app_colors, app_paths, states} from "../../../constants";
import PostMainContent from "../components/PostMainContent";
import UserAvatar from "../../../commons/Header/UserAvatar";
import {useSelector} from "react-redux";
import {Check, Clear, Pending} from "@mui/icons-material";

function ViewPost(props) {

    const {id} = useParams()
    const postId = id
    const [post,setPost] = useState(null)
    const [recommend,setRecommend] = useState(null)
    const [enrollTutors,setEnrollTutors] = useState(null)
    const [anchorEl, setAnchorEl] = useState(null);
    const [reload,setReload] = useState(false)

    const handleHover = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const popId = open ? 'simple-popover' : undefined;

    const navigate = useNavigate()

    const currentUser = useSelector(state => state.session.currentUser)

    const handleEnroll = () =>{
        postApi.createRequest(postId,null).then(
            res => {
                const data = HandleResponse(res,setSessionError)
                if (data){
                    alert("Đăng ký nhận lớp thành công")
                }
            }
        )
    }

    const handleApproveRequest = (postId,tutorId) => {
        postApi.approveRequest(post.id,tutorId).then(
            res => {
                const data = HandleResponse(res,setSessionError)
                if (data) {
                    alert("Đã chấp thuận yêu cầu")
                    setReload(prev => !prev)
                }
            }
        ).catch(err => console.log(err))
    }

    const handleRejectRequest = (postId,tutorId) => {
        postApi.rejectRequest(postId,tutorId).then(
            res => {
                const data = HandleResponse(res,setSessionError)
                if (data) {
                    alert("Đã từ chối yêu cầu")
                    setReload(prev => !prev)
                }
            }
        ).catch(err => console.log(err))
    }

    const handleCreateBooking = (postId,tutorId) => {
        postApi.createRequest(postId,tutorId).then(
            res => {
                const data = HandleResponse(res,setSessionError)
                if (data) {
                    alert("Đã gửi yêu cầu đến gia sư")
                    setReload(prev => !prev)
                }

            }
        ).catch(err => console.log(err))
    }

    const handleCancelBooking = (postId,tutorId) => {
        postApi.cancelRequest(postId,tutorId).then(
            res => {
                const data = HandleResponse(res,setSessionError)
                if (data) {
                    alert("Đã hủy yêu cầu")
                    setReload(prev => !prev)
                }
            }
        ).catch(err => console.log(err))
    }

    const handleViewTutorInfo = (tutorId) => {
        navigate(app_paths.viewTutorInfo + `/${tutorId}`)
    }

    const renderRequestState = (request) => {
        if (!request || !request.state || !request.requester){
            return(<></>)
        }
        if (request.state === states.CANCEL){
            return(
                <Grid item width="100%" container flexDirection="row">
                    <Grid item width="100%">
                        <Typography color="black" variant="caption">Đã hủy yêu cầu</Typography>
                    </Grid>
                </Grid>
            )
        }
        if (request.state === states.CREATE){
            if (request.requester === constants.ROLE_STUDENT){
                return(
                    <Grid item width="100%" container flexDirection="row">
                       <Grid item width="100%">
                           <IconButton
                               onClick={()=>handleCancelBooking(postId,request.tutor.id)}
                               size="small"
                           >
                               <Clear sx={{color:"#F63F3F"}}/>
                               <Typography color="black" variant="caption">Hủy yêu cầu</Typography>
                           </IconButton>
                       </Grid>
                    </Grid>
                )
            }
            if (request.requester === constants.ROLE_TUTOR){
                return(
                    <Grid item width="100%" container flexDirection="row">
                        <Grid item width="55%">
                            <IconButton
                                onClick={()=>handleApproveRequest(postId,request.tutor.id)}
                                size="small"
                            >
                                <Check sx={{color:"#86DFA6"}}/>
                                <Typography color="black" variant="caption">Chấp thuận</Typography>
                            </IconButton>
                        </Grid>
                        <Grid item width="45%">
                            <IconButton
                                onClick={()=>handleRejectRequest(postId,request.tutor.id)}
                                size="small"
                            >
                                <Clear sx={{color:"#F63F3F"}}/>
                                <Typography color="black" variant="caption">Từ chối</Typography>
                            </IconButton>
                        </Grid>
                    </Grid>
                )
            }
        }
        if (request.state === states.APPROVE){
            if (request.requester === constants.ROLE_TUTOR){
                return (
                    <Grid item width="100%" container flexDirection="row">
                        <Grid item width="100%">
                            <Typography color="black" variant="caption">Gia sư đã được chấp thuận</Typography>
                        </Grid>
                    </Grid>
                )
            }
            if (request.requester === constants.ROLE_STUDENT){
                return (
                    <Grid item width="100%" container flexDirection="row">
                        <Grid item width="100%">
                            <Typography color="black" variant="caption">Gia sư đã chấp thuận</Typography>
                        </Grid>
                    </Grid>
                )
            }
        }
        if (request.state === states.REJECT){
            if (request.requester === constants.ROLE_TUTOR){
                return (
                    <Grid item width="100%" container flexDirection="row">
                        <Grid item width="100%">
                            <Typography color="black" variant="caption">Đã từ chối gia sư</Typography>
                        </Grid>
                    </Grid>
                )
            }
            if (request.requester === constants.ROLE_STUDENT){
                return (
                    <Grid item width="100%" container flexDirection="row">
                        <Grid item width="100%">
                            <Typography color="black" variant="caption">Gia sư đã từ chối</Typography>
                        </Grid>
                    </Grid>
                )
            }
        }
    }

    const renderEnrollTutors = (enrollTutors) => {
        if (enrollTutors.length === 0){
            return(
                <Grid container item width="100%">
                    <Grid item container width="100%" flexDirection="row" alignItems="center" columnGap="3%" px="8%">
                        <Pending fontSize="small"/>
                        <Typography variant="caption">
                            Chưa có gia sư nhận lớp
                        </Typography>
                    </Grid>
                </Grid>
            )
        }
        return(
            enrollTutors.map((enrollTutor, idx) => {
                return (
                    <Grid container item width="100%" key={idx} sx={{'&:hover':{bgcolor:'#e1e1e1'}}}>
                        <Grid item container flexDirection="row" width="100%" alignItems="center" columnGap="3%" px="8%" py="3%">
                            <Grid item width="20%">
                                <UserAvatar user={enrollTutor.tutor}/>
                            </Grid>
                            <Grid item container width="77%">
                                <Grid item width="100%">
                                    <Typography
                                        sx={{cursor:"pointer"}}
                                        onClick={()=>handleViewTutorInfo(enrollTutor.tutor.id)}
                                        variant="subtitle2"
                                    >
                                        {enrollTutor.tutor.fullname}
                                    </Typography>
                                </Grid>
                                {renderRequestState(enrollTutor)}
                            </Grid>
                        </Grid>
                        <Grid item width="100%">
                            <Divider/>
                        </Grid>
                    </Grid>
                )
            })
        )
    }

    const renderRecommendations = (recommends) => {
        if (recommends.length === 0){
            return (
                <Grid container flexDirection="row" item width="100%" alignItems="center" columnGap="3%" px="8%">
                    <Pending fontSize="small"/>
                    <Typography variant="caption"
                    >
                        Chưa tìm thấy đề xuất phù hợp cho bạn
                    </Typography>
                </Grid>
            )
        }
        let notMatchResults = []
        let matchResults = []
        for (const r of recommends){
            if (r.isMatch){
                matchResults.push(r)
            }
            else notMatchResults.push(r)
        }

        notMatchResults.sort((a, b) => (b.likelyRate - a.likelyRate))

        {
        return (
            <>
                <Grid item container width="100%">
                <Typography sx={{px:"5%"}}>Gia sư phù hợp</Typography>
                {
                    matchResults.length > 0 ?
                        matchResults.map((matchResult, idx) => {
                            return (
                                <Grid container item width="100%" key={idx} sx={{'&:hover':{bgcolor:'#e1e1e1'}}}>
                                    <Grid item container flexDirection="row" item width="100%" alignItems="center" columnGap="3%" px="8%">
                                        <Grid item width="20%">
                                            <UserAvatar user={matchResult.tutor}/>
                                        </Grid>
                                        <Grid item container width="77%">
                                            <Grid item width="100%">
                                                <Typography
                                                    sx={{cursor:"pointer"}}
                                                    onClick={()=>handleViewTutorInfo(matchResult.tutor.id)}
                                                    variant="subtitle2"
                                                >
                                                    {matchResult.tutor.fullname}
                                                </Typography>
                                            </Grid>
                                            <Grid item width="100%">
                                                <Button size="small"
                                                        sx={{color:app_colors._primaryGrey}}
                                                        onClick={()=>handleCreateBooking(postId,matchResult.tutor.id)}
                                                >Gửi yêu cầu
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid item width="100%">
                                        <Divider/>
                                    </Grid>
                                </Grid>
                            )
                    }):
                        <Grid container flexDirection="row" item width="100%" alignItems="center" columnGap="3%" px="8%">
                            <Typography variant="caption">
                                <Pending fontSize="small"/> Chưa tìm thấy gia sư phù hợp
                            </Typography>
                        </Grid>
                }
                 </Grid>
                <Grid item container width="100%">
                    <Typography sx={{px:"5%"}}>Đề xuất cho bạn</Typography>
                    {
                        notMatchResults.length > 0 ?
                            notMatchResults.map((notMatchResult, idx) => {
                                return (
                                    <Grid container item width="100%" key={idx} sx={{'&:hover':{bgcolor:'#e1e1e1'}}}>
                                        <Grid item container flexDirection="row" item width="100%" alignItems="center" columnGap="3%" px="8%">
                                            <Grid item width="20%">
                                                <UserAvatar user={notMatchResult.tutor}/>
                                            </Grid>
                                            <Grid item container width="77%">
                                                <Grid item width="100%">
                                                    <Typography
                                                        sx={{cursor:"pointer"}}
                                                        onClick={()=>handleViewTutorInfo(notMatchResult.tutor.id)}
                                                        variant="subtitle2"
                                                    >
                                                        {notMatchResult.tutor.fullname}
                                                    </Typography>
                                                </Grid>
                                                <Grid item width="100%">
                                                    <Button size="small"
                                                            sx={{color:app_colors._primaryGrey}}
                                                            onClick={()=>handleCreateBooking(postId,notMatchResult.tutor.id)}
                                                    >Gửi yêu cầu
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                        <Grid item width="100%">
                                            <Divider/>
                                        </Grid>
                                    </Grid>
                                )
                            }):
                            <Grid container flexDirection="row" item width="100%" alignItems="center" columnGap="3%" px="8%">
                                <Pending fontSize="small"/>
                                <Typography variant="caption">
                                    Chưa có gợi ý gia sư nào dành cho bạn
                                </Typography>
                            </Grid>
                    }
                </Grid>
            </>
        )
        }
    }

    useEffect(()=>{
        postApi.getById(postId).then(
            response => {
                const data = HandleResponse(response, setSessionError)
                if (data) {
                    setPost(data)
                }
                else {
                    navigate("/notfound")
                }
            }).catch(err => console.log(err))

    },[])

    useEffect(()=>{
        if (currentUser && post && currentUser.id === post.createBy.id){
            postApi.getRecommend(postId, 10, 1).then(
                response => {
                    const data = HandleResponse(response, setSessionError)
                    setRecommend(data)
                }
            ).catch(err => console.log(err))

            postApi.getEnrollTutors(postId,10,1).then(
                res => {
                    const data = HandleResponse(res, setSessionError)
                    setEnrollTutors(data)
                }).catch(err => console.log(err))
        }
    },[currentUser,post,reload])


    if (post === null){
        return (
            <>
            </>
        )
    }
    return (
        <Box>
            <CssBaseline/>
            <Header/>

            <Grid container component="main" height="fit-content" sx={{bgcolor: app_colors._primaryBackground, minHeight:'90vh' }} pt={6}>

                <Grid item md={1}/>

                <PostMainContent post={post} handleEnroll={handleEnroll}/>

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
                    rowGap={2}
                >
                    <Grid item container width="100%">
                        <Typography sx={{px:"5%"}}>Học viên tham gia</Typography>
                        {
                            post.attendees.map((user,idx) => {
                                return (
                                    <Grid container flexDirection="row" item width="100%" key={idx} alignItems="center" columnGap="3%" px="8%">
                                        <UserAvatar user={user}/>
                                        <Typography>{user.fullname ? user.fullname : "User"}</Typography>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                    {enrollTutors && enrollTutors.data &&
                        <Grid item container width="100%">
                            <Typography sx={{px:"5%"}}>Gia sư nhận lớp</Typography>
                            { renderEnrollTutors(enrollTutors.data)}
                        </Grid>
                    }
                    {recommend && recommend.data && renderRecommendations(recommend.data)}
                </Grid>
            </Grid>
            <Popover
                id={popId}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
            </Popover>
        </Box>
    );
}

export default ViewPost;