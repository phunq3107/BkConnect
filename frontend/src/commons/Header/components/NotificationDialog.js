import React,{useState} from 'react';
import PropTypes from 'prop-types';
import Dialog from "@mui/material/Dialog";
import {Button, Fade} from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import {renderNotiString} from "../../../utils/notificationUtils";

NotificationDialog.propTypes = {

};



function NotificationDialog(props) {

    const {notification} = props

    const handleClose = () => {
        props.closeDialog(false);
    };

    if (!notification){
        return (
            <>
            </>
        )
    }

    return (
        <div>
            <Dialog
                open={props.open}
                keepMounted
                onClose={handleClose}
                aria-describedby="notification-dialog-description"
            >
                <DialogTitle>{renderNotiString(notification.title)}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="notification-dialog-description">
                        {renderNotiString(notification.content)}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Xem chi tiết</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default NotificationDialog;