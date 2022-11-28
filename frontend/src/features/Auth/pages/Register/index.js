import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import constants from "../../../../constants";
import {HandleResponse} from "../../../../utils/ResponseHandler";
import {saveItemToLocalStorage} from "../../../../utils/Storage";
import {Box, createTheme, CssBaseline, Grid, Modal, Paper, ThemeProvider, Typography} from "@mui/material";
import LeftBanner from "../../components/LeftBanner";
import FormTitle from "../../components/FormTitle";
import RegisterForm from "../../components/RegisterForm";
import userApi from "../../../../apis/userApi";
import ErrorModal from "../../../../commons/Modal";
import {setSessionError} from "../../sessionSlice";

const theme = createTheme();

function RegisterPage(props) {

    const error = useSelector(state => state.session.error)

    const handleRegister = async (data) =>{
        try{
            const response = await userApi.registerUser(data);
            const responseData = HandleResponse(response, setSessionError);
            if (responseData) {
                const accessToken = responseData.accessToken
                saveItemToLocalStorage(constants.ACCESS_TOKEN_KEY,accessToken)
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
                error &&
                <ErrorModal
                    open={true}
                    description={error.message}
                    title="Lỗi"
                    errorSetter={setSessionError(null)}/>}
        </ThemeProvider>
    );
}

export default RegisterPage;