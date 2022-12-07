import React from 'react';
import {Grid, Paper, Typography} from "@mui/material";

PostDescription.propTypes = {

};

function PostDescription(props) {
    const {content,title} = props
    return (
        <Grid item container width="100%">
            <Typography variant="h6" fontWeight="bold"
                        style={{overflowWrap:'break-word'}}>{title}
            </Typography>
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