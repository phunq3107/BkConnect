import React, {useEffect} from 'react';
import {CircularProgress, CssBaseline, Divider, Grid, Typography} from "@mui/material";
import Header from "../../../commons/Header";
import {useDispatch, useSelector} from "react-redux";
import subjectApi from "../../../apis/subjectApi";
import {setListSubjects} from "../../Auth/sessionSlice";
import CreatePostForm from "../components/CreatePostForm";
import {HandleResponse} from "../../../utils/ResponseHandler";
import {setUserError} from "../../User/userSlice";
import postApi from "../../../apis/postApi";
import {useNavigate} from "react-router-dom";
import {app_colors} from "../../../constants/styles";
import {app_paths} from "../../../constants/router";

function CreatePost(props) {
    const listSubjects = useSelector(state => state.session.listSubjects)
    const dispatch = useDispatch()
    const navigate = useNavigate()

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

    const handleSubmit = async (data) =>{
        try{
            const response = await postApi.create(data);
            const responseData = HandleResponse(response, setUserError);
            if (responseData) {
                alert("Tạo bài thành công")
                navigate(app_paths.viewPost + "/" +  responseData.id)
            }
        } catch (err){
            console.log(err)
        }
    }

    if (!listSubjects){
        return <CircularProgress/>
    }

    return (
        <React.Fragment>
            <CssBaseline/>
            <Header/>
            <Grid container component="main" sx={{bgcolor: app_colors._primaryBackground}} pt={6} justifyContent="center">
                <Grid
                    item
                    xs={12}
                    sm={4}
                    md={6.5}
                    sx={{py:2,bgcolor: app_colors._whiteText}}
                    boxShadow={3}
                    borderRadius={1}
                >
                    <Typography mx={3} variant="h6" fontWeight="bold">Tìm gia sư</Typography>
                    <Divider sx={{py:1}}/>

                    {listSubjects && <CreatePostForm onSubmit={handleSubmit} listSubjects={listSubjects}/>}
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default CreatePost;