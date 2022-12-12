import React from 'react';
import PropTypes from 'prop-types';
import Dialog from "@mui/material/Dialog";
import {renderNotiString} from "../../utils/notificationUtils";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import axiosClient from "../../apis/axiosClient";
import {setSessionError} from "../../features/Auth/sessionSlice";
import {HandleResponse} from "../../utils/ResponseHandler";
import {useNavigate} from "react-router-dom";

ResponseMessageModal.propTypes = {
    closeDialog: PropTypes.func,
    responseMessage: PropTypes.string
};


function ResponseMessageModal(props) {
    const {responseMessage} = props
    const navigate = useNavigate()

    const callApiOnClick = (apiEndPoints) => {
        axiosClient.get(apiEndPoints).then(
            res =>{
                const data = HandleResponse(res,setSessionError)
                //TODO: navigate(data)
            }
        ).catch(err => console.log(err))
    }

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
                        {renderNotiString(responseMessage, callApiOnClick)}
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default ResponseMessageModal;