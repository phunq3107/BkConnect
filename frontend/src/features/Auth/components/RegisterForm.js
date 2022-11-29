import React, {useReducer, useState} from 'react';
import PropTypes from 'prop-types';
import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControlLabel,
    Grid,
    Link, Radio, RadioGroup,
    TextField,
} from "@mui/material";
import {app_colors, app_fonts, app_paths} from "../../../constants";
import {ArrowForward} from "@mui/icons-material";

RegisterForm.propTypes = {
    onSubmit: PropTypes.func
};

const formReducer = (state,event) =>{
    return{
        ...state,
        [event.name]: event.value
    }
}

function RegisterForm(props) {

    const [formData, setFormData] = useReducer(formReducer, {role:'student'})
    const [isAgree, setIsAgree] = useState(false)
    const handleChange = event => {
        setFormData({
            name: event.target.name,
            value: event.target.value,
        });
    }

    const handleRegisterSubmit = (e) =>{
        e.preventDefault();
        const {onSubmit} = props;
        if (onSubmit) {
            onSubmit(formData)
        };
    }

    return (
        <Box component="form" noValidate onSubmit={handleRegisterSubmit} sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="fullname"
                label="Họ và tên"
                name="fullname"
                autoFocus
                onChange={handleChange}
                autoComplete="off"
            />
            <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Tên đăng nhập"
                name="username"
                onChange={handleChange}
                autoComplete="off"
            />
            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Địa chỉ email"
                name="email"
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
            <RadioGroup
                row
                name="role"
                defaultValue="student"
                onChange={handleChange}
            >
                <FormControlLabel value="student" control={<Radio />} label="Học viên" />
                <FormControlLabel value="tutor" control={<Radio />} label="Gia sư" />
            </RadioGroup>
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
                disabled={!isAgree}
            >
                Đăng kí
                <ArrowForward/>
            </Button>
            <FormControlLabel
                control={<Checkbox checked={isAgree} onChange={()=>setIsAgree(prev => !prev)} name="policy" value="agree"/>}
                label="Tôi đã đọc và đồng ý mọi điều khoản"
            />
            <Grid container sx={{mt: 2, mb: 1 }}>
                <Grid item xs>
                    <Link href={app_paths.login} variant="body2" underline="none" color={app_colors._primaryPurple} fontWeight="bold">
                        Đăng nhập
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

export default RegisterForm;