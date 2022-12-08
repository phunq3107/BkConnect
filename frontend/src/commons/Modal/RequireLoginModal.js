import React from 'react';
import {Box, Button, Modal, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {app_paths} from "../../constants";
import {setSessionError} from "../../features/Auth/sessionSlice";

RequireLoginModal.propTypes = {

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
    p: 3,
};

function RequireLoginModal(props) {
    const currentUser = useSelector(state => state.session.currentUser)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleNavigateToLogin = () =>{
        dispatch(setSessionError(null))
        navigate(app_paths.login)
    }

    const handleNavigateToHome = () => {
        dispatch(setSessionError(null))
        navigate(app_paths.home)
    }
    return (
        <Modal
            open={currentUser == null}
            aria-describedby="description"
            aria-labelledby="title"
        >
            <Box sx={style}>
                <Typography id="title" variant="h6">
                    Yêu cầu đăng nhập
                </Typography>
                <Typography id="description" sx={{ mt: 2 }}>
                    {"Vui lòng đăng nhập để thực hiện chức năng"}
                </Typography>
                <Button onClick={handleNavigateToLogin}>Đăng nhập</Button>
                <Button onClick={handleNavigateToHome}>Về trang chủ</Button>
            </Box>
        </Modal>
    );
}

export default RequireLoginModal;