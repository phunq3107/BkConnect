import React, {useEffect} from 'react';
import LoginForm from "../../components/LoginForm";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentUser, setSessionError} from "../../sessionSlice";
import constants from "../../../../constants";
import sessionApi from "../../../../apis/sessionApi";
import {HandleResponse} from "../../../../utils/ResponseHandler";
import {saveItemToLocalStorage} from "../../../../utils/Storage";
import { Box, createTheme, CssBaseline, Grid, Paper, ThemeProvider} from "@mui/material";
import LeftBanner from "../../components/LeftBanner";
import FormTitle from "../../components/FormTitle";
import ErrorModal from "../../../../commons/Modal";
import {useNavigate} from "react-router-dom";

const theme = createTheme();

function Login(props) {

    const dispatch = useDispatch();
    const error = useSelector(state => state.session.error)
    const navigate = useNavigate();
    // const currentUser = useSelector(state => state.session.currentUser)

    // useEffect(() => {
    //     dispatch(getCurrentUser());
    // }, [dispatch]);

    const handleLogin = async (data) =>{
        try{
            const response = await sessionApi.login(data);
            const responseData = HandleResponse(response, setSessionError);
            if (responseData) {
                const accessToken = responseData.accessToken
                saveItemToLocalStorage(constants.ACCESS_TOKEN_KEY,accessToken)
                const res = await sessionApi.getCurrentUser();
                const currentUser = HandleResponse(res, setSessionError);
                dispatch(setCurrentUser(currentUser))
                navigate("/")
            }
        } catch (err){
            console.log(err);
        }
    }

    return (
            <ThemeProvider theme={theme}>
                <Grid container component="main" sx={{ height: '100vh' }}>
                    <CssBaseline />
                    <LeftBanner/>
                    <Grid item xs={12} sm={8} md={5} alignSelf="center">
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <FormTitle/>
                            <LoginForm onSubmit={handleLogin}/>
                        </Box>
                    </Grid>
                </Grid>
                {error &&
                    <ErrorModal
                    open={true}
                    description={error.message}
                    title="Lỗi"
                    errorSetter={setSessionError(null)}/>}
            </ThemeProvider>
    );
}

export default Login;