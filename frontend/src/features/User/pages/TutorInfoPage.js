import React, {useEffect, useState} from 'react';
import {CssBaseline, Divider, Grid, Typography} from "@mui/material";
import Header from "../../../commons/Header";
import {app_colors} from "../../../constants";
import AvatarCard from "../components/AvatarCard";
import {useDispatch, useSelector} from "react-redux";
import TutorInfoForm from "../components/TutorInfoForm";
import {setListSubjects} from "../../Auth/sessionSlice";
import {HandleResponse} from "../../../utils/ResponseHandler";
import tutorApi from "../../../apis/tutorApi";
import {setUserError} from "../userSlice";
import subjectApi from "../../../apis/subjectApi";
import RequireLoginModal from "../../../commons/Modal/RequireLoginModal";

function TutorInfoPage(props) {
    const currentUser = useSelector(state => state.session.currentUser)
    const listSubjects = useSelector(state => state.session.listSubjects)
    const dispatch = useDispatch()


    const [tutorInfo, setTutorInfo] = useState(null)

    useEffect(()=>{
        if (listSubjects == null){
            subjectApi.getAll().then(
                response =>{
                    const listSubjects = response.data.data.map(subject =>({
                            subjectId : subject.id, // ?????????????????????????
                            name: subject.name,
                            group: subject.group,
                            order: subject.order
                        })
                    )
                    dispatch(setListSubjects(listSubjects))
                }
            ).catch(err => console.log(err))
        }
    },[])

    useEffect(()=>{
        if(currentUser){
            tutorApi.getById(currentUser.id).then(
                response => {
                    const data = HandleResponse(response, setUserError)
                    setTutorInfo(data)
                })
        }
    },[currentUser])

    const handleSubmit = async (data) =>{
        try{
            const response = await tutorApi.update(currentUser.id,data);
            const responseData = HandleResponse(response, setUserError);
            if (responseData) {
                setTutorInfo(responseData)
                alert("Cập nhật thông tin thành công")
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
                    <Typography mx={3} variant="h6" fontWeight="bold">Hồ sơ gia sư</Typography>
                    <Divider sx={{py:1}}/>
                    {tutorInfo &&
                        <TutorInfoForm
                            onSubmit={handleSubmit}
                            tutorInfo={tutorInfo}
                            listSubjects={listSubjects}
                        />}
                </Grid>
            </Grid>
            <RequireLoginModal/>
        </>
    );
}

export default TutorInfoPage;