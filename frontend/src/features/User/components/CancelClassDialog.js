import * as React from 'react';
import {useRef, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useSelector} from "react-redux";
import constants from "../../../constants/value"
import {FormControlLabel, Radio, RadioGroup, Zoom} from "@mui/material";
import {cancelClassReasons} from "../../../constants/userOptions";
import {renderNotiString} from "../../../utils/notificationUtils";

function CancelClassDialog(props) {

    const currentUserRole = useSelector(state => state.session.currentUser).role

    const reasonRef = useRef()
    const msgRef = useRef()

    const [existReason,setExistReason] = useState("")

    const recipient = function (){
        if (!currentUserRole)
            return ""
        switch (currentUserRole.toUpperCase()){
            case constants.ROLE_TUTOR:
                return 'học viên'
            case constants.ROLE_STUDENT:
                return 'gia sư'
        }
    }()

    const handleCloseDialog = () => {
        if (props.closeDialog){
            props.closeDialog()
        }
    };

    const handleSubmit = () =>{
        if (props.handleCancelClass) {
            const submitObj = {
                reason: existReason,
                description: reasonRef.current.value,
                message: msgRef.current.value
            }
            props.handleCancelClass(submitObj)
        }
    }

    const handleChangeReason = (e) => {
        setExistReason(cancelClassReasons[e.target.value])
    }

    console.log([
        renderNotiString("Bạn nhận được yêu cầu đăng kí nhận lớp từ  ${title=Gia sư Nguyễn Anh Quân|href=/tutor/view/5240568a-48b9-407c-bf95-868bc1053dd5|style=bold} tại bài đăng ${title=Tìm gia sư toán 10|href=/tutor/view/6f3c6513-d87d-4f77-9148-61a0fb47b5aa|style=bold}")
    ])
    return (
            <Dialog open={props.open} TransitionComponent={Zoom} transitionDuration={400}>
                <DialogTitle>Xác nhận hủy lớp</DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        {"Bạn muốn hủy lớp? Vui lòng cho chúng tôi biết thêm lí do khiến bạn hủy lớp và nhắn gửi gì đó đến " + recipient}
                    </DialogContentText>
                    <RadioGroup
                        column="true"
                        name="cancelClassReason"
                        onChange={handleChangeReason}
                    >
                        {
                            cancelClassReasons.map((reason,idx)=>{
                                return(
                                    <FormControlLabel
                                        key={idx}
                                        control={
                                            <Radio
                                                size="small"
                                                key={idx}
                                                value={idx}
                                            />
                                        }
                                        label={reason}
                                    />
                                )
                            })
                        }
                    </RadioGroup>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="reason"
                        label="Lý do hủy lớp"
                        type="text"
                        fullWidth
                        variant="outlined"
                        autoComplete="off"
                        inputRef={reasonRef}
                    />
                    <TextField
                        margin="dense"
                        id="message"
                        label={"Lời nhắn đến " + recipient}
                        type="text"
                        fullWidth
                        variant="outlined"
                        autoComplete="off"
                        inputRef={msgRef}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Hủy</Button>
                    <Button onClick={handleSubmit}>Xác nhận</Button>
                </DialogActions>
            </Dialog>
    );
}

export default CancelClassDialog;