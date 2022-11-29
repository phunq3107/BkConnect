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
import {subjectLevels} from "../../../constants";

SubjectSelect.propTypes = {
    selectedSubjects: PropTypes.arrayOf(PropTypes.object),
    setSelectedSubjects: PropTypes.func,
    listSubjects: PropTypes.arrayOf(PropTypes.object)
};

function SubjectSelect(props) {

    const {selectedSubjects, setSelectedSubjects, listSubjects} = props

    const renderSubjectLevelRadio = (subject) => {
        return(
            <RadioGroup row name="subjectLevel">
                {
                    subjectLevels.map((level,idx)=>{
                        return(
                            <FormControlLabel
                                key={idx}
                                control={
                                    <Radio
                                        size="small"
                                        key={idx}
                                        onChange={(e) => handleChangeSubjectLevel(e,subject)}
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

    const handleChangeSubjects = (e) => {
        const idx = selectedSubjects.findIndex(subject => subject.id === e.target.value)
        if (idx < 0){
            const selectedSubject = listSubjects.find(subject => subject.id === e.target.value)
            setSelectedSubjects(prev => [...prev,selectedSubject])
        }
    }

    const handleDeleteSubjects = (deletedSubject) => {
        setSelectedSubjects(prev => prev.filter(subject => subject.id !== deletedSubject.id))
    }


    const handleChangeSubjectLevel = (e,subject) => {
        //TODO
    }

    return (
        <>
            <Select
                fullWidth
                margin="dense"
                id="subjects"
                name="subjects"
                autoComplete="off"
                size="small"
                onChange={(e) => handleChangeSubjects(e)}
                defaultValue=""
                value={selectedSubjects.length > 0 ? selectedSubjects[selectedSubjects.length-1].id : ""}
            >
                {listSubjects.map((subject,idx) => {
                    return <MenuItem key={idx} value={subject.id}>{subject.name}</MenuItem>
                })}
                <MenuItem value="" sx={{display:"none"}}></MenuItem>
            </Select>
            {selectedSubjects.length > 0 &&
                <>
                    <Stack direction="row" spacing={1} mt={1}>
                        {selectedSubjects.map((subject, idx) => {
                            return <Chip size="small" key={idx} label={subject.name} onDelete={() => handleDeleteSubjects(subject)}/>
                        })}
                    </Stack>

                    <Stack direction="column" spacing={1} mt={2}>
                        {selectedSubjects.map((subject,idx) => {
                            return(
                                <Stack key={idx} direction="row" spacing={1} justifyContent="space-between">
                                    <Grid item width="20%">
                                        <Typography variant="h8" fontWeight="bold">{subject.name}</Typography>
                                    </Grid>
                                    <Grid item width="70%">
                                        {renderSubjectLevelRadio(subject)}
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            id="expectedFee"
                                            name="expectedFee"
                                            autoComplete="off"
                                            size="small"
                                            type="number"
                                            label="Học phí mong muốn"
                                        />
                                    </Grid>
                                </Stack>
                            )
                        })}
                    </Stack>
                </>
            }
        </>
    );
}

export default SubjectSelect;