import React, {useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {
    Avatar, Badge,
    Button,
    ButtonGroup,
    ClickAwayListener, Divider,
    Grow, IconButton, Link,
    MenuItem,
    MenuList,
    Paper,
    Popper,
    Stack
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import UserAvatar from "./UserAvatar";
import {ChatBubble, Notifications} from "@mui/icons-material";
import {app_paths} from "../../constants";

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
                                    <MenuItem>
                                        <Link underline="none" href="/">Đăng xuất</Link>
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