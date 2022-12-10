import React from 'react';
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
    Popper
} from "@mui/material";
import {useRef, useState} from "react";
import {Notifications} from "@mui/icons-material";
import {renderNotiString} from "../../../utils/notificationUtils";
import {useSelector} from "react-redux";

NotificationsButton.propTypes = {
    
};

const testNotifications = [
    {title:"asdasdasdasdasdasdasd", content: "asdasdasdasdasdasdasd"},
    {title:"asdasdasdasdasdasdasd", content: "asdasdsdsadasdsdasdasdasdasdasd"},
    {title:"asdasdasdasdasdasdasd", content: "asdasdasdvcxvcxbffghrgasdasdasdasd"},
    {title:"asdasdasdasdasdasdasd", content: "asdasdasdaefddsfdsfsdsdasdasdasd"},
    {title:"asdasdasdasdasdasdasd", content: "asdasdaxczxsdasdasdasdasd"},
    {title:"asdasdasdasdasdasdasd", content: "asdasdasdasdzxcsldjhuwiohdiwuohduowudwasdasdasd"},
]

function NotificationsButton(props) {

    const [showNotifications, setShowNotifications] = useState(false)
    const notificationsRef = useRef(null)
    const notifications = useSelector(state => state.session.notifications)

    const handleToggleNotifications = () => {
        setShowNotifications( prev => !prev)
    }

    const handleCloseNotifications = (e) => {
        if (notificationsRef.current && notificationsRef.current.contains(e.target)){
            return
        }
        setShowNotifications(false)
    }

    const handleNotificationClick = (event, notification) => {
        props.handleOpenDialog(notification)
    }

    return (
        <>
            <ButtonGroup>
                <IconButton variant="text" ref={notificationsRef} aria-label="notifications menu"
                            aria-controls={showNotifications ? 'notifications-menu' : undefined}
                            aria-expanded={showNotifications ? 'true' : undefined}
                            aria-haspopup="notifications"
                            onClick={handleToggleNotifications}
                >
                    <Badge badgeContent={1} max={10} color="error">
                        <Notifications/>
                    </Badge>
                </IconButton>
            </ButtonGroup>
            <Popper
                sx={{
                    zIndex: 1,
                }}
                open={showNotifications}
                anchorEl={notificationsRef.current}
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
                            <ClickAwayListener onClickAway={handleCloseNotifications}>
                                <MenuList id="notifications-menu" autoFocusItem>
                                    {notifications.map((noti, index) => (
                                        <MenuItem
                                            key={index}
                                            onClick={(event) => handleNotificationClick(event, noti)}
                                        >
                                            {renderNotiString(noti.title)}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </>
    );
}

export default NotificationsButton;