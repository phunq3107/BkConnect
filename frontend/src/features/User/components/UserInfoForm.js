import React,{useReducer} from 'react';
import PropTypes from 'prop-types';
import {Box, Button, Grid, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {app_colors, app_fonts} from "../../../constants";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import {Save } from "@mui/icons-material";
import AddressSelect from "./AddressSelect";

UserInfoForm.propTypes = {
    userInfo: PropTypes.object,
    listAddresses: PropTypes.arrayOf(PropTypes.object),
    onSubmit: PropTypes.func
};

const formReducer = (state,event) =>{
    return{
        ...state,
        [event.name]: event.value
    }
}

function UserInfoForm(props) {
    const userInfo = props.userInfo

    const [formData, setFormData] = useReducer(formReducer, {})
    const [address, setAddress] = React.useState(userInfo.address)
    const [dobValue, setDobValue] = React.useState(()=> dayjs(userInfo.dob));

    const handleChange = event => {
        setFormData({
            name: event.target.name,
            value: event.target.value,
        });
    }

    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        const {onSubmit} = props;
        if (onSubmit) {
            const submitData ={
                fullname: userInfo.fullname,
                gender: userInfo.gender,
                dob: userInfo.dob,
                address: {
                    ...userInfo.address,
                    ...address
                },
                email: userInfo.email,
                phone: userInfo.phone,
                avatar: userInfo.avatar,
                ...formData,
            }
            onSubmit(submitData);
        };
    }

    const handleChangeAddress = (address) => {
        setAddress(prev=>({
            ...prev,
            ...address
        }))
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box component="form" sx={{ mt: 1, px:5 }} onSubmit={handleUpdateSubmit}>
                <InputLabel id="fullname-label" sx={{color:app_colors._blackText, fontWeight:"bold"}}>
                    Họ và tên
                </InputLabel>
                <TextField
                    fullWidth
                    margin="dense"
                    id="fullname"
                    name="fullname"
                    autoComplete="off"
                    size="small"
                    defaultValue={userInfo.fullname}
                    onChange={handleChange}
                />
                <Grid container flexDirection="row" justifyContent="space-between" mt={2}>
                    <Grid item width="49%">
                        <InputLabel id="dob-label" sx={{color:app_colors._blackText, fontWeight:"bold"}}>
                            Ngày sinh
                        </InputLabel>
                        <DatePicker
                            inputFormat="DD/MM/YYYY"
                            value={dobValue}
                            onChange={(newValue) => {
                                setDobValue(newValue);
                                setFormData({name:"dob",value:dayjs(newValue).valueOf()})
                            }}
                            renderInput={(params) => <TextField fullWidth size="small" {...params} />}
                        />
                    </Grid>
                    <Grid item width="49%">
                        <InputLabel id="dob-label" sx={{color:app_colors._blackText, fontWeight:"bold"}}>
                            Giới tính
                        </InputLabel>
                        <Select
                            fullWidth
                            id="gender"
                            size="small"
                            name="gender"
                            onChange={handleChange}
                            defaultValue={userInfo.gender && (userInfo.gender.toLowerCase() === 'male' || userInfo.gender.toLowerCase() === 'female') ? userInfo.gender.toLowerCase() : ''}
                        >
                                <MenuItem value='male'>Nam</MenuItem>
                                <MenuItem value='female'>Nữ</MenuItem>
                                <MenuItem value='' sx={{display:"none"}}></MenuItem>
                        </Select>
                    </Grid>
                </Grid>
                {userInfo.address &&
                    props.listAddresses &&
                    <AddressSelect
                        listAddresses={props.listAddresses}
                        userAddress={userInfo.address}
                        handleChangeAddress={handleChangeAddress}
                    />}

                <Grid container flexDirection="row" justifyContent="space-between" mt={2}>
                    <Grid item width="49%">
                        <InputLabel
                            id="email-label"
                            sx={{color:app_colors._blackText, fontWeight:"bold"}}
                        >
                            Email
                        </InputLabel>
                        <TextField
                            fullWidth
                            margin="dense"
                            id="email"
                            type="email"
                            name="email"
                            autoComplete="off"
                            size="small"
                            defaultValue={userInfo.email ? userInfo.email : null}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item width="49%">
                        <InputLabel id="phone-label"
                                    sx={{color:app_colors._blackText, fontWeight:"bold"}}>
                            Số điện thoại
                        </InputLabel>
                        <TextField
                            fullWidth
                            margin="dense"
                            id="phone"
                            name="phone"
                            size="small"
                            type="tel"
                            defaultValue={userInfo.phone ? userInfo.phone : null}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
                <Grid>
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
                        Cập nhật <Save/>
                    </Button>
                </Grid>
            </Box>
        </LocalizationProvider>
    );
}

export default UserInfoForm;