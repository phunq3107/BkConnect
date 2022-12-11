import React from 'react';
import PropTypes from 'prop-types';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {Typography} from "@mui/material";
import {renderNotiString} from "../../utils/notificationUtils";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

ResponseMessageModal.propTypes = {
    closeDialog: PropTypes.func,
    responseMessage: PropTypes.string
};

function ResponseMessageModal(props) {
    const {responseMessage} = props

    const handleClose = () => {
        props.closeDialog(false);
    };

    if (!responseMessage){
        return (
            <>
            </>
        )
    }
    return (
        <>
            <Dialog
                open={props.open}
                keepMounted
                onClose={handleClose}
                aria-describedby="response-massage-dialog"
            >
                <DialogContent>
                    <DialogContentText id="response-massage-dialog">
                        {renderNotiString(responseMessage)}
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default ResponseMessageModal;