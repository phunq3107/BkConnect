import React from 'react';
import PropTypes from 'prop-types';
import {Divider, Grid, IconButton, Typography} from "@mui/material";
import UserAvatar from "../../../commons/UserAvatar/UserAvatar";
import {Clear} from "@mui/icons-material";
import dayjs from "dayjs";
import {lessonTime} from "../../../constants/userOptions";

MyClassesItem.propTypes = {
    clazz: PropTypes.object
};

function MyClassesItem(props) {

    const {clazz} = props

    const handleCancelClass = (clazz) => {
        props.onSelectCancelledClass(clazz)
    }

    const renderListFields = (clazz) => {

        const getNoStudentsValue = (noStudents) => {
            if (!noStudents){
                return ""
            }
            const [from,to] = noStudents.split(',')
            if (from === to)
                return from + " học viên"
            return from + " - " + to +  " học viên"
        }

        const  listFields = [
            {title: "Ngày nhận lớp:", value:dayjs(clazz.createTime).format('DD/MM/YYYY, HH:mm') },
            {title: "Môn học:", value: clazz.post.subject.name},
            {title: "Số buổi học:", value: clazz.post.timesPerWeek + " buổi/tuần"},
            {title: "Thời lượng buổi học:", value: lessonTime.find(l => l.value === clazz.post.hoursPerLesson).title},
            {title: "Số học viên:", value: getNoStudentsValue(clazz.post.noStudents)},
            {title: "Mô tả thêm:", value: clazz.post.description}
        ]
        return(
            <>
                {
                    listFields.map((field, idx) => {
                        return (
                            <Grid key={idx} item container flexDirection="row" width="100%" mt="2%">
                                <Grid item width="25%">
                                    <Typography sx={{color: "#575757"}} variant="subtitle2">{field.title}</Typography>
                                </Grid>
                                <Grid item width="75%" container flexDirection="row">
                                    {renderFieldContent(field)}
                                </Grid>
                            </Grid>
                        )
                    })
                }
            </>
        )
    }

    const renderFieldContent = (field) =>{
        if (field.title === "Mô tả thêm:"){
            return <Typography
                variant="subtitle2"
                style={{overflowWrap:'break-word'}}
                dangerouslySetInnerHTML={{__html:field.value ? field.value : ""}}
            />
        }
        return (
            <Typography variant="subtitle2">{field.value ? field.value : "Chưa cập nhật"}</Typography>
        )
    }

    const renderClassState = (state) => {
        if (!state){
            return
        }
        let title = ""
        let borderColor = ""
        switch (state){
            case 'CREATE': //TODO: class states ???
                borderColor="#1488db"
                title="Đang diễn ra"
        }
        const res ={
            sx:{
                px:1,
                py:0.5,
                borderColor: borderColor
            },
            title:title
        }
        return (
            <Grid item
                  alignSelf="center"
                  width="max-content"
                  ml="4%"
                  sx={{...res.sx}}
                  border={1}
                  borderRadius={4}
            >
                <Typography fontSize="small">{res.title}</Typography>
            </Grid>
        )
    }


    return (
        <>
        <Grid item width="100%" mt="3%" container mb="1%">
            <Grid item container flexDirection="row" width="100%" minHeight="20%">
                <Grid item container width="10%" height="100%">
                    {clazz.post.createBy && <UserAvatar user={clazz.post.createBy} height="100%" width="100%"/>}
                </Grid>
                <Grid item container width="87%" ml="3%" flexDirection="row" height="100%">
                    <Grid item alignSelf="center" width="max-content">
                        <Typography variant="h8" fontWeight="bold">
                            {clazz.post.createBy.fullname || clazz.post.createBy.username}
                        </Typography>
                    </Grid>
                    {renderClassState(clazz.state)}
                    <Grid item marginLeft="auto" alignSelf="center">
                        <Typography variant="h8" fontWeight="bold">
                            {clazz.post.fee} VNĐ/buổi
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item container width="100%">
                <Grid item container flexDirection="row" width="100%" mt="2%">
                    {renderListFields(clazz)}
                </Grid>
                <Grid item container flexDirection="row" width="100%" mb="2%" mt="1%" justifyContent="end">
                    <>
                        <Grid item>
                            <IconButton onClick={()=>handleCancelClass(clazz)}>
                                <Clear sx={{color:"#F63F3F"}}/>
                                <Typography color="black">Hủy lớp</Typography>
                            </IconButton>
                        </Grid>
                    </>
                </Grid>
            </Grid>
        </Grid>
        <Grid item width="100%" mt="3%">
            <Divider sx={{mx:"-4%"}}/>
        </Grid>
        </>
    );
}

export default MyClassesItem;