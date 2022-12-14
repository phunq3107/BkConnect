import React from 'react';
import {Button, Divider, Grid, Typography} from "@mui/material";
import constants from "../../../constants/value";
import Avatar from "@mui/material/Avatar";
import {useLocation, useNavigate} from "react-router-dom";
import {studentButtons, tutorButtons} from "../../../constants/userOptions";
import {app_colors, app_fonts} from "../../../constants/styles";


function AvatarCard(props) {

    const user = props.user

    const location = useLocation()

    const navigate = useNavigate()

    const renderButtonGroup = (buttons) => {

        const currentIdx = buttons.findIndex(button => button.href === location.pathname)

        const buttonStyles = {
            color:app_colors._primaryGrey,
            fontWeight:"bold",
            textTransform:"none",
            justifyContent:"flex-start",
            borderWidth:0,
            borderRadius:0,
            '&:hover':{
                borderWidth: 0,
            }
        }

        const currentButtonStyles = {
            borderLeftWidth: 4,
            borderLeftColor: app_colors._primaryPurple,
            '&:hover':{
                borderWidth:0,
                borderLeftWidth: 4,
                borderLeftColor: app_colors._primaryPurple
            }
        }

        const handleButtonClick = (href) => {
            navigate(href)
        }

        return(
            buttons.map((button,idx) => {
                return(
                    <Grid item width="100%" key={idx}>
                        <Button
                            variant="outlined"
                            startIcon={button.icon}
                            fullWidth key={idx}
                            sx = { idx === currentIdx ? {...buttonStyles, ...currentButtonStyles} : buttonStyles }
                            onClick={() => handleButtonClick(button.href)}
                        >
                            {button.title}
                        </Button>
                        <Divider/>
                    </Grid>
                )
            })
        )
    }
    return (
        <Grid
            container
            item
            xs={false}
            sm={8} md={2}
            sx={{bgcolor: app_colors._whiteText}}
            height="fit-content"
            borderRadius={1}
            flexDirection="column"
            alignItems="center"
            boxShadow={3}
            py={2}
            px={2}
            rowGap={2}
        >
            <Grid item width="100%" container justifyContent="center">
                <Grid item width="100%" textAlign="center">
                <Typography fontFamily={app_fonts._primaryFont} fontWeight="bold">{user.username}</Typography>
                </Grid>
                <Grid item height="min-content">
                    {user && <Avatar src={user.avatar}  sx={{ width: 150, height: 150 }} />}
                </Grid>
            </Grid>
            <Grid item width="100%">
                <Button
                    fullWidth
                    variant="contained"
                    component="label"
                    name="avatar"
                    sx={{
                        backgroundColor: app_colors._primaryPurple,
                        '&:hover': {backgroundColor:app_colors._hoverPurple,},
                        fontFamily: app_fonts._primaryFont,
                        fontWeight: "bold"
                    }}
                >
                    C???p nh???t ???nh
                    <input
                        type="file"
                        hidden
                    />
                </Button>
            </Grid>
            <Grid item container width="100%">
                    {user.role.toUpperCase() === constants.ROLE_STUDENT ?
                        renderButtonGroup(studentButtons) :
                        user.role.toUpperCase() === constants.ROLE_TUTOR ?
                            renderButtonGroup(tutorButtons) :
                            null
                    }
            </Grid>
        </Grid>
    );
}

export default AvatarCard;