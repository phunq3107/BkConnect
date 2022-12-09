import React from 'react';
import PropTypes from 'prop-types';
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import {Button, Zoom} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

ReFindTutorDialog.propTypes = {
    
};

function ReFindTutorDialog(props) {

    const handleCloseDialog = () => {
        if (props.closeDialog){
            props.closeDialog()
        }
    };

    const handleReFindTutor = () => {
        if (props.handleReFindTutor){
            props.handleReFindTutor()
        }
    }

    return (
        <Dialog
            open={props.open}
            TransitionComponent={Zoom}
            transitionDuration={400}
        >
            <DialogTitle>
                {"Hỗ trợ tìm lại lớp"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog">
                    Bạn vừa thực hiện hủy lớp. Bạn có muốn tìm lại lớp với nội dung tương tự?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialog}>Không</Button>
                <Button onClick={handleReFindTutor} autoFocus>Có</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ReFindTutorDialog;