import React from 'react';
import PropTypes from 'prop-types';
import {
    Chip,
    FormControlLabel,
    Grid,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {subjectLevels} from "../../../constants/userOptions";

SubjectSelect.propTypes = {
    selectedSubjects: PropTypes.arrayOf(PropTypes.object),
    setSelectedSubjects: PropTypes.func,
    listSubjects: PropTypes.arrayOf(PropTypes.object)
};

function SubjectSelect(props) {

    const {selectedSubjects, setSelectedSubjects, listSubjects} = props

    const renderSubjectLevelRadio = (subject, subjectIdx) => {
        return(
            <RadioGroup row name="subjectLevel"
                        value={subject.level ? subject.level : "1"}
                        onChange={(e) => handleChangeSubjectLevel(e, subjectIdx)}
            >
                {
                    subjectLevels.map((level,idx)=>{
                        return(
                            <FormControlLabel
                                key={idx}
                                control={
                                    <Radio
                                        size="small"
                                        key={idx}
                                        value={level.value}
                                    />
                                }
                                label={level.title}
                            />
                        )
                    })
                }
            </RadioGroup>
        )
    }

    const renderListSubjects = (listSubjects) => {
        return(
            <Select
                fullWidth
                margin="dense"
                id="subjects"
                name="subjects"
                autoComplete="off"
                size="small"
                onChange={(e) => handleChangeSubjects(e)}
                defaultValue=""
                value={selectedSubjects.length > 0 ? selectedSubjects[selectedSubjects.length-1].subjectId : ""}
            >
                {listSubjects && listSubjects.map((subject,idx) => {
                    return <MenuItem key={idx} value={subject.subjectId}>{subject.name}</MenuItem>
                })}
                <MenuItem value="" sx={{display:"none"}}></MenuItem>
            </Select>
        )
    }

    const renderSelectedSubjects = (selectedSubjects) => {
        return(
            <>
                {selectedSubjects.map((subject,idx) => {
                    return(
                        <Stack key={idx} direction="row" spacing={1} justifyContent="space-between">
                            <Grid item alignSelf="center" width="20%">
                                <Typography variant="h8" fontWeight="bold">{subject.name}</Typography>
                            </Grid>
                            <Grid item width="80%">
                                {renderSubjectLevelRadio(subject,idx)}
                            </Grid>
                            <Grid item>
                                <TextField
                                    id="expectedFee"
                                    name="expectedFee"
                                    autoComplete="off"
                                    size="small"
                                    type="number"
                                    label="Học phí"
                                    value={subject.expectedFee && subject.expectedFee !== -1 ? subject.expectedFee : ""}
                                    onChange={(e) => handleChangeExpectedFee(e,idx)}
                                />
                            </Grid>
                        </Stack>
                    )
                })}
            </>
        )
    }

    const handleChangeSubjects = (e) => {
        const idx = selectedSubjects.findIndex(subject => subject.subjectId === e.target.value)
        if (idx < 0){
            const selectedSubject = listSubjects.find(subject => subject.subjectId === e.target.value)
            setSelectedSubjects(prev => [...prev,selectedSubject])
        }
    }

    const handleDeleteSubjects = (deletedSubject) => {
        setSelectedSubjects(prev => prev.filter(subject => subject.subjectId !== deletedSubject.subjectId))
    }


    const handleChangeSubjectLevel = (e, idx) => {
        if (idx > -1){
            const updatedSubject = {
                ...selectedSubjects[idx] ,
                level: e.target.value
            }
            setSelectedSubjects(prev => [...prev.slice(0,idx),updatedSubject, ...prev.slice(idx+1)])
        }
    }

    const handleChangeExpectedFee = (e, idx) => {
        if (idx > -1){
            const updatedSubject = {
                ...selectedSubjects[idx] ,
                expectedFee: e.target.value ? parseInt(e.target.value) : -1
            }
            setSelectedSubjects(prev => [...prev.slice(0,idx),updatedSubject, ...prev.slice(idx+1)])
        }
    }

    return (
        <>
            {renderListSubjects(listSubjects)}
            {selectedSubjects.length > 0 &&
                <>
                    <Stack direction="row" spacing={1} mt={1}>
                        {selectedSubjects.map((subject, idx) => {
                            return <Chip size="small" key={idx} label={subject.name}
                                         onDelete={() => handleDeleteSubjects(subject)}
                            />
                        })}
                    </Stack>

                    <Stack direction="column" spacing={1} mt={2}>
                        {renderSelectedSubjects(selectedSubjects)}
                    </Stack>
                </>
            }
        </>
    );
}

export default SubjectSelect;