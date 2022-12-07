import React, {useEffect, useState} from 'react';
import {CssBaseline, Grid} from "@mui/material";
import Header from "../../../commons/Header";
import {app_colors} from "../../../constants";
import GetAllPostFilter from "../components/GetAllPostFilter";
import GetAllPostResult from "../components/GetAllPostResult";
import postApi from "../../../apis/postApi";
import {useDispatch, useSelector} from "react-redux";
import subjectApi from "../../../apis/subjectApi";
import {setListSubjects} from "../../Auth/sessionSlice";

function AllPost(props) {
    const [listSubjects, setListSubjects] = useState([])
    const [posts, setPosts] = useState([]);
    const [pageNumber, setPageNumber] = useState(1)
    const pageSize = 10
    const [totalPost, setTotalPost] = useState(0)
    const [filter, setFilter] = useState({getAll: true})
    useEffect(() => {
        postApi.getAll(filter, pageNumber, pageSize).then(
            resp => {
                const data = resp.data.data
                setTotalPost(data.total)
                setPosts(data.data)
            }
        ).catch(err => console.log(err))
    }, [pageNumber, filter])
    useEffect(() => {
        subjectApi.getAll().then(
            response => {
                const listSubjects = response.data.data.map(subject => ({
                        subjectId: subject.id, // ?????????????????????????
                        name: subject.name,
                        group: subject.group,
                        order: subject.order
                    })
                )
                setListSubjects(listSubjects)
            }
        ).catch(err => console.log(err))
    }, [])

    return (
        <React.Fragment>
            <CssBaseline/>
            <Header/>
            <Grid container component="main" sx={{bgcolor: app_colors._primaryBackground}} pt={6}>
                <Grid item md={1.75}/>
                <Grid item container md={8.5} py={3}>
                    <Grid item md={12} height="120px" mb={5} bgcolor={app_colors._whiteText}>Search place</Grid>

                    <Grid container item md={3.5} sx={{bgcolor: app_colors._whiteText, height: "fit-content"}}>
                        <GetAllPostFilter listSubjects={listSubjects}/>
                    </Grid>
                    <Grid item md={0.5}/>
                    <Grid item md={8}>
                        <GetAllPostResult posts={posts}/>
                    </Grid>
                </Grid>
                <Grid item md={1.75}/>

            </Grid>

        </React.Fragment>
    )
}

export default AllPost;