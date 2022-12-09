import React, {Fragment, useEffect, useState} from 'react';
import {
    Box,
    Checkbox,
    FormControl,
    FormControlLabel,
    Grid,
    Link,
    MenuItem,
    Slider,
    TextField,
    Typography
} from "@mui/material";
import {studentLocation, tutorLocation} from "../../../constants/value";
import {ageRanges, daysOfWeek, subjectLevels, timeSlots} from "../../../constants/userOptions";
import {app_colors} from "../../../constants/styles";

const renderGroupSubject = (group, groupSubjects, handleChangeField) => {
    return (<>
        <Typography variant="h6" fontWeight="bold" fontSize="18px">Môn học</Typography>
        <Box mt={1} width="100%">
            <TextField select label="Nhóm môn học" size="small" fullWidth
                       onChange={(e) => handleChangeField('groupSubject', e.target.value)} value={group}>
                {groupSubjects && Array.from(groupSubjects.keys()).map((group, idx) =>
                    <MenuItem key={idx} value={group}>
                        {group}
                    </MenuItem>
                )}
            </TextField>
        </Box>
    </>)
}

const renderSubjects = (displayedSubjects, subjects, handleChangeField) => {
    // TODO: bug in select subject
    return <>
        <Box mt={1} width="100%">
            {displayedSubjects && displayedSubjects.map((subject, idx) =>
                <div key={subject.subjectId}>
                    <FormControlLabel
                        key={subject.subjectId}
                        label={subject.name}
                        control={<Checkbox key={subject.subjectId} color="success"
                                           value={subjects.has(subject.id)}
                                           defaultChecked={false}
                                           // checked={subjects.has(subject.subjectId)}
                                           onChange={e => handleChangeField('subject', subject.subjectId)}
                                           size="small"/>}
                    />
                    <br/>
                </div>
            )}
        </Box>
    </>
}

const renderTimeFilter = (handleChangeField) => {
    return <>
        <Typography mt={1} variant="h6" fontWeight="bold" fontSize="18px">Thời gian</Typography>
        <Typography mt={0.5} variant="h6" fontWeight="bold" fontSize="16px">Khung giờ</Typography>
        <Box width="100%">
            {timeSlots.map(slot => <Fragment key={slot.value}>
                    <FormControlLabel
                        label={slot.title}
                        value={slot.value}
                        control={<Checkbox color="success"
                                           onChange={e => handleChangeField("hourOfDay", slot.value)}
                                           size="small"/>}
                    />
                    <br/>
                </Fragment>
            )}
        </Box>
        <Typography mt={0.5} variant="h6" fontWeight="bold" fontSize="16px">Ngày trong tuần</Typography>
        <Box width="100%">
            {daysOfWeek.map(day => <Fragment key={day.code}>
                    <FormControlLabel
                        label={day.title}
                        value={day.value}
                        control={<Checkbox color="success"
                                           onChange={e => handleChangeField("dayOfWeek", day.value)}
                                           size="small"/>}
                    />
                    <br/>
                </Fragment>
            )}
        </Box>
    </>
}

const renderFeeFilter = (fee, handleChangeField) => {
    return <>
        <Typography mt={1} variant="h6" fontWeight="bold" fontSize="18px">Chi phí</Typography>
        <Box mt={0} mx={0} width="100%">
            <Grid container>
                <Grid item md={6} pr={0.5}>
                    <TextField
                        fullWidth
                        margin="dense"
                        autoComplete="off"
                        size="small"
                        value={fee[0]}
                        disabled
                    />
                </Grid>
                <Grid item md={6} pl={0.5}>
                    <TextField
                        fullWidth
                        margin="dense"
                        autoComplete="off"
                        size="small"
                        value={fee[1]}
                        disabled
                    />
                </Grid>
            </Grid>
            <Slider
                getAriaLabel={() => 'Fee'}
                size="small"
                value={fee}
                step={10000}
                min={50000}
                max={500000}
                valueLabelDisplay="auto"
                sx={{color: "#22C55E"}}
                onChange={e => handleChangeField("fee", e.target.value)}
            />
        </Box>
    </>
}

const renderLocationFilter = (distance, handleChangeField) => {
    return <>
        <Typography mt={1} variant="h6" fontWeight="bold" fontSize="18px">Vị trí</Typography>
        <Box mt={0} width="100%">
            <FormControlLabel
                label="Vị trí gia sư"
                value="tutorPlace"
                control={<Checkbox color="success"
                                   onChange={e => handleChangeField("location", tutorLocation.detail)}
                                   size="small"/>}
            />
            <FormControlLabel
                label="Vị trí học viên"
                value="tutorPlace"
                control={<Checkbox color="success"
                                   onChange={e => handleChangeField("location", studentLocation.detail)}
                                   size="small"/>}
            />
        </Box>
        <Typography mt={1} variant="h6" fontWeight="bold" fontSize="18px">Khoảng cách (km)</Typography>
        <Box mt={0} width="100%">
            <Slider
                size="small"
                aria-label="Distance"
                value={distance}
                step={0.5}
                min={0.5}
                max={20}
                valueLabelDisplay="auto"
                sx={{color: "#22C55E"}}
                onChange={e => handleChangeField("distance", e.target.value)}
            />
        </Box>
    </>
}

const renderTutorInfoFilter = (handleChangeField) => {
    return <>
        <Typography mt={1} variant="h6" fontWeight="bold" fontSize="18px">Gia sư</Typography>
        <Typography mt={0.5} variant="h6" fontWeight="bold" fontSize="16px">Giới tính</Typography>
        <Box mt={0} width="100%">
            <FormControlLabel
                label="Gia sư nam"
                value="tutorPlace"
                control={<Checkbox color="success"
                                   onChange={e => handleChangeField("location", studentLocation.detail)}
                                   size="small" defaultChecked/>}
            />
            <br/>
            <FormControlLabel
                label="Gia sư nữ"
                value="tutorPlace"
                control={<Checkbox color="success"
                                   onChange={e => handleChangeField("location", studentLocation.detail)}
                                   size="small" defaultChecked/>}
            />
        </Box>
        <Typography mt={0.5} variant="h6" fontWeight="bold" fontSize="16px">Độ tuổi</Typography>
        <Box width="100%">
            {ageRanges.filter(i => i.value !== 'all').map(age => <Fragment key={age.value}>
                    <FormControlLabel
                        label={age.title}
                        value={age.value}
                        control={<Checkbox color="success"
                                           onChange={e => handleChangeField("age", age.value)}
                                           size="small" defaultChecked/>}
                    />
                    <br/>
                </Fragment>
            )}
        </Box>
        <Typography mt={0.5} variant="h6" fontWeight="bold" fontSize="16px">Trình độ</Typography>
        <Box width="100%">
            {subjectLevels.map(level => <Fragment key={level.value}>
                    <FormControlLabel
                        label={level.title}
                        value={level.value}
                        control={<Checkbox color="success"
                                           onChange={e => handleChangeField("level", level.value)}
                                           size="small" defaultChecked/>}
                    />
                    <br/>
                </Fragment>
            )}
        </Box>

    </>
}


function GetAllPostFilter(...props) {
    const listSubjects = [
        {
            "subjectId": "2b4ed9ee-d504-423a-9ab9-dec0fdcc4f3b",
            "name": "Văn 10",
            "group": "Văn học",
            "order": "1,1,1"
        },
        {
            "subjectId": "4b0a27c5-7056-414f-8903-d7636dd5ec40",
            "name": "Toán 11",
            "group": "Toán học",
            "order": "1,1,1"
        },
        {
            "subjectId": "c58373e8-5fd4-417f-a69e-370bea79c03b",
            "name": "Văn 12",
            "group": "Văn học",
            "order": "1"
        },
        {
            "subjectId": "d054b3a3-26cb-4c51-87a1-b7c89fe12a7e",
            "name": "Văn 11",
            "group": "Văn học",
            "order": "1,1"
        },
        {
            "subjectId": "1d81ff76-004e-4941-9b30-0e77fa2b9848",
            "name": "Toán 12",
            "group": "Toán học",
            "order": "1,1"
        },
        {
            "subjectId": "7f4a2e93-564e-417b-99ba-9181f880e1fa",
            "name": "Toán 10",
            "group": "Toán học",
            "order": "1,1,1,1"
        },
        {
            "subjectId": "692027f5-8680-4002-9160-b42f28a8332f",
            "name": "Toán ôn ĐH",
            "group": "Toán học",
            "order": "1"
        }
    ]
    const [groupSubjects, setGroupSubjects] = useState(new Map())
    const [group, setGroup] = useState("")
    const [subjects, setSubjects] = useState(new Set())
    const [locations, setLocations] = useState({tutor: false, student: false})
    const [distance, setDistance] = useState(5)
    const [fee, setFee] = useState([100000, 150000])
    let [displayedSubjects, setDisplayedSubjects] = useState([])
    const handleSubmitFrom = (e) => {
        console.log("submit")
        e.preventDefault();
    }
    const handleChangeField = (field, value, valueExt = "") => {
        console.log(field, value)
        switch (field) {
            case "groupSubject":
                setGroup(value)
                setSubjects(new Set())
                break
            case "subject":
                if (subjects.has(value)) subjects.delete(value)
                else subjects.add(value)
                console.log(subjects.has(value))
                setSubjects(subjects)
                break
            case "location":
                if (value === tutorLocation.detail) setLocations({...locations, tutor: !locations.tutor})
                else setLocations({...locations, student: !locations.student})
                break
            case "distance":
                setDistance(+value)
                break
            case "fee":
                setFee(value)
                break
            default:
        }
    }

    useEffect(() => {
        const map = new Map()
        if (listSubjects) listSubjects.forEach(sub => {
            if (!map.has(sub.group)) map.set(sub.group, [])
            map.get(sub.group).push(sub)
        })
        setGroupSubjects(map)
    }, [])

    useEffect(() => {
        const arr = groupSubjects.get(group)
        if (arr) {
            arr.sort((a, b) => a.order.localeCompare(b.order))
            setDisplayedSubjects(arr)
        }
    }, [group])

    return (
        <Grid container item md={12} px={3} py={3}>
            <FormControl onSubmit={handleSubmitFrom} sx={{width: "100%"}}>

                {renderGroupSubject(group, groupSubjects, handleChangeField)}
                {renderSubjects(displayedSubjects, subjects, handleChangeField)}
                {renderTimeFilter(handleChangeField)}
                {renderFeeFilter(fee, handleChangeField)}
                {renderLocationFilter(distance, handleChangeField)}
                {renderTutorInfoFilter(handleChangeField)}
                <Box width="100%">
                    <Grid container>
                        <Grid item md={6} pr={0.5}>
                            <Link
                                underline="none"
                                color="#999999"
                                fontWeight="medium"
                                fontFamily="Roboto"
                                border="1px solid  #EEEEEE"
                                variant="contained"
                                width="100%"
                                display="block"
                                height="32px"
                                textAlign="center"
                                lineHeight="32px"
                                borderRadius="2px"
                                mt={1}
                                sx={{
                                    backgroundColor: "#F7F8FC",
                                    cursor: "pointer",
                                    // '&:hover': {backgroundColor: app_colors._hoverPurple, color: app_colors._whiteText},
                                }}
                            >
                                Hủy
                            </Link>
                        </Grid>
                        <Grid item md={6} pl={0.5}>
                            <Link
                                underline="none"
                                color={app_colors._whiteText}
                                fontWeight="medium"
                                fontFamily="Roboto"
                                variant="contained"
                                width="100%"
                                display="block"
                                height="32px"
                                textAlign="center"
                                lineHeight="32px"
                                borderRadius="2px"
                                mt={1}
                                cursor={"pointer"}
                                onClick={handleSubmitFrom}
                                sx={{
                                    backgroundColor: app_colors._primaryPurple,
                                    cursor: "pointer",
                                    '&:hover': {backgroundColor: app_colors._hoverPurple},
                                }}
                            >
                                Tìm kiếm
                            </Link>
                        </Grid>
                    </Grid>
                </Box>


            </FormControl>
        </Grid>
    )
}

export default GetAllPostFilter;