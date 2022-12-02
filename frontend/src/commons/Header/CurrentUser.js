import React, {useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {
    Badge,
    ButtonGroup,
    ClickAwayListener,
    Grow, IconButton,
    MenuItem,
    MenuList,
    Paper,
    Popper,
    Stack
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import UserAvatar from "./UserAvatar";
import {ChatBubble, Notifications} from "@mui/icons-material";
import constants, {app_paths} from "../../constants";
import {useDispatch} from "react-redux";
import {logout} from "../../features/Auth/sessionSlice";
import {appLocalStorage} from "../../utils/Storage";

CurrentUser.propTypes = {
    user: PropTypes.object
};

function CurrentUser(props) {
    const currentUser = props.user
    const options =[
        {title:"Hồ sơ cá nhân", href: app_paths.userInfo},
        {title:"Lớp của tôi", href:"/"}
    ]

    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleMenuItemClick = (event, href) => {
        setOpen(false)
        navigate(href)
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    const handleLogout = (e) => {
        dispatch(logout())
        appLocalStorage.removeItem(constants.ACCESS_TOKEN_KEY)
        navigate("/")
    }

    return (
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
            <IconButton>
                <Badge badgeContent={1} max={10} color="success">
                    <ChatBubble/>
                </Badge>
            </IconButton>
            <IconButton>
                <Badge badgeContent={1} max={10} color="error">
                    <Notifications/>
                </Badge>
            </IconButton>
            <ButtonGroup variant="text" ref={anchorRef} aria-label="split button">
                <IconButton
                    aria-controls={open ? 'split-button-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="menu"
                    onClick={handleToggle}
                >
                    <UserAvatar user={currentUser}/>
                </IconButton>
            </ButtonGroup>
            <Popper
                sx={{
                    zIndex: 1,
                }}
                open={open}
                anchorEl={anchorRef.current}
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
                            <ClickAwayListener onClickAway={handleClose}>
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
    );
}

export default CurrentUser;