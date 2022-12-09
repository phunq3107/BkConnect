import React, {useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {Box, Button, Checkbox, FormControlLabel, Grid, InputLabel, Stack, Typography} from "@mui/material";
import constants, {studentLocation, tutorLocation} from "../../../constants/value";
import TimeSelect from "./TimeSelect";
import SubjectSelect from "./SubjectSelect";

import LocationSelect from "../../../commons/LocationSelector/LocationSelect";
import convertAddress from "../../../utils/addressUtils";
import JoditEditor from "jodit-react";
import {Save} from "@mui/icons-material";
import listAddresses from "../../../assets/vietnam_province.json"
import {app_colors, app_fonts} from "../../../constants/styles";

TutorInfoForm.propTypes = {
    tutorInfo: PropTypes.object,
    onSubmit: PropTypes.func,
    listAddresses: PropTypes.arrayOf(PropTypes.object)
};

const createSubjectsData = (subjects) => {
    return subjects.map(subject => ( {
        subjectId: subject.subjectId ? subject.subjectId : null,
        name: subject.name ? subject.name: null,
        level: subject.level ? subject.level : null,
        expectedFee: subject.expectedFee ? parseInt(subject.expectedFee) : -1,
        certificates: subject.certificates ? subject.certificates : null
    }))

}

function TutorInfoForm(props) {
    const tutorInfo = props.tutorInfo

    const [selectedSubjects, setSelectedSubjects] = useState(tutorInfo.subjects || [])

    const [teachingLocations, setTeachingLocations] = useState(tutorInfo.teachingLocations || [])

    const [availableTime, setAvailableTime] = useState(() => {
        return tutorInfo.availableTimes ?
            tutorInfo.availableTimes :
            new Array(constants.hoursOfWeek + 1).join(constants.NON_AVAILABLE_TIME_VALUE)
    })

    // console.log(availableTime)

    const [description,setDescription] = useState(tutorInfo.selfDescription)
    const editor = useRef(null)

    const listSubjects = props.listSubjects


    const renderTeachingLocations = (teachingLocations) => {
        return(
            <Stack>
                {
                    teachingLocations.map((location,idx)=>{
                        {
                            return location.detail !== tutorLocation.detail &&
                            location.detail !== studentLocation.detail ?
                                <Typography key={idx} variant="h8">
                                    {convertAddress(listAddresses, location)}
                                </Typography>
                                : <React.Fragment key={idx}></React.Fragment>
                        }
                    })
                }
            </Stack>
        )
    }

    const handleChangeTeachingAddresses = (address, isDelete) => {
        setTeachingLocations(prev=>{
            const idx = prev.findIndex(
                location => location.province === address.province
                    && location.district === address.district
                    && location.ward === address.ward
                    && location.detail === address.detail
            )
            if (isDelete !== true) {
                if (idx < 0) {
                    return [...prev, address]
                }
                return prev
            }
            else {
                if (idx > -1){
                    return [...prev.slice(0,idx),...prev.slice(idx+1)]
                }
                return prev
            }
        })
    }

    const handleChangeAvailableTime = (newAvailableTime) => {
        setAvailableTime(newAvailableTime)
    }


    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        const {onSubmit} = props;
        if (onSubmit) {
            const submitData ={
                teachingLocations: teachingLocations,
                subjects: createSubjectsData(selectedSubjects),
                selfDescription: description,
                availableTime: availableTime
            }
            onSubmit(submitData)
        }

    }

    return (
        <Box component="form" sx={{ mt: 1, px:5 }} onSubmit={handleUpdateSubmit}>

            <InputLabel id="teachingTime-label" sx={{color:app_colors._blackText, fontWeight:"bold", mt:2}}>
                Thời gian dạy
            </InputLabel>
            <TimeSelect availableTime={availableTime} onChangeAvailableTime={handleChangeAvailableTime}/>


            <InputLabel mt={2} id="teachingTime-label" sx={{color:app_colors._blackText, fontWeight:"bold", mt:2}}>
                Môn học
            </InputLabel>
            {listSubjects && selectedSubjects &&
                <SubjectSelect
                listSubjects={listSubjects}
                selectedSubjects={selectedSubjects}
                setSelectedSubjects={setSelectedSubjects}
                />
            }
            <InputLabel mt={2} id="teachingTime-label" sx={{color:app_colors._blackText, fontWeight:"bold", mt:2}}>
                Địa điểm dạy
            </InputLabel>
            <Stack>
                <FormControlLabel
                    control={
                        <Checkbox
                            size="small"
                            name={"studentAddress"}
                            onChange = {(e) => handleChangeTeachingAddresses(studentLocation,!e.target.checked)}
                            checked={teachingLocations.map(l=>l.detail).indexOf(studentLocation.detail) > -1}
                        />
                    }
                    label="Địa chỉ học viên"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            size="small"
                            name={"tutorAddress"}
                            onChange = {(e)=> handleChangeTeachingAddresses(tutorLocation,!e.target.checked)}
                            checked={teachingLocations.map(l=>l.detail).indexOf(tutorLocation.detail) > -1}
                        />
                    }
                    label="Địa chỉ gia sư"
                />
            </Stack>
            { teachingLocations.length > 0 &&
                renderTeachingLocations(teachingLocations)
            }
            <LocationSelect handleChangeTeachingAddresses={handleChangeTeachingAddresses}/>

            <InputLabel id="teachingTime-label" sx={{color:app_colors._blackText, fontWeight:"bold"}}>
                Giới thiệu
            </InputLabel>

            <JoditEditor
                ref={editor}
                value={description}
                tabIndex={1}
                onBlur={newContent => setDescription(newContent)}
                onChange={newContent => {}}
            />

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
    )
}


export default TutorInfoForm;