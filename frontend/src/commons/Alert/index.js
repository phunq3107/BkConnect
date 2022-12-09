import React from 'react';
import PropTypes from 'prop-types';
import {Alert, AlertTitle, Fade, Snackbar} from "@mui/material";

CustomAlert.propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    open: PropTypes.bool,
    title: PropTypes.string
};

function CustomAlert(props) {
    return (
        <Snackbar
            anchorOrigin={{ vertical:"top",horizontal:"center" }}
            TransitionComponent={Fade}
            autoHideDuration={3000}
            open={props.open}
            onClose={props.onClose}
        >
            <Alert severity="success" variant="filled">
                <AlertTitle>{props.title? props.title : props.severity}</AlertTitle>
                {props.message}
            </Alert>
        </Snackbar>
    );
}

export default CustomAlert;