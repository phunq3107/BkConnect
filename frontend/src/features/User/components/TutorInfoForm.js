import React, {useReducer, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {
    Box,
    InputLabel,
} from "@mui/material";
import {app_colors} from "../../../constants";
import TimeSelect from "./TimeSelect";
import SubjectSelect from "./SubjectSelect";


TutorInfoForm.propTypes = {
    tutorInfo: PropTypes.object,
    onSubmit: PropTypes.func
};

const formReducer = (state,event) =>{
    return{
        ...state,
        [event.name]: event.value
    }
}


function TutorInfoForm(props) {
    const tutorInfo = props.tutorInfo

    const [formData, setFormData] = useReducer(formReducer, {})

    const [selectedDays, setSelectedDays] = useState([])

    const [selectedSubjects, setSelectedSubjects] = useState([])

    const handleChange = event => {
        setFormData({
            name: event.target.name,
            value: event.target.value,
        });
    }

    const listSubjects = [
        {id:1,name:"Toán 10", group:"Toán", order:3},
        {id:2,name:"Toán 11", group:"Toán", order:2},
        {id:3,name:"Toán 12", group:"Toán", order:1},
        {id:4,name:"Ngữ Văn 10", group:"Ngữ Văn", order:3},
        {id:5,name:"Ngữ Văn 11", group:"Ngữ Văn", order:2},
        {id:6,name:"Ngữ Văn 12", group:"Ngữ Văn", order:1}
    ]

    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        const {onSubmit} = props;
        if (onSubmit) {
            const submitData ={
            }
            onSubmit(submitData);
        };
    }


    return (
        <Box component="form" sx={{ mt: 1, px:5 }} onSubmit={handleUpdateSubmit}>

            <InputLabel id="teachingTime-label" sx={{color:app_colors._blackText, fontWeight:"bold"}}>
                Thời gian dạy
            </InputLabel>
            <TimeSelect selectedDays={selectedDays} setSelectedDays={setSelectedDays}/>

            <InputLabel id="teachingTime-label" sx={{color:app_colors._blackText, fontWeight:"bold"}}>
                Môn học
            </InputLabel>
            <SubjectSelect listSubjects={listSubjects} selectedSubjects={selectedSubjects} setSelectedSubjects={setSelectedSubjects}/>

        </Box>
    );
}

export default TutorInfoForm;