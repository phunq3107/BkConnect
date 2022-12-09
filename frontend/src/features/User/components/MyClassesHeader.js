import React from 'react';
import {Grid, Select, Typography} from "@mui/material";

MyClassesHeader.propTypes = {

};

function MyClassesHeader(props) {
    return (
        <Grid item width="100%" container flexDirection="row" justifyContent="center" height="max-content">
            <Grid item width="50%" alignSelf="center">
                <Typography variant="h7" fontWeight="bold">Lớp của tôi</Typography>
            </Grid>

            <Grid item  alignSelf="center">
                <Typography variant="h7" fontWeight="bold">Sắp xếp theo:</Typography>
            </Grid>
            <Grid item width="30%" ml="2%" height="max-content" alignSelf="center">
                <Select fullWidth size="small" ></Select>
            </Grid>
        </Grid>
    );
}

export default MyClassesHeader;