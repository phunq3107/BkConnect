import React, {useEffect, useState} from 'react';
import postApi from "../../../apis/postApi";
import {HandleResponse} from "../../../utils/ResponseHandler";
import {setSessionError} from "../../Auth/sessionSlice";
import {useNavigate, useParams} from "react-router-dom";
import {
    Box,
    Button,
    CssBaseline,
    Divider,
    Fade,
    Grid,
    IconButton,
    styled,
    Tooltip,
    tooltipClasses,
    Typography
} from "@mui/material";
import Header from "../../../commons/Header";
import constants, {postStates, requestStates} from "../../../constants/value";
import PostMainContent from "../components/PostMainContent";
import UserAvatar from "../../../commons/UserAvatar/UserAvatar";
import {useSelector} from "react-redux";
import {Add, Check, Clear, Pending} from "@mui/icons-material";
import {app_colors} from "../../../constants/styles";
import {app_paths} from "../../../constants/router";
import ResponseMessageModal from "../../../commons/Modal/ResponseMessageModal";

const NoMaxWidthTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))({
    [`& .${tooltipClasses.tooltip}`]: {
        maxWidth: 'none',
    },
})

function ViewPost(props) {

    const {id} = useParams()
    const postId = id
    const [post,setPost] = useState(null)
    const [recommend,setRecommend] = useState(null)
    const [enrollTutors,setEnrollTutors] = useState(null)
    const [reload,setReload] = useState(false)
    const [responseMessage, setResponseMessage] = useState(null)

    const navigate = useNavigate()

    const currentUser = useSelector(state => state.session.currentUser)

    const handleCloseDialog = () => {
        setResponseMessage(null)
    }

    const handleEnroll = () =>{
        postApi.createRequest(postId,null).then(
            res => {
                const data = HandleResponse(res,setSessionError)
                if (data){
                    setResponseMessage(data)
                }
            }
        )
    }

    const handleApproveRequest = (postId,tutorId) => {
        postApi.approveRequest(post.id,tutorId).then(
            res => {
                const data = HandleResponse(res,setSessionError)
                if (data) {
                    setResponseMessage(data)
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
                    setResponseMessage(data)
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
                    setResponseMessage(data)
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
                    setResponseMessage(data)
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
        if (request.state === requestStates.CANCEL){
            return(
                <Grid item width="100%" container flexDirection="row">
                    <Grid item width="100%">
                        <Typography color="black" variant="caption">???? h???y y??u c???u</Typography>
                    </Grid>
                </Grid>
            )
        }
        if (request.state === requestStates.CREATE){
            if (request.requester === constants.ROLE_STUDENT){
                return(
                    <Grid item width="100%" container flexDirection="row">
                       <Grid item width="100%">
                           <IconButton
                               onClick={()=>handleCancelBooking(postId,request.tutor.id)}
                               size="small"
                           >
                               <Clear sx={{color:"#F63F3F"}}/>
                               <Typography color="black" variant="caption">H???y y??u c???u</Typography>
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
                                <Typography color="black" variant="caption">Ch???p thu???n</Typography>
                            </IconButton>
                        </Grid>
                        <Grid item width="45%">
                            <IconButton
                                onClick={()=>handleRejectRequest(postId,request.tutor.id)}
                                size="small"
                            >
                                <Clear sx={{color:"#F63F3F"}}/>
                                <Typography color="black" variant="caption">T??? ch???i</Typography>
                            </IconButton>
                        </Grid>
                    </Grid>
                )
            }
        }
        if (request.state === requestStates.APPROVE){
            if (request.requester === constants.ROLE_TUTOR){
                return (
                    <Grid item width="100%" container flexDirection="row">
                        <Grid item width="100%">
                            <Typography color="black" variant="caption">Gia s?? ???? ???????c ch???p thu???n</Typography>
                        </Grid>
                    </Grid>
                )
            }
            if (request.requester === constants.ROLE_STUDENT){
                return (
                    <Grid item width="100%" container flexDirection="row">
                        <Grid item width="100%">
                            <Typography color="black" variant="caption" fontWeight="bold">Gia s?? ???? ch???p thu???n</Typography>
                        </Grid>
                    </Grid>
                )
            }
        }
        if (request.state === requestStates.REJECT){
            if (request.requester === constants.ROLE_TUTOR){
                return (
                    <Grid item width="100%" container flexDirection="row">
                        <Grid item width="100%">
                            <Typography color="black" variant="caption">???? t??? ch???i gia s??</Typography>
                        </Grid>
                    </Grid>
                )
            }
            if (request.requester === constants.ROLE_STUDENT){
                return (
                    <Grid item width="100%" container flexDirection="row">
                        <Grid item width="100%">
                            <Typography color="black" variant="caption">Gia s?? ???? t??? ch???i</Typography>
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
                            Ch??a c?? gia s?? nh???n l???p
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
        if (post.state !== postStates.ACTIVE && post.state !== postStates.PENDING){
            return
        }
        if (recommends.length === 0){
            return (
                <Grid container flexDirection="row" item width="100%" alignItems="center" columnGap="3%" px="8%">
                    <Grid item>
                        <Pending fontSize="small"/>
                    </Grid>
                    <Grid item>
                        <Typography variant="caption">
                            Ch??a t??m th???y ????? xu???t ph?? h???p cho b???n
                        </Typography>
                    </Grid>
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
                <Typography sx={{px:"5%"}}>Gia s?? ph?? h???p</Typography>
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
                                                <IconButton size="small"
                                                        sx={{color:app_colors._primaryGrey}}
                                                        onClick={()=>handleCreateBooking(postId,matchResult.tutor.id)}>
                                                    <Typography color="black" variant="caption">
                                                    <Grid container flexDirection="row">
                                                        <Grid item>
                                                            <Add fontSize="small" sx={{color:"#bfbfbf"}}/>
                                                        </Grid>
                                                        <Grid item>
                                                            G???i y??u c???u
                                                        </Grid>
                                                    </Grid>
                                                    </Typography>
                                                </IconButton>
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
                            <Grid item>
                                <Pending fontSize="small"/>
                            </Grid>
                            <Grid item>
                                <Typography variant="caption">
                                    Ch??a t??m th???y gia s?? ph?? h???p
                                </Typography>
                            </Grid>
                        </Grid>
                }
                 </Grid>
                <Grid item container width="100%">
                    <Typography sx={{px:"5%"}}>????? xu???t cho b???n</Typography>
                    {
                        notMatchResults.length > 0 ?
                            notMatchResults.map((notMatchResult, idx) => {
                                return (
                                    <Grid container item width="100%" key={idx} sx={{'&:hover':{bgcolor:'#e1e1e1'}}}>
                                        <NoMaxWidthTooltip title={<span style={{ whiteSpace: 'pre-line' }}>{getLikelyDescriptions(notMatchResult.recommendation)}</span>}
                                                 arrow enterDelay={200}
                                                 TransitionComponent={Fade}
                                                 TransitionProps={{ timeout: 500 }}
                                                 placement="left"
                                                 disableInteractive

                                        >
                                            <Grid item container flexDirection="row" width="100%" alignItems="center" columnGap="3%" px="8%">
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
                                                        <IconButton size="small"
                                                                    sx={{color:app_colors._primaryGrey}}
                                                                    onClick={()=>handleCreateBooking(postId,notMatchResult.tutor.id)}
                                                        ><Typography color="black" variant="caption">
                                                            <Grid container flexDirection="row">
                                                                <Grid item>
                                                                    <Add fontSize="small" sx={{color:"#bfbfbf"}}/>
                                                                </Grid>
                                                                <Grid item>
                                                                    G???i y??u c???u
                                                                </Grid>
                                                            </Grid>
                                                        </Typography>
                                                        </IconButton>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </NoMaxWidthTooltip>

                                        <Grid item width="100%">
                                            <Divider/>
                                        </Grid>
                                    </Grid>
                                )
                            }):
                            <Grid container flexDirection="row" item width="100%" alignItems="center" columnGap="3%" px="8%">
                                <Pending fontSize="small"/>
                                <Typography variant="caption">
                                    Ch??a c?? g???i ?? gia s?? n??o d??nh cho b???n
                                </Typography>
                            </Grid>
                    }
                </Grid>
            </>
        )
        }
    }

    const getLikelyDescriptions = (descriptionsArr) => {
        let res= ""
        for (const desc of descriptionsArr){
            res += desc +"\n"
        }
        return res
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
        <>
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
                            <Typography sx={{px:"5%"}}>H???c vi??n tham gia</Typography>
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
                                <Typography sx={{px:"5%"}}>Gia s?? nh???n l???p</Typography>
                                { renderEnrollTutors(enrollTutors.data)}
                            </Grid>
                        }
                        {recommend && recommend.data && renderRecommendations(recommend.data)}
                    </Grid>
                </Grid>
            </Box>
            <ResponseMessageModal
                closeDialog={handleCloseDialog}
                responseMessage={responseMessage}
                open={responseMessage !== null}
            />
        </>
    );
}

export default ViewPost;