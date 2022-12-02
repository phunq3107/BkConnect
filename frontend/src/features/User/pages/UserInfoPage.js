import React, {useEffect, useState} from 'react';
import Header from "../../../commons/Header";
import {
    CssBaseline,
    Divider,
    Grid,
    Typography
} from "@mui/material";
import {app_colors} from "../../../constants";
import UserInfoForm from "../components/UserInfoForm";
import {useDispatch, useSelector} from "react-redux";
import userApi from "../../../apis/userApi";
import {HandleResponse} from "../../../utils/ResponseHandler";
import sessionApi from "../../../apis/sessionApi";
import {setCurrentUser, setSessionError} from "../../Auth/sessionSlice";
import {unwrapResult} from "@reduxjs/toolkit";
import {setUserError} from "../userSlice";
import AvatarCard from "../components/AvatarCard";
import ErrorModal from "../../../commons/Modal";


function UserInfoPage(props) {
    const currentUser = useSelector(state => state.session.currentUser)
    const error = useSelector(state => state.session.error)

    const dispatch = useDispatch()
    const [userInfo,setUserInfo] = useState(null)


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
                            const data = HandleResponse(response, setSessionError)
                            setUserInfo(data)
                        }
                    )
                }
            )
        }
        else {
            userApi.getById(currentUser.id).then(
                response => {
                    const data = HandleResponse(response, setUserError)
                    setUserInfo(data)
                })
        }
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

                {currentUser && <AvatarCard user={currentUser}/>}

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
                    {userInfo && <UserInfoForm onSubmit={handleSubmit} userInfo={userInfo}/>}
                </Grid>
            </Grid>
            {error &&
                <ErrorModal
                    open={true}
                    description={error.message}
                    title="Lỗi"
                    errorSetter={setUserError(null)}/>}
        </>
    );
}

export default UserInfoPage;