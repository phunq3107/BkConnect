import React from 'react';
import PropTypes from 'prop-types';
import {Checkbox, FormControlLabel, Grid, IconButton, Stack, Typography} from "@mui/material";
import {Add, Cancel, Done} from "@mui/icons-material";
import AddressSelect from "./AddressSelect";
import {useState} from "react";

LocationSelect.propTypes = {
    handleChangeTeachingAddresses: PropTypes.func
};

function LocationSelect(props) {
    const [showAddressSelector, setShowAddressSelector] = useState(false)

    const [location,setLocation] = useState(null)

    const handleShowAddressSelector = () => {
        setShowAddressSelector(true)
    }

    const handleCancelAddressSelector = () =>{
        setShowAddressSelector(false)
    }

    const handleFinishAddressSelector = () => {
        props.handleChangeTeachingAddresses(location)
        setShowAddressSelector(false)
    }

    const handleChangeLocation = (address) => {
        setLocation(address)
    }

    return (
        <Grid container flexDirection="column">
            {!showAddressSelector &&
                <IconButton onClick={handleShowAddressSelector}>
                    <Add/> <Typography fontWeight="bold">Thêm địa chỉ</Typography>
                </IconButton>
            }

            {showAddressSelector &&
                <>
                    <Grid item alignSelf="flex-end">
                        <IconButton
                            onClick={handleCancelAddressSelector}
                            size="small">
                            <Cancel/>
                        </IconButton>
                        <IconButton
                            onClick={handleFinishAddressSelector}
                            size="small"
                        >
                            <Done/>
                        </IconButton>
                    </Grid>
                    <AddressSelect
                        userAddress={{}}
                        handleChangeAddress={handleChangeLocation}
                    />
                </>
            }
        </Grid>
    );
}

export default LocationSelect;