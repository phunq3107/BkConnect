import React from 'react';
import {AppBar, Box, Link, Stack, Toolbar, Typography} from "@mui/material";
import constants, {app_colors, app_fonts, app_paths} from "../../constants";
import logoBK from "../../assets/images/logoBK.png";
import {useSelector} from "react-redux";
import CurrentUser from "./CurrentUser";
import {useNavigate} from "react-router-dom";

const studentLinkItems = [
    {href:app_paths.home,title:"Trang chủ"},
    {href:app_paths.tutorsPage,title:"Gia sư"},
    {href:app_paths.postsPage,title:"Lớp mới"},
    {href:app_paths.createPost,title:"Tìm gia sư"},
    {href:app_paths.refFree,title:"Học phí tham khảo"},
    {href:app_paths.contact,title:"Liên hệ"},
]

const tutorLinkItems = [
    {href:app_paths.home,title:"Trang chủ"},
    {href:app_paths.tutorsPage,title:"Gia sư"},
    {href:app_paths.postsPage,title:"Lớp mới"},
    {href:app_paths.refFree,title:"Học phí tham khảo"},
    {href:app_paths.contact,title:"Liên hệ"}
]
function Header(props) {

    const currentUser = useSelector(state=>state.session.currentUser)
    const navigate = useNavigate();
    const linkItems = currentUser && currentUser.role && currentUser.role.toUpperCase() === constants.ROLE_TUTOR ?
                        tutorLinkItems : studentLinkItems

    const renderLinkElements = (items) => {
        return(
            items.map((item,idx) => (
                <Box key= {idx}
                     display="flex"
                     justifyContent="center"
                     alignItems="center"
                >
                    <Link
                        variant="body2"
                        onClick={(event) => {navigate(item.href)}}
                        underline="hover"
                        color={app_colors._blackText}
                        fontWeight="regular"
                        fontFamily={app_fonts._primaryFont}
                        sx={{
                            transitionDuration:1000,
                            cursor: "pointer"
                        }}
                    >
                        {item.title}
                    </Link>
                </Box>
            ))
        )
    }

    return (
        <>
            <AppBar color="">
                <Toolbar>
                    <>
                        <Box
                            component="img"
                            sx={{
                                height: 50,
                                width: 55,
                            }}
                            src={logoBK}
                        />
                        <Typography
                            underline="none"
                            variant="h5"
                            sx={{flexGrow:1}}
                            color={app_colors._blackText}
                            fontFamily={app_fonts._primaryFont}
                            fontWeight="bold"
                        >
                            BKConnect
                        </Typography>
                    </>
                    <Stack direction="row" spacing={4}>
                        {renderLinkElements(linkItems)}
                        {currentUser ?
                            <CurrentUser user={currentUser}/> :
                            (<Link
                            underline="none"
                            color={app_colors._whiteText}
                            fontWeight="medium"
                            fontFamily="Roboto"
                            href={app_paths.login}
                            variant="contained"
                            sx={{
                                p:1,
                                borderRadius:1.5,
                                backgroundColor: app_colors._primaryPurple,
                                '&:hover': {backgroundColor: app_colors._hoverPurple},
                            }}
                        >
                            Tham gia ngay
                        </Link>)}
                    </Stack>
                </Toolbar>
            </AppBar>
            <Toolbar/>
        </>
    );
}

export default Header;