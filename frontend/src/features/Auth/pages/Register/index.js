import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import constants, {errorTypes} from "../../../../constants/value";
import {HandleResponse} from "../../../../utils/ResponseHandler";
import {Box, createTheme, CssBaseline, Grid, ThemeProvider} from "@mui/material";
import LeftBanner from "../../components/LeftBanner";
import FormTitle from "../../components/FormTitle";
import RegisterForm from "../../components/RegisterForm";
import userApi from "../../../../apis/userApi";
import ErrorModal from "../../../../commons/Modal/ErrorModal";
import {setCurrentUser, setSessionError} from "../../sessionSlice";
import {appLocalStorage} from "../../../../utils/Storage";
import sessionApi from "../../../../apis/sessionApi";
import {useNavigate} from "react-router-dom";

const theme = createTheme();

function RegisterPage(props) {

    const dispatch = useDispatch()

    const error = useSelector(state => state.session.error)

    const navigate = useNavigate()

    const handleRegister = async (data) =>{
        try{
            const response = await userApi.registerUser(data);
            const responseData = HandleResponse(response, setSessionError, errorTypes.REGISTER);
            if (responseData) {
                const accessToken = responseData.accessToken
                appLocalStorage.saveItem(constants.ACCESS_TOKEN_KEY,accessToken)
                const currentUserRes = await sessionApi.getCurrentUser()
                const currentUser = HandleResponse(currentUserRes, setSessionError);
                if (currentUser){
                    dispatch(setCurrentUser(currentUser))
                    dispatch(setSessionError(null))
                    navigate("/")
                }
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
                <Grid item xs={12} sm={8} md={5}>
                    <Box
                        sx={{
                            my: 1,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <FormTitle/>
                        <RegisterForm onSubmit={handleRegister}/>
                    </Box>
                </Grid>
            </Grid>
            {
                error && error.type && error.type === errorTypes.REGISTER &&
                <ErrorModal
                    open={true}
                    description={error.message}
                    title="Lỗi"
                    errorSetter={setSessionError(null)}/>}
        </ThemeProvider>
    );
}

export default RegisterPage;