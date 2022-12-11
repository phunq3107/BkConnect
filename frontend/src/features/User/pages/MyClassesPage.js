import React, {useEffect, useState} from 'react';
import {Box, Button, CircularProgress, CssBaseline, Divider, Grid, Typography} from "@mui/material";
import Header from "../../../commons/Header";
import value,{alertTypes, studentLocation} from "../../../constants/value";
import {useSelector} from "react-redux";
import AvatarCard from "../components/AvatarCard";
import MyClassesHeader from "../components/MyClassesHeader";
import MyClassesItem from "../components/MyClassesItem";
import CustomAlert from "../../../commons/Alert";
import CancelClassDialog from "../components/CancelClassDialog";
import {useNavigate} from "react-router-dom";
import {app_colors} from "../../../constants/styles";
import ReFindTutorDialog from "../components/ReFindTutorDialog";

const testClasses = [
    {
        post:{
                id: '123456789',
                title: 'Tìm gia sư',
                subject: {
                    id: 1,
                    name: "Toán 11",
                    group:"Toán học",
                    order: "1"
                },
                timesPerWeek: 2,
                hoursPerLesson: 2.5,
                availableTime: Array(168).fill("1"),
                location:[
                    studentLocation,
                    {
                        province:'thanh_pho_ho_chi_minh',
                        district:'quan_10',
                        ward:'phuong_14',
                        detail:'To Hien Thanh'
                    }
                ],
                fee: 200000,
                level: "1",
                gender: 'female',
                age: '18,25',
                description: 'Tìm gia sư Tìm gia sư Tìm gia sư Tìm gia sư Tìm gia sư Tìm gia sư Tìm gia sư Tìm gia sư Tìm gia sư',
                isGroup: false,
                createBy:{
                    id:'12345',
                    username: 'hungvinh3591',
                    fullname: 'Đặng Phước Vĩnh Hưng',
                    avatar: '',
                    role: 'STUDENT',
                    extInfo: null
                },
                lastUpdate: 12345679,
                state: 'DONE',
                distance: null,
                attendees:[],
                noStudents: "2,3"
            },
            createTime:123456789,
            updateTime:987654321,
            requester: 'STUDENT',
            state: 'CREATE'
    },
]
function MyClassesPage() {
    const currentUser = useSelector(state => state.session.currentUser)
    const error = useSelector(state => state.user.error)
    const navigate = useNavigate()

    const [classes,setClasses] = useState(null)
    const [alert,setAlert] = useState(null)
    const [cancelledClass, setCancelledClass] = useState(null)
    const [reFindClass,setReFindClass] = useState(null)

    useEffect(()=>{
        let isCancelled = false
        if (!isCancelled){
            //TODO: get all classes API call
            setClasses(testClasses)
        }
        return () => {
            isCancelled = true
        }
    },[])


    const showAlert = (type,message) => {
        setAlert({
            show:true,
            type:type,
            message:message
        })
    }

    const hideAlert = () => setAlert(prev=>({...prev,show:false}))

    const openCancelClassDialog = (cancelledClass) =>{
        setCancelledClass(cancelledClass)
    }

    const closeCancelClassDialog = () =>{
        setCancelledClass(null)
    }

    const openReFindClassDialog = () => {
        setReFindClass(cancelledClass)
    }

    const handleCancelClass = (reasonObj) =>{
        //TODO: API call --> cancel class
        console.log(reasonObj)
        showAlert(alertTypes.SUCCESS,'Hủy lớp thành công')
        if (currentUser.role.toUpperCase() === value.ROLE_STUDENT){
            openReFindClassDialog()
        }
        setCancelledClass(null)
    }

    const handleReFindTutor = () => {
        //TODO: API call --> refind tutor
        console.log(reFindClass)

        setReFindClass(null)
    }

    if (!classes || !currentUser){
        return <CircularProgress/>
    }

    return (
        <Box>
            <CssBaseline/>
            <Header/>
            <Grid container component="main" sx={{bgcolor: app_colors._primaryBackground, minHeight:'90vh' }} pt={6}>

                <Grid item md={1.5}/>

                {currentUser && <AvatarCard user={currentUser}/>}

                <Grid item md={0.5}/>

                <Grid
                    item
                    xs={12}
                    sm={4}
                    md={6.5}
                    sx={{py:"2%",bgcolor: app_colors._whiteText, px:"2%"}}
                    boxShadow={3}
                    borderRadius={1}
                    container
                    alignContent="baseline"
                    mb="10%"
                >

                    <MyClassesHeader/>

                    <Grid item width="100%" mt="3%">
                        <Divider sx={{mx:"-4%"}}/>
                    </Grid>

                    {   classes.length > 0 ?
                        classes.map((clazz,idx) => {
                            return(
                                <MyClassesItem
                                    key={idx} clazz={clazz}
                                    showAlert={showAlert}
                                    onSelectCancelledClass={openCancelClassDialog}/>
                            )
                        })
                        :
                        <Grid item width="100%" mt="3%">
                            <Typography>Hiện tại chưa có yêu cầu nhận lớp nào</Typography>
                        </Grid>

                    }
                </Grid>
            </Grid>
            {
                alert &&
                <CustomAlert message={alert.message} type={alert.type} open={alert.show} onClose={hideAlert}/>
            }
            <CancelClassDialog open={cancelledClass !== null} closeDialog={closeCancelClassDialog} handleCancelClass={handleCancelClass}/>
            <ReFindTutorDialog
                open={reFindClass !== null}
                closeDialog={ () => setReFindClass(null)}
                handleReFindTutor={handleReFindTutor}/>
        </Box>
    );
}

export default MyClassesPage;