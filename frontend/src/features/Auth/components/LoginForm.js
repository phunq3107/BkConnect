import React, {useReducer} from 'react';
import PropTypes from 'prop-types';
import {Box, Button, Divider, Grid, Link, TextField} from "@mui/material";
import {app_colors, app_fonts, app_paths} from "../../../constants";
import {ArrowForward} from "@mui/icons-material";

LoginForm.propTypes = {
    onSubmit: PropTypes.func
};

const formReducer = (state,event) =>{
    return{
        ...state,
        [event.name]: event.value
    }
}

function LoginForm(props) {

    const [formData, setFormData] = useReducer(formReducer, {})
    const handleChange = event => {
        setFormData({
            name: event.target.name,
            value: event.target.value,
        });
    }

    const handleLoginSubmit = (e) =>{
        e.preventDefault();
        const {onSubmit} = props;
        if (onSubmit) {
            onSubmit(formData);
        };
    }

    return (
        <Box component="form" noValidate onSubmit={handleLoginSubmit} sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Tên đăng nhập/email"
                name="username"
                autoFocus
                onChange={handleChange}
                autoComplete="off"
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Mật khẩu"
                type="password"
                id="password"
                onChange={handleChange}
                autoComplete="off"
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3,
                    mb: 2 ,
                    backgroundColor: app_colors._primaryPurple,
                    '&:hover': {backgroundColor:app_colors._hoverPurple,},
                    fontFamily: app_fonts._primaryFont,
                    fontWeight: "bold"
                    }}
            >
                Đăng nhập <ArrowForward/>
            </Button>
            <Grid container sx={{mt: 2, mb: 1 }}>
                <Grid item xs>
                    <Link href={app_paths.register} variant="body2" underline="none" color={app_colors._primaryPurple} fontWeight="bold">
                        Đăng kí ngay
                    </Link>
                </Grid>
                <Grid item>
                    <Link href={app_paths.forgotPassword} variant="body2" underline="none" color={app_colors._primaryGrey} fontWeight="bold">
                        Quên mật khẩu
                    </Link>
                </Grid>
            </Grid>
            <Divider sx={{fontFamily: app_fonts._primaryFont,color:app_colors._primaryGrey}}>OR</Divider>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3,
                    mb: 2 ,
                    backgroundColor: app_colors._whiteText,
                    '&:hover': {backgroundColor:"grey"},
                    color:"black"
                }}
            >
                Đăng nhập bằng google
            </Button>
        </Box>
    );
}

export default LoginForm;