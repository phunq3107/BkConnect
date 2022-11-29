import React from 'react';
import {CssBaseline, Divider, Grid, Typography} from "@mui/material";
import Header from "../../../commons/Header";
import {app_colors} from "../../../constants";
import AvatarCard from "../components/AvatarCard";
import {useSelector} from "react-redux";
import TutorInfoForm from "../components/TutorInfoForm";


function TutorInfoPage(props) {
    const currentUser = useSelector(state => state.session.currentUser)

    return (
        <>
            <CssBaseline/>
            <Header/>
            <Grid container component="main" sx={{bgcolor: app_colors._primaryBackground, height:'90vh' }} pt={6}>
                <Grid item md={1.5}/>

                <AvatarCard user={currentUser}/>

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
                    <TutorInfoForm tutorInfo={{}}/>
                </Grid>

            </Grid>
        </>
    );
}

export default TutorInfoPage;