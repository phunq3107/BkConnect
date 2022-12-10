import React from 'react';
import {Grid, Typography} from "@mui/material";
import UserAvatar from "../../../commons/UserAvatar/UserAvatar";

PostHeader.propTypes = {

};

function PostHeader(props) {
    const {author} = props
    return (
        <Grid item container flexDirection="row" width="100%" columnGap={2}>
            <Grid item width="8%" height="100%" minHeight="8vh">
                <UserAvatar user={author} width="100%" height="100%"/>
            </Grid>
            <Grid container item width="81%" alignContent="baseline">
                <Grid item width="100%">
                    <Typography fontWeight="bold" variant="h5">
                        {author.fullname ? author.fullname : "User"}
                    </Typography>
                </Grid>
                <Grid item width="100%">
                    <Typography variant="subtitle1" sx={{color:"#999999"}}>
                        {author.username ? author.username : "username"}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default PostHeader;