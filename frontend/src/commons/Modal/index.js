import React from 'react';
import PropTypes from 'prop-types';
import {Box, Modal, Typography} from "@mui/material";
import store from "../../configs/store";

ErrorModal.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    open: PropTypes.bool,
    errorSetter: PropTypes.object
};

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function ErrorModal(props) {

    const handleClose = () => {
        store.dispatch(props.errorSetter)
    }

    return (
        <Modal
            open={props.open}
            onClose={handleClose}
            aria-labelledby="title"
            aria-describedby="description"
        >
            <Box sx={style}>
                <Typography id="title" variant="h6" component="h2">
                    {props.title}
                </Typography>
                <Typography id="description" sx={{ mt: 2 }}>
                    {props.description}
                </Typography>
            </Box>
        </Modal>
    );
}

export default ErrorModal;