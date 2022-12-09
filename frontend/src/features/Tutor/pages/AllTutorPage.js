import React, {Fragment, useEffect, useState} from 'react';
import {CssBaseline, Grid} from "@mui/material";
import Header from "../../../commons/Header";
import AllTutorResult from "../components/AllTutorResult";
import tutorApi from "../../../apis/tutorApi";
import {app_colors} from "../../../constants/styles";

const AllTutorPage = (props) => {
    const [tutors, setTutors] = useState([])
    useEffect(() => {
        // todo
        tutorApi.getAll(null, 1, 10).then(
            resp => {
                setTutors(resp.data.data.data)
            }
        ).catch(e => console.log(e))
    }, [])
    return (
        <Fragment>
            <CssBaseline/>
            <Header/>
            <Grid container component="main" sx={{bgcolor: app_colors._primaryBackground}} pt={6}>
                <Grid item md={1.75}/>
                <Grid item container md={8.5} py={3}>
                    <Grid item md={12} height="120px" mb={5} bgcolor={app_colors._whiteText}>Search place</Grid>

                    <Grid container item md={3.5} sx={{bgcolor: app_colors._whiteText, height: "fit-content"}}>
                        Filter place
                    </Grid>
                    <Grid item md={0.5}/>
                    <Grid item md={8}>
                        <AllTutorResult tutors={tutors}/>
                    </Grid>
                </Grid>
                <Grid item md={1.75}/>
            </Grid>
        </Fragment>
    )
}

export default AllTutorPage;