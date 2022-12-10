import React, {useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {
    Badge,
    ButtonGroup,
    ClickAwayListener,
    Grow,
    IconButton,
    MenuItem,
    MenuList,
    Paper,
    Popper,
    Stack
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import UserAvatar from "../../UserAvatar/UserAvatar";
import {ChatBubble} from "@mui/icons-material";
import constants from "../../../constants/value";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../../features/Auth/sessionSlice";
import {appLocalStorage} from "../../../utils/Storage";
import {app_paths} from "../../../constants/router";
import NotificationsButton from "./NotificationsButton";
import NotificationDialog from "./NotificationDialog";

CurrentUser.propTypes = {
    user: PropTypes.object
};


function CurrentUser(props) {
    const currentUser = props.user
    const options =[
        {title:"Hồ sơ cá nhân", href: app_paths.userInfo},
        {title:"Lớp của tôi", href: app_paths.userClasses}
    ]

    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef(null)

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleMenuItemClick = (event, href) => {
        setShowMenu(false)
        navigate(href)
    };


    const handleToggleMenu = () => {
        setShowMenu((prevOpen) => !prevOpen);
    };

    const handleCloseMenu = (event) => {
        if (menuRef.current && menuRef.current.contains(event.target)) {
            return;
        }
        setShowMenu(false);
    }



    const handleLogout = (e) => {
        dispatch(logout())
        appLocalStorage.removeItem(constants.ACCESS_TOKEN_KEY)
        navigate("/")
    }

    const [selectedNotification,setSelectedNotification] = useState(null)

    const handleOpenDialog = (notification) => {
        setSelectedNotification(notification)
    }

    const handleCloseDialog = () => {
        setSelectedNotification(null)
    }

    return (
        <>
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                <IconButton>
                    <Badge badgeContent={1} max={10} color="success">
                        <ChatBubble/>
                    </Badge>
                </IconButton>
                <NotificationsButton handleOpenDialog={handleOpenDialog}/>

                <ButtonGroup variant="text" ref={menuRef} aria-label="split button">
                    <IconButton
                        aria-controls={showMenu ? 'split-button-menu' : undefined}
                        aria-expanded={showMenu ? 'true' : undefined}
                        aria-haspopup="menu"
                        onClick={handleToggleMenu}
                    >
                        <UserAvatar user={currentUser}/>
                    </IconButton>
                </ButtonGroup>
                <Popper
                    sx={{
                        zIndex: 1,
                    }}
                    open={showMenu}
                    anchorEl={menuRef.current}
                    role={undefined}
                    transition
                    disablePortal
                >
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin:
                                    placement === 'bottom' ? 'center top' : 'center bottom',
                            }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleCloseMenu}>
                                    <MenuList id="split-button-menu" autoFocusItem>
                                        {options.map((option, index) => (
                                            <MenuItem
                                                key={option.title}
                                                onClick={(event) => handleMenuItemClick(event, option.href)}
                                            >
                                                {option.title}
                                            </MenuItem>
                                        ))}
                                        <MenuItem onClick={handleLogout}>
                                            Đăng xuất
                                        </MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </Stack>
            <NotificationDialog
                closeDialog={handleCloseDialog}
                notification={selectedNotification}
                open={selectedNotification !== null}
            />
        </>
    );
}

export default CurrentUser;