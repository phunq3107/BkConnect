import React from 'react';
import Header from "../../../commons/Header";
import {createTheme, ThemeProvider} from "@mui/material";
import {useEffect} from "react";
import sessionApi from "../../../apis/sessionApi";
import {HandleResponse} from "../../../utils/ResponseHandler";
import {setCurrentUser, setSessionError} from "../../Auth/sessionSlice";
import {useDispatch, useSelector} from "react-redux";


const theme = createTheme()

function HomePage(props) {
    const currentUser = useSelector(state => state.session.currentUser)
    const dispatch = useDispatch()
    useEffect(()=>{
        if (!currentUser){
            sessionApi.getCurrentUser().then(
                response => {
                    const data = HandleResponse(response, setSessionError)
                    const action = setCurrentUser(data)
                    dispatch(action)
                }
            )
        }
    },[])
    return (
        <ThemeProvider theme={theme}>
            <Header/>
        </ThemeProvider>
    );
}

export default HomePage;