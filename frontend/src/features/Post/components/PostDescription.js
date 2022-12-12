import React from 'react';
import {Grid, Paper, Typography} from "@mui/material";
import {postStates} from "../../../constants/value";

PostDescription.propTypes = {

};

function PostDescription(props) {
    const {content,title, state,fee} = props

    const renderPostState = (state) =>{
        if (!state){
            return (<></>)
        }
        let title = ""
        let borderColor = ""
        if (state === postStates.DONE){
            borderColor="#86DFA6"
            title="Đã có gia sư"
        }
        if (state === postStates.ACTIVE){
            borderColor="#1488db"
            title="Đang tìm gia sư"
        }
        if (state === postStates.PENDING){
            borderColor="#F63F3F"
            title="Đang chờ duyệt"
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
                  ml="1%"
                  sx={{...res.sx}}
                  border={1}
                  borderRadius={4}
            >
                <Typography fontSize="small">{res.title}</Typography>
            </Grid>
        )
    }

    return (
        <Grid item container width="100%">
            <Grid item width="100%">
                <Typography variant="h6" fontWeight="bold"
                            style={{overflowWrap:'break-word'}}>{title}
                </Typography>
                <Grid item width="100%" container flexDirection="row" mt="2%">
                    <Typography variant="h7" fontWeight="bold">Trạng thái: </Typography>{renderPostState(state)}
                    <Grid item ml="auto">
                        <Typography variant="h7" fontWeight="bold">
                            Học phí: {fee ? fee + " VNĐ/buổi" : "Thỏa thuận"}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Typography mt="2%" variant="h6">Mô tả</Typography>
            <Grid item width="100%">
                <Paper
                    sx={{
                        my: 1,
                        mx: 'auto',
                        p: 2,
                        borderWidth:0,
                    }}
                >
                    <Grid container wrap="nowrap" spacing={2}>
                        <Grid item xs zeroMinWidth>
                            <Typography style={{overflowWrap:'break-word'}} dangerouslySetInnerHTML={{__html:content ? content : ""}}></Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default PostDescription;