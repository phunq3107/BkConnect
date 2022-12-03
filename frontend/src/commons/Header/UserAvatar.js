import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import PropTypes from "prop-types";

function stringToColor(str) {
    const string = str ? str : "BK"
    let hash = 0;
    let i;
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
}

function stringAvatar(name) {
    const firstLettersInName = name ? name.split(' ').map(word => word[0]).join("") : "BK"
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: firstLettersInName.length < 2 ? firstLettersInName : firstLettersInName.slice(-2),
    };
}

UserAvatar.propTypes = {
    user: PropTypes.object
};

function UserAvatar(props) {
    const user = props.user
    if (user.avatar && user.avatar !== "") {
        return (
            <Avatar src={user.avatar}>{stringAvatar(user.fullname).children}</Avatar>
        )
    }
    return (
        <Avatar {...stringAvatar(user.fullname)} />
    );
}

export default UserAvatar;