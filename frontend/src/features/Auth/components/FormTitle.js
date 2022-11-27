import React from 'react';
import {Typography} from "@mui/material";
import constants, {app_colors} from "../../../constants";


function FormTitle(props) {
    return (
        <>
            <Typography
                component="h1"
                variant="h5"
                gutterBottom
                color={app_colors._primaryPurple}
                fontWeight="Bold"
                fontSize={constants.bigFontSize}
                fontFamily="outfit"
            >
                Welcome!
            </Typography>
            <Typography
                component="h1"
                variant="h5"
                gutterBottom
                fontWeight="Bold"
                fontSize={30}
                fontFamily="outfit"
            >
                It's really nice to see you
            </Typography>
        </>
    );
}

export default FormTitle;