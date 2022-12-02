import React, {useState, useReducer, useRef} from 'react';
import PropTypes from 'prop-types';
import constants, {
    ageRanges,
    app_colors, app_fonts,
    lessonTime,
    studentLocation,
    subjectLevels,
    tutorLocation
} from "../../../constants";
import {
    Box, Button, Checkbox,
    Divider,
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

    const editor = useRef(null)

    const renderSubjectSelector = (listSubjects) => {
        return(
            <Grid container flexDirection="row" columnGap="5%">
                <Grid item flexDirection="column" width="30%">
                    <InputLabel
                        id="subjectGroup-label"
                        sx={{color:app_colors._blackText, fontWeight:"bold"}}
                    >
                        Môn học
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
                        Nhóm môn học
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
                fee: fee? fee.toString() + "," + fee.toString() : "-1",
                description: description,
                //TODO: distance?
            }
            onSubmit(submitData);
        }
    }


    return (
        <Box component="form" sx={{ mt: 1, px:5 }} onSubmit={handleCreatePostSubmit}>

            {renderSubjectSelector(listSubjects)}

            <Grid container flexDirection="row" columnGap="5%">
                <Grid item flexDirection="column" width="30%">
                    <InputLabel
                        id="timesPerWeek-label"
                        sx={{color:app_colors._blackText, fontWeight:"bold"}}
                    >
                        Số buổi học <Typography variant="caption">(buổi/tuần)</Typography>
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
                        Thời lượng
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

            <Grid item>
                <Typography sx={{color:app_colors._blackText, fontWeight:"bold", mt:2}}>Thời gian học</Typography>
            </Grid>

            <InputLabel mt={2} id="teachingTime-label" sx={{color:app_colors._blackText, fontWeight:"bold", mt:2}}>
                Địa điểm học
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

            <Grid item width="30%">
                <InputLabel mt={2} id="teachingTime-label" sx={{color:app_colors._blackText, fontWeight:"bold", mt:2}}>
                    Học phí <Typography variant="caption">(VNĐ)</Typography>
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

            <Typography sx={{color:app_colors._blackText, fontWeight:"bold", my:2,}}>Gia sư</Typography>
            <Grid container flexDirection="row" columnGap="5%">
                <Grid item flexDirection="column" width="30%">
                    <InputLabel
                        id="tutorLevel-label"
                        sx={{color:app_colors._blackText, fontWeight:"bold"}}
                    >
                        Trình độ
                    </InputLabel>
                    <Select
                        fullWidth
                        margin="dense"
                        id="level"
                        name="level"
                        size="small"
                        onChange={handleChange}
                        defaultValue="all">
                        <MenuItem value='all'>Tất cả</MenuItem>
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
                        Giới tính
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
                        <MenuItem value='all'>Tùy</MenuItem>
                        <MenuItem value='male'>Nam</MenuItem>
                        <MenuItem value='female'>Nữ</MenuItem>
                    </Select>
                </Grid>
                <Grid item width="30%">
                    <InputLabel
                        id="ageRange-label"
                        sx={{color:app_colors._blackText, fontWeight:"bold"}}
                    >
                        Độ tuổi
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

            <Typography sx={{color:app_colors._blackText, fontWeight:"bold", my:2,}}>Nhóm</Typography>
            <Grid container flexDirection="row" columnGap="5%">
                <Grid item width="30%">
                    <InputLabel
                        id="group-label"
                        sx={{color:app_colors._blackText, fontWeight:"bold"}}
                    >
                       Số học viên
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
                    <FormControlLabel control={<Checkbox name="isGroup" onChange={handleChange}/>} label={"Tìm nhóm"}/>
                </Grid>
            </Grid>

            <Typography sx={{color:app_colors._blackText, fontWeight:"bold", my:2,}}>Mô tả</Typography>
            <Grid item width="50%" px={1} my={1}>
                <InputLabel
                    id="title-label"
                    sx={{color:app_colors._blackText, fontWeight:"bold"}}
                >
                    Tiêu đề
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
                        Tạo bài đăng
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}

export default CreatePostForm;