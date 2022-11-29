import React, {useEffect, useState} from 'react';
import Header from "../../../commons/Header";
import {
    Button,
    CssBaseline,
    Divider,
    Grid,
    Typography
} from "@mui/material";
import constants, {app_colors, app_fonts} from "../../../constants";
import Avatar from "@mui/material/Avatar";
import UserInfoForm from "../components/UserInfoForm";
import {useDispatch, useSelector} from "react-redux";
import userApi from "../../../apis/userApi";
import {HandleResponse} from "../../../utils/ResponseHandler";
import sessionApi from "../../../apis/sessionApi";
import {setCurrentUser, setSessionError} from "../../Auth/sessionSlice";
import {unwrapResult} from "@reduxjs/toolkit";
import addressApi from "../../../apis/addressApi";
import {saveItemToLocalStorage} from "../../../utils/Storage";
import {setUserError} from "../userSlice";
import {Save} from "@mui/icons-material";


function UserInfoPage(props) {
    const currentUser = useSelector(state => state.session.currentUser)
    const dispatch = useDispatch()
    const [userInfo,setUserInfo] = useState(null)
    const [address,setAddress] = useState(null)

    useEffect(()=>{
        if (!currentUser){
            sessionApi.getCurrentUser().then(
                response => {
                    const data = HandleResponse(response)
                    const action = setCurrentUser(data)
                    dispatch(action)
                    const currentUser = unwrapResult(action)
                    userApi.getById(currentUser.id).then(
                        response => {
                            const data = HandleResponse(response)
                            setUserInfo(data)
                        }
                    )
                }
            )
        }
        else {
            userApi.getById(currentUser.id).then(
                response => {
                    const data = HandleResponse(response)
                    setUserInfo(data)
                })
        }
    },[])

    useEffect(()=>{
        addressApi.getAll().then(
            response => {
                setAddress(response.data)
            }
        ).catch(err => console.log(err))
    },[])


    const handleSubmit = async (data) =>{
        try{
            const response = await userApi.update(currentUser.id,data);
            const responseData = HandleResponse(response, setUserError);
            if (responseData) {
                setUserInfo(responseData)
            }
        } catch (err){
            console.log(err);
        }
    }

    return (
        <>
            <CssBaseline/>
            <Header/>
            <Grid container component="main" sx={{bgcolor: app_colors._primaryBackground, height:'90vh' }} pt={6}>
                <Grid item md={1.5}/>
                <Grid
                    container
                    item
                    xs={false}
                    sm={8} md={2}
                    sx={{bgcolor: app_colors._whiteText, height:'60vh'}}
                    borderRadius={1}
                    justifyContent="center"
                    boxShadow={3}
                    py={3}
                    px={2}
                >
                    <Grid item>
                    {userInfo && <Avatar src={userInfo.avatar}  sx={{ width: 150, height: 150 }} />}
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
                            Cập nhật ảnh
                            <input
                                type="file"
                                hidden
                            />
                        </Button>
                    </Grid>
                </Grid>

                <Grid item md={0.5}/>

                <Grid
                    item
                    xs={12}
                    sm={4}
                    md={6.5}
                    sx={{py:2,bgcolor: app_colors._whiteText}}
                    boxShadow={3}
                    borderRadius={1}
                >
                    <Typography mx={3} variant="h6" fontWeight="bold">Hồ sơ cá nhân</Typography>
                    <Divider sx={{py:1}}/>
                    {userInfo && address && <UserInfoForm onSubmit={handleSubmit} address={address} userInfo={userInfo}/>}
                </Grid>

            </Grid>
        </>
    );
}

export default UserInfoPage;