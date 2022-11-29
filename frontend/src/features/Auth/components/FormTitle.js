import React from 'react';
import {Typography} from "@mui/material";
import constants, {app_colors, app_fonts} from "../../../constants";


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
                fontFamily={app_fonts._primaryFont}
            >
                Welcome!
            </Typography>
            <Typography
                component="h1"
                variant="h5"
                gutterBottom
                fontWeight="Bold"
                fontSize={30}
                fontFamily={app_fonts._primaryFont}
            >
                It's really nice to see you
            </Typography>
        </>
    );
}

export default FormTitle;