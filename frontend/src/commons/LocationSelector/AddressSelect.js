import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Grid, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {app_colors} from "../../constants";
import listAddresses from "../../assets/vietnam_province.json"

AddressSelect.propTypes = {
    listAddresses: PropTypes.arrayOf(PropTypes.object),
    userAddress: PropTypes.object,
    handleChangeAddress: PropTypes.func
};

function AddressSelect(props) {
    const userAddress = props.userAddress ? props.userAddress : {}

    const [selectedProvince, setSelectedProvince] = useState( () => {
            if (userAddress.province) {
                return listAddresses.find(province => userAddress.province === province.codename)
            }
            return null
        }
    )
    const [selectedDistrict, setSelectedDistrict] = useState( () => {
            if (userAddress.province && userAddress.district) {
                const districts = listAddresses.find(province => userAddress.province === province.codename).districts
                return districts.find(district => userAddress.district === district.codename)
            }
            return null
        }
    )

    const [selectedWard, setSelectedWard] = useState (()=>{
            if (userAddress.province && userAddress.district && userAddress.ward){
                const districts = listAddresses.find(province => userAddress.province === province.codename).districts
                const wards = districts.find(district => userAddress.district === district.codename).wards
                return wards.find(ward => userAddress.ward === ward.codename)
            }
            return null
        }
    )

    const [detailAddress,setDetailAddress] = useState("")

    useEffect(()=>{
        const address = {
            province: selectedProvince ? selectedProvince.codename : null,
            district: selectedDistrict ? selectedDistrict.codename : null,
            ward: selectedWard ? selectedWard.codename : null,
            detail: detailAddress ? detailAddress : ""
        }
        props.handleChangeAddress(address)
    },[selectedProvince,selectedDistrict,selectedWard, detailAddress])

    const handleChangeProvince = (e) => {
        const selectedIndex = listAddresses.findIndex(province => province.codename === e.target.value)
        setSelectedProvince(listAddresses[selectedIndex])
        if (selectedDistrict != null){
            setSelectedDistrict(null)
        }
        if (selectedWard != null){
            setSelectedWard(null)
        }
    }

    const handleChangeDistrict = (e) => {
        const selectedIndex = selectedProvince.districts.findIndex(district => district.codename === e.target.value)
        setSelectedDistrict(selectedProvince.districts[selectedIndex])
        if (selectedWard != null){
            setSelectedWard(null)
        }
    }

    const handleChangeWard = (e) => {
        const selectedIndex = selectedDistrict.wards.findIndex(ward => ward.codename === e.target.value)
        setSelectedWard(selectedDistrict.wards[selectedIndex])
    }

    const handleChangeDetailAddress = (e) =>{
        setDetailAddress(e.target.value)
    }

    return (
        <>
            <Grid container flexDirection="row" justifyContent="space-between" mt={2}>
                <Grid item width="32%">
                    <InputLabel id="province-label" sx={{color:app_colors._blackText, fontWeight:"bold"}}>
                        Tỉnh/Thành phố
                    </InputLabel>
                    <Select
                        fullWidth
                        id="province"
                        size="small"
                        onChange={handleChangeProvince}
                        value={selectedProvince ? selectedProvince.codename : ""}
                    >
                        {listAddresses.map(province =>
                            <MenuItem
                                key={province.code}
                                value={province.codename}>
                                {province.name}
                            </MenuItem>
                        )}
                    </Select>
                </Grid>

                <Grid item width="32%">
                    <InputLabel id="district-label" sx={{color:app_colors._blackText, fontWeight:"bold"}}>
                        Quận/Huyện
                    </InputLabel>
                    <Select
                        fullWidth
                        id="district"
                        size="small"
                        disabled={selectedProvince == null}
                        value ={selectedDistrict ? selectedDistrict.codename : "" }
                        onChange={handleChangeDistrict}
                    >
                        {selectedProvince && selectedProvince.districts.map(district =>
                            <MenuItem
                                key={district.code}
                                value={district.codename}>
                                {district.name}
                            </MenuItem>
                        )}
                            <MenuItem value="" hidden/>
                    </Select>
                </Grid>

                <Grid item width="32%">
                    <InputLabel id="ward-label" sx={{color:app_colors._blackText, fontWeight:"bold"}}>
                        Phường/Xã
                    </InputLabel>
                    <Select
                        fullWidth
                        id="ward"
                        size="small"
                        disabled={selectedProvince == null || selectedDistrict == null}
                        value = {selectedWard ? selectedWard.codename : ""}
                        onChange={handleChangeWard}
                    >
                        {selectedProvince && selectedDistrict && selectedDistrict.wards.map(ward =>
                            <MenuItem
                                key={ward.code}
                                value={ward.codename}>
                                {ward.name}
                            </MenuItem>
                        )}
                        <MenuItem value="" hidden/>
                    </Select>
                </Grid>
            </Grid>
            <InputLabel
                id="detailAddress-label"
                sx={{color:app_colors._blackText, fontWeight:"bold", mt:2}}
            >
                Địa chỉ
            </InputLabel>
            <TextField
                fullWidth
                margin="dense"
                id="detailAddress"
                name="detailAddress"
                size="small"
                defaultValue={userAddress.detail ? userAddress.detail : ""}
                onChange={handleChangeDetailAddress}
            />
        </>
    );
}

export default AddressSelect;