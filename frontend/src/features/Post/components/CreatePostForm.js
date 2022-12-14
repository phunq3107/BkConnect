import React, {useReducer, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import constants, {studentLocation, tutorLocation} from "../../../constants/value";
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import listAddresses from "../../../assets/vietnam_province.json"
import JoditEditor from "jodit-react";
import LocationSelect from "../../../commons/LocationSelector/LocationSelect";
import convertAddress from "../../../utils/addressUtils";
import RequireLoginModal from "../../../commons/Modal/RequireLoginModal";
import TimeTable from "./TimeTable";
import {ageRanges, lessonTime, subjectLevels} from "../../../constants/userOptions";
import {app_colors, app_fonts} from "../../../constants/styles";

CreatePostForm.propTypes = {
    listSubjects: PropTypes.arrayOf(PropTypes.object),
    onSubmit: PropTypes.func
};

const formReducer = (state,event) =>{
    return{
        ...state,
        [event.name]: event.value
    }
}

function CreatePostForm(props) {
    const {listSubjects} = props

    const [formData, setFormData] = useReducer(formReducer, {})
    const [selectedSubject, setSelectedSubject] = useState(listSubjects[0])
    const [teachingLocations, setTeachingLocations] = useState([])
    const [fee,setFee] = useState("")
    const [timesPerWeek, setTimesPerWeek] = useState(constants.MIN_TIMES_PER_WEEK)
    const [noStudents, setNoStudents] = useState("1")
    const [description, setDescription] = useState("")
    const [times, setTimes] = useState(Array(constants.hoursOfWeek).fill("0"))

    const editor = useRef(null)

    const renderSubjectSelector = (listSubjects) => {
        return(
            <Grid container flexDirection="row" columnGap="5%" my={3}>
                <Grid item flexDirection="column" width="30%">
                    <InputLabel
                        id="subjectGroup-label"
                        sx={{color:app_colors._blackText, fontWeight:"bold"}}
                    >
                        M??n h???c
                    </InputLabel>
                    <Select
                        fullWidth
                        margin="dense"
                        id="subjects"
                        name="subjects"
                        autoComplete="off"
                        size="small"
                        onChange={(e) => handleChangeSubject(e)}
                        defaultValue=""
                        value={selectedSubject ? selectedSubject.subjectId : ""}
                    >
                        {listSubjects && listSubjects.map((subject,idx) => {
                            return <MenuItem key={idx} value={subject.subjectId}>{subject.name}</MenuItem>
                        })}
                        <MenuItem value="" sx={{display:"none"}}></MenuItem>
                    </Select>
                </Grid>

                <Grid item width="30%">
                    <InputLabel
                        id="subjectGroup-label"
                        sx={{color:app_colors._blackText, fontWeight:"bold"}}
                    >
                        Nh??m m??n h???c
                    </InputLabel>
                    <TextField
                        fullWidth
                        id="subjectGroup"
                        name="subjectGroup"
                        autoComplete="off"
                        size="small"
                        value={selectedSubject ? selectedSubject.group : ""}
                        disabled
                    />
                </Grid>
            </Grid>
        )
    }

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

    const handleChangeSubject = (e) => {
        setSelectedSubject(listSubjects.find(subject => subject.subjectId === e.target.value))
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

    const handleChange = event => {
        const name = event.target.name
        setFormData({
            name: name,
            value: name === "isGroup" ? event.target.checked : event.target.value,
        });
    }

    const handleChangeNumberValue = (e,min,max, setter, defaultValue) => {
        if (e.target.value === ""){
            setter(defaultValue)
            return
        }
        const intValue = parseInt(e.target.value)
        if (intValue > max){
            setter(max.toString())
        }
        else if (intValue < min){
            setter(defaultValue)
        }
        else setter(e.target.value)
    }
    const handleCreatePostSubmit = (e) => {
        e.preventDefault();
        const {onSubmit} = props;
        if (onSubmit) {
            const submitData ={
                hoursPerLesson: constants.DEFAULT_HOURS_PER_LESSON,
                gender: "all",
                age: "all",
                level: "all",
                noStudents: "1,1",
                title: "",
                ...formData,
                subject: selectedSubject.subjectId ? selectedSubject.subjectId : null,
                timesPerWeek: timesPerWeek ? parseInt(timesPerWeek.toString()) : null,
                location: teachingLocations && teachingLocations.length > 0 ? teachingLocations : [],
                fee: fee? fee : "-1",
                description: description,
                availableTime:times.join(''),
                distance:null
                //TODO: distance?
            }
            onSubmit(submitData);
        }
    }


    return (
        <Box component="form" sx={{ mt: 1, px:5 }} onSubmit={handleCreatePostSubmit}>
            <Grid item width="100%" my={1}>
                <InputLabel
                    id="title-label"
                    sx={{color:app_colors._blackText, fontWeight:"bold"}}
                >
                    Ti??u ?????
                </InputLabel>
                <TextField
                    fullWidth
                    id="title"
                    type="text"
                    name="title"
                    size="small"
                    onChange={handleChange}
                />
            </Grid>

            {renderSubjectSelector(listSubjects)}

            <Grid container flexDirection="row" columnGap="5%" my={2}>
                <Grid item flexDirection="column" width="30%">
                    <InputLabel
                        id="timesPerWeek-label"
                        sx={{color:app_colors._blackText, fontWeight:"bold"}}
                    >
                        S??? bu???i h???c <Typography variant="caption">(bu???i/tu???n)</Typography>
                    </InputLabel>
                    <TextField
                        fullWidth
                        id="timesPerWeek"
                        type="number"
                        name="timesPerWeek"
                        size="small"
                        value={timesPerWeek}
                        onChange={e =>
                            handleChangeNumberValue(e,constants.MIN_TIMES_PER_WEEK,
                                constants.MAX_TIMES_PER_WEEK,setTimesPerWeek,constants.MIN_TIMES_PER_WEEK.toString())}
                        InputProps={{
                            inputProps: {
                                max: constants.MAX_TIMES_PER_WEEK, min: constants.MIN_TIMES_PER_WEEK
                            }
                        }}
                    />
                </Grid>

                <Grid item width="30%">
                    <InputLabel
                        id="hoursPerLesson-label"
                        sx={{color:app_colors._blackText, fontWeight:"bold"}}
                    >
                        Th???i l?????ng
                    </InputLabel>
                    <Select
                        fullWidth
                        margin="dense"
                        id="hoursPerLesson"
                        name="hoursPerLesson"
                        autoComplete="off"
                        size="small"
                        onChange={handleChange}
                        defaultValue={1.5}
                    >
                        {listSubjects && lessonTime.map((time,idx) => {
                            return <MenuItem key={idx} value={time.value}>{time.title}</MenuItem>
                        })}
                        <MenuItem value="" sx={{display:"none"}}></MenuItem>
                    </Select>
                </Grid>
            </Grid>

            <Grid item container width="100%">
                <Typography sx={{color:app_colors._blackText, fontWeight:"bold", mt:2}}>Th???i gian h???c</Typography>
                <TimeTable times={times} setTimes={setTimes}/>
            </Grid>

            <InputLabel mt={2} id="teachingTime-label" sx={{color:app_colors._blackText, fontWeight:"bold", mt:2}}>
                ?????a ??i???m h???c
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
                    label="?????a ch??? h???c vi??n"
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
                    label="?????a ch??? gia s??"
                />
            </Stack>
            { teachingLocations.length > 0 &&
                renderTeachingLocations(teachingLocations)
            }
            <LocationSelect handleChangeTeachingAddresses={handleChangeTeachingAddresses}/>

            <Grid item width="30%">
                <InputLabel mt={2} id="teachingTime-label" sx={{color:app_colors._blackText, fontWeight:"bold", mt:2}}>
                    H???c ph?? <Typography variant="caption">(VN??/bu???i)</Typography>
                </InputLabel>
                <TextField
                    fullWidth
                    id="fee"
                    type="number"
                    name="fee"
                    size="small"
                    onChange={e => handleChangeNumberValue(e,constants.MIN_FEE, constants.MAX_FEE,setFee,"")}
                    value={fee}
                    InputProps={{
                        inputProps: {
                            max: constants.MAX_FEE, min: constants.MIN_FEE
                        }
                    }}
                />
            </Grid>

            <Typography sx={{color:app_colors._blackText, fontWeight:"bold", my:2,}}>Gia s??</Typography>
            <Grid container flexDirection="row" columnGap="5%">
                <Grid item flexDirection="column" width="30%">
                    <InputLabel
                        id="tutorLevel-label"
                        sx={{color:app_colors._blackText, fontWeight:"bold"}}
                    >
                        Tr??nh ?????
                    </InputLabel>
                    <Select
                        fullWidth
                        margin="dense"
                        id="level"
                        name="level"
                        size="small"
                        onChange={handleChange}
                        defaultValue="all">
                        <MenuItem value='all'>T???t c???</MenuItem>
                        {
                            subjectLevels.map((level,idx)=>{
                                return <MenuItem key={idx} value={level.value}>{level.title}</MenuItem>
                            })
                        }
                    </Select>
                </Grid>

                <Grid item width="30%">
                    <InputLabel
                        id="hoursPerLesson-label"
                        sx={{color:app_colors._blackText, fontWeight:"bold"}}
                    >
                        Gi???i t??nh
                    </InputLabel>
                    <Select
                        fullWidth
                        margin="dense"
                        id="gender"
                        name="gender"
                        autoComplete="off"
                        size="small"
                        onChange={handleChange}
                        defaultValue="all"
                    >
                        <MenuItem value='all'>C??? nam v?? n???</MenuItem>
                        <MenuItem value='male'>Nam</MenuItem>
                        <MenuItem value='female'>N???</MenuItem>
                    </Select>
                </Grid>
                <Grid item width="30%">
                    <InputLabel
                        id="ageRange-label"
                        sx={{color:app_colors._blackText, fontWeight:"bold"}}
                    >
                        ????? tu???i
                    </InputLabel>
                    <Select
                        fullWidth
                        margin="dense"
                        id="age"
                        name="age"
                        autoComplete="off"
                        size="small"
                        onChange={handleChange}
                        defaultValue="all"
                    >
                        {
                            ageRanges.map((range,idx)=>{
                                return <MenuItem key={idx} value={range.value}>{range.title}</MenuItem>
                            })
                        }
                    </Select>
                </Grid>
            </Grid>

            <Typography sx={{color:app_colors._blackText, fontWeight:"bold", my:2,}}>Nh??m</Typography>
            <Grid container flexDirection="row" columnGap="5%">
                <Grid item width="30%">
                    <InputLabel
                        id="group-label"
                        sx={{color:app_colors._blackText, fontWeight:"bold"}}
                    >
                       S??? h???c vi??n
                    </InputLabel>
                    <TextField
                        fullWidth
                        id="noStudents"
                        type="number"
                        name="noStudents"
                        size="small"
                        value={noStudents}
                        onChange={e =>
                            handleChangeNumberValue(e,constants.MIN_NUMBER_OF_STUDENTS,
                                constants.MAX_NUMBER_OF_STUDENTS,setNoStudents,constants.MIN_NUMBER_OF_STUDENTS.toString())}
                        InputProps={{
                            inputProps: {
                                max: constants.MAX_NUMBER_OF_STUDENTS, min: constants.MIN_NUMBER_OF_STUDENTS
                            }
                        }}
                    />
                </Grid>
                <Grid item width="30%" alignSelf="self-end">
                    <FormControlLabel control={<Checkbox name="isGroup" onChange={handleChange}/>} label={"T??m nh??m"}/>
                </Grid>
            </Grid>

            <Typography sx={{color:app_colors._blackText, fontWeight:"bold", my:2,}}>M?? t???</Typography>
            <JoditEditor
                ref={editor}
                value={description}
                tabIndex={1}
                onBlur={newContent => setDescription(newContent)}
                onChange={newContent => {}}
            />

            <Grid container flexDirection="row" columnGap="5%" justifyContent="end">
                <Grid item width="20%">
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3,
                            mb: 2 ,
                            backgroundColor: app_colors._primaryPurple,
                            '&:hover': {backgroundColor:app_colors._hoverPurple,},
                            fontFamily: app_fonts._primaryFont,
                            fontWeight: "bold"
                        }}
                    >
                        T???o b??i ????ng
                    </Button>
                </Grid>
            </Grid>

            <RequireLoginModal/>
        </Box>
    );
}

export default CreatePostForm;