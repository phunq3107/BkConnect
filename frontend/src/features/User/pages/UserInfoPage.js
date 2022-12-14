import React, {useEffect, useState} from 'react';
import Header from "../../../commons/Header";
import {CssBaseline, Divider, Grid, Typography} from "@mui/material";
import {errorTypes} from "../../../constants/value";
import UserInfoForm from "../components/UserInfoForm";
import {useSelector} from "react-redux";
import userApi from "../../../apis/userApi";
import {HandleResponse} from "../../../utils/ResponseHandler";
import {setUserError} from "../userSlice";
import AvatarCard from "../components/AvatarCard";
import {app_colors} from "../../../constants/styles";


function UserInfoPage(props) {
    const currentUser = useSelector(state => state.session.currentUser)
    const error = useSelector(state => state.user.error)

    const [userInfo,setUserInfo] = useState(null)

    useEffect(()=>{
        if(currentUser){
            userApi.getById(currentUser.id).then(
                response => {
                    const data = HandleResponse(response, setUserError)
                    setUserInfo(data)
                })
        }
    },[currentUser])


    const handleSubmit = async (data) =>{
        try{
            const response = await userApi.update(currentUser.id,data);
            const responseData = HandleResponse(response, setUserError, errorTypes.USER_UPDATE);
            if (responseData) {
                setUserInfo(responseData)
                alert("Cập nhật thông tin thành công")
            }
        } catch (err){
            console.log(err);
        }
    }

    if (!currentUser && !userInfo){
        return (<></>)
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
            {/*{error && error.type === errorTypes.USER_UPDATE &&*/}
            {/*    <ErrorModal*/}
            {/*        open={true}*/}
            {/*        description={error.message}*/}
            {/*        title="Lỗi"*/}
            {/*        errorSetter={setUserError(null)}/>}*/}
        </>
    );
}

export default UserInfoPage;